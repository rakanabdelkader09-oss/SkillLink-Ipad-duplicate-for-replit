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
  difficulty: 'easy' | 'medium' | 'hard';
  xp: number;
  /** When true, the quest detail screen shows a timer. Only for time-based tasks. */
  isTimed?: boolean;
  /** Default timer seconds when isTimed is true. */
  timerSeconds?: number;
}

// All available quests by category and difficulty
export const QUEST_POOL: Quest[] = [
  // Personal Care - Easy
  { id: 1, title: 'Brush your teeth', icon: '🪥', points: 10, completed: false, category: 'Personal Care', color: 'blue', minAge: 6, maxAge: 8, difficulty: 'easy', xp: 10 },
  { id: 2, title: 'Wash your hands', icon: '🧼', points: 10, completed: false, category: 'Personal Care', color: 'blue', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 10 },
  { id: 3, title: 'Do 5 jumping jacks', icon: '🤸', points: 10, completed: false, category: 'Personal Care', color: 'blue', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 10, isTimed: true, timerSeconds: 60 },
  { id: 42, title: 'Comb your hair', icon: '💇', points: 10, completed: false, category: 'Personal Care', color: 'blue', minAge: 6, maxAge: 8, difficulty: 'easy', xp: 10 },
  { id: 43, title: 'Put on clean clothes', icon: '👕', points: 10, completed: false, category: 'Personal Care', color: 'blue', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 10 },
  
  // Personal Care - Medium
  { id: 4, title: 'Do 10 jumping jacks', icon: '🤸', points: 15, completed: false, category: 'Personal Care', color: 'blue', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 15, isTimed: true, timerSeconds: 90 },
  { id: 5, title: 'Build a 10-piece LEGO creation', icon: '🧱', points: 15, completed: false, category: 'Creativity', color: 'pink', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 15 },
  { id: 6, title: 'Take a shower by yourself', icon: '🚿', points: 20, completed: false, category: 'Personal Care', color: 'blue', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 20 },
  { id: 44, title: 'Stretch for 5 minutes', icon: '🧘', points: 15, completed: false, category: 'Personal Care', color: 'blue', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 15, isTimed: true, timerSeconds: 300 },
  { id: 45, title: 'Go outside for 20 minutes', icon: '🌳', points: 20, completed: false, category: 'Personal Care', color: 'blue', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 20, isTimed: true, timerSeconds: 1200 },
  
  // Personal Care - Hard
  { id: 7, title: 'Do 20 jumping jacks and 10 push-ups', icon: '💪', points: 25, completed: false, category: 'Personal Care', color: 'blue', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 25, isTimed: true, timerSeconds: 180 },
  { id: 8, title: 'Create a personal hygiene checklist', icon: '📋', points: 25, completed: false, category: 'Personal Care', color: 'blue', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 25 },
  { id: 46, title: 'Exercise for 30 minutes', icon: '🏃', points: 30, completed: false, category: 'Personal Care', color: 'blue', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 30, isTimed: true, timerSeconds: 1800 },
  
  // Responsibility - Easy
  { id: 9, title: 'Make your bed', icon: '🛏️', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 10 },
  { id: 10, title: 'Put your toys away', icon: '🧸', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 8, difficulty: 'easy', xp: 10 },
  { id: 11, title: 'Put dirty clothes in hamper', icon: '👕', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 10 },
  { id: 47, title: 'Feed your pet', icon: '🐕', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 8, difficulty: 'easy', xp: 10 },
  { id: 48, title: 'Put your shoes away', icon: '👟', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 10 },
  { id: 49, title: 'Help set the table', icon: '🍽️', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 8, difficulty: 'easy', xp: 10 },
  { id: 83, title: 'Organize your room', icon: '🧹', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 8, difficulty: 'easy', xp: 10 },
  // Spec quests - Ages 6-7
  { id: 100, title: 'Set the Table', icon: '🍽️', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 10 },
  { id: 101, title: 'Tidy Up Your Toys', icon: '🧸', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 10 },
  { id: 102, title: 'Make a Simple Snack', icon: '🍎', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 10 },
  { id: 103, title: 'Sort Laundry by Color', icon: '🧺', points: 10, completed: false, category: 'Responsibility', color: 'orange', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 10 },
  
  // Responsibility - Medium
  { id: 12, title: 'Help with dishes', icon: '🍽️', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 15 },
  { id: 13, title: 'Organize your backpack', icon: '🎒', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 15 },
  { id: 14, title: 'Water the plants', icon: '🌱', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 15 },
  { id: 15, title: 'Set the table for dinner', icon: '🍽️', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 15 },
  { id: 50, title: 'Make your own healthy breakfast', icon: '🥣', points: 20, completed: false, category: 'Responsibility', color: 'orange', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 20 },
  { id: 51, title: 'Pack your school lunch', icon: '🥪', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 15 },
  { id: 52, title: 'Sweep the floor', icon: '🧹', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 15 },
  { id: 53, title: 'Take out the trash', icon: '🗑️', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 15 },
  { id: 54, title: 'Fold and put away laundry', icon: '👔', points: 20, completed: false, category: 'Responsibility', color: 'orange', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 20 },
  { id: 84, title: 'Learn basic cooking skills', icon: '👨‍🍳', points: 25, completed: false, category: 'Responsibility', color: 'orange', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 25 },
  // Spec quests - Ages 8-10
  { id: 104, title: 'Help Prepare a Meal', icon: '🍳', points: 20, completed: false, category: 'Responsibility', color: 'orange', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 20 },
  { id: 105, title: 'Plan a Healthy Snack', icon: '🥗', points: 15, completed: false, category: 'Responsibility', color: 'orange', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 15 },
  { id: 106, title: 'Homework Streak — Do Homework Without Being Asked', icon: '📚', points: 25, completed: false, category: 'Learning', color: 'purple', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 25 },
  
  // Responsibility - Hard
  { id: 16, title: 'Clean and organize your room', icon: '🏠', points: 25, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 25 },
  { id: 17, title: 'Do your own laundry', icon: '🧺', points: 30, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 30 },
  { id: 55, title: 'Help cook a full meal', icon: '🍳', points: 30, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 30 },
  { id: 56, title: 'Clean the bathroom', icon: '🚽', points: 25, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 25 },
  { id: 57, title: 'Organize the garage or storage area', icon: '📦', points: 35, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 35 },
  { id: 58, title: 'Prepare breakfast for the family', icon: '🥞', points: 35, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 35 },
  // Spec quests - Ages 11-12
  { id: 107, title: 'Cook a Meal Independently', icon: '👨‍🍳', points: 35, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 35 },
  { id: 108, title: 'Plan Your Next Day', icon: '📅', points: 25, completed: false, category: 'Learning', color: 'purple', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 25 },
  { id: 109, title: 'Lead a Household Task', icon: '🏡', points: 30, completed: false, category: 'Responsibility', color: 'orange', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 30 },
  
  // Learning - Easy
  { id: 18, title: 'Read a picture book', icon: '📚', points: 15, completed: false, category: 'Learning', color: 'purple', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 15 },
  { id: 19, title: 'Count to 20', icon: '🔢', points: 15, completed: false, category: 'Learning', color: 'purple', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 15 },
  { id: 20, title: 'Learn 2 new words', icon: '📝', points: 15, completed: false, category: 'Learning', color: 'purple', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 15 },
  { id: 59, title: 'Practice writing your name', icon: '✏️', points: 15, completed: false, category: 'Learning', color: 'purple', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 15 },
  { id: 60, title: 'Spell 5 simple words', icon: '🔤', points: 15, completed: false, category: 'Learning', color: 'purple', minAge: 6, maxAge: 8, difficulty: 'easy', xp: 15 },
  
  // Learning - Medium
  { id: 21, title: 'Read for 15 minutes', icon: '📖', points: 20, completed: false, category: 'Learning', color: 'purple', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 20, isTimed: true, timerSeconds: 900 },
  { id: 22, title: 'Practice 10 math problems', icon: '🔢', points: 25, completed: false, category: 'Learning', color: 'purple', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 25 },
  { id: 23, title: 'Learn 5 new vocabulary words', icon: '📝', points: 20, completed: false, category: 'Learning', color: 'purple', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 20 },
  { id: 61, title: 'Do homework without being asked', icon: '📚', points: 25, completed: false, category: 'Learning', color: 'purple', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 25 },
  { id: 62, title: 'Practice multiplication tables', icon: '✖️', points: 20, completed: false, category: 'Learning', color: 'purple', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 20 },
  { id: 63, title: 'Watch an educational video', icon: '📺', points: 15, completed: false, category: 'Learning', color: 'purple', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 15 },
  
  // Learning - Hard
  { id: 24, title: 'Read for 30 minutes', icon: '📖', points: 30, completed: false, category: 'Learning', color: 'purple', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 30, isTimed: true, timerSeconds: 1800 },
  { id: 25, title: 'Complete 20 math problems', icon: '🔢', points: 35, completed: false, category: 'Learning', color: 'purple', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 35 },
  { id: 64, title: 'Write a book report', icon: '📝', points: 40, completed: false, category: 'Learning', color: 'purple', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 40 },
  { id: 65, title: 'Research and present a topic', icon: '🔬', points: 35, completed: false, category: 'Learning', color: 'purple', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 35 },
  { id: 66, title: 'Complete all homework for the week', icon: '📚', points: 40, completed: false, category: 'Learning', color: 'purple', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 40 },
  
  // Creativity - Easy
  { id: 26, title: 'Color a picture', icon: '🖍️', points: 15, completed: false, category: 'Creativity', color: 'pink', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 15 },
  { id: 27, title: 'Sing your favorite song', icon: '🎵', points: 15, completed: false, category: 'Creativity', color: 'pink', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 15 },
  { id: 28, title: 'Fold a paper plane', icon: '✈️', points: 15, completed: false, category: 'Creativity', color: 'pink', minAge: 6, maxAge: 8, difficulty: 'easy', xp: 15 },
  { id: 67, title: 'Dance to your favorite song', icon: '💃', points: 15, completed: false, category: 'Creativity', color: 'pink', minAge: 6, maxAge: 8, difficulty: 'easy', xp: 15 },
  { id: 68, title: 'Make a card for someone', icon: '💌', points: 15, completed: false, category: 'Creativity', color: 'pink', minAge: 6, maxAge: 8, difficulty: 'easy', xp: 15 },
  
  // Creativity - Medium
  { id: 29, title: 'Draw your favorite animal', icon: '🎨', points: 20, completed: false, category: 'Creativity', color: 'pink', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 20 },
  { id: 30, title: 'Write a short poem', icon: '✍️', points: 25, completed: false, category: 'Creativity', color: 'pink', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 25 },
  { id: 31, title: 'Make a craft project', icon: '✂️', points: 25, completed: false, category: 'Creativity', color: 'pink', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 25 },
  { id: 69, title: 'Practice a musical instrument for 15 minutes', icon: '🎸', points: 20, completed: false, category: 'Creativity', color: 'pink', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 20, isTimed: true, timerSeconds: 900 },
  { id: 110, title: 'Speed Drawing — Draw an animal in 60 seconds', icon: '⚡', points: 20, completed: false, category: 'Creativity', color: 'pink', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 20, isTimed: true, timerSeconds: 60 },
  { id: 111, title: 'Complete a full drawing', icon: '🖼️', points: 20, completed: false, category: 'Creativity', color: 'pink', minAge: 6, maxAge: 10, difficulty: 'easy', xp: 20 },
  { id: 70, title: 'Create a comic strip', icon: '📖', points: 25, completed: false, category: 'Creativity', color: 'pink', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 25 },
  { id: 71, title: 'Design and build something with recycled materials', icon: '♻️', points: 25, completed: false, category: 'Creativity', color: 'pink', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 25 },
  
  // Creativity - Hard
  { id: 32, title: 'Write a short story (200+ words)', icon: '✍️', points: 35, completed: false, category: 'Creativity', color: 'pink', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 35 },
  { id: 33, title: 'Create an original art piece', icon: '🎨', points: 35, completed: false, category: 'Creativity', color: 'pink', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 35 },
  { id: 72, title: 'Practice an instrument for 30 minutes', icon: '🎹', points: 30, completed: false, category: 'Creativity', color: 'pink', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 30, isTimed: true, timerSeconds: 1800 },
  { id: 73, title: 'Choreograph a dance routine', icon: '💃', points: 35, completed: false, category: 'Creativity', color: 'pink', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 35 },
  { id: 74, title: 'Create a video or animation', icon: '🎬', points: 40, completed: false, category: 'Creativity', color: 'pink', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 40 },
  
  // Social Skills - Easy
  { id: 34, title: 'Give someone a hug', icon: '🤗', points: 10, completed: false, category: 'Social Skills', color: 'red', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 10 },
  { id: 35, title: 'Say "please" and "thank you"', icon: '💝', points: 10, completed: false, category: 'Social Skills', color: 'red', minAge: 6, maxAge: 7, difficulty: 'easy', xp: 10 },
  { id: 36, title: 'Share a toy with someone', icon: '🎁', points: 15, completed: false, category: 'Social Skills', color: 'red', minAge: 6, maxAge: 8, difficulty: 'easy', xp: 15 },
  { id: 75, title: 'Smile at 5 people today', icon: '😊', points: 10, completed: false, category: 'Social Skills', color: 'red', minAge: 6, maxAge: 8, difficulty: 'easy', xp: 10 },
  { id: 76, title: 'Make someone laugh', icon: '😂', points: 15, completed: false, category: 'Social Skills', color: 'red', minAge: 6, maxAge: 8, difficulty: 'easy', xp: 15 },
  
  // Social Skills - Medium
  { id: 37, title: 'Say something kind to 3 people', icon: '💝', points: 15, completed: false, category: 'Social Skills', color: 'red', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 15 },
  { id: 38, title: 'Help a family member', icon: '🤝', points: 20, completed: false, category: 'Social Skills', color: 'red', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 20 },
  { id: 39, title: 'Play nicely with siblings', icon: '👫', points: 15, completed: false, category: 'Social Skills', color: 'red', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 15 },
  { id: 77, title: 'Write a thank you note', icon: '✉️', points: 20, completed: false, category: 'Social Skills', color: 'red', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 20 },
  { id: 78, title: 'Call or video chat with a relative', icon: '📞', points: 15, completed: false, category: 'Social Skills', color: 'red', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 15 },
  { id: 79, title: 'Include someone who feels left out', icon: '🫂', points: 20, completed: false, category: 'Social Skills', color: 'red', minAge: 8, maxAge: 10, difficulty: 'medium', xp: 20 },
  
  // Social Skills - Hard
  { id: 40, title: 'Resolve a conflict peacefully', icon: '🕊️', points: 30, completed: false, category: 'Social Skills', color: 'red', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 30 },
  { id: 41, title: 'Teach someone something new', icon: '👨‍🏫', points: 30, completed: false, category: 'Social Skills', color: 'red', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 30 },
  { id: 80, title: 'Volunteer or do community service', icon: '🌍', points: 40, completed: false, category: 'Social Skills', color: 'red', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 40 },
  { id: 81, title: 'Have a meaningful conversation with a parent', icon: '💬', points: 25, completed: false, category: 'Social Skills', color: 'red', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 25 },
  { id: 82, title: 'Stand up for someone being treated unfairly', icon: '⚖️', points: 35, completed: false, category: 'Social Skills', color: 'red', minAge: 11, maxAge: 12, difficulty: 'hard', xp: 35 },
];

/**
 * Assigns daily quests to a child based on their age
 * Returns 3-5 quests balanced across categories
 */
export function assignDailyQuests(userAge: number, date: Date = new Date()): Quest[] {
  // Filter quests appropriate for the user's age
  const ageAppropriateQuests = QUEST_POOL.filter(
    quest => userAge >= quest.minAge && userAge <= quest.maxAge
  );

  // Group by category
  const questsByCategory: Record<string, Quest[]> = {};
  ageAppropriateQuests.forEach(quest => {
    if (!questsByCategory[quest.category]) {
      questsByCategory[quest.category] = [];
    }
    questsByCategory[quest.category].push(quest);
  });

  // Determine number of quests based on age
  const questCount = userAge <= 7 ? 3 : userAge <= 9 ? 4 : 5;
  
  const categories = Object.keys(questsByCategory);
  const assignedQuests: Quest[] = [];
  
  // Use date as seed for consistent daily quests
  const seed = date.getDate() + date.getMonth() * 31 + userAge;
  
  // Select quests ensuring variety across categories
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
 * Use this when you want kids to choose from all available quests
 */
export function getAllAgeAppropriateQuests(userAge: number): Quest[] {
  return QUEST_POOL.filter(
    quest => userAge >= quest.minAge && userAge <= quest.maxAge
  );
}

/**
 * Look up a single quest by its unique ID — the canonical source of truth
 * for quest content. Used by the quest detail screen to ensure clicking
 * a quest card always opens its own page (no cross-linked routing).
 */
export function getQuestById(id: number): Quest | undefined {
  return QUEST_POOL.find(q => q.id === id);
}