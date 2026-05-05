import express from 'express';
import cors from 'cors';
import { pool } from './db.js';

const app = express();
app.use(cors());
app.use(express.json());

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

const PORT = 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`SkillLink API running on port ${PORT}`);
});
