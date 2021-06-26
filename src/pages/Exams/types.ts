import { Dispatch, SetStateAction } from "react";

interface Exam {
  id: number;
  title: string;
  description: string;
  startedAt: string;
  endedAt?: string;
  allowAnonymous: boolean;
  groups: QuestionGroup[];
  targets: ExamTargetAfterCreated[];
}

interface ExamsState {
  exam?: Exam;
  setExam: Dispatch<SetStateAction<Exam | undefined>>;
}

interface QuestionGroup {
  title: string;
  type: "noType" | "class" | "personal";
  questions: Question[];
  id: number;
  class: boolean;
  personal: boolean;
}

interface Question {
  required: boolean;
  statement: string;
  imageUrl: string;
  imageAlt: string;
  groupId: number;
  id?: number;
}

interface ExamRouteParams {
  examId?: string;
  groupId?: string;
}

interface ApiQuestionGroup {
  class: boolean;
  personal: boolean;
  position: number;
  examId: number;
  questions: Question[];
  title: string;
}

interface ExamsToAnswer {
  canAgree: Exam[];
  alreadyAgreed: Exam[];
}

interface CreateExamForm {
  title: string;
  description: string;
  startedAt: string;
  endedAt: string;
  allowAnonymous: boolean;
  targets: string[];
}

type ExamTarget = "Professor" | "Grade" | "Student" | "Course";

interface ExamTargetAfterCreated {
  createdAt: string;
  deletedAt: string | null;
  id: number;
  type: ExamTarget;
  updatedAt: string;
}

export type {
  ExamTarget,
  CreateExamForm,
  ExamsToAnswer,
  ApiQuestionGroup,
  ExamRouteParams,
  ExamsState,
  Exam,
  Question,
  QuestionGroup,
  ExamTargetAfterCreated,
};
