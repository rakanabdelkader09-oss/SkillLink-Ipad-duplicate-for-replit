import { useState, useEffect } from "react";
import { OnboardingScreen } from "./components/OnboardingScreen";
import { AuthScreen } from "./components/AuthScreen";
import { UserProfile } from "./components/ProfileSetupScreen";
import { HomeScreen } from "./components/HomeScreen";
import { DailyQuestScreen } from "./components/DailyQuestScreen";
import { BadgesScreen } from "./components/BadgesScreen";
import { LeaderboardScreen } from "./components/LeaderboardScreen";
import { MessagingScreen } from "./components/MessagingScreen";
import { ParentDashboardScreen } from "./components/ParentDashboardScreen";
import { CharacterCustomizationScreen } from "./components/CharacterCustomizationScreen";
import { ProfilePhotoScreen } from "./components/ProfilePhotoScreen";
import { ShopScreen } from "./components/ShopScreen";
import { CoursesScreen } from "./components/CoursesScreen";
import { CourseListScreen } from "./components/CourseListScreen";
import { CourseDetailScreen } from "./components/CourseDetailScreen";
import { QuestDetailScreen } from "./components/QuestDetailScreen";
import { AchievementDetailScreen } from "./components/AchievementDetailScreen";
import { ChildProfileScreen } from "./components/ChildProfileScreen";
import { ChallengeModeScreen } from "./components/ChallengeModeScreen";
import { VideoReviewScreen } from "./components/VideoReviewScreen";
import { SettingsScreen } from "./components/SettingsScreen";
import { SubscriptionScreen } from "./components/SubscriptionScreen";
import { CreatorDashboardScreen, CreatorCourse } from "./components/CreatorDashboardScreen";
import { CourseCreatorScreen, CourseData } from "./components/CourseCreatorScreen";
import { CourseAnalyticsScreen } from "./components/CourseAnalyticsScreen";
import { SkillTreeScreen, SkillLevels } from "./components/SkillTreeScreen";
import { getCurrentWeekEvent } from "./components/WeeklyEventBanner";
import { BottomNav } from "./components/BottomNav";
import { StatisticsScreen } from "./components/StatisticsScreen";
import { PaperCraftsScreen } from "./components/PaperCraftsScreen";
import { CleanRoomQuestScreen } from "./components/CleanRoomQuestScreen";

type Screen =
  | "onboarding"
  | "auth"
  | "home"
  | "quests"
  | "quest-detail"
  | "challenge-mode"
  | "badges"
  | "badge-detail"
  | "leaderboard"
  | "messages"
  | "profile"
  | "shop"
  | "skill-tree"
  | "parent"
  | "child-profile"
  | "video-reviews"
  | "courses"
  | "course-list"
  | "course-detail"
  | "settings"
  | "games"
  | "quiz"
  | "creator"
  | "creator-course-create"
  | "creator-course-edit"
  | "creator-course-analytics"
  | "subscription"
  | "statistics"
  | "paper-crafts"
  | "clean-room-quest";

type UserType = "kid" | "parent" | "creator" | null;

interface VideoSubmission {
  id: string;
  questId: number;
  questTitle: string;
  questIcon: string;
  questPoints: number;
  childName: string;
  challengedWith: string[];
  videoFileName: string;
  videoFile?: File;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}

export default function App() {
  const [currentScreen, setCurrentScreen] =
    useState<Screen>("onboarding");
  const [userType, setUserType] = useState<UserType>(null);
  const [userProfile, setUserProfile] =
    useState<UserProfile | null>(null);
  const [userPoints, setUserPoints] = useState<number>(1247);
  const [selectedCategory, setSelectedCategory] =
    useState<string>("");
  const [selectedCourseId, setSelectedCourseId] =
    useState<string>("");
  const [selectedQuestId, setSelectedQuestId] =
    useState<number>(1);
  const [selectedBadgeId, setSelectedBadgeId] =
    useState<number>(1);
  const [screenHistory, setScreenHistory] = useState<Screen[]>(
    [],
  );
  const [dailyQuests, setDailyQuests] = useState<any[]>([]);
  const [videoSubmissions, setVideoSubmissions] = useState<VideoSubmission[]>([]);

  // Creator State
  const [creatorCourses, setCreatorCourses] = useState<CreatorCourse[]>([]);
  const [selectedCreatorCourseId, setSelectedCreatorCourseId] = useState<string>("");
  const [editingCourse, setEditingCourse] = useState<CourseData | undefined>(undefined);

  // Settings State
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const saved = localStorage.getItem("skilllink-theme");
    return (saved as "light" | "dark") || "light";
  });
  const [colorTheme, setColorTheme] = useState<string>(() => {
    return localStorage.getItem("skilllink-color-theme") || "blue";
  });
  const [language, setLanguage] = useState<string>(() => {
    return localStorage.getItem("skilllink-language") || "en";
  });

  // Skill Tree System
  const [skillLevels, setSkillLevels] = useState<SkillLevels>({
    "Personal Care": { xp: 85, level: 3, streak: 5 },
    Responsibility: { xp: 120, level: 4, streak: 3 },
    Learning: { xp: 210, level: 6, streak: 7 },
    Creativity: { xp: 65, level: 2, streak: 2 },
    "Social Skills": { xp: 140, level: 5, streak: 4 },
  });

  // Color theme configurations
  const colorThemes = {
    blue: {
      light: "#2563eb",
      dark: "#3b82f6",
      lightForeground: "#ffffff",
      darkForeground: "#1e293b",
    },
    purple: {
      light: "#7c3aed",
      dark: "#8b5cf6",
      lightForeground: "#ffffff",
      darkForeground: "#1e293b",
    },
    pink: {
      light: "#db2777",
      dark: "#ec4899",
      lightForeground: "#ffffff",
      darkForeground: "#1e293b",
    },
    green: {
      light: "#059669",
      dark: "#10b981",
      lightForeground: "#ffffff",
      darkForeground: "#1e293b",
    },
    orange: {
      light: "#ea580c",
      dark: "#f97316",
      lightForeground: "#ffffff",
      darkForeground: "#1e293b",
    },
  };

  // Apply theme to document
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("skilllink-theme", theme);
  }, [theme]);

  // Apply color theme
  useEffect(() => {
    const root = document.documentElement;
    const colors = colorThemes[colorTheme as keyof typeof colorThemes] || colorThemes.blue;
    
    if (theme === "dark") {
      root.style.setProperty("--primary", colors.dark);
      root.style.setProperty("--primary-foreground", colors.lightForeground);
    } else {
      root.style.setProperty("--primary", colors.light);
      root.style.setProperty("--primary-foreground", colors.lightForeground);
    }
    
    localStorage.setItem("skilllink-color-theme", colorTheme);
  }, [colorTheme, theme]);

  // Save language preference
  useEffect(() => {
    localStorage.setItem("skilllink-language", language);
  }, [language]);

  // Weekly Event
  const currentWeekEvent = getCurrentWeekEvent();

  const addXPToSkill = (category: string, xpAmount: number) => {
    setSkillLevels((prev) => {
      const skill = prev[category as keyof SkillLevels];
      const newXP = skill.xp + xpAmount;
      const newLevel = Math.floor(newXP / 100);

      return {
        ...prev,
        [category]: {
          ...skill,
          xp: newXP,
          level: newLevel,
        },
      };
    });
  };

  const getQuestData = (
    questId: number,
    userAge: number = 9,
  ) => {
    const questDataMap: Record<number, any> = {
      // Personal Care - Easy
      1: {
        title: "Brush your teeth",
        icon: "🪥",
        points: 10,
        instructions: [
          "Get your toothbrush and toothpaste",
          "Put a pea-sized amount on the brush",
          "Brush all your teeth",
          "Rinse your mouth",
          "Put everything away",
        ],
        tips: "Brush twice a day!",
        color: "from-blue-400 to-blue-500",
        difficulty: "easy",
        category: "Personal Care",
        xp: 10,
      },
      2: {
        title: "Wash your hands",
        icon: "🧼",
        points: 10,
        instructions: [
          "Turn on the water",
          "Get your hands wet",
          "Use soap and scrub for 20 seconds",
          "Rinse off all the soap",
          "Dry with a towel",
        ],
        tips: "Sing a song while you wash!",
        color: "from-blue-400 to-blue-500",
        difficulty: "easy",
        category: "Personal Care",
        xp: 10,
      },
      3: {
        title: "Do 5 jumping jacks",
        icon: "🤸",
        points: 10,
        instructions: [
          "Stand with feet together",
          "Jump and spread feet, raise arms",
          "Jump back to starting position",
          "Count to 5!",
          "Great job!",
        ],
        tips: "Count out loud!",
        color: "from-blue-400 to-blue-500",
        difficulty: "easy",
        category: "Personal Care",
        xp: 10,
      },

      // Personal Care - Medium
      4: {
        title: "Do 10 jumping jacks",
        icon: "🤸",
        points: 15,
        instructions: [
          "Stand up straight",
          "Jump and spread your feet while raising arms above head",
          "Jump back to starting position",
          "Do this 10 times",
          "Take a deep breath when done",
        ],
        tips: "Keep a steady rhythm!",
        color: "from-blue-400 to-blue-500",
        difficulty: "medium",
        category: "Personal Care",
        xp: 15,
      },
      5: {
        title: "Drink 4 glasses of water",
        icon: "💧",
        points: 15,
        instructions: [
          "Get a clean glass",
          "Fill it with water",
          "Drink slowly throughout the day",
          "Refill and repeat 4 times total",
          "Track each glass you drink",
        ],
        tips: "Staying hydrated helps you focus!",
        color: "from-blue-400 to-blue-500",
        difficulty: "medium",
        category: "Personal Care",
        xp: 15,
      },
      6: {
        title: "Take a shower by yourself",
        icon: "🚿",
        points: 20,
        instructions: [
          "Get your towel and clean clothes ready",
          "Turn on water to a comfortable temperature",
          "Wash your hair and body thoroughly",
          "Rinse off all the soap",
          "Dry off and get dressed",
        ],
        tips: "Ask for help if needed!",
        color: "from-blue-400 to-blue-500",
        difficulty: "medium",
        category: "Personal Care",
        xp: 20,
      },

      // Personal Care - Hard
      7: {
        title: "Do 20 jumping jacks and 10 push-ups",
        icon: "💪",
        points: 25,
        instructions: [
          "Warm up with light stretching",
          "Complete 20 jumping jacks with good form",
          "Rest for 30 seconds",
          "Do 10 push-ups (knees down if needed)",
          "Cool down with stretches",
        ],
        tips: "Focus on proper form!",
        color: "from-blue-400 to-blue-500",
        difficulty: "hard",
        category: "Personal Care",
        xp: 25,
      },
      8: {
        title: "Create a personal hygiene checklist",
        icon: "📋",
        points: 25,
        instructions: [
          "Think about daily hygiene tasks",
          "Write or draw a morning routine checklist",
          "Include brushing teeth, washing face, etc.",
          "Make an evening routine checklist too",
          "Decorate it and hang it up",
        ],
        tips: "Make it colorful and fun!",
        color: "from-blue-400 to-blue-500",
        difficulty: "hard",
        category: "Personal Care",
        xp: 25,
      },

      // Responsibility - Easy
      9: {
        title: "Make your bed",
        icon: "🛏️",
        points: 10,
        instructions: [
          "Pull up your sheets",
          "Straighten your blanket",
          "Arrange your pillow",
          "Make it look neat",
          "Great job!",
        ],
        tips: "Do this every morning!",
        color: "from-orange-400 to-orange-500",
        difficulty: "easy",
        category: "Responsibility",
        xp: 10,
      },
      10: {
        title: "Put your toys away",
        icon: "🧸",
        points: 10,
        instructions: [
          "Pick up your toys",
          "Put each toy in its place",
          "Make your play area tidy",
          "Check under furniture",
          "All done!",
        ],
        tips: "Make cleanup fun!",
        color: "from-orange-400 to-orange-500",
        difficulty: "easy",
        category: "Responsibility",
        xp: 10,
      },
      11: {
        title: "Put dirty clothes in hamper",
        icon: "👕",
        points: 10,
        instructions: [
          "Find your dirty clothes",
          "Carry them to the hamper",
          "Put them inside",
          "Check your room for more",
          "Good work!",
        ],
        tips: "Do this every day!",
        color: "from-orange-400 to-orange-500",
        difficulty: "easy",
        category: "Responsibility",
        xp: 10,
      },

      // Responsibility - Medium
      12: {
        title: "Help with dishes",
        icon: "🍽️",
        points: 15,
        instructions: [
          "Clear your plate from the table",
          "Rinse dishes under water",
          "Put them in the dishwasher or drying rack",
          "Wipe down the table",
          "Ask what else you can help with",
        ],
        tips: "Be careful with breakables!",
        color: "from-orange-400 to-orange-500",
        difficulty: "medium",
        category: "Responsibility",
        xp: 15,
      },
      13: {
        title: "Organize your backpack",
        icon: "🎒",
        points: 15,
        instructions: [
          "Empty everything from your backpack",
          "Throw away any trash",
          "Sort items: books, supplies, lunch box",
          "Put everything back neatly",
          "Check that you have what you need",
        ],
        tips: "Do this weekly!",
        color: "from-orange-400 to-orange-500",
        difficulty: "medium",
        category: "Responsibility",
        xp: 15,
      },
      14: {
        title: "Water the plants",
        icon: "🌱",
        points: 15,
        instructions: [
          "Get a watering can or cup",
          "Fill it with water",
          "Water each plant gently",
          "Check if soil is dry before watering",
          "Wipe up any spills",
        ],
        tips: "Plants need water to grow!",
        color: "from-orange-400 to-orange-500",
        difficulty: "medium",
        category: "Responsibility",
        xp: 15,
      },

      // Responsibility - Hard
      15: {
        title: "Clean and organize your room",
        icon: "🏠",
        points: 25,
        instructions: [
          "Pick up all items from the floor",
          "Organize items on desk and shelves",
          "Make your bed nicely",
          "Vacuum or sweep if needed",
          "Put dirty clothes in hamper",
          "Admire your clean room!",
        ],
        tips: "Put on music to make it fun!",
        color: "from-orange-400 to-orange-500",
        difficulty: "hard",
        category: "Responsibility",
        xp: 25,
      },
      16: {
        title: "Help prepare a simple meal",
        icon: "🍳",
        points: 30,
        instructions: [
          "Wash your hands thoroughly",
          "Get ingredients with adult supervision",
          "Follow recipe instructions carefully",
          "Help with safe tasks like stirring and mixing",
          "Help clean up afterwards",
        ],
        tips: "Always ask an adult first!",
        color: "from-orange-400 to-orange-500",
        difficulty: "hard",
        category: "Responsibility",
        xp: 30,
        isTeamQuest: true,
      },
      17: {
        title: "Do your own laundry",
        icon: "🧺",
        points: 30,
        instructions: [
          "Collect dirty clothes",
          "Sort by colors and whites",
          "Put one load in washing machine",
          "Add detergent (ask adult for help)",
          "Start machine, then transfer to dryer",
          "Fold and put away clothes",
        ],
        tips: "Read labels for care instructions!",
        color: "from-orange-400 to-orange-500",
        difficulty: "hard",
        category: "Responsibility",
        xp: 30,
      },

      // Learning - Easy
      18: {
        title: "Read a picture book",
        icon: "📚",
        points: 15,
        instructions: [
          "Pick a fun picture book",
          "Find a cozy spot",
          "Read the words or look at pictures",
          "Think about the story",
          "Tell someone about it",
        ],
        tips: "Reading is fun!",
        color: "from-purple-400 to-purple-500",
        difficulty: "easy",
        category: "Learning",
        xp: 15,
      },
      19: {
        title: "Count to 20",
        icon: "🔢",
        points: 15,
        instructions: [
          "Start at 1",
          "Count out loud clearly",
          "Keep going to 20",
          "Count again if you want",
          "Great counting!",
        ],
        tips: "Use your fingers to help!",
        color: "from-purple-400 to-purple-500",
        difficulty: "easy",
        category: "Learning",
        xp: 15,
      },
      20: {
        title: "Learn 2 new words",
        icon: "📝",
        points: 15,
        instructions: [
          "Pick 2 new words you don't know",
          "Ask someone what they mean",
          "Use each word in a sentence",
          "Practice saying them",
          "Teach them to someone else",
        ],
        tips: "Write them down!",
        color: "from-purple-400 to-purple-500",
        difficulty: "easy",
        category: "Learning",
        xp: 15,
      },

      // Learning - Medium
      21: {
        title: "Read for 15 minutes",
        icon: "📖",
        points: 20,
        instructions: [
          "Choose a book you enjoy",
          "Find a quiet, comfortable spot",
          "Set a timer for 15 minutes",
          "Read without distractions",
          "Think about what you read",
        ],
        tips: "Reading every day makes you smarter!",
        color: "from-purple-400 to-purple-500",
        difficulty: "medium",
        category: "Learning",
        xp: 20,
      },
      22: {
        title: "Practice 10 math problems",
        icon: "🔢",
        points: 25,
        instructions: [
          "Get your math homework or worksheet",
          "Read each problem carefully",
          "Show your work",
          "Check your answers",
          "Ask for help if you need it",
        ],
        tips: "Take your time!",
        color: "from-purple-400 to-purple-500",
        difficulty: "medium",
        category: "Learning",
        xp: 25,
      },
      23: {
        title: "Learn 5 new vocabulary words",
        icon: "📝",
        points: 20,
        instructions: [
          "Find 5 words you don't know",
          "Look up their definitions",
          "Write each word and meaning",
          "Use each in a sentence",
          "Quiz yourself later",
        ],
        tips: "Make flashcards to study!",
        color: "from-purple-400 to-purple-500",
        difficulty: "medium",
        category: "Learning",
        xp: 20,
      },

      // Creative quests
      28: {
        title: "Color a picture",
        icon: "🖍️",
        points: 15,
        instructions: [
          "Get crayons and coloring book",
          "Pick a picture you like",
          "Color carefully inside lines",
          "Use lots of colors",
          "Show someone your artwork!",
        ],
        tips: "Be creative!",
        color: "from-pink-400 to-pink-500",
        difficulty: "easy",
        category: "Creativity",
        xp: 15,
      },
      31: {
        title: "Draw your favorite animal",
        icon: "🎨",
        points: 20,
        instructions: [
          "Get paper and drawing tools",
          "Think about your favorite animal",
          "Start with simple shapes",
          "Add details like eyes and ears",
          "Color it if you want!",
        ],
        tips: "Have fun creating!",
        color: "from-pink-400 to-pink-500",
        difficulty: "medium",
        category: "Creativity",
        xp: 20,
      },
      34: {
        title: "Write a short story (200+ words)",
        icon: "✍️",
        points: 35,
        instructions: [
          "Think of an interesting idea",
          "Create characters and setting",
          "Write beginning, middle, and end",
          "Make it at least 200 words",
          "Edit and improve your story",
        ],
        tips: "Let your imagination run wild!",
        color: "from-pink-400 to-pink-500",
        difficulty: "hard",
        category: "Creativity",
        xp: 35,
      },

      // Social quests
      37: {
        title: "Give someone a hug",
        icon: "🤗",
        points: 10,
        instructions: [
          "Find someone you love",
          "Ask if they want a hug",
          "Give a nice warm hug",
          "Tell them you love them",
          "Smile!",
        ],
        tips: "Hugs make everyone happy!",
        color: "from-red-400 to-red-500",
        difficulty: "easy",
        category: "Social Skills",
        xp: 10,
      },
      40: {
        title: "Say something kind to 3 people",
        icon: "💝",
        points: 15,
        instructions: [
          "Think of something nice to say",
          "Find 3 different people",
          "Give each a sincere compliment",
          "Smile when you say it",
          "Notice how happy it makes them!",
        ],
        tips: "Kindness is contagious!",
        color: "from-red-400 to-red-500",
        difficulty: "medium",
        category: "Social Skills",
        xp: 15,
      },
      43: {
        title: "Resolve a conflict peacefully",
        icon: "🕊️",
        points: 30,
        instructions: [
          "If you have a disagreement, stay calm",
          "Listen to the other person's point of view",
          'Explain your feelings using "I" statements',
          "Work together to find a solution",
          "Shake hands or hug it out",
        ],
        tips: "Communication is key!",
        color: "from-red-400 to-red-500",
        difficulty: "hard",
        category: "Social Skills",
        xp: 30,
      },

      // Parent-Kid Team Quests (Bonus points!)
      50: {
        title: "Cook a meal together",
        icon: "👨‍🍳",
        points: 40,
        instructions: [
          "Choose a recipe together",
          "Shop for ingredients as a team",
          "Prep ingredients side by side",
          "Cook together safely",
          "Enjoy your meal and clean up together!",
        ],
        tips: "Teamwork makes the dream work!",
        color: "from-purple-400 to-pink-400",
        difficulty: "medium",
        category: "Responsibility",
        xp: 40,
        isTeamQuest: true,
      },
      51: {
        title: "Build something together",
        icon: "🔨",
        points: 35,
        instructions: [
          "Choose a project (LEGO, craft, birdhouse)",
          "Plan it out together",
          "Work as a team",
          "Help each other",
          "Display your creation proudly!",
        ],
        tips: "Family bonding at its best!",
        color: "from-blue-400 to-purple-400",
        difficulty: "medium",
        category: "Creativity",
        xp: 35,
        isTeamQuest: true,
      },
      52: {
        title: "Read a book together",
        icon: "📖",
        points: 30,
        instructions: [
          "Pick a book you both like",
          "Find a cozy spot",
          "Take turns reading pages",
          "Discuss the story",
          "Talk about your favorite parts!",
        ],
        tips: "Reading together creates memories!",
        color: "from-purple-400 to-indigo-400",
        difficulty: "easy",
        category: "Learning",
        xp: 30,
        isTeamQuest: true,
      },
      53: {
        title: "Clean a room together",
        icon: "🧹",
        points: 35,
        instructions: [
          "Choose a room to clean",
          "Make a plan of what needs to be done",
          "Divide tasks fairly",
          "Work together efficiently",
          "Admire your teamwork!",
        ],
        tips: "Many hands make light work!",
        color: "from-orange-400 to-yellow-400",
        difficulty: "medium",
        category: "Responsibility",
        xp: 35,
        isTeamQuest: true,
      },
    };

    return questDataMap[questId] || questDataMap[1];
  };

  const handleGetStarted = () => {
    setCurrentScreen("auth");
  };

  const handleAuth = (
    type: "kid" | "parent" | "creator",
    profile: UserProfile,
    isNewUser: boolean,
  ) => {
    setUserType(type);
    setUserProfile(profile);

    // Navigate to appropriate screen based on user type
    if (type === "parent") {
      setCurrentScreen("parent");
    } else if (type === "creator") {
      setCurrentScreen("creator");
    } else {
      setCurrentScreen("home");
    }
  };

  const handleShopPurchase = (item: any) => {
    setUserPoints((prev) => prev - item.price);
  };

  const handleSignOut = () => {
    setUserType(null);
    setUserProfile(null);
    setCurrentScreen("onboarding");
    setScreenHistory([]);
  };

  const handleNavigate = (screen: string) => {
    setScreenHistory([...screenHistory, currentScreen]);

    if (screen === "profile") {
      setCurrentScreen("profile");
    } else if (screen === "badges") {
      setCurrentScreen("badges");
    } else if (screen === "courses") {
      setCurrentScreen("courses");
    } else if (screen === "skill-tree") {
      setCurrentScreen("skill-tree");
    } else if (screen === "settings") {
      setCurrentScreen("settings");
    } else {
      setCurrentScreen(screen as Screen);
    }
  };

  const handleCategorySelect = (category: string) => {
    if (category === "paper-crafts") {
      setScreenHistory([...screenHistory, currentScreen]);
      setCurrentScreen("paper-crafts");
      return;
    }
    setSelectedCategory(category);
    setScreenHistory([...screenHistory, currentScreen]);
    setCurrentScreen("course-list");
  };

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourseId(courseId);
    setScreenHistory([...screenHistory, currentScreen]);
    setCurrentScreen("course-detail");
  };

  const handleQuestSelect = (questId: number) => {
    if (questId === 15 || questId === 16) {
      setScreenHistory([...screenHistory, currentScreen]);
      setCurrentScreen("clean-room-quest");
      return;
    }
    setSelectedQuestId(questId);
    setScreenHistory([...screenHistory, currentScreen]);
    setCurrentScreen("quest-detail");
  };

  const handleStartChallenge = (questId: number) => {
    setSelectedQuestId(questId);
    setScreenHistory([...screenHistory, currentScreen]);
    setCurrentScreen("challenge-mode");
  };

  const handleSoloSubmit = (questId: number, videoFile: File | null) => {
    // In a real app, this would upload the video and save the submission
    console.log("Solo quest submitted:", {
      questId,
      videoFile,
      childName: userProfile?.name,
      submittedAt: new Date().toISOString(),
    });

    // Create a solo submission (without challengeWith)
    const submission: VideoSubmission = {
      id: `sub-${Date.now()}`,
      questId: questId,
      questTitle: getQuestData(questId, userProfile?.age)?.title || "Quest",
      questIcon: getQuestData(questId, userProfile?.age)?.icon || "🎯",
      questPoints: getQuestData(questId, userProfile?.age)?.points || 10,
      childName: userProfile?.name || "Child",
      challengedWith: [], // Empty array for solo submissions
      videoFileName: videoFile?.name || "video.mp4",
      videoFile: videoFile || undefined,
      submittedAt: new Date().toISOString(),
      status: "pending",
    };

    setVideoSubmissions([...videoSubmissions, submission]);
  };

  const handleSubmitVideo = (
    questId: number,
    videoFile: File | null,
    challengeWith: string[],
  ) => {
    // In a real app, this would upload the video and save the submission
    console.log("Video submitted:", {
      questId,
      videoFile,
      challengeWith,
    });
  };

  const handleBadgeSelect = (badgeId: number) => {
    setSelectedBadgeId(badgeId);
    setScreenHistory([...screenHistory, currentScreen]);
    setCurrentScreen("badge-detail");
  };

  const handleViewChildProfile = () => {
    setScreenHistory([...screenHistory, currentScreen]);
    setCurrentScreen("child-profile");
  };

  const handleViewVideoReviews = () => {
    setScreenHistory([...screenHistory, currentScreen]);
    setCurrentScreen("video-reviews");
  };

  // Creator Handlers
  const handleCreateCourse = () => {
    setEditingCourse(undefined);
    setScreenHistory([...screenHistory, currentScreen]);
    setCurrentScreen("creator-course-create");
  };

  const handleEditCourse = (courseId: string) => {
    const course = creatorCourses.find(c => c.id === courseId);
    if (course) {
      setEditingCourse({
        id: course.id,
        title: course.title,
        description: course.description,
        category: course.category,
        icon: course.icon,
        lessons: [], // In a real app, fetch lessons from database
        status: course.status,
      });
      setSelectedCreatorCourseId(courseId);
      setScreenHistory([...screenHistory, currentScreen]);
      setCurrentScreen("creator-course-edit");
    }
  };

  const handleViewAnalytics = (courseId: string) => {
    setSelectedCreatorCourseId(courseId);
    setScreenHistory([...screenHistory, currentScreen]);
    setCurrentScreen("creator-course-analytics");
  };

  const handleSaveCourse = (courseData: CourseData) => {
    if (courseData.id) {
      // Edit existing course
      setCreatorCourses(prev => prev.map(course => 
        course.id === courseData.id
          ? {
              ...course,
              title: courseData.title,
              description: courseData.description,
              category: courseData.category,
              icon: courseData.icon,
              lessonsCount: courseData.lessons.length,
              status: courseData.status,
            }
          : course
      ));
    } else {
      // Create new course
      const newCourse: CreatorCourse = {
        id: `course-${Date.now()}`,
        title: courseData.title,
        description: courseData.description,
        category: courseData.category,
        icon: courseData.icon,
        lessonsCount: courseData.lessons.length,
        studentsEnrolled: 0,
        totalViews: 0,
        status: courseData.status,
        createdAt: new Date().toISOString(),
        earnings: 0,
      };
      setCreatorCourses(prev => [...prev, newCourse]);
    }
    
    // Go back to creator dashboard
    handleBack();
  };

  const handleBack = () => {
    if (screenHistory.length > 0) {
      const previousScreen =
        screenHistory[screenHistory.length - 1];
      setScreenHistory(screenHistory.slice(0, -1));
      setCurrentScreen(previousScreen);
    }
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case "onboarding":
        return (
          <OnboardingScreen onGetStarted={handleGetStarted} />
        );
      case "auth":
        return <AuthScreen onAuth={handleAuth} />;
      case "home":
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            userProfile={userProfile}
            userPoints={userPoints}
            skillLevels={skillLevels}
            weeklyEvent={currentWeekEvent}
            language={language as any}
            assignedQuests={dailyQuests}
          />
        );
      case "quests":
        return (
          <DailyQuestScreen
            onQuestSelect={handleQuestSelect}
            userProfile={userProfile}
            assignedQuests={dailyQuests}
            onQuestsRefresh={setDailyQuests}
            language={language as any}
          />
        );
      case "quest-detail":
        return (
          <QuestDetailScreen
            questId={selectedQuestId}
            onBack={handleBack}
            onStartChallenge={handleStartChallenge}
            onSoloSubmit={handleSoloSubmit}
            questData={getQuestData(
              selectedQuestId,
              userProfile?.age,
            )}
            language={language as any}
          />
        );
      case "challenge-mode":
        return (
          <ChallengeModeScreen
            questId={selectedQuestId}
            questData={getQuestData(
              selectedQuestId,
              userProfile?.age,
            )}
            onBack={handleBack}
            onSubmitVideo={handleSubmitVideo}
            language={language as any}
          />
        );
      case "badges":
        return (
          <BadgesScreen 
            onBadgeSelect={handleBadgeSelect}
            language={language as any}
          />
        );
      case "badge-detail":
        return (
          <AchievementDetailScreen
            badgeId={selectedBadgeId}
            onBack={handleBack}
            language={language as any}
          />
        );
      case "leaderboard":
        return <LeaderboardScreen language={language as any} />;
      case "messages":
        return <MessagingScreen language={language as any} />;
      case "skill-tree":
        return (
          <SkillTreeScreen
            onBack={handleBack}
            skillLevels={skillLevels}
            language={language as any}
          />
        );
      case "parent":
        return (
          <ParentDashboardScreen
            onViewChildProfile={handleViewChildProfile}
            onViewVideoReviews={handleViewVideoReviews}
            onNavigate={handleNavigate}
            userProfile={userProfile}
            skillLevels={skillLevels}
            weeklyEvent={currentWeekEvent}
            language={language as any}
          />
        );
      case "child-profile":
        return <ChildProfileScreen onBack={handleBack} language={language as any} />;
      case "video-reviews":
        return <VideoReviewScreen onBack={handleBack} language={language as any} />;
      case "profile":
        return (
          <ProfilePhotoScreen
            onBack={handleBack}
            onNavigate={handleNavigate}
            language={language as any}
          />
        );
      case "shop":
        return (
          <ShopScreen
            currentPoints={userPoints}
            onPurchase={handleShopPurchase}
            onBack={handleBack}
            language={language as any}
          />
        );
      case "courses":
        return (
          <CoursesScreen
            onCategorySelect={handleCategorySelect}
            language={language as any}
            userProfile={userProfile}
          />
        );
      case "course-list":
        return (
          <CourseListScreen
            category={selectedCategory}
            onBack={handleBack}
            onCourseSelect={handleCourseSelect}
          />
        );
      case "course-detail":
        return (
          <CourseDetailScreen
            courseId={selectedCourseId}
            onBack={handleBack}
          />
        );
      case "settings":
        return (
          <SettingsScreen            onNavigate={handleNavigate}            onBack={handleBack}
            onSignOut={handleSignOut}
            theme={theme}
            onThemeChange={setTheme}
            colorTheme={colorTheme}
            onColorThemeChange={setColorTheme}
            language={language}
            onLanguageChange={setLanguage}
            userType={userType}
          />
        );
      case "creator":
        return (
          <CreatorDashboardScreen
            onBack={handleSignOut}
            onCreateCourse={handleCreateCourse}
            onEditCourse={handleEditCourse}
            onViewAnalytics={handleViewAnalytics}
            creatorName={userProfile?.name || "Creator"}
            courses={creatorCourses}
            language={language}
          />
        );
      case "creator-course-create":
      case "creator-course-edit":
        return (
          <CourseCreatorScreen
            onBack={handleBack}
            onSave={handleSaveCourse}
            language={language}
            existingCourse={editingCourse}
          />
        );
      case "subscription":
        return (
          <SubscriptionScreen
            onBack={handleBack}
            onSubscribe={(plan) => { console.log("Subscribed:", plan); handleBack(); }}
          />
        );
      case "creator-course-analytics":
        const selectedCourse = creatorCourses.find(c => c.id === selectedCreatorCourseId);
        return selectedCourse ? (
          <CourseAnalyticsScreen
            onBack={handleBack}
            course={selectedCourse}
            language={language}
          />
        ) : null;
      case "statistics":
        return (
          <StatisticsScreen
            onBack={handleBack}
            userPoints={userPoints}
            skillLevels={skillLevels}
          />
        );
      case "paper-crafts":
        return (
          <PaperCraftsScreen
            onBack={handleBack}
          />
        );
      case "clean-room-quest":
        return (
          <CleanRoomQuestScreen
            onBack={handleBack}
            onComplete={(pts) => { setUserPoints(prev => prev + pts); handleBack(); }}
          />
        );
      default:
        return (
          <HomeScreen
            onNavigate={handleNavigate}
            userProfile={userProfile}
            userPoints={userPoints}
            skillLevels={skillLevels}
            weeklyEvent={currentWeekEvent}
            language={language as any}
            assignedQuests={dailyQuests}
          />
        );
    }
  };

  const showBottomNav =
    currentScreen !== "onboarding" &&
    currentScreen !== "auth" &&
    currentScreen !== "quest-detail" &&
    currentScreen !== "challenge-mode" &&
    currentScreen !== "badge-detail" &&
    currentScreen !== "course-list" &&
    currentScreen !== "course-detail" &&
    currentScreen !== "child-profile" &&
    currentScreen !== "video-reviews" &&
    currentScreen !== "shop" &&
    currentScreen !== "skill-tree" &&
    currentScreen !== "settings" &&
    currentScreen !== "subscription" &&
    currentScreen !== "statistics" &&
    currentScreen !== "paper-crafts" &&
    currentScreen !== "clean-room-quest" &&
    userType === "kid";

  return (
    <div className="h-screen w-full bg-white flex items-center justify-center">
      {/* Mobile Container */}
      <div className="relative w-full max-w-3xl h-full bg-white shadow-2xl overflow-hidden">
        {renderScreen()}
        {showBottomNav && (
          <BottomNav
            currentScreen={currentScreen}
            onNavigate={handleNavigate}
            language={language as any}
          />
        )}
      </div>
    </div>
  );
}


