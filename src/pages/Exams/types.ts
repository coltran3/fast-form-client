import { Dispatch, SetStateAction } from "react";

export interface Exam {
  id: number;
  title: string;
  description: string;
  startedAt: string;
  endedAt?: string;
  allowAnonymous: boolean;
  groups: QuestionGroup[];
}

export interface ExamsState {
  exam?: Exam;
  setExam: Dispatch<SetStateAction<Exam | undefined>>;
}

export interface QuestionGroup {
  title: string;
  type: "noType" | "class" | "personal";
  questions: Question[];
  id: number;
}

export interface Question {
  required: boolean;
  statement: string;
  imageUrl: string;
  imageAlt: string;
  groupId: 0;
  id: number;
}

export interface ExamRouteParams {
  examId?: string;
  groupId?: string;
}

export interface ApiQuestionGroup {
  class: boolean;
  personal: boolean;
  position: number;
  examId: number;
  questions: Question[];
  title: string;
}
