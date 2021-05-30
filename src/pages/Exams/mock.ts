import dayjs from "dayjs";
import { Exam } from "./types";

export const mockedExams: Exam[] = new Array(10).map((_, idx) => {
  return {
    id: idx,
    allowAnonymous: Boolean(idx % 2),
    description: `${idx} olha descrição ai gente`,
    groups: new Array(3).map((_, groupIdx) => {
      return {
        title: `${groupIdx} titulo esquece`,
        type: "noType",
        questions: new Array(4).map((_, questionIdx) => {
          return {
            required: true,
            statement: `${idx} statement ${questionIdx} esquece ${groupIdx} `,
            imageUrl: `string`,
            imageAlt: `${idx} imageAlt ${questionIdx} esquece ${groupIdx}`,
            groupId: groupIdx,
            id: questionIdx,
          };
        }),
        id: groupIdx,
      };
    }),
    startedAt: dayjs().add(1, "day").toISOString(),
    title: `titulo ${idx}`,
    endedAt: dayjs().add(2, "day").toISOString(),
  };
});
