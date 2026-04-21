# SkillLink - Kids Learning App Guidelines

**Tagline:** Turn screen time into skill time! ✨

## Overview
SkillLink is a mobile app prototype designed for children ages 6-12 and their parents, focused on gamifying life skills and education through auto-assigned daily quests, self-directed courses, and rewards with built-in screen time tracking.

## Visual Design System

### Color Palette
- **Primary Blue**: `#3b82f6` - Used for main UI elements
- **Primary Purple**: `#8b5cf6` - Used for accents and gradients
- **Secondary Colors**: Pink, Orange, Green, Red - Used for categorization
- **Backgrounds**: Blue-50, Purple-50, White gradients

### Typography
- Rounded, kid-friendly fonts
- Clear hierarchy with h2, h3, and p tags
- Emoji support throughout

### UI Elements
- **Rounded Corners**: 2xl to 3xl border radius (1rem-1.5rem)
- **Shadows**: Soft shadows for depth (shadow-md, shadow-lg)
- **Gradients**: Used extensively for visual appeal
- **Icons**: Lucide React icons + emoji

## User Flows

### 1. Onboarding & Authentication
1. **Onboarding Screen**: Welcome message with "Get Started" CTA
2. **Login Screen**: Choose between Kid or Parent login
3. **Profile Setup Screen** (Sign Up Only): 
   - Collect name and age only (no avatar customization)
   - For kids: Ages 6-12
   - For parents: Ages 18+, number of children
   - Default avatars assigned automatically
4. **Main Interface**: Navigate to appropriate dashboard
   - Note: Login flow does NOT include profile setup/customization

### 2. Kid User Flow
After profile setup, kids land on the **Home Screen** which shows:
- Personalized greeting with name and avatar
- Points balance (starts at 1,247)
- 7-day streak tracker
- Badge count
- Quick actions to Quests, Courses, Badges, and Leaderboard
- Shop access via sparkle button

#### Daily Quests - Auto-Assigned Missions

**Key Concept**: Quests are **guided daily missions** that are automatically chosen for each child. Kids do NOT pick their own quests - the app assigns 3-5 age-appropriate quests each day that refresh at midnight.

**Quest Assignment System**:
- **Daily Refresh**: New quests assigned every day at midnight
- **Limited Selection**: 3-5 quests per day (based on age and skill levels)
- **No Choice**: Kids can only complete the assigned quests
- **Balanced Categories**: Algorithm ensures variety across all 5 skill categories
- **Progressive Difficulty**: Quests adapt to the child's age and skill progression

Organized into 5 life skill categories:
1. **Personal Care** (Blue) - Hygiene, health, self-care
2. **Responsibility** (Orange) - Chores, organization, duties
3. **Learning** (Purple) - Education, reading, academics
4. **Creativity** (Pink) - Art, writing, expression
5. **Social Skills** (Red) - Kindness, helping, communication

**Age-Based Difficulty System:**
Quests are automatically filtered based on the child's age to ensure age-appropriate challenges:
- **Ages 6-7 (Easy)**: Simple tasks like "Brush your teeth", "Make your bed", "Color a picture"
  - Lower point values (10-15 points)
  - Basic instructions with fewer steps
  - Visual and hands-on activities
  - ⭐ Easy difficulty badge
- **Ages 8-10 (Medium)**: Moderate tasks like "Help with dishes", "Read for 15 minutes", "Draw your favorite animal"
  - Medium point values (15-25 points)
  - More detailed instructions
  - Combination of independence and guidance
  - ⭐⭐ Medium difficulty badge
- **Ages 11-12 (Hard)**: Complex tasks like "Clean and organize your room", "Write a short story (200+ words)", "Do your own laundry"
  - Higher point values (25-40 points)
  - Comprehensive multi-step instructions
  - Greater independence and responsibility
  - ⭐⭐⭐ Hard difficulty badge

Each quest has:
- Icon, title, points value (scaled by difficulty)
- Category badge and difficulty badge
- Age-appropriate instructions
- Two completion modes:
  1. **Simple Mode**: Mark as complete checkbox
  2. **Challenge Mode**: Do it with friends/parents and prove it

#### Challenge Mode (New!)
Kids can turn any quest into a social challenge:
- **Select Participants**: Choose friends, siblings, or parents to challenge
- **Video Proof**: Upload a video showing quest completion
- **Parent Approval**: Parents review videos before awarding points
- **Social Features**: Make learning collaborative and fun

Quest completion flow:
1. View quest details and instructions
2. Choose between "Mark as Complete" or "Start Challenge Mode"
3. If Challenge Mode:
   - Select who to challenge with (friends/parents)
   - Complete the quest together
   - Record video proof
   - Upload video for parent review
4. Parent reviews video and approves/rejects
5. Points awarded upon approval

#### Screen Time Tracker (Brainrot Monitor)

A unique feature that tracks and rewards kids for staying off addictive short-form content:

**What it Tracks:**
- Time spent away from YouTube Shorts, TikTok, Instagram Reels
- Displayed as hours/minutes on home screen
- Visual progress indicator

**Rewards System:**
- **1 hour off**: +10 points
- **3 hours off**: +30 points + streak bonus
- **6 hours off**: +60 points + special badge
- **Full day (24 hours)**: +150 points + "Focus Champion" badge

**Display:**
- Large timer/counter on home screen
- Color-coded: Green (good), Yellow (moderate), Red (needs improvement)
- Daily streak tracking
- Motivational messages

#### Courses - Self-Directed Learning Paths

**Key Concept**: Courses are **longer-term learning paths** that kids can freely choose based on their interests. Unlike auto-assigned quests, courses give kids autonomy and choice.

**Course Features:**
- **Kid's Choice**: Children select which courses to take
- **Multi-Lesson Paths**: 5-10 lessons per course
- **Self-Paced**: Complete lessons at their own speed
- **Diverse Topics**: Creativity, Teamwork, Daily Habits, Science, Art, Music, Coding
- **Progress Tracking**: Visual completion percentage
- **Certificates**: Earn certificates upon course completion

Categories include:
- Math, Reading, Science, Art, Music, etc.
- Video lessons (placeholders)
- Progress tracking
- Course details with lesson lists

#### Badges & Achievements
- Unlockable achievements
- Badge detail screens
- Visual celebration animations

#### Shop System
Three categories:
1. **Cosmetics**: Avatar accessories and outfits (100-350 pts)
2. **Rewards**: Robux conversion and power-ups (80-2,300 pts)
3. **Avatars**: Premium character skins (400-500 pts)

Features:
- Point balance display
- Purchase confirmation
- "Owned" status tracking
- Category tabs (Palette, Crown, Shirt icons)

#### Character Customization
- Hair style selection
- Skin tone selection
- Outfit selection
- Shop access button
- Save functionality

### 3. Parent User Flow
After profile setup, parents land on the **Parent Dashboard** which shows:
- Personalized greeting with name and avatar
- Quick access buttons:
  - Child Profile & Activities
  - **Video Reviews** (with pending count badge)
- Weekly activity chart
- Child's stats (points, streak, badges)
- Today's progress bar
- Recent quest completion history
- Insights and recommendations

#### Video Review System (New!)
Parents can review video submissions from their children:
- **Pending Reviews**: List of quests awaiting approval
- **Video Player**: Watch child's submission
- **Challenge Details**: See who participated
- **Approval Actions**:
  - Approve & Award Points
  - Reject Submission
- **Review History**: Past approved/rejected submissions
- **Notification Badge**: Shows pending review count

## Points & Rewards System

### Earning Points
Points are awarded based on quest difficulty and category:

**Easy Quests (Ages 6-7):**
- Personal Care: 10 points
- Responsibility: 10 points
- Learning: 15 points
- Creativity: 15 points
- Social Skills: 10-15 points

**Medium Quests (Ages 8-10):**
- Personal Care: 15-20 points
- Responsibility: 15 points
- Learning: 20-25 points
- Creativity: 20-25 points
- Social Skills: 15-20 points

**Hard Quests (Ages 11-12):**
- Personal Care: 25 points
- Responsibility: 25-30 points
- Learning: 30-40 points
- Creativity: 35-40 points
- Social Skills: 25-30 points

**Bonus:** +50 points for completing all daily quests

### Spending Points
- **Robux Exchange**: 
  - 100 Robux = 500 pts
  - 250 Robux = 1,200 pts
  - 500 Robux = 2,300 pts
- **Cosmetics**: 100-350 pts
- **Premium Avatars**: 400-500 pts
- **Power-ups**: 80-150 pts

## Navigation Structure

### Bottom Navigation (Kids Only)
5 tabs:
1. **Home**: Dashboard and overview
2. **Quests**: Daily activities
3. **Courses**: Learning modules
4. **Leaderboard**: Competition
5. **Profile**: Character customization + Shop access

### Screens without Bottom Nav
- Onboarding
- Login
- Profile Setup
- Quest Details
- Challenge Mode
- Badge Details
- Course List
- Course Details
- Child Profile (Parent view)
- Video Reviews (Parent view)
- Shop

## Technical Implementation

### State Management
- User type (kid/parent)
- User profile (name, age, default avatar)
- Points balance
- Screen navigation with history
- Quest completion status
- Shop purchases
- Video submissions (pending/approved/rejected)
- Challenge participants

### Key Components
1. **ProfileSetupScreen**: Collects user information (name & age only)
2. **HomeScreen**: Main dashboard
3. **DailyQuestScreen**: Categorized quests
4. **QuestDetailScreen**: Quest instructions with challenge mode option
5. **ChallengeModeScreen**: Select participants & upload video proof
6. **VideoReviewScreen**: Parent interface to review submissions
7. **ShopScreen**: Point exchange system
8. **CharacterCustomizationScreen**: Avatar editor
9. **ParentDashboardScreen**: Analytics for parents with video review access
10. **CoursesScreen**: Educational content
11. **BadgesScreen**: Achievement display

### Data Structures
```typescript
interface UserProfile {
  name: string;
  age: number;
  avatar: string;
  parentName?: string;
  childCount?: number;
}

interface Quest {
  id: number;
  title: string;
  icon: string;
  points: number;
  completed: boolean;
  category: string;
  color: string;
}

interface ShopItem {
  id: string;
  name: string;
  price: number;
  type: 'cosmetic' | 'reward' | 'avatar';
  emoji: string;
  category: string;
  owned: boolean;
  description: string;
}

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
```

## Best Practices

### For Kids
- Clear visual feedback on actions
- Positive reinforcement (emojis, celebrations)
- Progress tracking and streaks
- Safe, age-appropriate content
- Limited text, more visuals
- Reward-based motivation
- Social challenges to increase engagement
- Video proof for accountability

### For Parents
- Detailed analytics
- Progress insights
- Activity monitoring
- Control and oversight
- Video review and approval system
- See who their child is challenging with
- Educational value tracking
- Time/completion metrics
- Safeguarding through approval workflow

## Quest vs Courses Distinction

### Quests (Guided Daily Missions)
- **Auto-assigned** by the app
- **3-5 quests per day** based on age
- **Refresh daily** at midnight
- **No choice** - kids complete assigned missions
- **Skill-building focus** - balanced across categories
- **Quick completion** - 5-30 minutes each
- **Points-driven** - immediate rewards

### Courses (Self-Directed Learning)
- **Kid's choice** - select what interests them
- **Longer paths** - 5-10 lessons per course
- **Self-paced** - no daily pressure
- **Full autonomy** - choose and switch anytime
- **Deep learning** - comprehensive topics
- **Flexible timing** - work through at own speed
- **Certificate rewards** - completion badges

## New Features Implemented
- **App Renamed to SkillLink**: Emphasizes skill-building focus
- **Auto-Assigned Daily Quests**: 3-5 missions assigned daily, refreshes at midnight, no manual selection
- **Screen Time Tracker (Brainrot Monitor)**: Tracks time off YouTube Shorts/TikTok with point rewards
- **Distinct Courses System**: Self-directed learning paths separate from daily quests
- **Authentication System**: Sign up with name/age/password or log in with username/password
- **Age-Based Quest Difficulty**: Quests automatically filter based on child's age (6-7: Easy, 8-10: Medium, 11-12: Hard)
- **Difficulty Indicators**: Visual badges (⭐, ⭐⭐, ⭐⭐⭐) show quest difficulty level
- **Scaled Point Values**: Harder quests for older kids award more points (10-40 range)
- **Age-Appropriate Instructions**: Quest instructions and complexity match the child's age
- **Challenge Mode**: Do quests with friends or parents
- **Video Proof System**: Upload videos to prove quest completion
- **Parent Video Reviews**: Parents approve/reject submissions before awarding points
- **Social Accountability**: Select who you want to challenge with
- **Notification Badges**: Parents see pending review counts

## Future Enhancements
- Multi-child support for parents
- Real-time notifications
- Social features (safe messaging)
- Custom quest creation by parents
- Integration with real Robux API
- Achievement sharing
- Leaderboard competitions with challenges
- Video lesson content
- Quiz and assessment features
- Friend network management
- Video sharing with other participants
