import { Dispatch, SetStateAction } from "react";

export interface Exam {
  id: number;
  title: string;
  description: string;
  startedAt: string;
  endedAt: string;
}

export interface ExamsState {
  exam?: Exam;
  setExam: Dispatch<SetStateAction<Exam | undefined>>;
}

export interface QuestionGroup {
  title: string;
  type: "noType" | "class" | "personal";
  questions: Question[];
}

export interface Question {
  required: boolean;
  statement: string;
  imageUrl: string;
  imageAlt: string;
  groupId: 0;
}
