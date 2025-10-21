
import React, { useState } from 'react';
import { IELTSFeedback } from '../types';
import { Card } from './ui/Card';

interface FeedbackDisplayProps {
  feedback: IELTSFeedback;
  userEssay: string;
}

const CriterionCard: React.FC<{ title: string; score: number; feedback: string; suggestions: string[] }> = ({ title, score, feedback, suggestions }) => (
    <div className="bg-bkg-light dark:bg-bkg-dark p-4 rounded-lg border border-border-light dark:border-border-dark">
        <div className="flex justify-between items-center">
            <h4 className="font-bold text-lg">{title}</h4>
            <span className={`text-xl font-bold px-3 py-1 rounded-full ${score >= 7 ? 'text-green-300 bg-green-900/50' : score >= 5 ? 'text-yellow-300 bg-yellow-900/50' : 'text-red-300 bg-red-900/50'}`}>
                {score.toFixed(1)}
            </span>
        </div>
        <p className="mt-2 text-secondary-light dark:text-secondary-dark">{feedback}</p>
        <div className="mt-4">
            <h5 className="font-semibold mb-2">Suggestions:</h5>
            <ul className="list-disc list-inside space-y-1 text-secondary-light dark:text-secondary-dark">
                {suggestions.map((s, i) => <li key={i}>{s}</li>)}
            </ul>
        </div>
    </div>
);

export const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback }) => {
  const [activeTab, setActiveTab] = useState<'feedback' | 'model'>('feedback');

  return (
    <Card>
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Your Feedback</h2>
        <div className="text-center">
            <p className="text-sm text-secondary-light dark:text-secondary-dark">Overall Band Score</p>
            <p className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-red-400">
                {feedback.overallBandScore.toFixed(1)}
            </p>
        </div>
      </div>

      <div className="border-b border-border-light dark:border-border-dark mt-6 mb-6">
        <nav className="-mb-px flex space-x-8" aria-label="Tabs">
          <button
            onClick={() => setActiveTab('feedback')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'feedback' ? 'border-blue-500 text-blue-500' : 'border-transparent text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark'
            }`}
          >
            Detailed Analysis
          </button>
          <button
            onClick={() => setActiveTab('model')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'model' ? 'border-blue-500 text-blue-500' : 'border-transparent text-secondary-light dark:text-secondary-dark hover:text-primary-light dark:hover:text-primary-dark'
            }`}
          >
            Band 9 Model Answer
          </button>
        </nav>
      </div>

      {activeTab === 'feedback' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <CriterionCard title="Task Achievement" {...feedback.taskAchievement} />
            <CriterionCard title="Coherence & Cohesion" {...feedback.coherenceAndCohesion} />
            <CriterionCard title="Lexical Resource" {...feedback.lexicalResource} />
            <CriterionCard title="Grammatical Range & Accuracy" {...feedback.grammaticalRangeAndAccuracy} />
        </div>
      )}

      {activeTab === 'model' && (
        <div>
            <h3 className="text-xl font-bold mb-4">Band 9 Model Answer</h3>
            <div className="p-4 bg-bkg-light dark:bg-bkg-dark rounded-lg border border-border-light dark:border-border-dark prose dark:prose-invert max-w-none">
                <p>{feedback.modelAnswer}</p>
            </div>
        </div>
      )}
    </Card>
  );
};
