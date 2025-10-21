
export type View = 'write' | 'progress' | 'learn';

export interface CriterionFeedback {
  score: number;
  feedback: string;
  suggestions: string[];
}

export interface IELTSFeedback {
  overallBandScore: number;
  taskAchievement: CriterionFeedback;
  coherenceAndCohesion: CriterionFeedback;
  lexicalResource: CriterionFeedback;
  grammaticalRangeAndAccuracy: CriterionFeedback;
  modelAnswer: string;
}

export interface Essay {
  id: string;
  prompt: string;
  text: string;
  feedback: IELTSFeedback;
  date: string;
}
