// Translation system for SkillLink app

export type Language = 'en' | 'es' | 'fr' | 'de' | 'ja' | 'zh' | 'pt' | 'ar' | 'ko' | 'sv' | 'nl';

export interface Translations {
  // Common
  home: string;
  quests: string;
  courses: string;
  leaderboard: string;
  profile: string;
  settings: string;
  back: string;
  save: string;
  cancel: string;
  continue: string;
  
  // Onboarding
  welcomeTitle: string;
  welcomeSubtitle: string;
  getStarted: string;
  
  // Auth
  loginTitle: string;
  signupTitle: string;
  username: string;
  password: string;
  name: string;
  age: string;
  iAmAKid: string;
  iAmAParent: string;
  iAmACreator: string;
  
  // Creator
  creatorDashboard: string;
  myCourses: string;
  createCourse: string;
  earnings: string;
  totalEarnings: string;
  studentsEnrolled: string;
  publishedCourses: string;
  courseTitle: string;
  courseDescription: string;
  courseCategory: string;
  addLesson: string;
  lessonTitle: string;
  publish: string;
  draft: string;
  createNewCourse: string;
  editCourse: string;
  courseAnalytics: string;
  revenuePerStudent: string;
  byCreator: string;
  enrollNow: string;
  enrolled: string;
  
  // Home Screen
  welcomeTo: string;
  points: string;
  streak: string;
  badges: string;
  todaysProgress: string;
  keepGoing: string;
  quickActions: string;
  recentBadges: string;
  viewAll: string;
  
  // Quests
  dailyQuests: string;
  completeMissions: string;
  todaysMissions: string;
  autoAssignedMissions: string;
  completeToday: string;
  newQuestsTomorrow: string;
  bonusChallenge: string;
  completeAllQuests: string;
  bonusPoints: string;
  upNext: string;
  locked: string;
  done: string;
  
  // Courses
  learningPaths: string;
  chooseJourney: string;
  learnYourWay: string;
  selfDirectedCourses: string;
  chooseLearningPath: string;
  continueLearning: string;
  newCourses: string;
  coursesAvailable: string;
  lessonsComplete: string;
  
  // Leaderboard
  topLearners: string;
  thisWeek: string;
  dayStreak: string;
  keepGoingMessage: string;
  pointsAway: string;
  
  // Profile/Customization
  customizeAvatar: string;
  makeItYou: string;
  hairStyle: string;
  skinTone: string;
  outfit: string;
  saveAvatar: string;
  
  // Settings
  appearance: string;
  theme: string;
  lightMode: string;
  darkMode: string;
  colorTheme: string;
  language: string;
  languageRegion: string;
  social: string;
  addFriends: string;
  connectWithLearners: string;
  notifications: string;
  pushNotifications: string;
  questReminders: string;
  privacySecurity: string;
  parentalControls: string;
  manageRestrictions: string;
  helpSupport: string;
  helpCenter: string;
  faqsTutorials: string;
  account: string;
  signOut: string;
  logOutAccount: string;
  madeWithLove: string;
  
  // Quest Details
  difficulty: string;
  easy: string;
  medium: string;
  hard: string;
  instructions: string;
  tips: string;
  markComplete: string;
  startChallenge: string;
  
  // Categories
  personalCare: string;
  responsibility: string;
  learning: string;
  creativity: string;
  socialSkills: string;
  teamwork: string;
  dailyHabits: string;
  emotions: string;
  problemSolving: string;
  communication: string;
}

export const translations: Record<Language, Translations> = {
  en: {
    // Common
    home: 'Home',
    quests: 'Quests',
    courses: 'Courses',
    leaderboard: 'Leaderboard',
    profile: 'Profile',
    settings: 'Settings',
    back: 'Back',
    save: 'Save',
    cancel: 'Cancel',
    continue: 'Continue',
    
    // Onboarding
    welcomeTitle: 'Welcome to SkillLink!',
    welcomeSubtitle: 'Turn screen time into skill time!',
    getStarted: 'Get Started',
    
    // Auth
    loginTitle: 'Welcome Back!',
    signupTitle: 'Create Account',
    username: 'Username',
    password: 'Password',
    name: 'Name',
    age: 'Age',
    iAmAKid: 'I\'m a Kid',
    iAmAParent: 'I\'m a Parent',
    iAmACreator: 'I\'m a Creator',
    
    // Creator
    creatorDashboard: 'Creator Dashboard',
    myCourses: 'My Courses',
    createCourse: 'Create Course',
    earnings: 'Earnings',
    totalEarnings: 'Total Earnings',
    studentsEnrolled: 'Students Enrolled',
    publishedCourses: 'Published Courses',
    courseTitle: 'Course Title',
    courseDescription: 'Course Description',
    courseCategory: 'Course Category',
    addLesson: 'Add Lesson',
    lessonTitle: 'Lesson Title',
    publish: 'Publish',
    draft: 'Draft',
    createNewCourse: 'Create New Course',
    editCourse: 'Edit Course',
    courseAnalytics: 'Course Analytics',
    revenuePerStudent: 'Revenue Per Student',
    byCreator: 'by',
    enrollNow: 'Enroll Now',
    enrolled: 'Enrolled',
    
    // Home Screen
    welcomeTo: 'Welcome to SkillLink,',
    points: 'Points',
    streak: 'Streak',
    badges: 'Badges',
    todaysProgress: 'Today\'s Progress',
    keepGoing: 'Keep going! You\'re almost there!',
    quickActions: 'Quick Actions',
    recentBadges: 'Recent Badges',
    viewAll: 'View All',
    
    // Quests
    dailyQuests: 'Daily Quests',
    completeMissions: 'Complete missions to earn points!',
    todaysMissions: 'Today\'s Missions',
    autoAssignedMissions: 'Auto-Assigned Missions',
    completeToday: 'Complete today\'s',
    newQuestsTomorrow: 'quests picked just for you! New quests tomorrow.',
    bonusChallenge: 'Bonus Challenge!',
    completeAllQuests: 'Complete all quests today',
    bonusPoints: 'Bonus Points',
    upNext: 'Up Next!',
    locked: 'Locked',
    done: 'Done',
    
    // Courses
    learningPaths: 'Learning Paths',
    chooseJourney: 'Choose your own learning journey!',
    learnYourWay: 'Learn Your Way',
    selfDirectedCourses: 'Self-directed courses - Learn at your own pace!',
    chooseLearningPath: 'Choose a Learning Path',
    continueLearning: 'Continue Learning',
    newCourses: 'New Courses!',
    coursesAvailable: 'courses available',
    lessonsComplete: 'lessons complete',
    
    // Leaderboard
    topLearners: 'Top learners this week',
    thisWeek: 'This Week',
    dayStreak: 'day streak',
    keepGoingMessage: 'Keep Going!',
    pointsAway: 'points away from 5th place!',
    
    // Profile/Customization
    customizeAvatar: 'Customize Avatar',
    makeItYou: 'Make it uniquely you!',
    hairStyle: 'Hair Style',
    skinTone: 'Skin Tone',
    outfit: 'Outfit',
    saveAvatar: 'Save Avatar',
    
    // Settings
    appearance: 'Appearance',
    theme: 'Theme',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    colorTheme: 'Color Theme',
    language: 'Language',
    languageRegion: 'Language & Region',
    social: 'Social',
    addFriends: 'Add Friends',
    connectWithLearners: 'Connect with other learners',
    notifications: 'Notifications',
    pushNotifications: 'Push Notifications',
    questReminders: 'Get reminders for daily quests',
    privacySecurity: 'Privacy & Security',
    parentalControls: 'Parental Controls',
    manageRestrictions: 'Manage app restrictions',
    helpSupport: 'Help & Support',
    helpCenter: 'Help Center',
    faqsTutorials: 'FAQs and tutorials',
    account: 'Account',
    signOut: 'Sign Out',
    logOutAccount: 'Log out of your account',
    madeWithLove: 'Made with ❤️ for young learners',
    
    // Quest Details
    difficulty: 'Difficulty',
    easy: 'Easy',
    medium: 'Medium',
    hard: 'Hard',
    instructions: 'Instructions',
    tips: 'Tips',
    markComplete: 'Mark as Complete',
    startChallenge: 'Start Challenge',
    
    // Categories
    personalCare: 'Personal Care',
    responsibility: 'Responsibility',
    learning: 'Learning',
    creativity: 'Creativity',
    socialSkills: 'Social Skills',
    teamwork: 'Teamwork',
    dailyHabits: 'Daily Habits',
    emotions: 'Emotions',
    problemSolving: 'Problem Solving',
    communication: 'Communication',
  },
  
  es: {
    // Common
    home: 'Inicio',
    quests: 'Misiones',
    courses: 'Cursos',
    leaderboard: 'Clasificación',
    profile: 'Perfil',
    settings: 'Ajustes',
    back: 'Volver',
    save: 'Guardar',
    cancel: 'Cancelar',
    continue: 'Continuar',
    
    // Onboarding
    welcomeTitle: '¡Bienvenido a SkillLink!',
    welcomeSubtitle: '¡Convierte el tiempo de pantalla en tiempo de habilidades!',
    getStarted: 'Comenzar',
    
    // Auth
    loginTitle: '¡Bienvenido de nuevo!',
    signupTitle: 'Crear cuenta',
    username: 'Usuario',
    password: 'Contraseña',
    name: 'Nombre',
    age: 'Edad',
    iAmAKid: 'Soy un niño',
    iAmAParent: 'Soy un padre',
    iAmACreator: 'Soy un creador',
    
    // Creator
    creatorDashboard: 'Panel de creador',
    myCourses: 'Mis cursos',
    createCourse: 'Crear curso',
    earnings: 'Ganancias',
    totalEarnings: 'Ganancias totales',
    studentsEnrolled: 'Estudiantes inscritos',
    publishedCourses: 'Cursos publicados',
    courseTitle: 'Título del curso',
    courseDescription: 'Descripción del curso',
    courseCategory: 'Categoría del curso',
    addLesson: 'Añadir lección',
    lessonTitle: 'Título de la lección',
    publish: 'Publicar',
    draft: 'Borrador',
    createNewCourse: 'Crear nuevo curso',
    editCourse: 'Editar curso',
    courseAnalytics: 'Analíticas del curso',
    revenuePerStudent: 'Ingresos por estudiante',
    byCreator: 'por',
    enrollNow: 'Inscribirse ahora',
    enrolled: 'Inscrito',
    
    // Home Screen
    welcomeTo: 'Bienvenido a SkillLink,',
    points: 'Puntos',
    streak: 'Racha',
    badges: 'Insignias',
    todaysProgress: 'Progreso de hoy',
    keepGoing: '¡Sigue así! ¡Casi lo logras!',
    quickActions: 'Acciones rápidas',
    recentBadges: 'Insignias recientes',
    viewAll: 'Ver todo',
    
    // Quests
    dailyQuests: 'Misiones diarias',
    completeMissions: '¡Completa misiones para ganar puntos!',
    todaysMissions: 'Misiones de hoy',
    autoAssignedMissions: 'Misiones asignadas automáticamente',
    completeToday: 'Completa las',
    newQuestsTomorrow: 'misiones elegidas para ti! Nuevas misiones mañana.',
    bonusChallenge: '¡Desafío adicional!',
    completeAllQuests: 'Completa todas las misiones de hoy',
    bonusPoints: 'Puntos extra',
    upNext: '¡Siguiente!',
    locked: 'Bloqueado',
    done: 'Hecho',
    
    // Courses
    learningPaths: 'Rutas de aprendizaje',
    chooseJourney: '¡Elige tu propio viaje de aprendizaje!',
    learnYourWay: 'Aprende a tu manera',
    selfDirectedCourses: 'Cursos autodirigidos - ¡Aprende a tu propio ritmo!',
    chooseLearningPath: 'Elige una ruta de aprendizaje',
    continueLearning: 'Continuar aprendiendo',
    newCourses: '¡Nuevos cursos!',
    coursesAvailable: 'cursos disponibles',
    lessonsComplete: 'lecciones completadas',
    
    // Leaderboard
    topLearners: 'Mejores estudiantes esta semana',
    thisWeek: 'Esta semana',
    dayStreak: 'racha de días',
    keepGoingMessage: '¡Sigue adelante!',
    pointsAway: 'puntos del 5º lugar!',
    
    // Profile/Customization
    customizeAvatar: 'Personalizar avatar',
    makeItYou: '¡Hazlo único!',
    hairStyle: 'Estilo de cabello',
    skinTone: 'Tono de piel',
    outfit: 'Atuendo',
    saveAvatar: 'Guardar avatar',
    
    // Settings
    appearance: 'Apariencia',
    theme: 'Tema',
    lightMode: 'Modo claro',
    darkMode: 'Modo oscuro',
    colorTheme: 'Tema de color',
    language: 'Idioma',
    languageRegion: 'Idioma y región',
    social: 'Social',
    addFriends: 'Añadir amigos',
    connectWithLearners: 'Conecta con otros estudiantes',
    notifications: 'Notificaciones',
    pushNotifications: 'Notificaciones push',
    questReminders: 'Recibe recordatorios de misiones diarias',
    privacySecurity: 'Privacidad y seguridad',
    parentalControls: 'Control parental',
    manageRestrictions: 'Gestionar restricciones',
    helpSupport: 'Ayuda y soporte',
    helpCenter: 'Centro de ayuda',
    faqsTutorials: 'Preguntas frecuentes y tutoriales',
    account: 'Cuenta',
    signOut: 'Cerrar sesión',
    logOutAccount: 'Cerrar sesión de tu cuenta',
    madeWithLove: 'Hecho con ❤️ para jóvenes estudiantes',
    
    // Quest Details
    difficulty: 'Dificultad',
    easy: 'Fácil',
    medium: 'Medio',
    hard: 'Difícil',
    instructions: 'Instrucciones',
    tips: 'Consejos',
    markComplete: 'Marcar como completo',
    startChallenge: 'Comenzar desafío',
    
    // Categories
    personalCare: 'Cuidado personal',
    responsibility: 'Responsabilidad',
    learning: 'Aprendizaje',
    creativity: 'Creatividad',
    socialSkills: 'Habilidades sociales',
    teamwork: 'Trabajo en equipo',
    dailyHabits: 'Hábitos diarios',
    emotions: 'Emociones',
    problemSolving: 'Resolución de problemas',
    communication: 'Comunicación',
  },
  
  fr: {
    // Common
    home: 'Accueil',
    quests: 'Quêtes',
    courses: 'Cours',
    leaderboard: 'Classement',
    profile: 'Profil',
    settings: 'Paramètres',
    back: 'Retour',
    save: 'Sauvegarder',
    cancel: 'Annuler',
    continue: 'Continuer',
    
    // Onboarding
    welcomeTitle: 'Bienvenue sur SkillLink!',
    welcomeSubtitle: 'Transformez le temps d\'écran en temps de compétences!',
    getStarted: 'Commencer',
    
    // Auth
    loginTitle: 'Bon retour!',
    signupTitle: 'Créer un compte',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    name: 'Nom',
    age: 'Âge',
    iAmAKid: 'Je suis un enfant',
    iAmAParent: 'Je suis un parent',
    iAmACreator: 'Je suis un créateur',
    
    // Creator
    creatorDashboard: 'Tableau de bord créateur',
    myCourses: 'Mes cours',
    createCourse: 'Créer un cours',
    earnings: 'Gains',
    totalEarnings: 'Gains totaux',
    studentsEnrolled: 'Étudiants inscrits',
    publishedCourses: 'Cours publiés',
    courseTitle: 'Titre du cours',
    courseDescription: 'Description du cours',
    courseCategory: 'Catégorie du cours',
    addLesson: 'Ajouter une leçon',
    lessonTitle: 'Titre de la leçon',
    publish: 'Publier',
    draft: 'Brouillon',
    createNewCourse: 'Créer un nouveau cours',
    editCourse: 'Modifier le cours',
    courseAnalytics: 'Analyse du cours',
    revenuePerStudent: 'Revenu par étudiant',
    byCreator: 'par',
    enrollNow: 'S\'inscrire maintenant',
    enrolled: 'Inscrit',
    
    // Home Screen
    welcomeTo: 'Bienvenue sur SkillLink,',
    points: 'Points',
    streak: 'Série',
    badges: 'Badges',
    todaysProgress: 'Progrès d\'aujourd\'hui',
    keepGoing: 'Continue! Tu y es presque!',
    quickActions: 'Actions rapides',
    recentBadges: 'Badges récents',
    viewAll: 'Voir tout',
    
    // Quests
    dailyQuests: 'Quêtes quotidiennes',
    completeMissions: 'Termine des missions pour gagner des points!',
    todaysMissions: 'Missions d\'aujourd\'hui',
    autoAssignedMissions: 'Missions automatiquement assignées',
    completeToday: 'Termine les',
    newQuestsTomorrow: 'quêtes choisies pour toi! Nouvelles quêtes demain.',
    bonusChallenge: 'Défi bonus!',
    completeAllQuests: 'Termine toutes les quêtes aujourd\'hui',
    bonusPoints: 'Points bonus',
    upNext: 'Prochaine!',
    locked: 'Verrouillé',
    done: 'Terminé',
    
    // Courses
    learningPaths: 'Parcours d\'apprentissage',
    chooseJourney: 'Choisis ton propre parcours d\'apprentissage!',
    learnYourWay: 'Apprends à ta façon',
    selfDirectedCourses: 'Cours auto-dirigés - Apprends à ton rythme!',
    chooseLearningPath: 'Choisis un parcours d\'apprentissage',
    continueLearning: 'Continuer l\'apprentissage',
    newCourses: 'Nouveaux cours!',
    coursesAvailable: 'cours disponibles',
    lessonsComplete: 'leçons terminées',
    
    // Leaderboard
    topLearners: 'Meilleurs apprenants cette semaine',
    thisWeek: 'Cette semaine',
    dayStreak: 'jours de série',
    keepGoingMessage: 'Continue!',
    pointsAway: 'points de la 5e place!',
    
    // Profile/Customization
    customizeAvatar: 'Personnaliser l\'avatar',
    makeItYou: 'Rends-le unique!',
    hairStyle: 'Coiffure',
    skinTone: 'Teint de peau',
    outfit: 'Tenue',
    saveAvatar: 'Sauvegarder l\'avatar',
    
    // Settings
    appearance: 'Apparence',
    theme: 'Thème',
    lightMode: 'Mode clair',
    darkMode: 'Mode sombre',
    colorTheme: 'Thème de couleur',
    language: 'Langue',
    languageRegion: 'Langue et région',
    social: 'Social',
    addFriends: 'Ajouter des amis',
    connectWithLearners: 'Connecte-toi avec d\'autres apprenants',
    notifications: 'Notifications',
    pushNotifications: 'Notifications push',
    questReminders: 'Reçois des rappels pour les quêtes quotidiennes',
    privacySecurity: 'Confidentialité et sécurité',
    parentalControls: 'Contrôle parental',
    manageRestrictions: 'Gérer les restrictions',
    helpSupport: 'Aide et support',
    helpCenter: 'Centre d\'aide',
    faqsTutorials: 'FAQ et tutoriels',
    account: 'Compte',
    signOut: 'Se déconnecter',
    logOutAccount: 'Déconnexion de ton compte',
    madeWithLove: 'Fait avec ❤️ pour les jeunes apprenants',
    
    // Quest Details
    difficulty: 'Difficulté',
    easy: 'Facile',
    medium: 'Moyen',
    hard: 'Difficile',
    instructions: 'Instructions',
    tips: 'Conseils',
    markComplete: 'Marquer comme terminé',
    startChallenge: 'Commencer le défi',
    
    // Categories
    personalCare: 'Soins personnels',
    responsibility: 'Responsabilité',
    learning: 'Apprentissage',
    creativity: 'Créativité',
    socialSkills: 'Compétences sociales',
    teamwork: 'Travail d\'équipe',
    dailyHabits: 'Habitudes quotidiennes',
    emotions: 'Émotions',
    problemSolving: 'Résolution de problèmes',
    communication: 'Communication',
  },
  
  de: {
    // Common
    home: 'Startseite',
    quests: 'Quests',
    courses: 'Kurse',
    leaderboard: 'Bestenliste',
    profile: 'Profil',
    settings: 'Einstellungen',
    back: 'Zurück',
    save: 'Speichern',
    cancel: 'Abbrechen',
    continue: 'Weiter',
    
    // Onboarding
    welcomeTitle: 'Willkommen bei SkillLink!',
    welcomeSubtitle: 'Verwandle Bildschirmzeit in Fähigkeitszeit!',
    getStarted: 'Loslegen',
    
    // Auth
    loginTitle: 'Willkommen zurück!',
    signupTitle: 'Konto erstellen',
    username: 'Benutzername',
    password: 'Passwort',
    name: 'Name',
    age: 'Alter',
    iAmAKid: 'Ich bin ein Kind',
    iAmAParent: 'Ich bin ein Elternteil',
    iAmACreator: 'Ich bin ein Ersteller',
    
    // Creator
    creatorDashboard: 'Ersteller-Dashboard',
    myCourses: 'Meine Kurse',
    createCourse: 'Kurs erstellen',
    earnings: 'Einnahmen',
    totalEarnings: 'Gesamteinnahmen',
    studentsEnrolled: 'Eingeschriebene Schüler',
    publishedCourses: 'Veröffentlichte Kurse',
    courseTitle: 'Kurstitel',
    courseDescription: 'Kursbeschreibung',
    courseCategory: 'Kurskategorie',
    addLesson: 'Lektion hinzufügen',
    lessonTitle: 'Lektionstitel',
    publish: 'Veröffentlichen',
    draft: 'Entwurf',
    createNewCourse: 'Neuen Kurs erstellen',
    editCourse: 'Kurs bearbeiten',
    courseAnalytics: 'Kursanalyse',
    revenuePerStudent: 'Einnahmen pro Schüler',
    byCreator: 'von',
    enrollNow: 'Jetzt anmelden',
    enrolled: 'Eingeschrieben',
    
    // Home Screen
    welcomeTo: 'Willkommen bei SkillLink,',
    points: 'Punkte',
    streak: 'Serie',
    badges: 'Abzeichen',
    todaysProgress: 'Heutiger Fortschritt',
    keepGoing: 'Weiter so! Du schaffst das!',
    quickActions: 'Schnellzugriff',
    recentBadges: 'Neueste Abzeichen',
    viewAll: 'Alle anzeigen',
    
    // Quests
    dailyQuests: 'Tägliche Quests',
    completeMissions: 'Erledige Missionen, um Punkte zu verdienen!',
    todaysMissions: 'Heutige Missionen',
    autoAssignedMissions: 'Automatisch zugewiesene Missionen',
    completeToday: 'Erledige die',
    newQuestsTomorrow: 'Quests, die für dich ausgewählt wurden! Morgen neue Quests.',
    bonusChallenge: 'Bonus-Herausforderung!',
    completeAllQuests: 'Erledige heute alle Quests',
    bonusPoints: 'Bonuspunkte',
    upNext: 'Als nächstes!',
    locked: 'Gesperrt',
    done: 'Erledigt',
    
    // Courses
    learningPaths: 'Lernpfade',
    chooseJourney: 'Wähle deine eigene Lernreise!',
    learnYourWay: 'Lerne auf deine Art',
    selfDirectedCourses: 'Selbstgesteuerte Kurse - Lerne in deinem eigenen Tempo!',
    chooseLearningPath: 'Wähle einen Lernpfad',
    continueLearning: 'Weiter lernen',
    newCourses: 'Neue Kurse!',
    coursesAvailable: 'verfügbare Kurse',
    lessonsComplete: 'Lektionen abgeschlossen',
    
    // Leaderboard
    topLearners: 'Top-Lernende dieser Woche',
    thisWeek: 'Diese Woche',
    dayStreak: 'Tage-Serie',
    keepGoingMessage: 'Weiter so!',
    pointsAway: 'Punkte vom 5. Platz!',
    
    // Profile/Customization
    customizeAvatar: 'Avatar anpassen',
    makeItYou: 'Mach es einzigartig!',
    hairStyle: 'Frisur',
    skinTone: 'Hautton',
    outfit: 'Outfit',
    saveAvatar: 'Avatar speichern',
    
    // Settings
    appearance: 'Aussehen',
    theme: 'Design',
    lightMode: 'Heller Modus',
    darkMode: 'Dunkler Modus',
    colorTheme: 'Farbschema',
    language: 'Sprache',
    languageRegion: 'Sprache & Region',
    social: 'Sozial',
    addFriends: 'Freunde hinzufügen',
    connectWithLearners: 'Verbinde dich mit anderen Lernenden',
    notifications: 'Benachrichtigungen',
    pushNotifications: 'Push-Benachrichtigungen',
    questReminders: 'Erhalte Erinnerungen für tägliche Quests',
    privacySecurity: 'Datenschutz & Sicherheit',
    parentalControls: 'Kindersicherung',
    manageRestrictions: 'Einschränkungen verwalten',
    helpSupport: 'Hilfe & Support',
    helpCenter: 'Hilfecenter',
    faqsTutorials: 'FAQs und Tutorials',
    account: 'Konto',
    signOut: 'Abmelden',
    logOutAccount: 'Von deinem Konto abmelden',
    madeWithLove: 'Mit ❤️ für junge Lernende gemacht',
    
    // Quest Details
    difficulty: 'Schwierigkeit',
    easy: 'Einfach',
    medium: 'Mittel',
    hard: 'Schwer',
    instructions: 'Anweisungen',
    tips: 'Tipps',
    markComplete: 'Als erledigt markieren',
    startChallenge: 'Herausforderung starten',
    
    // Categories
    personalCare: 'Körperpflege',
    responsibility: 'Verantwortung',
    learning: 'Lernen',
    creativity: 'Kreativität',
    socialSkills: 'Soziale Fähigkeiten',
    teamwork: 'Teamarbeit',
    dailyHabits: 'Tägliche Gewohnheiten',
    emotions: 'Emotionen',
    problemSolving: 'Problemlösung',
    communication: 'Kommunikation',
  },
  
  ja: {
    // Common
    home: 'ホーム',
    quests: 'クエスト',
    courses: 'コース',
    leaderboard: 'ランキング',
    profile: 'プロフィール',
    settings: '設定',
    back: '戻る',
    save: '保存',
    cancel: 'キャンセル',
    continue: '続ける',
    
    // Onboarding
    welcomeTitle: 'SkillLinkへようこそ！',
    welcomeSubtitle: '画面時間をスキル時間に変えよう！',
    getStarted: '始める',
    
    // Auth
    loginTitle: 'おかえりなさい！',
    signupTitle: 'アカウント作成',
    username: 'ユーザー名',
    password: 'パスワード',
    name: '名前',
    age: '年齢',
    iAmAKid: '子供です',
    iAmAParent: '保護者です',
    iAmACreator: 'クリエイターです',
    
    // Creator
    creatorDashboard: 'クリエイターダッシュボード',
    myCourses: 'マイコース',
    createCourse: 'コースを作成',
    earnings: '収益',
    totalEarnings: '総収益',
    studentsEnrolled: '登録学生数',
    publishedCourses: '公開コース',
    courseTitle: 'コースタイトル',
    courseDescription: 'コースの説明',
    courseCategory: 'コースカテゴリー',
    addLesson: 'レッスンを追加',
    lessonTitle: 'レッスンタイトル',
    publish: '公開',
    draft: '下書き',
    createNewCourse: '新しいコースを作成',
    editCourse: 'コースを編集',
    courseAnalytics: 'コース分析',
    revenuePerStudent: '学生あたりの収益',
    byCreator: '作成者',
    enrollNow: '今すぐ登録',
    enrolled: '登録済み',
    
    // Home Screen
    welcomeTo: 'SkillLinkへようこそ、',
    points: 'ポイント',
    streak: '連続日数',
    badges: 'バッジ',
    todaysProgress: '今日の進捗',
    keepGoing: '頑張って！もう少しだよ！',
    quickActions: 'クイックアクション',
    recentBadges: '最近のバッジ',
    viewAll: 'すべて見る',
    
    // Quests
    dailyQuests: '日替わりクエスト',
    completeMissions: 'ミッションを完了してポイントを稼ごう！',
    todaysMissions: '今日のミッション',
    autoAssignedMissions: '自動割り当てミッション',
    completeToday: '今日の',
    newQuestsTomorrow: 'クエストを完了しよう！明日新しいクエストが登場。',
    bonusChallenge: 'ボーナスチャレンジ！',
    completeAllQuests: '今日のクエストをすべて完了',
    bonusPoints: 'ボーナスポイント',
    upNext: '次は！',
    locked: 'ロック中',
    done: '完了',
    
    // Courses
    learningPaths: '学習パス',
    chooseJourney: '自分の学習の旅を選ぼう！',
    learnYourWay: '自分のやり方で学ぶ',
    selfDirectedCourses: '自習コース - 自分のペースで学ぼう！',
    chooseLearningPath: '学習パスを選択',
    continueLearning: '学習を続ける',
    newCourses: '新しいコース！',
    coursesAvailable: '利用可能なコース',
    lessonsComplete: 'レッスン完了',
    
    // Leaderboard
    topLearners: '今週のトップ学習者',
    thisWeek: '今週',
    dayStreak: '日連続',
    keepGoingMessage: '頑張って！',
    pointsAway: 'ポイントで5位！',
    
    // Profile/Customization
    customizeAvatar: 'アバターをカスタマイズ',
    makeItYou: 'あなただけのものに！',
    hairStyle: '髪型',
    skinTone: '肌の色',
    outfit: '服装',
    saveAvatar: 'アバターを保存',
    
    // Settings
    appearance: '外観',
    theme: 'テーマ',
    lightMode: 'ライトモード',
    darkMode: 'ダークモード',
    colorTheme: 'カラーテーマ',
    language: '言語',
    languageRegion: '言語と地域',
    social: 'ソーシャル',
    addFriends: '友達を追加',
    connectWithLearners: '他の学習者とつながる',
    notifications: '通知',
    pushNotifications: 'プッシュ通知',
    questReminders: '日替わりクエストのリマインダーを受け取る',
    privacySecurity: 'プライバシーとセキュリティ',
    parentalControls: 'ペアレンタルコントロール',
    manageRestrictions: '制限を管理',
    helpSupport: 'ヘルプとサポート',
    helpCenter: 'ヘルプセンター',
    faqsTutorials: 'よくある質問とチュートリアル',
    account: 'アカウント',
    signOut: 'サインアウト',
    logOutAccount: 'アカウントからログアウト',
    madeWithLove: '若い学習者のために❤️で作られました',
    
    // Quest Details
    difficulty: '難易度',
    easy: '簡単',
    medium: '普通',
    hard: '難しい',
    instructions: '手順',
    tips: 'ヒント',
    markComplete: '完了にする',
    startChallenge: 'チャレンジを始める',
    
    // Categories
    personalCare: '身の回りの世話',
    responsibility: '責任',
    learning: '学習',
    creativity: '創造性',
    socialSkills: '社会性スキル',
    teamwork: 'チームワーク',
    dailyHabits: '日常習慣',
    emotions: '感情',
    problemSolving: '問題解決',
    communication: 'コミュニケーション',
  },
  
  zh: {
    // Common
    home: '主页',
    quests: '任务',
    courses: '课程',
    leaderboard: '排行榜',
    profile: '个人资料',
    settings: '设置',
    back: '返回',
    save: '保存',
    cancel: '取消',
    continue: '继续',
    
    // Onboarding
    welcomeTitle: '欢迎来到SkillLink！',
    welcomeSubtitle: '将屏幕时间转变为技能时间！',
    getStarted: '开始',
    
    // Auth
    loginTitle: '欢迎回来！',
    signupTitle: '创建账户',
    username: '用户名',
    password: '密码',
    name: '名字',
    age: '年龄',
    iAmAKid: '我是孩子',
    iAmAParent: '我是家长',
    iAmACreator: '我是创作者',
    
    // Creator
    creatorDashboard: '创作者仪表板',
    myCourses: '我的课程',
    createCourse: '创建课程',
    earnings: '收益',
    totalEarnings: '总收益',
    studentsEnrolled: '已注册学生',
    publishedCourses: '已发布课程',
    courseTitle: '课程标题',
    courseDescription: '课程描述',
    courseCategory: '课程类别',
    addLesson: '添加课时',
    lessonTitle: '课时标题',
    publish: '发布',
    draft: '草稿',
    createNewCourse: '创建新课程',
    editCourse: '编辑课程',
    courseAnalytics: '课程分析',
    revenuePerStudent: '每位学生收入',
    byCreator: '由',
    enrollNow: '立即注册',
    enrolled: '已注册',
    
    // Home Screen
    welcomeTo: '欢迎来到SkillLink，',
    points: '积分',
    streak: '连续天数',
    badges: '徽章',
    todaysProgress: '今日进度',
    keepGoing: '继续加油！你快完成了！',
    quickActions: '快速操作',
    recentBadges: '最近的徽章',
    viewAll: '查看全部',
    
    // Quests
    dailyQuests: '每日任务',
    completeMissions: '完成任务赚取积分！',
    todaysMissions: '今日任务',
    autoAssignedMissions: '自动分配的任务',
    completeToday: '完成今天的',
    newQuestsTomorrow: '为你精选的任务！明天会有新任务。',
    bonusChallenge: '额外挑战！',
    completeAllQuests: '完成今天的所有任务',
    bonusPoints: '额外积分',
    upNext: '下一个！',
    locked: '已锁定',
    done: '完成',
    
    // Courses
    learningPaths: '学习路径',
    chooseJourney: '选择你自己的学习之旅！',
    learnYourWay: '按你的方式学习',
    selfDirectedCourses: '自主学习课程 - 按自己的节奏学习！',
    chooseLearningPath: '选择学习路径',
    continueLearning: '继续学习',
    newCourses: '新课程！',
    coursesAvailable: '可用课程',
    lessonsComplete: '课程完成',
    
    // Leaderboard
    topLearners: '本周顶尖学习者',
    thisWeek: '本周',
    dayStreak: '天连续',
    keepGoingMessage: '继续加油！',
    pointsAway: '分距离第5名！',
    
    // Profile/Customization
    customizeAvatar: '自定义头像',
    makeItYou: '让它独一无二！',
    hairStyle: '发型',
    skinTone: '肤色',
    outfit: '服装',
    saveAvatar: '保存头像',
    
    // Settings
    appearance: '外观',
    theme: '主题',
    lightMode: '浅色模式',
    darkMode: '深色模式',
    colorTheme: '颜色主题',
    language: '语言',
    languageRegion: '语言和地区',
    social: '社交',
    addFriends: '添加好友',
    connectWithLearners: '与其他学习者联系',
    notifications: '通知',
    pushNotifications: '推送通知',
    questReminders: '获取每日任务提醒',
    privacySecurity: '隐私和安全',
    parentalControls: '���长控制',
    manageRestrictions: '管理限制',
    helpSupport: '帮助和支持',
    helpCenter: '帮助中心',
    faqsTutorials: '常见问题和教程',
    account: '账户',
    signOut: '退出登录',
    logOutAccount: '从你的账户登出',
    madeWithLove: '用❤️为年轻学习者制作',
    
    // Quest Details
    difficulty: '难度',
    easy: '简单',
    medium: '中等',
    hard: '困难',
    instructions: '说明',
    tips: '提示',
    markComplete: '标记为完成',
    startChallenge: '开始挑战',
    
    // Categories
    personalCare: '个人护理',
    responsibility: '责任',
    learning: '学习',
    creativity: '创造力',
    socialSkills: '社交技能',
    teamwork: '团队合作',
    dailyHabits: '日常习惯',
    emotions: '情绪',
    problemSolving: '解决问题',
    communication: '沟通',
  },
  
  pt: {
    // Common
    home: 'Início',
    quests: 'Missões',
    courses: 'Cursos',
    leaderboard: 'Classificação',
    profile: 'Perfil',
    settings: 'Configurações',
    back: 'Voltar',
    save: 'Salvar',
    cancel: 'Cancelar',
    continue: 'Continuar',
    
    // Onboarding
    welcomeTitle: 'Bem-vindo ao SkillLink!',
    welcomeSubtitle: 'Transforme tempo de tela em tempo de habilidades!',
    getStarted: 'Começar',
    
    // Auth
    loginTitle: 'Bem-vindo de volta!',
    signupTitle: 'Criar conta',
    username: 'Nome de usuário',
    password: 'Senha',
    name: 'Nome',
    age: 'Idade',
    iAmAKid: 'Sou uma criança',
    iAmAParent: 'Sou um pai/mãe',
    iAmACreator: 'Sou um criador',
    
    // Creator
    creatorDashboard: 'Painel do criador',
    myCourses: 'Meus cursos',
    createCourse: 'Criar curso',
    earnings: 'Ganhos',
    totalEarnings: 'Ganhos totais',
    studentsEnrolled: 'Alunos inscritos',
    publishedCourses: 'Cursos publicados',
    courseTitle: 'Título do curso',
    courseDescription: 'Descrição do curso',
    courseCategory: 'Categoria do curso',
    addLesson: 'Adicionar lição',
    lessonTitle: 'Título da lição',
    publish: 'Publicar',
    draft: 'Rascunho',
    createNewCourse: 'Criar novo curso',
    editCourse: 'Editar curso',
    courseAnalytics: 'Análise do curso',
    revenuePerStudent: 'Receita por aluno',
    byCreator: 'por',
    enrollNow: 'Inscrever-se agora',
    enrolled: 'Inscrito',
    
    // Home Screen
    welcomeTo: 'Bem-vindo ao SkillLink,',
    points: 'Pontos',
    streak: 'Sequência',
    badges: 'Emblemas',
    todaysProgress: 'Progresso de hoje',
    keepGoing: 'Continue assim! Você está quase lá!',
    quickActions: 'Ações rápidas',
    recentBadges: 'Emblemas recentes',
    viewAll: 'Ver tudo',
    
    // Quests
    dailyQuests: 'Missões diárias',
    completeMissions: 'Complete missões para ganhar pontos!',
    todaysMissions: 'Missões de hoje',
    autoAssignedMissions: 'Missões atribuídas automaticamente',
    completeToday: 'Complete as',
    newQuestsTomorrow: 'missões escolhidas para você! Novas missões amanhã.',
    bonusChallenge: 'Desafio bônus!',
    completeAllQuests: 'Complete todas as missões de hoje',
    bonusPoints: 'Pontos bônus',
    upNext: 'Próxima!',
    locked: 'Bloqueado',
    done: 'Concluído',
    
    // Courses
    learningPaths: 'Caminhos de aprendizagem',
    chooseJourney: 'Escolha sua própria jornada de aprendizagem!',
    learnYourWay: 'Aprenda do seu jeito',
    selfDirectedCourses: 'Cursos autodidatas - Aprenda no seu próprio ritmo!',
    chooseLearningPath: 'Escolha um caminho de aprendizagem',
    continueLearning: 'Continuar aprendendo',
    newCourses: 'Novos cursos!',
    coursesAvailable: 'cursos disponíveis',
    lessonsComplete: 'lições completas',
    
    // Leaderboard
    topLearners: 'Melhores alunos desta semana',
    thisWeek: 'Esta semana',
    dayStreak: 'dias de sequência',
    keepGoingMessage: 'Continue assim!',
    pointsAway: 'pontos do 5º lugar!',
    
    // Profile/Customization
    customizeAvatar: 'Personalizar avatar',
    makeItYou: 'Faça ser único!',
    hairStyle: 'Estilo de cabelo',
    skinTone: 'Tom de pele',
    outfit: 'Roupa',
    saveAvatar: 'Salvar avatar',
    
    // Settings
    appearance: 'Aparência',
    theme: 'Tema',
    lightMode: 'Modo claro',
    darkMode: 'Modo escuro',
    colorTheme: 'Tema de cor',
    language: 'Idioma',
    languageRegion: 'Idioma e região',
    social: 'Social',
    addFriends: 'Adicionar amigos',
    connectWithLearners: 'Conecte-se com outros alunos',
    notifications: 'Notificações',
    pushNotifications: 'Notificações push',
    questReminders: 'Receba lembretes de missões diárias',
    privacySecurity: 'Privacidade e segurança',
    parentalControls: 'Controle parental',
    manageRestrictions: 'Gerenciar restrições',
    helpSupport: 'Ajuda e suporte',
    helpCenter: 'Central de ajuda',
    faqsTutorials: 'Perguntas frequentes e tutoriais',
    account: 'Conta',
    signOut: 'Sair',
    logOutAccount: 'Sair da sua conta',
    madeWithLove: 'Feito com ❤️ para jovens aprendizes',
    
    // Quest Details
    difficulty: 'Dificuldade',
    easy: 'Fácil',
    medium: 'Médio',
    hard: 'Difícil',
    instructions: 'Instruções',
    tips: 'Dicas',
    markComplete: 'Marcar como concluído',
    startChallenge: 'Iniciar desafio',
    
    // Categories
    personalCare: 'Cuidados pessoais',
    responsibility: 'Responsabilidade',
    learning: 'Aprendizagem',
    creativity: 'Criatividade',
    socialSkills: 'Habilidades sociais',
    teamwork: 'Trabalho em equipe',
    dailyHabits: 'Hábitos diários',
    emotions: 'Emoções',
    problemSolving: 'Resolução de problemas',
    communication: 'Comunicação',
  },
  
  ar: {
    // Common
    home: 'الرئيسية',
    quests: 'المهام',
    courses: 'الدورات',
    leaderboard: 'لوحة الصدارة',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    back: 'رجوع',
    save: 'حفظ',
    cancel: 'إلغاء',
    continue: 'متابعة',
    
    // Onboarding
    welcomeTitle: 'مرحباً بك في SkillLink!',
    welcomeSubtitle: 'حول وقت الشاشة إلى وقت للمهارات!',
    getStarted: 'ابدأ الآن',
    
    // Auth
    loginTitle: 'مرحباً بعودتك!',
    signupTitle: 'إنشاء حساب',
    username: 'اسم المستخدم',
    password: 'كلمة المرور',
    name: 'الاسم',
    age: 'العمر',
    iAmAKid: 'أنا طفل',
    iAmAParent: 'أنا والد/والدة',
    iAmACreator: 'أنا منشئ محتوى',
    
    // Creator
    creatorDashboard: 'لوحة المنشئ',
    myCourses: 'دوراتي',
    createCourse: 'إنشاء دورة',
    earnings: 'الأرباح',
    totalEarnings: 'إجمالي الأرباح',
    studentsEnrolled: 'الطلاب المسجلون',
    publishedCourses: 'الدورات المنشورة',
    courseTitle: 'عنوان الدورة',
    courseDescription: 'وصف الدورة',
    courseCategory: 'فئة الدورة',
    addLesson: 'إضافة درس',
    lessonTitle: 'عنوان الدرس',
    publish: 'نشر',
    draft: 'مسودة',
    createNewCourse: 'إنشاء دورة جديدة',
    editCourse: 'تعديل الدورة',
    courseAnalytics: 'تحليلات الدورة',
    revenuePerStudent: 'الإيرادات لكل طالب',
    byCreator: 'بواسطة',
    enrollNow: 'التسجيل الآن',
    enrolled: 'مسجل',
    
    // Home Screen
    welcomeTo: 'مرحباً بك في SkillLink،',
    points: 'النقاط',
    streak: 'السلسلة',
    badges: 'الشارات',
    todaysProgress: 'تقدم اليوم',
    keepGoing: 'استمر! أنت على وشك الانتهاء!',
    quickActions: 'إجراءات سريعة',
    recentBadges: 'الشارات الأخيرة',
    viewAll: 'عرض الكل',
    
    // Quests
    dailyQuests: 'المهام اليومية',
    completeMissions: 'أكمل المهام لكسب النقاط!',
    todaysMissions: 'مهام اليوم',
    autoAssignedMissions: 'المهام المعينة تلقائياً',
    completeToday: 'أكمل',
    newQuestsTomorrow: 'المهام المختارة لك! مهام جديدة غداً.',
    bonusChallenge: 'تحدي إضافي!',
    completeAllQuests: 'أكمل جميع المهام اليوم',
    bonusPoints: 'نقاط إضافية',
    upNext: 'التالي!',
    locked: 'مقفل',
    done: 'تم',
    
    // Courses
    learningPaths: 'مسارات التعلم',
    chooseJourney: 'اختر رحلة التعلم الخاصة بك!',
    learnYourWay: 'تعلم بطريقتك',
    selfDirectedCourses: 'دورات ذاتية - تعلم بالسرعة التي تناسبك!',
    chooseLearningPath: 'اختر مساراً للتعلم',
    continueLearning: 'متابعة التعلم',
    newCourses: 'دورات جديدة!',
    coursesAvailable: 'دورات متاحة',
    lessonsComplete: 'دروس مكتملة',
    
    // Leaderboard
    topLearners: 'أفضل المتعلمين هذا الأسبوع',
    thisWeek: 'هذا الأسبوع',
    dayStreak: 'يوم متتالي',
    keepGoingMessage: 'استمر!',
    pointsAway: 'نقطة من المركز الخامس!',
    
    // Profile/Customization
    customizeAvatar: 'تخصيص الصورة الرمزية',
    makeItYou: 'اجعلها فريدة!',
    hairStyle: 'تسريحة الشعر',
    skinTone: 'لون البشرة',
    outfit: 'الزي',
    saveAvatar: 'حفظ الصورة الرمزية',
    
    // Settings
    appearance: 'المظهر',
    theme: 'السمة',
    lightMode: 'الوضع الفاتح',
    darkMode: 'الوضع الداكن',
    colorTheme: 'سمة اللون',
    language: 'اللغة',
    languageRegion: 'اللغة والمنطقة',
    social: 'اجتماعي',
    addFriends: 'إضافة أصدقاء',
    connectWithLearners: 'تواصل مع متعلمين آخرين',
    notifications: 'الإشعارات',
    pushNotifications: 'الإشعارات الفورية',
    questReminders: 'احصل على تذكيرات للمهام اليومية',
    privacySecurity: 'الخصوصية والأمان',
    parentalControls: 'الرقابة الأبوية',
    manageRestrictions: 'إدارة القيود',
    helpSupport: 'المساعدة والدعم',
    helpCenter: 'مركز المساعدة',
    faqsTutorials: 'الأسئلة الشائعة والدروس',
    account: 'الحساب',
    signOut: 'تسجيل الخروج',
    logOutAccount: 'تسجيل الخروج من حسابك',
    madeWithLove: 'صنع بـ ❤️ للمتعلمين الصغار',
    
    // Quest Details
    difficulty: 'الصعوبة',
    easy: 'سهل',
    medium: 'متوسط',
    hard: 'صعب',
    instructions: 'التعليمات',
    tips: 'نصائح',
    markComplete: 'وضع علامة مكتمل',
    startChallenge: 'بدء التحدي',
    
    // Categories
    personalCare: 'العناية الشخصية',
    responsibility: 'المسؤولية',
    learning: 'التعلم',
    creativity: 'الإبداع',
    socialSkills: 'المهارات الاجتماعية',
    teamwork: 'العمل الجماعي',
    dailyHabits: 'العادات اليومية',
    emotions: 'العواطف',
    problemSolving: 'حل المشكلات',
    communication: 'التواصل',
  },
  
  ko: {
    // Common
    home: '홈',
    quests: '퀘스트',
    courses: '코스',
    leaderboard: '리더보드',
    profile: '프로필',
    settings: '설정',
    back: '뒤로',
    save: '저장',
    cancel: '취소',
    continue: '계속',
    
    // Onboarding
    welcomeTitle: 'SkillLink에 오신 것을 환영합니다!',
    welcomeSubtitle: '화면 시간을 스킬 시간으로 바꾸세요!',
    getStarted: '시작하기',
    
    // Auth
    loginTitle: '다시 오신 것을 환영합니다!',
    signupTitle: '계정 만들기',
    username: '사용자 이름',
    password: '비밀번호',
    name: '이름',
    age: '나이',
    iAmAKid: '어린이입니다',
    iAmAParent: '부모입니다',
    iAmACreator: '크리에이터입니다',
    
    // Creator
    creatorDashboard: '크리에이터 대시보드',
    myCourses: '내 코스',
    createCourse: '코스 만들기',
    earnings: '수익',
    totalEarnings: '총 수익',
    studentsEnrolled: '등록된 학생',
    publishedCourses: '게시된 코스',
    courseTitle: '코스 제목',
    courseDescription: '코스 설명',
    courseCategory: '코스 카테고리',
    addLesson: '레슨 추가',
    lessonTitle: '레슨 제목',
    publish: '게시',
    draft: '초안',
    createNewCourse: '새 코스 만들기',
    editCourse: '코스 수정',
    courseAnalytics: '코스 분석',
    revenuePerStudent: '학생당 수익',
    byCreator: '작성자',
    enrollNow: '지금 등록',
    enrolled: '등록됨',
    
    // Home Screen
    welcomeTo: 'SkillLink에 오신 것을 환영합니다,',
    points: '포인트',
    streak: '연속',
    badges: '배지',
    todaysProgress: '오늘의 진행 상황',
    keepGoing: '계속하세요! 거의 다 했어요!',
    quickActions: '빠른 작업',
    recentBadges: '최근 배지',
    viewAll: '모두 보기',
    
    // Quests
    dailyQuests: '일일 퀘스트',
    completeMissions: '미션을 완료하고 포인트를 받으세요!',
    todaysMissions: '오늘의 미션',
    autoAssignedMissions: '자동 할당된 미션',
    completeToday: '오늘의',
    newQuestsTomorrow: '퀘스트를 완료하세요! 내일 새로운 퀘스트가 나옵니다.',
    bonusChallenge: '보너스 도전!',
    completeAllQuests: '오늘의 모든 퀘스트 완료',
    bonusPoints: '보너스 포인트',
    upNext: '다음!',
    locked: '잠김',
    done: '완료',
    
    // Courses
    learningPaths: '학습 경로',
    chooseJourney: '나만의 학습 여정을 선택하세요!',
    learnYourWay: '나만의 방식으로 배우기',
    selfDirectedCourses: '자기주도 학습 - 나만의 속도로 배우세요!',
    chooseLearningPath: '학습 경로 선택',
    continueLearning: '학습 계속하기',
    newCourses: '새로운 코스!',
    coursesAvailable: '사용 가능한 코스',
    lessonsComplete: '완료된 레슨',
    
    // Leaderboard
    topLearners: '이번 주 상위 학습자',
    thisWeek: '이번 주',
    dayStreak: '일 연속',
    keepGoingMessage: '계속하세요!',
    pointsAway: '포인트 차이로 5위!',
    
    // Profile/Customization
    customizeAvatar: '아바타 커스터마이징',
    makeItYou: '나만의 것으로 만드세요!',
    hairStyle: '헤어 스타일',
    skinTone: '피부톤',
    outfit: '의상',
    saveAvatar: '아바타 저장',
    
    // Settings
    appearance: '외관',
    theme: '테마',
    lightMode: '라이트 모드',
    darkMode: '다크 모드',
    colorTheme: '색상 테마',
    language: '언어',
    languageRegion: '언어 및 지역',
    social: '소셜',
    addFriends: '친구 추가',
    connectWithLearners: '다른 학습자와 연결',
    notifications: '알림',
    pushNotifications: '푸시 알림',
    questReminders: '일일 퀘스트 알림 받기',
    privacySecurity: '개인정보 및 보안',
    parentalControls: '자녀 보호 기능',
    manageRestrictions: '제한 관리',
    helpSupport: '도움말 및 지원',
    helpCenter: '도움말 센터',
    faqsTutorials: 'FAQ 및 튜토리얼',
    account: '계정',
    signOut: '로그아웃',
    logOutAccount: '계정에서 로그아웃',
    madeWithLove: '어린 학습자를 위해 ❤️로 만들었습니다',
    
    // Quest Details
    difficulty: '난이도',
    easy: '쉬움',
    medium: '보통',
    hard: '어려움',
    instructions: '지침',
    tips: '팁',
    markComplete: '완료 표시',
    startChallenge: '도전 시작',
    
    // Categories
    personalCare: '개인 관리',
    responsibility: '책임',
    learning: '학습',
    creativity: '창의성',
    socialSkills: '사회성 기술',
    teamwork: '팀워크',
    dailyHabits: '일상 습관',
    emotions: '감정',
    problemSolving: '문제 해결',
    communication: '의사소통',
  },
  
  sv: {
    // Common
    home: 'Hem',
    quests: 'Uppdrag',
    courses: 'Kurser',
    leaderboard: 'Topplista',
    profile: 'Profil',
    settings: 'Inställningar',
    back: 'Tillbaka',
    save: 'Spara',
    cancel: 'Avbryt',
    continue: 'Fortsätt',
    
    // Onboarding
    welcomeTitle: 'Välkommen till SkillLink!',
    welcomeSubtitle: 'Förvandla skärmtid till färdighetstid!',
    getStarted: 'Kom igång',
    
    // Auth
    loginTitle: 'Välkommen tillbaka!',
    signupTitle: 'Skapa konto',
    username: 'Användarnamn',
    password: 'Lösenord',
    name: 'Namn',
    age: 'Ålder',
    iAmAKid: 'Jag är ett barn',
    iAmAParent: 'Jag är en förälder',
    iAmACreator: 'Jag är en skapare',
    
    // Creator
    creatorDashboard: 'Skapare-instrumentpanel',
    myCourses: 'Mina kurser',
    createCourse: 'Skapa kurs',
    earnings: 'Intäkter',
    totalEarnings: 'Totala intäkter',
    studentsEnrolled: 'Inskrivna studenter',
    publishedCourses: 'Publicerade kurser',
    courseTitle: 'Kurstitel',
    courseDescription: 'Kursbeskrivning',
    courseCategory: 'Kurskategori',
    addLesson: 'Lägg till lektion',
    lessonTitle: 'Lektionstitel',
    publish: 'Publicera',
    draft: 'Utkast',
    createNewCourse: 'Skapa ny kurs',
    editCourse: 'Redigera kurs',
    courseAnalytics: 'Kursanalys',
    revenuePerStudent: 'Intäkter per student',
    byCreator: 'av',
    enrollNow: 'Anmäl dig nu',
    enrolled: 'Inskrivna',
    
    // Home Screen
    welcomeTo: 'Välkommen till SkillLink,',
    points: 'Poäng',
    streak: 'Serie',
    badges: 'Märken',
    todaysProgress: 'Dagens framsteg',
    keepGoing: 'Fortsätt! Du är nästan där!',
    quickActions: 'Snabbåtgärder',
    recentBadges: 'Senaste märken',
    viewAll: 'Visa alla',
    
    // Quests
    dailyQuests: 'Dagliga uppdrag',
    completeMissions: 'Slutför uppdrag för att tjäna poäng!',
    todaysMissions: 'Dagens uppdrag',
    autoAssignedMissions: 'Automatiskt tilldelade uppdrag',
    completeToday: 'Slutför dagens',
    newQuestsTomorrow: 'uppdrag valda för dig! Nya uppdrag imorgon.',
    bonusChallenge: 'Bonusutmaning!',
    completeAllQuests: 'Slutför alla dagens uppdrag',
    bonusPoints: 'Bonuspoäng',
    upNext: 'Nästa!',
    locked: 'Låst',
    done: 'Klart',
    
    // Courses
    learningPaths: 'Lärandevägar',
    chooseJourney: 'Välj din egen läranderes!',
    learnYourWay: 'Lär dig på ditt sätt',
    selfDirectedCourses: 'Självstyrda kurser - Lär dig i din egen takt!',
    chooseLearningPath: 'Välj en lärandeväg',
    continueLearning: 'Fortsätt lära',
    newCourses: 'Nya kurser!',
    coursesAvailable: 'tillgängliga kurser',
    lessonsComplete: 'lektioner slutförda',
    
    // Leaderboard
    topLearners: 'Toppinlärare denna vecka',
    thisWeek: 'Denna vecka',
    dayStreak: 'dagars serie',
    keepGoingMessage: 'Fortsätt så!',
    pointsAway: 'poäng från 5:e plats!',
    
    // Profile/Customization
    customizeAvatar: 'Anpassa avatar',
    makeItYou: 'Gör den unik!',
    hairStyle: 'Frisyr',
    skinTone: 'Hudton',
    outfit: 'Outfit',
    saveAvatar: 'Spara avatar',
    
    // Settings
    appearance: 'Utseende',
    theme: 'Tema',
    lightMode: 'Ljust läge',
    darkMode: 'Mörkt läge',
    colorTheme: 'Färgtema',
    language: 'Språk',
    languageRegion: 'Språk & region',
    social: 'Socialt',
    addFriends: 'Lägg till vänner',
    connectWithLearners: 'Anslut med andra inlärare',
    notifications: 'Aviseringar',
    pushNotifications: 'Push-aviseringar',
    questReminders: 'Få påminnelser om dagliga uppdrag',
    privacySecurity: 'Integritet & säkerhet',
    parentalControls: 'Föräldrakontroller',
    manageRestrictions: 'Hantera begränsningar',
    helpSupport: 'Hjälp & support',
    helpCenter: 'Hjälpcenter',
    faqsTutorials: 'Vanliga frågor och handledningar',
    account: 'Konto',
    signOut: 'Logga ut',
    logOutAccount: 'Logga ut från ditt konto',
    madeWithLove: 'Gjord med ❤️ för unga inlärare',
    
    // Quest Details
    difficulty: 'Svårighetsgrad',
    easy: 'Lätt',
    medium: 'Medel',
    hard: 'Svår',
    instructions: 'Instruktioner',
    tips: 'Tips',
    markComplete: 'Markera som slutförd',
    startChallenge: 'Starta utmaning',
    
    // Categories
    personalCare: 'Personlig vård',
    responsibility: 'Ansvar',
    learning: 'Lärande',
    creativity: 'Kreativitet',
    socialSkills: 'Sociala färdigheter',
    teamwork: 'Teamwork',
    dailyHabits: 'Dagliga vanor',
    emotions: 'Känslor',
    problemSolving: 'Problemlösning',
    communication: 'Kommunikation',
  },
  
  nl: {
    // Common
    home: 'Home',
    quests: 'Quests',
    courses: 'Cursussen',
    leaderboard: 'Klassement',
    profile: 'Profiel',
    settings: 'Instellingen',
    back: 'Terug',
    save: 'Opslaan',
    cancel: 'Annuleren',
    continue: 'Doorgaan',
    
    // Onboarding
    welcomeTitle: 'Welkom bij SkillLink!',
    welcomeSubtitle: 'Verander schermtijd in vaardigheidstijd!',
    getStarted: 'Aan de slag',
    
    // Auth
    loginTitle: 'Welkom terug!',
    signupTitle: 'Account aanmaken',
    username: 'Gebruikersnaam',
    password: 'Wachtwoord',
    name: 'Naam',
    age: 'Leeftijd',
    iAmAKid: 'Ik ben een kind',
    iAmAParent: 'Ik ben een ouder',
    iAmACreator: 'Ik ben een maker',
    
    // Creator
    creatorDashboard: 'Maker-dashboard',
    myCourses: 'Mijn cursussen',
    createCourse: 'Cursus maken',
    earnings: 'Inkomsten',
    totalEarnings: 'Totale inkomsten',
    studentsEnrolled: 'Ingeschreven studenten',
    publishedCourses: 'Gepubliceerde cursussen',
    courseTitle: 'Cursustitel',
    courseDescription: 'Cursusbeschrijving',
    courseCategory: 'Cursuscategorie',
    addLesson: 'Les toevoegen',
    lessonTitle: 'Lestitel',
    publish: 'Publiceren',
    draft: 'Concept',
    createNewCourse: 'Nieuwe cursus maken',
    editCourse: 'Cursus bewerken',
    courseAnalytics: 'Cursusanalyse',
    revenuePerStudent: 'Inkomsten per student',
    byCreator: 'door',
    enrollNow: 'Nu inschrijven',
    enrolled: 'Ingeschreven',
    
    // Home Screen
    welcomeTo: 'Welkom bij SkillLink,',
    points: 'Punten',
    streak: 'Reeks',
    badges: 'Badges',
    todaysProgress: 'Voortgang van vandaag',
    keepGoing: 'Ga zo door! Je bent er bijna!',
    quickActions: 'Snelle acties',
    recentBadges: 'Recente badges',
    viewAll: 'Alles bekijken',
    
    // Quests
    dailyQuests: 'Dagelijkse quests',
    completeMissions: 'Voltooi missies om punten te verdienen!',
    todaysMissions: 'Missies van vandaag',
    autoAssignedMissions: 'Automatisch toegewezen missies',
    completeToday: 'Voltooi vandaag de',
    newQuestsTomorrow: 'quests speciaal voor jou! Morgen nieuwe quests.',
    bonusChallenge: 'Bonusuitdaging!',
    completeAllQuests: 'Voltooi alle quests vandaag',
    bonusPoints: 'Bonuspunten',
    upNext: 'Volgende!',
    locked: 'Vergrendeld',
    done: 'Klaar',
    
    // Courses
    learningPaths: 'Leerpaden',
    chooseJourney: 'Kies je eigen leerreis!',
    learnYourWay: 'Leer op jouw manier',
    selfDirectedCourses: 'Zelfgestuurde cursussen - Leer in je eigen tempo!',
    chooseLearningPath: 'Kies een leerpad',
    continueLearning: 'Doorgaan met leren',
    newCourses: 'Nieuwe cursussen!',
    coursesAvailable: 'beschikbare cursussen',
    lessonsComplete: 'lessen voltooid',
    
    // Leaderboard
    topLearners: 'Toplerenden deze week',
    thisWeek: 'Deze week',
    dayStreak: 'dagen reeks',
    keepGoingMessage: 'Ga zo door!',
    pointsAway: 'punten van de 5e plaats!',
    
    // Profile/Customization
    customizeAvatar: 'Avatar aanpassen',
    makeItYou: 'Maak het uniek!',
    hairStyle: 'Haarstijl',
    skinTone: 'Huidskleur',
    outfit: 'Outfit',
    saveAvatar: 'Avatar opslaan',
    
    // Settings
    appearance: 'Uiterlijk',
    theme: 'Thema',
    lightMode: 'Lichte modus',
    darkMode: 'Donkere modus',
    colorTheme: 'Kleurenthema',
    language: 'Taal',
    languageRegion: 'Taal & regio',
    social: 'Sociaal',
    addFriends: 'Vrienden toevoegen',
    connectWithLearners: 'Verbind met andere lerenden',
    notifications: 'Meldingen',
    pushNotifications: 'Pushmeldingen',
    questReminders: 'Ontvang herinneringen voor dagelijkse quests',
    privacySecurity: 'Privacy & beveiliging',
    parentalControls: 'Ouderlijk toezicht',
    manageRestrictions: 'Beperkingen beheren',
    helpSupport: 'Hulp & ondersteuning',
    helpCenter: 'Helpcentrum',
    faqsTutorials: 'Veelgestelde vragen en tutorials',
    account: 'Account',
    signOut: 'Uitloggen',
    logOutAccount: 'Uitloggen van je account',
    madeWithLove: 'Gemaakt met ❤️ voor jonge lerenden',
    
    // Quest Details
    difficulty: 'Moeilijkheidsgraad',
    easy: 'Makkelijk',
    medium: 'Gemiddeld',
    hard: 'Moeilijk',
    instructions: 'Instructies',
    tips: 'Tips',
    markComplete: 'Markeren als voltooid',
    startChallenge: 'Start uitdaging',
    
    // Categories
    personalCare: 'Persoonlijke verzorging',
    responsibility: 'Verantwoordelijkheid',
    learning: 'Leren',
    creativity: 'Creativiteit',
    socialSkills: 'Sociale vaardigheden',
    teamwork: 'Teamwork',
    dailyHabits: 'Dagelijkse gewoonten',
    emotions: 'Emoties',
    problemSolving: 'Probleemoplossing',
    communication: 'Communicatie',
  },
};

export function useTranslation(language: Language = 'en') {
  return translations[language] || translations.en;
}
