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
  /** When true, the quest detail screen shows a timer. Only for time-based tasks. */
  isTimed?: boolean;
  /** Default timer seconds when isTimed is true. */
  timerSeconds?: number;
}

// SC rewards per difficulty tier
export const DIFFICULTY_SC: Record<Quest['difficulty'], number> = {
  beginner: 5,
  intermediate: 10,
  advanced: 15,
};

// All available quests by category and difficulty
export const QUEST_POOL: Quest[] = [
  // ── Personal Care ──────────────────────────────────────────────────────────
  // Ages 6-8 · Beginner
  { id: 1,  title: 'Brush your teeth',             icon: '🪥', points: 5,  completed: false, category: 'Personal Care', color: 'blue',   minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 2,  title: 'Wash your hands',              icon: '🧼', points: 5,  completed: false, category: 'Personal Care', color: 'blue',   minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 3,  title: 'Do 5 jumping jacks',           icon: '🤸', points: 5,  completed: false, category: 'Personal Care', color: 'blue',   minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5, isTimed: true, timerSeconds: 60 },
  { id: 42, title: 'Comb your hair',               icon: '💇', points: 5,  completed: false, category: 'Personal Care', color: 'blue',   minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 43, title: 'Put on clean clothes',         icon: '👕', points: 5,  completed: false, category: 'Personal Care', color: 'blue',   minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  // Ages 8-10 · Intermediate
  { id: 4,  title: 'Do 10 jumping jacks',          icon: '🤸', points: 10, completed: false, category: 'Personal Care', color: 'blue',   minAge: 8, maxAge: 10, difficulty: 'intermediate', xp: 10, isTimed: true, timerSeconds: 90 },
  { id: 44, title: 'Stretch for 5 minutes',        icon: '🧘', points: 10, completed: false, category: 'Personal Care', color: 'blue',   minAge: 8, maxAge: 10, difficulty: 'intermediate', xp: 10, isTimed: true, timerSeconds: 300 },
  { id: 45, title: 'Go outside for 20 minutes',    icon: '🌳', points: 10, completed: false, category: 'Personal Care', color: 'blue',   minAge: 8, maxAge: 10, difficulty: 'intermediate', xp: 10, isTimed: true, timerSeconds: 1200 },
  // Ages 11-12 · Advanced
  { id: 7,  title: 'Do 20 jumping jacks & 10 push-ups', icon: '💪', points: 15, completed: false, category: 'Personal Care', color: 'blue', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15, isTimed: true, timerSeconds: 180 },
  { id: 8,  title: 'Create a personal hygiene checklist', icon: '📋', points: 15, completed: false, category: 'Personal Care', color: 'blue', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 46, title: 'Exercise for 30 minutes',      icon: '🏃', points: 15, completed: false, category: 'Personal Care', color: 'blue',   minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15, isTimed: true, timerSeconds: 1800 },

  // ── Responsibility ─────────────────────────────────────────────────────────
  // Ages 6-8 · Beginner
  { id: 9,  title: 'Make your bed',                icon: '🛏️', points: 5,  completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 10, title: 'Put your toys away',           icon: '🧸', points: 5,  completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 11, title: 'Put dirty clothes in hamper',  icon: '👕', points: 5,  completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 47, title: 'Feed your pet',                icon: '🐕', points: 5,  completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 48, title: 'Put your shoes away',          icon: '👟', points: 5,  completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 49, title: 'Help set the table',           icon: '🍽️', points: 5,  completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 83, title: 'Organize your room',           icon: '🧹', points: 5,  completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 100, title: 'Set the Table',               icon: '🍽️', points: 5,  completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 101, title: 'Tidy Up Your Toys',           icon: '🧸', points: 5,  completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 102, title: 'Make a Simple Snack',         icon: '🍎', points: 5,  completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 103, title: 'Sort Laundry by Color',       icon: '🧺', points: 5,  completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  // Ages 9-10 · Intermediate
  { id: 12, title: 'Help with dishes',             icon: '🍽️', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 13, title: 'Organize your backpack',       icon: '🎒', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 14, title: 'Water the plants',             icon: '🌱', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 15, title: 'Set the table for dinner',     icon: '🍽️', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 53, title: 'Take out the trash',           icon: '🗑️', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 54, title: 'Fold and put away laundry',    icon: '👔', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 104, title: 'Help Prepare a Meal',         icon: '🍳', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 105, title: 'Plan a Healthy Snack',        icon: '🥗', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  // Ages 11-12 · Advanced
  { id: 16, title: 'Deep-clean your room: vacuum, dust all surfaces, organize wardrobe & make bed with fresh sheets', icon: '🏠', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 17, title: 'Do a full load of laundry: sort, wash, dry, fold and put away every item without help', icon: '🧺', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 55, title: 'Plan and cook a complete dinner for the family with main + side dish — no help allowed', icon: '🍳', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 56, title: 'Scrub the bathroom top-to-bottom: toilet, sink, mirror, and floor — leave it spotless', icon: '🚽', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 57, title: 'Sort and organize a cluttered storage area — label or group everything so it stays tidy', icon: '📦', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 58, title: 'Plan and prepare a full breakfast for the whole family: 3+ items, cooked and plated neatly', icon: '🥞', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 107, title: 'Cook a Meal Independently',   icon: '👨‍🍳', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 109, title: 'Lead a Household Task',       icon: '🏡', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },

  // ── Learning ───────────────────────────────────────────────────────────────
  // Ages 6-8 · Beginner
  { id: 18, title: 'Read a picture book',          icon: '📚', points: 5,  completed: false, category: 'Learning', color: 'purple', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 19, title: 'Count to 20',                  icon: '🔢', points: 5,  completed: false, category: 'Learning', color: 'purple', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 20, title: 'Learn 2 new words',            icon: '📝', points: 5,  completed: false, category: 'Learning', color: 'purple', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 59, title: 'Practice writing your name',   icon: '✏️', points: 5,  completed: false, category: 'Learning', color: 'purple', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 60, title: 'Spell 5 simple words',         icon: '🔤', points: 5,  completed: false, category: 'Learning', color: 'purple', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  // Ages 9-10 · Intermediate
  { id: 21, title: 'Read for 15 minutes',          icon: '📖', points: 10, completed: false, category: 'Learning', color: 'purple', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10, isTimed: true, timerSeconds: 900 },
  { id: 22, title: 'Practice 10 math problems',    icon: '🔢', points: 10, completed: false, category: 'Learning', color: 'purple', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 23, title: 'Learn 5 new vocabulary words', icon: '📝', points: 10, completed: false, category: 'Learning', color: 'purple', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 61, title: 'Do homework without being asked', icon: '📚', points: 10, completed: false, category: 'Learning', color: 'purple', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 62, title: 'Practice multiplication tables', icon: '✖️', points: 10, completed: false, category: 'Learning', color: 'purple', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 106, title: 'Homework Streak — no reminders!', icon: '📚', points: 10, completed: false, category: 'Learning', color: 'purple', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  // Ages 11-12 · Advanced
  { id: 24, title: 'Read for 30 minutes then write a 5-sentence summary: what happened, what you learned, and your opinion', icon: '📖', points: 15, completed: false, category: 'Learning', color: 'purple', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15, isTimed: true, timerSeconds: 1800 },
  { id: 25, title: 'Complete 20 math problems showing all working — check every answer and correct any mistakes', icon: '🔢', points: 15, completed: false, category: 'Learning', color: 'purple', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 64, title: 'Write a detailed book report: characters, plot, your favourite moment and why you recommend (or not) this book', icon: '📝', points: 15, completed: false, category: 'Learning', color: 'purple', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 65, title: 'Research a topic for 30 minutes and create a visual summary (poster or slides) with 5+ facts', icon: '🔬', points: 15, completed: false, category: 'Learning', color: 'purple', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 66, title: 'Finish ALL homework for the day without reminders — then review it for mistakes before putting it away', icon: '📚', points: 15, completed: false, category: 'Learning', color: 'purple', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 108, title: 'Plan Your Next Day',          icon: '📅', points: 15, completed: false, category: 'Learning', color: 'purple', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },

  // ── Creativity ─────────────────────────────────────────────────────────────
  // Ages 6-8 · Beginner
  { id: 26, title: 'Color a picture',              icon: '🖍️', points: 5,  completed: false, category: 'Creativity', color: 'pink', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 27, title: 'Sing your favorite song',      icon: '🎵', points: 5,  completed: false, category: 'Creativity', color: 'pink', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 28, title: 'Fold a paper plane',           icon: '✈️', points: 5,  completed: false, category: 'Creativity', color: 'pink', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 67, title: 'Dance to your favorite song',  icon: '💃', points: 5,  completed: false, category: 'Creativity', color: 'pink', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 68, title: 'Make a card for someone',      icon: '💌', points: 5,  completed: false, category: 'Creativity', color: 'pink', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 111, title: 'Complete a full drawing',     icon: '🖼️', points: 5,  completed: false, category: 'Creativity', color: 'pink', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  // Ages 9-10 · Intermediate
  { id: 29, title: 'Draw your favorite animal',    icon: '🎨', points: 10, completed: false, category: 'Creativity', color: 'pink', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 30, title: 'Write a short poem',           icon: '✍️', points: 10, completed: false, category: 'Creativity', color: 'pink', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 31, title: 'Make a craft project',         icon: '✂️', points: 10, completed: false, category: 'Creativity', color: 'pink', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 69, title: 'Practice an instrument for 15 min', icon: '🎸', points: 10, completed: false, category: 'Creativity', color: 'pink', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10, isTimed: true, timerSeconds: 900 },
  { id: 70, title: 'Create a comic strip',         icon: '📖', points: 10, completed: false, category: 'Creativity', color: 'pink', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 71, title: 'Build something from recycled materials', icon: '♻️', points: 10, completed: false, category: 'Creativity', color: 'pink', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 110, title: 'Speed Drawing — animal in 60 sec', icon: '⚡', points: 10, completed: false, category: 'Creativity', color: 'pink', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10, isTimed: true, timerSeconds: 60 },
  // Ages 11-12 · Advanced
  { id: 32, title: 'Write a short story (300+ words) with a clear beginning, middle and ending — include vivid description and dialogue', icon: '✍️', points: 15, completed: false, category: 'Creativity', color: 'pink', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 33, title: 'Create an original art piece', icon: '🎨', points: 15, completed: false, category: 'Creativity', color: 'pink', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 72, title: 'Practice an instrument for 30 min', icon: '🎹', points: 15, completed: false, category: 'Creativity', color: 'pink', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15, isTimed: true, timerSeconds: 1800 },
  { id: 73, title: 'Choreograph a dance routine', icon: '💃', points: 15, completed: false, category: 'Creativity', color: 'pink', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 74, title: 'Create a video or animation',  icon: '🎬', points: 15, completed: false, category: 'Creativity', color: 'pink', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },

  // ── Social Skills ──────────────────────────────────────────────────────────
  // Ages 6-8 · Beginner
  { id: 34, title: 'Give someone a hug',           icon: '🤗', points: 5,  completed: false, category: 'Social Skills', color: 'red', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 35, title: 'Say "please" and "thank you"', icon: '💝', points: 5,  completed: false, category: 'Social Skills', color: 'red', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 36, title: 'Share a toy with someone',     icon: '🎁', points: 5,  completed: false, category: 'Social Skills', color: 'red', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 75, title: 'Smile at 5 people today',      icon: '😊', points: 5,  completed: false, category: 'Social Skills', color: 'red', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  { id: 76, title: 'Make someone laugh',           icon: '😂', points: 5,  completed: false, category: 'Social Skills', color: 'red', minAge: 6, maxAge: 8, difficulty: 'beginner', xp: 5 },
  // Ages 9-10 · Intermediate
  { id: 37, title: 'Say something kind to 3 people', icon: '💝', points: 10, completed: false, category: 'Social Skills', color: 'red', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 38, title: 'Help a family member',         icon: '🤝', points: 10, completed: false, category: 'Social Skills', color: 'red', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 39, title: 'Play nicely with siblings',    icon: '👫', points: 10, completed: false, category: 'Social Skills', color: 'red', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 77, title: 'Write a thank you note',       icon: '✉️', points: 10, completed: false, category: 'Social Skills', color: 'red', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 78, title: 'Call or video chat with a relative', icon: '📞', points: 10, completed: false, category: 'Social Skills', color: 'red', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  { id: 79, title: 'Include someone who feels left out', icon: '🫂', points: 10, completed: false, category: 'Social Skills', color: 'red', minAge: 9, maxAge: 10, difficulty: 'intermediate', xp: 10 },
  // Ages 11-12 · Advanced
  { id: 40, title: 'Solve a real disagreement with a sibling or friend — explain the steps you took and how both people felt afterwards', icon: '🕊️', points: 15, completed: false, category: 'Social Skills', color: 'red', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 41, title: 'Teach a family member something new: prepare a mini-lesson with 3 clear steps and practice until they understand', icon: '👨‍🏫', points: 15, completed: false, category: 'Social Skills', color: 'red', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 80, title: 'Do 30 minutes of community service or volunteering — describe what you did and how it helped others', icon: '🌍', points: 15, completed: false, category: 'Social Skills', color: 'red', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 81, title: 'Have a 10-minute conversation with a parent or grandparent — ask 5 thoughtful questions and really listen to the answers', icon: '💬', points: 15, completed: false, category: 'Social Skills', color: 'red', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
  { id: 82, title: 'Notice someone being treated unfairly and take a real action to help — tell a trusted adult or speak up respectfully', icon: '⚖️', points: 15, completed: false, category: 'Social Skills', color: 'red', minAge: 11, maxAge: 12, difficulty: 'advanced', xp: 15 },
];

/**
 * Assigns daily quests to a child based on their age
 * Returns 3-5 quests balanced across categories
 */
export function assignDailyQuests(userAge: number, date: Date = new Date()): Quest[] {
  const ageAppropriateQuests = QUEST_POOL.filter(
    quest => userAge >= quest.minAge && userAge <= quest.maxAge
  );

  const questsByCategory: Record<string, Quest[]> = {};
  ageAppropriateQuests.forEach(quest => {
    if (!questsByCategory[quest.category]) {
      questsByCategory[quest.category] = [];
    }
    questsByCategory[quest.category].push(quest);
  });

  const questCount = userAge <= 7 ? 3 : userAge <= 9 ? 4 : 5;
  const categories = Object.keys(questsByCategory);
  const assignedQuests: Quest[] = [];
  const seed = date.getDate() + date.getMonth() * 31 + userAge;

  for (let i = 0; i < questCount; i++) {
    const categoryIndex = (seed + i) % categories.length;
    const category = categories[categoryIndex];
    const categoryQuests = questsByCategory[category];
    if (categoryQuests && categoryQuests.length > 0) {
      const questIndex = (seed + i * 7) % categoryQuests.length;
      const quest = { ...categoryQuests[questIndex] };
      assignedQuests.push(quest);
    }
  }

  return assignedQuests;
}

/**
 * Check if quests should be refreshed (new day)
 */
export function shouldRefreshQuests(lastRefreshDate: Date | null): boolean {
  if (!lastRefreshDate) return true;
  const now = new Date();
  return (
    now.getDate() !== lastRefreshDate.getDate() ||
    now.getMonth() !== lastRefreshDate.getMonth() ||
    now.getFullYear() !== lastRefreshDate.getFullYear()
  );
}

/**
 * Get ALL age-appropriate quests (no daily limit)
 */
export function getAllAgeAppropriateQuests(userAge: number): Quest[] {
  return QUEST_POOL.filter(
    quest => userAge >= quest.minAge && userAge <= quest.maxAge
  );
}

/**
 * Select exactly 5 quests for the day with mixed difficulty.
 * Deterministic: same result for the same date + age, all day long.
 * Mix: up to 1 advanced + up to 2 intermediate + rest beginner.
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

  const all = QUEST_POOL.filter(q => userAge >= q.minAge && userAge <= q.maxAge);
  const beginners     = all.filter(q => q.difficulty === 'beginner');
  const intermediates = all.filter(q => q.difficulty === 'intermediate');
  const advanceds     = all.filter(q => q.difficulty === 'advanced');

  const usedIds = new Set<number>();
  const selected: Quest[] = [];
  const addUnique = (picks: Quest[]) =>
    picks.forEach(q => { if (!usedIds.has(q.id)) { usedIds.add(q.id); selected.push(q); } });

  addUnique(seededPick(advanceds,     1, 200));
  addUnique(seededPick(intermediates, 2, 100));
  addUnique(seededPick(beginners,     2,   0));

  // Fill remaining slots if a tier was empty
  if (selected.length < 5) {
    const pool = all.filter(q => !usedIds.has(q.id));
    addUnique(seededPick(pool, 5 - selected.length, 300));
  }

  // Shuffle using seed so order varies each day
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
 * Get today's date key for localStorage tracking (YYYY-MM-DD)
 */
export function getTodayKey(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Get daily completed count from localStorage
 */
export function getDailyCompletedCount(): number {
  const key = `skilllink-daily-count-${getTodayKey()}`;
  return parseInt(localStorage.getItem(key) || '0', 10);
}

/**
 * Increment daily completed count in localStorage
 */
export function incrementDailyCompletedCount(): number {
  const key = `skilllink-daily-count-${getTodayKey()}`;
  const current = parseInt(localStorage.getItem(key) || '0', 10);
  const next = current + 1;
  localStorage.setItem(key, String(next));
  return next;
}
