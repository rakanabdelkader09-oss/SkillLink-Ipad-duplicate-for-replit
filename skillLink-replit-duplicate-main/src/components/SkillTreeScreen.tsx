import { ArrowLeft, Star, TrendingUp, Heart, Home, GraduationCap, Palette, Users } from 'lucide-react';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';

interface SkillTreeScreenProps {
  onBack: () => void;
  skillLevels: SkillLevels;
}

export interface SkillLevels {
  'Personal Care': { xp: number; level: number; streak: number };
  'Responsibility': { xp: number; level: number; streak: number };
  'Learning': { xp: number; level: number; streak: number };
  'Creativity': { xp: number; level: number; streak: number };
  'Social Skills': { xp: number; level: number; streak: number };
}

const XP_PER_LEVEL = 100;

export function SkillTreeScreen({ onBack, skillLevels }: SkillTreeScreenProps) {
  const skills = [
    { 
      name: 'Personal Care' as keyof SkillLevels,
      icon: Heart, 
      color: 'from-[#2563eb] to-[#1d4ed8]',
      bgColor: 'bg-blue-100',
      textColor: 'text-[#2563eb]',
      borderColor: 'border-blue-300'
    },
    { 
      name: 'Responsibility' as keyof SkillLevels,
      icon: Home, 
      color: 'from-orange-400 to-orange-500',
      bgColor: 'bg-orange-100',
      textColor: 'text-orange-700',
      borderColor: 'border-orange-300'
    },
    { 
      name: 'Learning' as keyof SkillLevels,
      icon: GraduationCap, 
      color: 'from-purple-400 to-purple-500',
      bgColor: 'bg-purple-100',
      textColor: 'text-purple-700',
      borderColor: 'border-purple-300'
    },
    { 
      name: 'Creativity' as keyof SkillLevels,
      icon: Palette, 
      color: 'from-pink-400 to-pink-500',
      bgColor: 'bg-pink-100',
      textColor: 'text-pink-700',
      borderColor: 'border-pink-300'
    },
    { 
      name: 'Social Skills' as keyof SkillLevels,
      icon: Users, 
      color: 'from-red-400 to-red-500',
      bgColor: 'bg-red-100',
      textColor: 'text-red-700',
      borderColor: 'border-red-300'
    },
  ];

  const getProgressToNextLevel = (xp: number) => {
    const currentLevelXP = xp % XP_PER_LEVEL;
    return (currentLevelXP / XP_PER_LEVEL) * 100;
  };

  const getTotalLevel = () => {
    return Object.values(skillLevels).reduce((sum, skill) => sum + skill.level, 0);
  };

  return (
    <div className="h-full bg-gradient-to-b from-purple-50 to-white pb-20 overflow-y-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 px-6 pt-12 pb-8 rounded-b-[3rem] shadow-lg">
        <button onClick={onBack} className="text-white mb-4 flex items-center gap-2">
          <ArrowLeft size={20} />
          Back
        </button>
        
        <div className="text-center">
          <div className="text-6xl mb-3">🌟</div>
          <h2 className="text-white mb-2">Skill Tree</h2>
          <p className="text-purple-100 mb-4">Level up your life skills!</p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-3 inline-block">
            <div className="flex items-center gap-2">
              <Star size={20} className="text-yellow-300" fill="currentColor" />
              <span className="text-white">Total Level: {getTotalLevel()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Skills List */}
      <div className="px-6 mt-6 space-y-4">
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 border-2 border-blue-300 rounded-2xl p-4 mb-2">
          <h3 className="text-blue-700 mb-1">📈 Track Your Growth</h3>
          <p className="text-blue-600 text-sm">Complete quests to earn XP and level up each skill!</p>
        </div>

        {skills.map((skill) => {
          const Icon = skill.icon;
          const skillData = skillLevels[skill.name];
          const progress = getProgressToNextLevel(skillData.xp);
          const xpToNextLevel = XP_PER_LEVEL - (skillData.xp % XP_PER_LEVEL);

          return (
            <div 
              key={skill.name}
              className={`bg-white rounded-3xl p-6 shadow-md border-2 ${skill.borderColor}`}
            >
              {/* Skill Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-2xl bg-gradient-to-br ${skill.bgColor}`}>
                  <Icon size={28} className={skill.textColor} />
                </div>
                <div className="flex-1">
                  <h3 className={skill.textColor}>{skill.name}</h3>
                  <p className="text-slate-500 text-sm">Level {skillData.level}</p>
                </div>
                <div className="text-right">
                  <Badge className={`bg-gradient-to-r ${skill.color} text-white`}>
                    {skillData.xp} XP
                  </Badge>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-slate-600 text-sm">Progress to Level {skillData.level + 1}</span>
                  <span className="text-slate-500 text-sm">{xpToNextLevel} XP needed</span>
                </div>
                <Progress value={progress} className="h-3" />
              </div>

              {/* Streak */}
              {skillData.streak > 0 && (
                <div className={`${skill.bgColor} rounded-xl px-4 py-2 flex items-center gap-2`}>
                  <span className="text-xl">🔥</span>
                  <span className={skill.textColor}>
                    {skillData.streak} day streak!
                  </span>
                </div>
              )}

              {/* Milestones */}
              {skillData.level >= 5 && (
                <div className="mt-3 flex items-center gap-2">
                  <TrendingUp size={16} className="text-green-600" />
                  <span className="text-green-700 text-sm">
                    {skillData.level >= 10 ? 'Master Level!' : 'Expert Level!'}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Overall Stats */}
        <div className="bg-gradient-to-r from-yellow-100 to-orange-100 border-2 border-yellow-300 rounded-3xl p-6 mt-6">
          <h3 className="text-orange-700 mb-4 text-center">🏆 Overall Progress</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-4 text-center">
              <p className="text-slate-600 text-sm mb-1">Total XP</p>
              <p className="text-orange-600 text-2xl">
                {Object.values(skillLevels).reduce((sum, skill) => sum + skill.xp, 0)}
              </p>
            </div>
            <div className="bg-white rounded-2xl p-4 text-center">
              <p className="text-slate-600 text-sm mb-1">Active Streaks</p>
              <p className="text-orange-600 text-2xl">
                {Object.values(skillLevels).filter(skill => skill.streak > 0).length}
              </p>
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-6 text-center shadow-lg mb-6">
          <p className="text-white text-lg mb-2">Keep up the amazing work! 💪</p>
          <p className="text-purple-100 text-sm">
            You're building skills that will last a lifetime!
          </p>
        </div>
      </div>
    </div>
  );
}
