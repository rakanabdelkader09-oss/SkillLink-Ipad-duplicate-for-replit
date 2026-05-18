import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

// ── SSE pub/sub (real-time push for friends / duels) ───────────────────────
const sseClients = new Map<number, Set<any>>();

function emitToUser(userId: number, event: { type: string; [key: string]: any }) {
  const clients = sseClients.get(userId);
  if (!clients || clients.size === 0) return;
  const payload = `data: ${JSON.stringify(event)}\n\n`;
  clients.forEach((res: any) => { try { res.write(payload); } catch {} });
}

app.get('/api/events/:userId', (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) { res.status(400).end(); return; }
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders();
  res.write(':ok\n\n');
  if (!sseClients.has(userId)) sseClients.set(userId, new Set());
  sseClients.get(userId)!.add(res);
  const ping = setInterval(() => { try { res.write(':ping\n\n'); } catch { clearInterval(ping); } }, 25000);
  req.on('close', () => {
    clearInterval(ping);
    sseClients.get(userId)?.delete(res);
    if (sseClients.get(userId)?.size === 0) sseClients.delete(userId);
  });
});

// ──────────────────────────────────────────────
// Health
// ──────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// ──────────────────────────────────────────────
// Users — get or create by device_id
// ──────────────────────────────────────────────
app.post('/api/users/sync', async (req, res) => {
  const { device_id, username, display_name, avatar, age, user_type } = req.body as {
    device_id: string;
    username?: string;
    display_name?: string;
    avatar?: string;
    age?: number;
    user_type?: string;
  };

  if (!device_id) return res.status(400).json({ error: 'device_id required' });

  try {
    const existing = await pool.query(
      'SELECT * FROM users WHERE device_id = $1',
      [device_id]
    );

    if (existing.rows.length > 0) {
      const user = existing.rows[0];
      // Update last_active and profile fields if provided
      await pool.query(
        `UPDATE users SET last_active = NOW(),
          username    = COALESCE($2, username),
          display_name = COALESCE($3, display_name),
          avatar      = COALESCE($4, avatar),
          age         = COALESCE($5, age),
          user_type   = COALESCE($6, user_type)
         WHERE device_id = $1`,
        [device_id, username ?? null, display_name ?? null, avatar ?? null, age ?? null, user_type ?? null]
      );
      const refreshed = await pool.query('SELECT * FROM users WHERE device_id = $1', [device_id]);
      return res.json({ user: refreshed.rows[0], created: false });
    }

    // Create new user
    const result = await pool.query(
      `INSERT INTO users (device_id, username, display_name, avatar, age, user_type, sc_coins)
       VALUES ($1, $2, $3, $4, $5, $6, 50)
       RETURNING *`,
      [
        device_id,
        username || 'Player',
        display_name || 'Player',
        avatar || 'lion',
        age || 8,
        user_type || 'kid',
      ]
    );

    // Record starting coins transaction
    await pool.query(
      `INSERT INTO coin_transactions (user_id, amount, type, description, balance_after)
       VALUES ($1, 50, 'earned', 'Welcome bonus', 50)`,
      [result.rows[0].id]
    );

    return res.status(201).json({ user: result.rows[0], created: true });
  } catch (err) {
    console.error('sync error', err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/users/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid userId' });

  try {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    return res.json({ user: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// ──────────────────────────────────────────────
// Coins — add or subtract
// ──────────────────────────────────────────────
app.post('/api/users/:userId/coins', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { amount, type, description } = req.body as {
    amount: number;
    type: 'earned' | 'spent' | 'adjusted';
    description: string;
  };

  if (isNaN(userId) || typeof amount !== 'number') {
    return res.status(400).json({ error: 'Invalid params' });
  }

  try {
    // Atomic update
    const result = await pool.query(
      `UPDATE users
       SET sc_coins = GREATEST(0, sc_coins + $2)
       WHERE id = $1
       RETURNING sc_coins`,
      [userId, amount]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });

    const newBalance = result.rows[0].sc_coins;

    await pool.query(
      `INSERT INTO coin_transactions (user_id, amount, type, description, balance_after)
       VALUES ($1, $2, $3, $4, $5)`,
      [userId, amount, type, description, newBalance]
    );

    return res.json({ sc_coins: newBalance });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/users/:userId/transactions', async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid userId' });

  try {
    const result = await pool.query(
      'SELECT * FROM coin_transactions WHERE user_id = $1 ORDER BY created_at DESC LIMIT 50',
      [userId]
    );
    return res.json({ transactions: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// ──────────────────────────────────────────────
// Quest Completions
// ──────────────────────────────────────────────
app.get('/api/users/:userId/quests', async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid userId' });

  try {
    const result = await pool.query(
      'SELECT * FROM quest_completions WHERE user_id = $1 ORDER BY completed_at DESC LIMIT 100',
      [userId]
    );
    return res.json({ quests: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/users/:userId/quests', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { quest_id, quest_title, quest_icon, points_earned, status } = req.body as {
    quest_id: number;
    quest_title: string;
    quest_icon: string;
    points_earned: number;
    status?: string;
  };

  if (isNaN(userId) || !quest_id) return res.status(400).json({ error: 'Invalid params' });

  try {
    // ── Server-side daily limit (5 quests per UTC day) ──────────────────────
    const dailyCheck = await pool.query(
      `SELECT COUNT(*) FROM quest_completions
       WHERE user_id = $1 AND DATE(completed_at AT TIME ZONE 'UTC') = CURRENT_DATE
         AND status IN ('completed', 'approved', 'pending_approval')`,
      [userId]
    );
    if (parseInt(dailyCheck.rows[0].count) >= 5) {
      return res.status(429).json({ error: 'Daily quest limit reached. Come back tomorrow!' });
    }

    const questStatus = status || 'completed';
    const result = await pool.query(
      `INSERT INTO quest_completions (user_id, quest_id, quest_title, quest_icon, status, points_earned)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [userId, quest_id, quest_title, quest_icon, questStatus, points_earned]
    );

    // Award coins if status is completed (not pending_approval)
    let newBalance = null;
    if (questStatus === 'completed') {
      const coinResult = await pool.query(
        `UPDATE users SET sc_coins = sc_coins + $2, xp = xp + $2 WHERE id = $1 RETURNING sc_coins`,
        [userId, points_earned]
      );
      newBalance = coinResult.rows[0]?.sc_coins ?? null;

      await pool.query(
        `INSERT INTO coin_transactions (user_id, amount, type, description, balance_after)
         VALUES ($1, $2, 'earned', $3, $4)`,
        [userId, points_earned, `Quest: ${quest_title}`, newBalance]
      );
    }

    return res.status(201).json({ completion: result.rows[0], sc_coins: newBalance });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// Parent approves/rejects a quest submission
app.patch('/api/quests/:completionId/status', async (req, res) => {
  const completionId = parseInt(req.params.completionId);
  const { status } = req.body as { status: 'approved' | 'rejected' };

  if (isNaN(completionId) || !['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid params' });
  }

  try {
    const result = await pool.query(
      `UPDATE quest_completions SET status = $2 WHERE id = $1 RETURNING *`,
      [completionId, status]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Not found' });

    const completion = result.rows[0];

    // If approved, award the coins now
    if (status === 'approved') {
      const coinResult = await pool.query(
        `UPDATE users SET sc_coins = sc_coins + $2 WHERE id = $1 RETURNING sc_coins`,
        [completion.user_id, completion.points_earned]
      );
      const newBalance = coinResult.rows[0]?.sc_coins;
      await pool.query(
        `INSERT INTO coin_transactions (user_id, amount, type, description, balance_after)
         VALUES ($1, $2, 'earned', $3, $4)`,
        [completion.user_id, completion.points_earned, `Approved: ${completion.quest_title}`, newBalance]
      );
    }

    return res.json({ completion: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// Pending submissions for parent review
app.get('/api/quests/pending', async (req, res) => {
  const { parent_device_id } = req.query as { parent_device_id?: string };
  try {
    let result;
    if (parent_device_id) {
      result = await pool.query(
        `SELECT qc.*, u.display_name as child_name, u.avatar as child_avatar
         FROM quest_completions qc
         JOIN users u ON qc.user_id = u.id
         JOIN parental_controls pc ON pc.child_user_id = u.id
         WHERE pc.parent_device_id = $1 AND qc.status = 'pending_approval'
         ORDER BY qc.completed_at DESC`,
        [parent_device_id]
      );
    } else {
      result = await pool.query(
        `SELECT qc.*, u.display_name as child_name, u.avatar as child_avatar
         FROM quest_completions qc
         JOIN users u ON qc.user_id = u.id
         WHERE qc.status = 'pending_approval'
         ORDER BY qc.completed_at DESC`
      );
    }
    return res.json({ submissions: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// ──────────────────────────────────────────────
// Course Progress
// ──────────────────────────────────────────────
app.get('/api/users/:userId/courses', async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid userId' });

  try {
    const result = await pool.query(
      'SELECT * FROM course_progress WHERE user_id = $1',
      [userId]
    );
    return res.json({ courses: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.put('/api/users/:userId/courses/:courseId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const courseId = req.params.courseId;
  const { step_index, completed, course_type } = req.body as {
    step_index?: number;
    completed?: boolean;
    course_type?: string;
  };

  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid userId' });

  try {
    const result = await pool.query(
      `INSERT INTO course_progress (user_id, course_id, course_type, step_index, completed, completed_at, updated_at)
       VALUES ($1, $2, $3, $4, $5, $6, NOW())
       ON CONFLICT (user_id, course_id) DO UPDATE
         SET step_index  = EXCLUDED.step_index,
             completed   = EXCLUDED.completed,
             completed_at = CASE WHEN EXCLUDED.completed AND course_progress.completed_at IS NULL
                                 THEN NOW() ELSE course_progress.completed_at END,
             updated_at  = NOW()
       RETURNING *`,
      [
        userId,
        courseId,
        course_type || 'skill',
        step_index ?? 0,
        completed ?? false,
        completed ? new Date() : null,
      ]
    );
    return res.json({ progress: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// ──────────────────────────────────────────────
// Parental Controls
// ──────────────────────────────────────────────
app.get('/api/parental-controls', async (req, res) => {
  const { parent_device_id, child_user_id } = req.query as {
    parent_device_id?: string;
    child_user_id?: string;
  };
  if (!parent_device_id) return res.status(400).json({ error: 'parent_device_id required' });

  try {
    let result;
    if (child_user_id) {
      result = await pool.query(
        `SELECT pc.*, u.display_name, u.avatar, u.sc_coins, u.xp, u.level
         FROM parental_controls pc
         JOIN users u ON pc.child_user_id = u.id
         WHERE pc.parent_device_id = $1 AND pc.child_user_id = $2`,
        [parent_device_id, parseInt(child_user_id)]
      );
    } else {
      result = await pool.query(
        `SELECT pc.*, u.display_name, u.avatar, u.sc_coins, u.xp, u.level
         FROM parental_controls pc
         JOIN users u ON pc.child_user_id = u.id
         WHERE pc.parent_device_id = $1`,
        [parent_device_id]
      );
    }
    return res.json({ controls: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.put('/api/parental-controls', async (req, res) => {
  const {
    parent_device_id,
    child_user_id,
    screen_time_limit,
    quest_approval_required,
    content_filter,
    purchase_approval,
  } = req.body as {
    parent_device_id: string;
    child_user_id: number;
    screen_time_limit?: number;
    quest_approval_required?: boolean;
    content_filter?: string;
    purchase_approval?: boolean;
  };

  if (!parent_device_id || !child_user_id) {
    return res.status(400).json({ error: 'parent_device_id and child_user_id required' });
  }

  try {
    const result = await pool.query(
      `INSERT INTO parental_controls
         (parent_device_id, child_user_id, screen_time_limit, quest_approval_required, content_filter, purchase_approval)
       VALUES ($1, $2, $3, $4, $5, $6)
       ON CONFLICT (parent_device_id, child_user_id)
       DO UPDATE SET
         screen_time_limit       = COALESCE($3, parental_controls.screen_time_limit),
         quest_approval_required = COALESCE($4, parental_controls.quest_approval_required),
         content_filter          = COALESCE($5, parental_controls.content_filter),
         purchase_approval       = COALESCE($6, parental_controls.purchase_approval),
         updated_at              = NOW()
       RETURNING *`,
      [
        parent_device_id,
        child_user_id,
        screen_time_limit ?? 60,
        quest_approval_required ?? false,
        content_filter ?? 'moderate',
        purchase_approval ?? true,
      ]
    );
    return res.json({ controls: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// ──────────────────────────────────────────────
// Leaderboard
// ──────────────────────────────────────────────
app.get('/api/leaderboard', async (_req, res) => {
  try {
    const result = await pool.query(
      `SELECT
         u.id, u.display_name, u.avatar, u.sc_coins, u.xp, u.level, u.streak,
         COUNT(qc.id) FILTER (WHERE qc.status = 'completed' OR qc.status = 'approved') AS quests_completed,
         COUNT(cp.id) FILTER (WHERE cp.completed = true) AS courses_completed
       FROM users u
       LEFT JOIN quest_completions qc ON qc.user_id = u.id
       LEFT JOIN course_progress cp ON cp.user_id = u.id
       WHERE u.user_type = 'kid'
       GROUP BY u.id
       ORDER BY u.sc_coins DESC
       LIMIT 20`
    );
    return res.json({ leaderboard: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// ──────────────────────────────────────────────
// XP / Level update
// ──────────────────────────────────────────────
app.post('/api/users/:userId/xp', async (req, res) => {
  const userId = parseInt(req.params.userId);
  const { xp } = req.body as { xp: number };
  if (isNaN(userId) || typeof xp !== 'number') {
    return res.status(400).json({ error: 'Invalid params' });
  }

  try {
    const result = await pool.query(
      `UPDATE users
       SET xp    = xp + $2,
           level = GREATEST(1, FLOOR((xp + $2) / 100)::int)
       WHERE id = $1
       RETURNING xp, level`,
      [userId, xp]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'User not found' });
    return res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// ──────────────────────────────────────────────
// Auth — signup / login
// ──────────────────────────────────────────────
app.post('/api/auth/signup', async (req, res) => {
  const { username_handle, password, display_name, age, user_type, avatar, device_id } = req.body as {
    username_handle: string;
    password: string;
    display_name?: string;
    age?: number;
    user_type?: string;
    avatar?: string;
    device_id?: string;
  };

  if (!username_handle || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }

  try {
    // Check handle not taken
    const existing = await pool.query(
      'SELECT id FROM users WHERE LOWER(username_handle) = LOWER($1)',
      [username_handle]
    );
    if (existing.rows.length > 0) {
      return res.status(409).json({ error: 'Username already taken. Try another.' });
    }

    const devId = device_id || crypto.randomUUID();

    // If this device already has a registered account, reject — don't overwrite
    const deviceExisting = await pool.query(
      `SELECT id FROM users WHERE device_id = $1 AND password_hash IS NOT NULL`,
      [devId]
    );
    if (deviceExisting.rows.length > 0) {
      return res.status(409).json({ error: 'This device already has an account. Please log in instead.' });
    }

    const result = await pool.query(
      `INSERT INTO users
         (device_id, username_handle, password_hash, username, display_name, avatar, age, user_type, sc_coins)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,50)
       ON CONFLICT (device_id) DO UPDATE
         SET username_handle = EXCLUDED.username_handle,
             password_hash   = EXCLUDED.password_hash,
             username        = EXCLUDED.username,
             display_name    = EXCLUDED.display_name,
             avatar          = EXCLUDED.avatar,
             age             = EXCLUDED.age,
             user_type       = EXCLUDED.user_type
       RETURNING *`,
      [
        devId,
        username_handle,
        password,
        display_name || username_handle,
        display_name || username_handle,
        avatar || 'lion',
        age || 8,
        user_type || 'kid',
      ]
    );

    return res.status(201).json({ user: result.rows[0] });
  } catch (err) {
    console.error('signup error', err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { username_handle, password, expected_user_type } = req.body as {
    username_handle: string;
    password: string;
    expected_user_type?: string;
  };

  if (!username_handle || !password) {
    return res.status(400).json({ error: 'username and password required' });
  }

  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE LOWER(username_handle) = LOWER($1)',
      [username_handle]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Account not found. Check your username.' });
    }

    const user = result.rows[0];
    if (user.password_hash !== password) {
      return res.status(401).json({ error: 'Wrong password. Try again.' });
    }

    // Account-type enforcement — prevent cross-portal login
    if (expected_user_type && expected_user_type !== 'creator') {
      if (user.user_type === 'kid' && expected_user_type === 'parent') {
        return res.status(403).json({ error: 'These credentials belong to a child account. Please use the child login.' });
      }
      if (user.user_type === 'parent' && expected_user_type === 'kid') {
        return res.status(403).json({ error: 'These credentials belong to a parent account. Please use the parent login.' });
      }
    }

    // Update last_active
    await pool.query('UPDATE users SET last_active = NOW() WHERE id = $1', [user.id]);

    return res.json({ user });
  } catch (err) {
    console.error('login error', err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// ──────────────────────────────────────────────
// User search (by handle prefix)
// ──────────────────────────────────────────────
app.get('/api/users/search', async (req, res) => {
  const { q, exclude_id } = req.query as { q?: string; exclude_id?: string };
  if (!q || (q as string).length < 2) {
    return res.status(400).json({ error: 'Query must be at least 2 characters' });
  }

  try {
    const result = await pool.query(
      `SELECT id, display_name, username_handle, avatar, sc_coins, level
       FROM users
       WHERE LOWER(username_handle) LIKE LOWER($1)
         AND ($2::int IS NULL OR id != $2::int)
         AND username_handle IS NOT NULL
       LIMIT 10`,
      [`${q}%`, exclude_id ? parseInt(exclude_id as string) : null]
    );
    return res.json({ users: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// ──────────────────────────────────────────────
// Friends
// ──────────────────────────────────────────────
app.get('/api/friends/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid userId' });

  try {
    const result = await pool.query(
      `SELECT
         f.id, f.status, f.created_at,
         CASE WHEN f.requester_id = $1 THEN f.addressee_id ELSE f.requester_id END AS friend_id,
         CASE WHEN f.requester_id = $1 THEN 'sent' ELSE 'received' END AS direction,
         u.display_name, u.username_handle, u.avatar, u.sc_coins, u.level, u.xp
       FROM friends f
       JOIN users u ON u.id = (CASE WHEN f.requester_id = $1 THEN f.addressee_id ELSE f.requester_id END)
       WHERE f.requester_id = $1 OR f.addressee_id = $1
       ORDER BY f.status, f.created_at DESC`,
      [userId]
    );
    return res.json({ friends: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.post('/api/friends/request', async (req, res) => {
  const { requester_id, addressee_handle } = req.body as {
    requester_id: number;
    addressee_handle: string;
  };

  if (!requester_id || !addressee_handle) {
    return res.status(400).json({ error: 'requester_id and addressee_handle required' });
  }

  try {
    const target = await pool.query(
      'SELECT id FROM users WHERE LOWER(username_handle) = LOWER($1)',
      [addressee_handle]
    );
    if (target.rows.length === 0) {
      return res.status(404).json({ error: `No user found with username "${addressee_handle}"` });
    }
    const addresseeId = target.rows[0].id;
    if (addresseeId === requester_id) {
      return res.status(400).json({ error: "You can't add yourself!" });
    }

    const result = await pool.query(
      `INSERT INTO friends (requester_id, addressee_id, status)
       VALUES ($1, $2, 'pending')
       ON CONFLICT (requester_id, addressee_id) DO UPDATE SET status = 'pending'
       RETURNING *`,
      [requester_id, addresseeId]
    );
    // Notify addressee in real-time
    emitToUser(addresseeId, { type: 'friend_request', from_id: requester_id });
    return res.status(201).json({ friend: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.patch('/api/friends/:friendRowId', async (req, res) => {
  const id = parseInt(req.params.friendRowId);
  const { status } = req.body as { status: 'accepted' | 'declined' };
  if (isNaN(id) || !['accepted', 'declined'].includes(status)) {
    return res.status(400).json({ error: 'Invalid params' });
  }
  try {
    const result = await pool.query(
      'UPDATE friends SET status = $2 WHERE id = $1 RETURNING *',
      [id, status]
    );
    const row = result.rows[0];
    if (row) {
      emitToUser(row.requester_id, { type: 'friend_update', status });
      emitToUser(row.addressee_id, { type: 'friend_update', status });
    }
    return res.json({ friend: row });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.delete('/api/friends/:friendRowId', async (req, res) => {
  const id = parseInt(req.params.friendRowId);
  if (isNaN(id)) return res.status(400).json({ error: 'Invalid id' });
  try {
    const fetchRow = await pool.query('SELECT requester_id, addressee_id FROM friends WHERE id = $1', [id]);
    await pool.query('DELETE FROM friends WHERE id = $1', [id]);
    if (fetchRow.rows.length > 0) {
      const { requester_id, addressee_id } = fetchRow.rows[0];
      emitToUser(requester_id, { type: 'friend_update', status: 'removed' });
      emitToUser(addressee_id, { type: 'friend_update', status: 'removed' });
    }
    return res.json({ ok: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// ──────────────────────────────────────────────
// Completed quest IDs for a user
// ──────────────────────────────────────────────
app.get('/api/users/:userId/completed-quest-ids', async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid userId' });
  try {
    const result = await pool.query(
      `SELECT DISTINCT quest_id FROM quest_completions
       WHERE user_id = $1 AND status IN ('completed','approved')`,
      [userId]
    );
    return res.json({ quest_ids: result.rows.map((r: any) => r.quest_id) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/users/:userId/completed-course-ids', async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid userId' });
  try {
    const result = await pool.query(
      `SELECT course_id FROM course_progress WHERE user_id = $1 AND completed = true`,
      [userId]
    );
    return res.json({ course_ids: result.rows.map((r: any) => r.course_id) });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// ──────────────────────────────────────────────
// Custom Quests (parent-created)
// ──────────────────────────────────────────────
app.post('/api/custom-quests', async (req, res) => {
  const { parent_id, child_id, title, description, sc_reward, due_date } = req.body as {
    parent_id: number;
    child_id?: number;
    title: string;
    description?: string;
    sc_reward: number;
    due_date?: string;
  };

  if (!parent_id || !title) return res.status(400).json({ error: 'parent_id and title required' });
  const reward = Math.min(15, Math.max(1, sc_reward || 5));

  try {
    // 1-per-day limit check
    const dayCheck = await pool.query(
      `SELECT COUNT(*) FROM custom_quests
       WHERE parent_id = $1 AND DATE(created_at AT TIME ZONE 'UTC') = CURRENT_DATE`,
      [parent_id]
    );
    if (parseInt(dayCheck.rows[0].count) >= 1) {
      return res.status(429).json({ error: 'You can only create 1 custom quest per day' });
    }

    const result = await pool.query(
      `INSERT INTO custom_quests (parent_id, child_id, title, description, sc_reward, due_date)
       VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
      [parent_id, child_id ?? null, title.trim(), description?.trim() ?? null, reward, due_date ?? null]
    );
    return res.status(201).json({ quest: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/custom-quests/:parentId', async (req, res) => {
  const parentId = parseInt(req.params.parentId);
  if (isNaN(parentId)) return res.status(400).json({ error: 'Invalid parentId' });
  try {
    const result = await pool.query(
      `SELECT * FROM custom_quests WHERE parent_id = $1 ORDER BY created_at DESC`,
      [parentId]
    );
    return res.json({ quests: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.patch('/api/custom-quests/:questId/status', async (req, res) => {
  const questId = parseInt(req.params.questId);
  const { status } = req.body as { status: 'pending' | 'completed' | 'approved' };
  if (isNaN(questId) || !['pending','completed','approved'].includes(status)) {
    return res.status(400).json({ error: 'Invalid questId or status' });
  }
  try {
    const result = await pool.query(
      `UPDATE custom_quests SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, questId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Quest not found' });
    return res.json({ quest: result.rows[0] });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

// ──────────────────────────────────────────────
// Quest Duels
// ──────────────────────────────────────────────
app.post('/api/duels/challenge', async (req, res) => {
  const { challenger_id, challenged_id, quest_id } = req.body as {
    challenger_id: number;
    challenged_id: number;
    quest_id: number;
  };
  if (!challenger_id || !challenged_id || !quest_id) {
    return res.status(400).json({ error: 'challenger_id, challenged_id and quest_id required' });
  }
  try {
    const result = await pool.query(
      `INSERT INTO quest_duels (challenger_id, challenged_id, quest_id, status)
       VALUES ($1, $2, $3, 'pending') RETURNING *`,
      [challenger_id, challenged_id, quest_id]
    );
    const newDuel = result.rows[0];
    emitToUser(challenged_id, { type: 'duel_challenge', from_id: challenger_id, duel: newDuel });
    return res.status(201).json({ duel: newDuel });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.get('/api/duels/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId);
  if (isNaN(userId)) return res.status(400).json({ error: 'Invalid userId' });
  try {
    const result = await pool.query(
      `SELECT d.*,
        c.display_name AS challenger_name, c.avatar AS challenger_avatar,
        ch.display_name AS challenged_name, ch.avatar AS challenged_avatar
       FROM quest_duels d
       JOIN users c  ON c.id  = d.challenger_id
       JOIN users ch ON ch.id = d.challenged_id
       WHERE d.challenger_id = $1 OR d.challenged_id = $1
       ORDER BY d.created_at DESC`,
      [userId]
    );
    return res.json({ duels: result.rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

app.patch('/api/duels/:duelId/respond', async (req, res) => {
  const duelId = parseInt(req.params.duelId);
  const { status } = req.body as { status: 'active' | 'declined' };
  if (isNaN(duelId) || !['active','declined'].includes(status)) {
    return res.status(400).json({ error: 'Invalid duelId or status' });
  }
  try {
    const result = await pool.query(
      `UPDATE quest_duels SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
      [status, duelId]
    );
    if (result.rows.length === 0) return res.status(404).json({ error: 'Duel not found' });
    const duelRow = result.rows[0];
    emitToUser(duelRow.challenger_id, { type: 'duel_update', status });
    emitToUser(duelRow.challenged_id, { type: 'duel_update', status });
    return res.json({ duel: duelRow });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Database error' });
  }
});

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`SkillLink API running on port ${PORT}`);
});
