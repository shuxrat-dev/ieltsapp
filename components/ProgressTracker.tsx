
import React from 'react';
import { Essay } from '../types';
import { Card } from './ui/Card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ProgressTrackerProps {
  essays: Essay[];
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = ({ essays }) => {
  const chartData = essays.map((essay, index) => ({
    name: `Essay ${index + 1}`,
    Overall: essay.feedback.overallBandScore,
    'Task Achievement': essay.feedback.taskAchievement.score,
    'Cohesion': essay.feedback.coherenceAndCohesion.score,
    'Lexical': essay.feedback.lexicalResource.score,
    'Grammar': essay.feedback.grammaticalRangeAndAccuracy.score,
  }));

  if (essays.length === 0) {
    return (
      <Card>
        <div className="text-center py-12">
            <h2 className="text-2xl font-bold">No essays submitted yet.</h2>
            <p className="mt-2 text-secondary-light dark:text-secondary-dark">Start writing to track your progress!</p>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="text-2xl font-bold mb-4">Your Progress Over Time</h2>
        <div style={{ width: '100%', height: 400 }}>
          <ResponsiveContainer>
            <LineChart
              data={chartData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.2)" />
              <XAxis dataKey="name" stroke="currentColor" />
              <YAxis domain={[0, 9]} stroke="currentColor" />
              <Tooltip
                contentStyle={{
                    backgroundColor: 'rgba(22, 27, 34, 0.8)',
                    borderColor: '#30363d',
                    borderRadius: '10px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="Overall" stroke="#ff4560" strokeWidth={3} />
              <Line type="monotone" dataKey="Task Achievement" stroke="#008ffb" />
              <Line type="monotone" dataKey="Cohesion" stroke="#00e396" />
              <Line type="monotone" dataKey="Lexical" stroke="#feb019" />
              <Line type="monotone" dataKey="Grammar" stroke="#775dd0" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
      
      <Card>
        <h2 className="text-2xl font-bold mb-4">Submission History</h2>
        <div className="overflow-x-auto">
            <table className="w-full text-left">
                <thead>
                    <tr className="border-b border-border-light dark:border-border-dark">
                        <th className="p-3">Date</th>
                        <th className="p-3">Overall Score</th>
                        <th className="p-3">Prompt</th>
                    </tr>
                </thead>
                <tbody>
                    {essays.slice().reverse().map(essay => (
                        <tr key={essay.id} className="border-b border-border-light dark:border-border-dark hover:bg-gray-500/10 transition-colors">
                            <td className="p-3 whitespace-nowrap">{new Date(essay.date).toLocaleDateString()}</td>
                            <td className="p-3 font-bold text-lg">{essay.feedback.overallBandScore.toFixed(1)}</td>
                            <td className="p-3 truncate max-w-sm">{essay.prompt}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
};
