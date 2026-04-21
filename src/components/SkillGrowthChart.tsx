import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { SkillLevels } from './SkillTreeScreen';

interface SkillGrowthChartProps {
  skillLevels: SkillLevels;
}

export function SkillGrowthChart({ skillLevels }: SkillGrowthChartProps) {
  const data = [
    { 
      name: 'Personal Care', 
      level: skillLevels['Personal Care'].level,
      xp: skillLevels['Personal Care'].xp,
      color: '#3b82f6'
    },
    { 
      name: 'Responsibility', 
      level: skillLevels['Responsibility'].level,
      xp: skillLevels['Responsibility'].xp,
      color: '#f97316'
    },
    { 
      name: 'Learning', 
      level: skillLevels['Learning'].level,
      xp: skillLevels['Learning'].xp,
      color: '#a855f7'
    },
    { 
      name: 'Creativity', 
      level: skillLevels['Creativity'].level,
      xp: skillLevels['Creativity'].xp,
      color: '#ec4899'
    },
    { 
      name: 'Social Skills', 
      level: skillLevels['Social Skills'].level,
      xp: skillLevels['Social Skills'].xp,
      color: '#ef4444'
    },
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-blue-200">
      <h3 className="text-blue-700 mb-4">📊 Skill Level Progress</h3>
      
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 11 }}
            angle={-15}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            label={{ value: 'Level', angle: -90, position: 'insideLeft' }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip 
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="bg-white p-5 rounded-xl shadow-lg border-2 border-blue-200">
                    <p className="text-slate-700 mb-1">{payload[0].payload.name}</p>
                    <p className="text-blue-600">Level: {payload[0].value}</p>
                    <p className="text-slate-500 text-sm">XP: {payload[0].payload.xp}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Bar dataKey="level" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-4 grid grid-cols-2 gap-5">
        <div className="bg-blue-50 rounded-xl p-5 text-center">
          <p className="text-slate-600 text-sm mb-1">Highest Skill</p>
          <p className="text-blue-700">
            {data.reduce((max, curr) => curr.level > max.level ? curr : max).name}
          </p>
        </div>
        <div className="bg-purple-50 rounded-xl p-5 text-center">
          <p className="text-slate-600 text-sm mb-1">Total Levels</p>
          <p className="text-purple-700">
            {data.reduce((sum, curr) => sum + curr.level, 0)}
          </p>
        </div>
      </div>
    </div>
  );
}
