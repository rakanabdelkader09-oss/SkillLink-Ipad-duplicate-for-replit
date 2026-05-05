const BASE = '/api';

async function request<T>(
  path: string,
  options?: RequestInit
): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || 'API error');
  }
  return res.json() as Promise<T>;
}

export interface DBUser {
  id: number;
  device_id: string;
  username: string;
  display_name: string;
  avatar: string;
  age: number;
  user_type: string;
  sc_coins: number;
  xp: number;
  level: number;
  streak: number;
  last_active: string;
  created_at: string;
}

export interface DBQuestCompletion {
  id: number;
  user_id: number;
  quest_id: number;
  quest_title: string;
  quest_icon: string;
  status: string;
  points_earned: number;
  completed_at: string;
  child_name?: string;
}

export interface DBCourseProgress {
  id: number;
  user_id: number;
  course_id: string;
  course_type: string;
  step_index: number;
  completed: boolean;
  completed_at: string | null;
  updated_at: string;
}

export interface DBTransaction {
  id: number;
  user_id: number;
  amount: number;
  type: string;
  description: string;
  balance_after: number;
  created_at: string;
}

export interface LeaderboardEntry {
  id: number;
  display_name: string;
  avatar: string;
  sc_coins: number;
  xp: number;
  level: number;
  streak: number;
  quests_completed: string;
  courses_completed: string;
}

// ── User sync ──────────────────────────────────────────────────────────────

export function syncUser(params: {
  device_id: string;
  username?: string;
  display_name?: string;
  avatar?: string;
  age?: number;
  user_type?: string;
}) {
  return request<{ user: DBUser; created: boolean }>('/users/sync', {
    method: 'POST',
    body: JSON.stringify(params),
  });
}

export function getUser(userId: number) {
  return request<{ user: DBUser }>(`/users/${userId}`);
}

// ── Coins ──────────────────────────────────────────────────────────────────

export function awardCoins(
  userId: number,
  amount: number,
  description: string,
  type: 'earned' | 'spent' | 'adjusted' = 'earned'
) {
  return request<{ sc_coins: number }>(`/users/${userId}/coins`, {
    method: 'POST',
    body: JSON.stringify({ amount, type, description }),
  });
}

export function spendCoins(userId: number, amount: number, description: string) {
  return awardCoins(userId, -amount, description, 'spent');
}

export function getTransactions(userId: number) {
  return request<{ transactions: DBTransaction[] }>(`/users/${userId}/transactions`);
}

// ── Quests ─────────────────────────────────────────────────────────────────

export function getUserQuests(userId: number) {
  return request<{ quests: DBQuestCompletion[] }>(`/users/${userId}/quests`);
}

export function completeQuest(
  userId: number,
  params: {
    quest_id: number;
    quest_title: string;
    quest_icon: string;
    points_earned: number;
    status?: 'completed' | 'pending_approval';
  }
) {
  return request<{ completion: DBQuestCompletion; sc_coins: number | null }>(
    `/users/${userId}/quests`,
    { method: 'POST', body: JSON.stringify(params) }
  );
}

export function updateQuestStatus(completionId: number, status: 'approved' | 'rejected') {
  return request<{ completion: DBQuestCompletion }>(`/quests/${completionId}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status }),
  });
}

export function getPendingSubmissions(parentDeviceId?: string) {
  const qs = parentDeviceId ? `?parent_device_id=${encodeURIComponent(parentDeviceId)}` : '';
  return request<{ submissions: DBQuestCompletion[] }>(`/quests/pending${qs}`);
}

// ── Courses ────────────────────────────────────────────────────────────────

export function getUserCourses(userId: number) {
  return request<{ courses: DBCourseProgress[] }>(`/users/${userId}/courses`);
}

export function updateCourseProgress(
  userId: number,
  courseId: string,
  params: { step_index?: number; completed?: boolean; course_type?: string }
) {
  return request<{ progress: DBCourseProgress }>(
    `/users/${userId}/courses/${encodeURIComponent(courseId)}`,
    { method: 'PUT', body: JSON.stringify(params) }
  );
}

// ── Parental Controls ──────────────────────────────────────────────────────

export function getParentalControls(parentDeviceId: string, childUserId?: number) {
  const qs = childUserId ? `&child_user_id=${childUserId}` : '';
  return request<{ controls: any[] }>(
    `/parental-controls?parent_device_id=${encodeURIComponent(parentDeviceId)}${qs}`
  );
}

export function saveParentalControls(params: {
  parent_device_id: string;
  child_user_id: number;
  screen_time_limit?: number;
  quest_approval_required?: boolean;
  content_filter?: string;
  purchase_approval?: boolean;
}) {
  return request<{ controls: any }>('/parental-controls', {
    method: 'PUT',
    body: JSON.stringify(params),
  });
}

// ── Leaderboard ────────────────────────────────────────────────────────────

export function getLeaderboard() {
  return request<{ leaderboard: LeaderboardEntry[] }>('/leaderboard');
}

// ── XP ────────────────────────────────────────────────────────────────────

export function addXP(userId: number, xp: number) {
  return request<{ xp: number; level: number }>(`/users/${userId}/xp`, {
    method: 'POST',
    body: JSON.stringify({ xp }),
  });
}

// ── Device ID helper ───────────────────────────────────────────────────────

export function getOrCreateDeviceId(): string {
  const KEY = 'skilllink-device-id';
  let id = localStorage.getItem(KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(KEY, id);
  }
  return id;
}
