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
