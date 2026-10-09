export interface QuestionPart {
  partId: string;
  questionText: string;
  marks: number;
  markScheme: string;
  modelAnswer: string;
  keyPoints: string[];
  examinerNotes: string;
  calculatedAnswer?: {
    value: string;
    unit: string;
    tolerance: number; // e.g. 0.03
    sf: number; // significant figures required
  };
}

export interface Paper4Question {
  id: string;
  topic: string;
  title: string;
  totalMarks: number;
  context: string;
  parts: QuestionPart[];
}
