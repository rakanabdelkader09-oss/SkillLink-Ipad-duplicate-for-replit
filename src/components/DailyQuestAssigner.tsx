// Helper module for assigning daily quests to kids

export interface Quest {
  id: number;
  title: string;
  icon: string;
  points: number;
  completed: boolean;
  category: string;
  color: string;
  minAge: number;
  maxAge: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  xp: number;
  /** 'film' = kid records themselves doing it; 'parent' = parent approves when done */
  verifyType: 'film' | 'parent';
  /** When true, the quest detail screen shows a timer */
  isTimed?: boolean;
  timerSeconds?: number;
  /** When true, a parent/guardian must be present before the child starts */
  supervised?: boolean;
}

// SC rewards per difficulty tier
export const DIFFICULTY_SC: Record<Quest['difficulty'], number> = {
  beginner: 5,
  intermediate: 10,
  advanced: 15,
};

/**
 * Quest pool with real age ranges.
 *
 * Age groups:
 *   6–7  → beginner + easy intermediate only
 *   8–10 → beginner + intermediate + some advanced
 *  11–12 → all difficulties including harder advanced
 */
export const QUEST_POOL: Quest[] = [

  // ── BEGINNER  (quick, simple — 5 SC) — suitable for ALL ages 6-12 ────────
  { id: 9,   title: 'Make your bed neatly',
    icon: '🛏️', points: 5, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'film' },

  { id: 10,  title: 'Put ALL your toys and belongings away in the right place',
    icon: '🧸', points: 5, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'film' },

  { id: 11,  title: 'Pick up every item from your bedroom floor and put it away',
    icon: '🧹', points: 5, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'film' },

  { id: 47,  title: 'Feed your pet its meal',
    icon: '🐕', points: 5, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'film' },

  { id: 49,  title: 'Set the dinner table completely before the meal',
    icon: '🍽️', points: 5, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'film' },

  { id: 14,  title: 'Water every plant in the house',
    icon: '🌱', points: 5, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'film' },

  { id: 3,   title: 'Do 10 jumping jacks without stopping',
    icon: '🤸', points: 5, completed: false, category: 'Personal Care', color: 'blue',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'film',
    isTimed: true, timerSeconds: 60 },

  { id: 42,  title: 'Get yourself fully ready for the day: dressed, hair done, teeth brushed',
    icon: '🪥', points: 5, completed: false, category: 'Personal Care', color: 'blue',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'parent' },

  { id: 26,  title: 'Do a drawing or colouring page and show it to a parent',
    icon: '🖍️', points: 5, completed: false, category: 'Creativity', color: 'pink',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'film' },

  { id: 28,  title: 'Fold a paper plane and test how far it flies — film the flight!',
    icon: '✈️', points: 5, completed: false, category: 'Creativity', color: 'pink',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'film' },

  { id: 18,  title: 'Read a book chapter or picture book out loud for 10 minutes',
    icon: '📚', points: 5, completed: false, category: 'Learning', color: 'purple',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'film',
    isTimed: true, timerSeconds: 600 },

  { id: 207, title: 'Wipe down your desk or workspace until it is spotless',
    icon: '✏️', points: 5, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'film' },

  { id: 208, title: 'Put away all clean dishes from the drying rack',
    icon: '🍽️', points: 5, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'film' },

  { id: 209, title: 'Tidy the bathroom after using it — leave it neat for the next person',
    icon: '🚿', points: 5, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'film' },

  { id: 211, title: 'Pack your school bag ready for tomorrow — everything in its place',
    icon: '🎒', points: 5, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'parent' },

  { id: 68,  title: 'Make a card or letter for someone and show it to a parent',
    icon: '💌', points: 5, completed: false, category: 'Creativity', color: 'pink',
    minAge: 6, maxAge: 12, difficulty: 'beginner', xp: 20, verifyType: 'film' },

  // ── INTERMEDIATE  (more effort — 10 SC) ──────────────────────────────────
  // Ages 6-7 can access the simpler ones; harder ones start at 8+

  { id: 83,  title: 'Tidy your entire bedroom — floor clear, bed made, desk clear, clothes put away',
    icon: '🏠', points: 10, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 6, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film' },

  { id: 38,  title: 'Help a parent or sibling with a chore they are doing — film yourself helping',
    icon: '🤝', points: 10, completed: false, category: 'Social Skills', color: 'red',
    minAge: 6, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film' },

  { id: 61,  title: 'Complete all homework for today without being asked — parent ticks it off',
    icon: '📚', points: 10, completed: false, category: 'Learning', color: 'purple',
    minAge: 6, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'parent' },

  { id: 202, title: 'Do 15 minutes of continuous physical exercise of your choice — film yourself',
    icon: '🏃', points: 10, completed: false, category: 'Personal Care', color: 'blue',
    minAge: 6, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film',
    isTimed: true, timerSeconds: 900 },

  { id: 206, title: 'Complete a craft project and film yourself showing it to the camera and explaining what you made',
    icon: '🎨', points: 10, completed: false, category: 'Creativity', color: 'pink',
    minAge: 6, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film' },

  { id: 4,   title: 'Do 20 jumping jacks + 10 squats without stopping — film yourself',
    icon: '💪', points: 10, completed: false, category: 'Personal Care', color: 'blue',
    minAge: 7, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film',
    isTimed: true, timerSeconds: 120 },

  { id: 12,  title: 'Wash, rinse and dry all the dishes from a meal — film the clean sink',
    icon: '🍽️', points: 10, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 7, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film' },

  { id: 21,  title: 'Read for 15 minutes then film yourself saying: what happened and what you think will happen next',
    icon: '📖', points: 10, completed: false, category: 'Learning', color: 'purple',
    minAge: 7, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film',
    isTimed: true, timerSeconds: 900 },

  { id: 77,  title: 'Write a thank-you note to someone and film yourself reading it aloud',
    icon: '✉️', points: 10, completed: false, category: 'Social Skills', color: 'red',
    minAge: 7, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film' },

  { id: 78,  title: 'Video call or phone a grandparent or relative — film the call (with permission)',
    icon: '📞', points: 10, completed: false, category: 'Social Skills', color: 'red',
    minAge: 7, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film' },

  { id: 53,  title: 'Take out ALL the rubbish bins in the house and replace the bags',
    icon: '🗑️', points: 10, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 8, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film' },

  { id: 54,  title: 'Fold a full basket of clean laundry and put every item away in the right place',
    icon: '👔', points: 10, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 8, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film' },

  { id: 200, title: 'Sweep or vacuum one full room from corner to corner — film the clean floor',
    icon: '🧹', points: 10, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 8, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film' },

  { id: 205, title: 'Completely tidy the living room — everything in its place, surfaces clear',
    icon: '🛋️', points: 10, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 8, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film' },

  { id: 30,  title: 'Write a short poem or story (at least 5 sentences) and read it aloud on camera',
    icon: '✍️', points: 10, completed: false, category: 'Creativity', color: 'pink',
    minAge: 8, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film' },

  { id: 201, title: 'Wipe down the kitchen counters and hob after a meal — film them clean',
    icon: '🍳', points: 10, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 9, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film', supervised: true },

  { id: 203, title: 'Prepare a healthy snack from scratch (no help) and film the finished result',
    icon: '🥗', points: 10, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 9, maxAge: 12, difficulty: 'intermediate', xp: 40, verifyType: 'film', supervised: true },

  // ── ADVANCED  (demanding — 15 SC) ────────────────────────────────────────
  // Starts at age 8+ with lighter ones; harder tasks from age 10+

  { id: 212, title: 'Do a creative project (art, craft or building) for 30+ minutes then film yourself presenting it',
    icon: '🎨', points: 15, completed: false, category: 'Creativity', color: 'pink',
    minAge: 7, maxAge: 12, difficulty: 'advanced', xp: 60, verifyType: 'film',
    isTimed: true, timerSeconds: 1800 },

  { id: 215, title: 'Finish ALL schoolwork for today, check every answer for mistakes, then show a parent',
    icon: '📚', points: 15, completed: false, category: 'Learning', color: 'purple',
    minAge: 7, maxAge: 12, difficulty: 'advanced', xp: 60, verifyType: 'parent' },

  { id: 46,  title: 'Do a full 30-minute workout: warm-up, 3+ exercises, cool-down — film at least 3 exercises',
    icon: '🏃', points: 15, completed: false, category: 'Personal Care', color: 'blue',
    minAge: 8, maxAge: 12, difficulty: 'advanced', xp: 60, verifyType: 'film',
    isTimed: true, timerSeconds: 1800 },

  { id: 16,  title: 'Deep-clean your bedroom: vacuum/sweep the floor, dust all surfaces, organise wardrobe, make bed with fresh sheets — film the result',
    icon: '🏠', points: 45, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 8, maxAge: 12, difficulty: 'advanced', xp: 180, verifyType: 'film' },

  { id: 213, title: 'Completely organise a room other than your bedroom — film the before AND after',
    icon: '🏡', points: 15, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 9, maxAge: 12, difficulty: 'advanced', xp: 60, verifyType: 'film' },

  { id: 7,   title: 'Do 30 jumping jacks + 15 squats + 10 push-ups without stopping — film the whole set',
    icon: '💪', points: 15, completed: false, category: 'Personal Care', color: 'blue',
    minAge: 9, maxAge: 12, difficulty: 'advanced', xp: 60, verifyType: 'film',
    isTimed: true, timerSeconds: 300 },

  { id: 24,  title: 'Read for 30 minutes then film yourself giving a 1-minute summary: what happened, what you learned and your opinion',
    icon: '📖', points: 15, completed: false, category: 'Learning', color: 'purple',
    minAge: 9, maxAge: 12, difficulty: 'advanced', xp: 60, verifyType: 'film',
    isTimed: true, timerSeconds: 1800 },

  { id: 32,  title: 'Write a story of at least 200 words with a beginning, middle and ending — film yourself reading it aloud',
    icon: '✍️', points: 15, completed: false, category: 'Creativity', color: 'pink',
    minAge: 9, maxAge: 12, difficulty: 'advanced', xp: 60, verifyType: 'film' },

  { id: 25,  title: 'Complete 20 maths problems showing all working — check and correct every mistake — parent approves',
    icon: '🔢', points: 15, completed: false, category: 'Learning', color: 'purple',
    minAge: 9, maxAge: 12, difficulty: 'advanced', xp: 60, verifyType: 'parent' },

  { id: 41,  title: 'Teach a skill to a family member: plan a 3-step lesson, then film the lesson happening',
    icon: '👨‍🏫', points: 15, completed: false, category: 'Social Skills', color: 'red',
    minAge: 10, maxAge: 12, difficulty: 'advanced', xp: 60, verifyType: 'film' },

  { id: 56,  title: 'Scrub the bathroom from top to bottom — toilet, sink, mirror and floor — film the spotless result',
    icon: '🚽', points: 15, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 10, maxAge: 12, difficulty: 'advanced', xp: 60, verifyType: 'film', supervised: true },

  { id: 17,  title: 'Do a full load of laundry: sort, wash, dry, fold and put every item away — parent approves',
    icon: '🧺', points: 15, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 10, maxAge: 12, difficulty: 'advanced', xp: 60, verifyType: 'parent', supervised: true },

  { id: 55,  title: 'Plan and cook a complete meal for the family (main + side) without help — film the finished meal',
    icon: '🍳', points: 15, completed: false, category: 'Responsibility', color: 'orange',
    minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 60, verifyType: 'film', supervised: true },
];

/**
 * Select exactly 5 quests for the day with age-appropriate difficulty mix.
 * Deterministic: same result for the same LOCAL date + age, all day long.
 *
 * Age group mixes:
 *   6–7  → 3 beginner + 2 intermediate  (no advanced — tasks are too demanding)
 *   8–10 → 2 beginner + 2 intermediate + 1 advanced
 *  11–12 → 1 beginner + 2 intermediate + 2 advanced
 */
export function getDailyQuestSelection(userAge: number, date: Date = new Date()): Quest[] {
  const seed =
    date.getFullYear() * 10000 +
    (date.getMonth() + 1) * 100 +
    date.getDate() +
    userAge * 7;

  function seededPick(arr: Quest[], n: number, offset: number): Quest[] {
    if (arr.length === 0) return [];
    const result: Quest[] = [];
    const used = new Set<number>();
    for (let i = 0; i < n; i++) {
      let idx = Math.abs((seed + offset + i * 13) % arr.length);
      let attempts = 0;
      while (used.has(idx) && attempts < arr.length) {
        idx = (idx + 1) % arr.length;
        attempts++;
      }
      if (!used.has(idx)) { used.add(idx); result.push({ ...arr[idx] }); }
    }
    return result;
  }

  const all       = QUEST_POOL.filter(q => userAge >= q.minAge && userAge <= q.maxAge);
  const beginners = all.filter(q => q.difficulty === 'beginner');
  const middles   = all.filter(q => q.difficulty === 'intermediate');
  const advanceds = all.filter(q => q.difficulty === 'advanced');

  const usedIds = new Set<number>();
  const selected: Quest[] = [];
  const addUnique = (picks: Quest[]) =>
    picks.forEach(q => { if (!usedIds.has(q.id)) { usedIds.add(q.id); selected.push(q); } });

  if (userAge <= 7) {
    // 6–7: 3 beginner + 2 intermediate, no advanced
    addUnique(seededPick(beginners, 3, 0));
    addUnique(seededPick(middles,   2, 100));
  } else if (userAge <= 10) {
    // 8–10: 2 beginner + 2 intermediate + 1 advanced
    addUnique(seededPick(advanceds, 1, 200));
    addUnique(seededPick(middles,   2, 100));
    addUnique(seededPick(beginners, 2, 0));
  } else {
    // 11–12: 1 beginner + 2 intermediate + 2 advanced
    addUnique(seededPick(advanceds, 2, 200));
    addUnique(seededPick(middles,   2, 100));
    addUnique(seededPick(beginners, 1, 0));
  }

  // Fill any remaining slots if a tier was short
  if (selected.length < 5) {
    const pool = all.filter(q => !usedIds.has(q.id));
    addUnique(seededPick(pool, 5 - selected.length, 300));
  }

  // Shuffle using the seed so order varies each day
  for (let i = selected.length - 1; i > 0; i--) {
    const j = Math.abs((seed + i * 31)) % (i + 1);
    [selected[i], selected[j]] = [selected[j], selected[i]];
  }

  return selected;
}

/**
 * Look up a single quest by its unique ID
 */
export function getQuestById(id: number): Quest | undefined {
  return QUEST_POOL.find(q => q.id === id);
}

/**
 * Get ALL age-appropriate quests (no daily limit)
 */
export function getAllAgeAppropriateQuests(userAge: number): Quest[] {
  return QUEST_POOL.filter(
    quest => userAge >= quest.minAge && userAge <= quest.maxAge
  );
}

// Legacy helpers kept for compatibility
export function shouldRefreshQuests(lastRefreshDate: Date | null): boolean {
  if (!lastRefreshDate) return true;
  const now = new Date();
  return (
    now.getDate() !== lastRefreshDate.getDate() ||
    now.getMonth() !== lastRefreshDate.getMonth() ||
    now.getFullYear() !== lastRefreshDate.getFullYear()
  );
}
export function assignDailyQuests(userAge: number): Quest[] {
  return getDailyQuestSelection(userAge);
}
