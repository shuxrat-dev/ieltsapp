
import React, { useState, useMemo } from 'react';
import { IELTS_PROMPTS } from '../constants';
import { getIELTSFeedback } from '../services/geminiService';
import { useTimer } from '../hooks/useTimer';
import { Essay, IELTSFeedback } from '../types';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { FeedbackDisplay } from './FeedbackDisplay';

interface WritingAreaProps {
  onEssaySubmit: (essay: Essay) => void;
}

export const WritingArea: React.FC<WritingAreaProps> = ({ onEssaySubmit }) => {
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [essayText, setEssayText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<IELTSFeedback | null>(null);
  
  const { minutes, seconds, isActive, start, pause, reset } = useTimer(40);

  const currentPrompt = useMemo(() => IELTS_PROMPTS[currentPromptIndex], [currentPromptIndex]);

  const handleNextPrompt = () => {
    setCurrentPromptIndex((prevIndex) => (prevIndex + 1) % IELTS_PROMPTS.length);
    setEssayText('');
    setFeedback(null);
    reset();
  };

  const handleSubmit = async () => {
    if (essayText.trim().length < 50) {
      setError("Please write a longer essay before submitting.");
      return;
    }
    setError(null);
    setIsLoading(true);
    setFeedback(null);
    pause();

    try {
      const result = await getIELTSFeedback(currentPrompt.prompt, essayText);
      setFeedback(result);
      const newEssay: Essay = {
        id: new Date().toISOString(),
        prompt: currentPrompt.prompt,
        text: essayText,
        feedback: result,
        date: new Date().toISOString(),
      };
      onEssaySubmit(newEssay);
    } catch (e: any) {
      setError(e.message || "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const wordCount = useMemo(() => {
    return essayText.trim().split(/\s+/).filter(Boolean).length;
  }, [essayText]);

  return (
    <div className="space-y-8">
      <Card>
        <div className="flex justify-between items-start">
            <div>
                <span className="text-sm font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-red-500">{currentPrompt.type}</span>
                <p className="mt-2 text-lg text-primary-light dark:text-primary-dark">{currentPrompt.prompt}</p>
                 {currentPrompt.image && <img src={currentPrompt.image} alt="IELTS Task 1" className="mt-4 rounded-lg shadow-md max-w-md" />}
            </div>
            <Button onClick={handleNextPrompt} variant="secondary">Next Prompt</Button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="relative">
          <textarea
            value={essayText}
            onChange={(e) => setEssayText(e.target.value)}
            placeholder="Start writing your essay here..."
            className="w-full h-96 p-4 bg-transparent border-none focus:ring-0 resize-none text-primary-light dark:text-primary-dark placeholder-secondary-light dark:placeholder-secondary-dark"
            disabled={isLoading}
          />
          <div className="absolute bottom-6 right-6 text-sm text-secondary-light dark:text-secondary-dark">
            Word Count: {wordCount}
          </div>
        </Card>
        
        <div>
            <Card className="flex flex-col items-center justify-center space-y-4 h-full">
                <div className="text-6xl font-mono tracking-widest text-primary-light dark:text-primary-dark">
                    {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                </div>
                <div className="flex space-x-4">
                    <Button onClick={isActive ? pause : start} variant="secondary">{isActive ? 'Pause' : 'Start Timer'}</Button>
                    <Button onClick={reset} variant="secondary">Reset</Button>
                </div>
                <Button onClick={handleSubmit} isLoading={isLoading} disabled={isLoading || essayText.trim().length === 0}>
                    Get Feedback
                </Button>
                {error && <p className="text-red-500 text-sm mt-4">{error}</p>}
            </Card>
        </div>
      </div>
      
      {feedback && (
        <FeedbackDisplay feedback={feedback} userEssay={essayText} />
      )}
    </div>
  );
};
