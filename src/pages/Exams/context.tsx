import { createContext, useContext } from "react";
import invariant from "tiny-invariant";
import { ExamsState } from "./types";

export const ExamsContext = createContext<ExamsState | null>(null);

export function useExamsContext() {
  const ctx = useContext(ExamsContext);

  invariant(ctx, "você deve estar dentro do contexto para usar o contexto do exams");

  return ctx;
}
