import { useHistory, useParams } from "react-router-dom";
import { Exam, ExamRouteParams, ExamsToAnswer, Question, QuestionGroup } from "../types";
import { useMutation, useQuery } from "react-query";
import { ApiEntityWrapper } from "../../../api/types";
import { apiClient } from "../../../api";
import { PageLoad } from "../../../components/PageLoad";
import { PagesTitle } from "../../../components/PagesTitle";
import { useAuthContext, useNotificationContext } from "../../../stores";
import {
  Card,
  Grid,
  Paper,
  CardContent,
  CardActions,
  Radio,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Tooltip,
  Button,
  TextareaAutosize,
  Checkbox,
  CircularProgress,
} from "@material-ui/core";
import styled from "styled-components";
import { useState } from "react";
import SmsFailedRoundedIcon from "@material-ui/icons/SmsFailedRounded";
import Alert from "@material-ui/lab/Alert";

const StyledDiv = styled.div`
  padding: 1rem;
`;

const Description = styled.div`
  margin: 0 0.5rem;
  color: ${props => props.theme.grey["3"]};
`;

const StyledSmsFailedRoundedIcon = styled(SmsFailedRoundedIcon)`
  margin-left: 1rem;
`;

const InnerCardContent = styled.div`
  display: flex;
  align-item: center;
`;

const InnerAlert = styled.div`
  display: flex;
  flex-direction: column;
`;

const Image = styled.img`
  display: block;
  margin: auto;
`;

type GroupAnswers = Record<string, number>;

interface AnswerType {
  score: number | null;
  questionId: number;
  type: "Answer";
  gradeId?: number;
}

export function Answer() {
  const { examId } = useParams<ExamRouteParams>();
  const { user } = useAuthContext();
  const { push } = useHistory();
  const { showNotification } = useNotificationContext();
  const { data: exam, isLoading: isLoadingExam } = useQuery<ApiEntityWrapper<Exam>>(
    ["exam", examId],
    () => {
      return apiClient.get(`/exam/${examId}`, { headers: { Authorization: `Bearer ${user}` } });
    },
    {
      onSuccess: c => console.log(c),
      enabled: Boolean(examId),
    },
  );
  const [answers, setAnswers] = useState<GroupAnswers>({});
  const { data: examsToAnswer, refetch: refetchExamsToAnswer } = useQuery<ApiEntityWrapper<ExamsToAnswer>>(
    "examToAnswer",
    () => {
      return apiClient.get("/exam/me", { headers: { Authorization: `Bearer ${user}` } });
    },
  );

  const [answerAsAnonymous, setAnswerAsAnonymous] = useState(false);
  const { data: questionGroup, isLoading: isLoadingQuestionGroup } = useQuery<ApiEntityWrapper<QuestionGroup[]>>(
    ["questionGroup", examId],
    _ => {
      return apiClient.get(`/question-group/me/${examId}`, { headers: { Authorization: `Bearer ${user}` } });
    },
    {
      enabled: Boolean(examId),
      onSuccess: newQuestionGroup => {
        console.log(newQuestionGroup.data.data);

        let obj = {};

        newQuestionGroup.data.data.forEach(({ id, questions, grade }) => {
          questions.forEach(({ id: questionId }) => {
            obj = { [`${id}-${questionId}${grade?.id ? `-${grade.id}` : ""}`]: null, ...obj };
          });
        });

        setAnswers(obj);
      },
    },
  );
  const { mutate: agreeToExam, isLoading: isLoadingAgreeToExam } = useMutation(
    () => {
      return apiClient.post(
        "/exam-agreement",
        {
          examId: examId ? parseInt(examId, 10) : "",
          anonymous: exam?.data.data.allowAnonymous ? answerAsAnonymous : false,
        },
        { headers: { Authorization: `Bearer ${user}` } },
      );
    },
    {
      onSuccess: c => {
        console.log(c);
        refetchExamsToAnswer();
      },
      onError: () => {
        showNotification({ message: "Ocorreu algum erro ao tentar começar a responder um exame", type: "error" });
      },
    },
  );

  const [observation, setObservation] = useState("");

  const { mutate: makeObservation, isLoading: isLoadingMakeObservation } = useMutation(
    (data: string) => {
      return apiClient.put(
        `/exam-agreement?examId=${examId}`,
        { observation: data },
        { headers: { Authorization: `Bearer ${user}` } },
      );
    },
    {
      onSuccess: () => {
        showNotification({ message: "Avaliação respondida com sucesso", type: "success" });
        push("/exams");
      },
      onError: () => {
        showNotification({ message: "Houve um erro ao tentar responder a avaliação", type: "error" });
      },
    },
  );

  const { mutate: answer, isLoading: isLoadingAnswer } = useMutation(
    (data: AnswerType[]) => {
      return apiClient.post(`/answer/batch/${examId ? parseInt(examId, 10) : ""}`, data, {
        headers: { Authorization: `Bearer ${user}` },
      });
    },
    {
      onSuccess: () => {
        if (observation) {
          makeObservation(observation);
          return;
        }
        showNotification({ message: "Avaliação respondida com sucesso", type: "success" });
        push("/exams");
      },
      onError: () => {
        showNotification({ message: "Houve um erro ao tentar responder a avaliação", type: "error" });
      },
    },
  );

  if (isLoadingExam || isLoadingQuestionGroup) {
    return <PageLoad />;
  }

  const hasntStarteAnswering = Boolean(
    examsToAnswer &&
      examId &&
      examsToAnswer.data.data.canAgree.findIndex(exam => exam.id === parseInt(examId, 10)) !== -1,
  );

  function submitQuestions() {
    const requiredQuestion: string[] = [];

    questionGroup?.data.data.forEach(({ id, questions, grade }) => {
      questions.forEach(({ id: questionId, required }) => {
        if (required) {
          requiredQuestion.push(`${id}-${questionId}${grade?.id ? `-${grade.id}` : ""}`);
        }
      });
    });

    const requiredNotAnswered = requiredQuestion.reduce((acc: string[], question: string) => {
      if (!Object.keys(answers).includes(question)) {
        acc.push(question);
      }

      return acc;
    }, []);

    if (requiredNotAnswered.length) {
      let question: Question | undefined = undefined;

      questionGroup?.data.data.forEach(({ id, questions }) => {
        if (`${id}` === requiredNotAnswered[0].split("-")[0]) {
          const q = questions.find(({ id: questionId }) => `${questionId}` === requiredNotAnswered[0].split("-")[1]);

          if (q) {
            question = q;
          }
        }
      });

      showNotification({
        message: question
          ? `A pergunta: ${(question as Question).statement} é obrigatória`
          : "Uma pergunta obrigatória ficou sem resposta",
        type: "error",
      });
      return;
    }

    const answersMapped: AnswerType[] = Object.entries(answers).map(([id, answerValue]) => {
      return {
        questionId: parseInt(id.split("-")[1], 10),
        score: Boolean(answerValue) ? answerValue : null,
        type: "Answer",
        gradeId: Boolean(id.split("-")[2]) ? parseInt(id.split("-")[2], 10) : undefined,
      };
    });

    answer(answersMapped);
  }

  if (exam && questionGroup) {
    return (
      <Grid container direction="column" spacing={3}>
        {hasntStarteAnswering && (
          <Alert
            severity="warning"
            action={
              <Button color="inherit" size="small" onClick={() => agreeToExam()}>
                {isLoadingAgreeToExam ? <CircularProgress color="secondary" size={26} /> : "COMEÇAR"}
              </Button>
            }
          >
            <InnerAlert>
              <span>Você ainda não começou a responder esse formulario</span>

              {exam.data.data.allowAnonymous && (
                <FormControlLabel
                  value={answerAsAnonymous}
                  control={<Checkbox color="primary" />}
                  onChange={(_, checked) => setAnswerAsAnonymous(checked)}
                  label="Responder de forma anónima"
                />
              )}
            </InnerAlert>
          </Alert>
        )}
        <Grid item>
          <PagesTitle>{exam.data.data.title}</PagesTitle>

          <Description>{exam.data.data.description}</Description>
        </Grid>
        {questionGroup.data.data.map(({ id, questions, title, grade }) => {
          return (
            <Grid key={id} item xs={12}>
              <Paper elevation={3}>
                <StyledDiv>
                  <Grid container direction="column" spacing={3}>
                    {grade && grade.subject && grade.subject.title && <Grid item>{grade.subject.title}</Grid>}{" "}
                    <Grid item>{title}</Grid>
                    {questions.map(({ id: questionId, statement, required, imageUrl, imageAlt }) => {
                      return (
                        <Grid key={questionId} item>
                          <Card>
                            {Boolean(imageUrl) && <Image src={imageUrl} alt={imageAlt} />}
                            <CardContent>
                              <InnerCardContent>
                                {statement}
                                {required && (
                                  <Tooltip title="Essa pergunta é obrigatória">
                                    <StyledSmsFailedRoundedIcon type="filled" color="primary" />
                                  </Tooltip>
                                )}
                              </InnerCardContent>
                            </CardContent>
                            <CardActions>
                              <FormLabel>Resposta:</FormLabel>
                              <RadioGroup
                                style={{ flexDirection: "row" }}
                                value={answers[`${id}-${questionId}${grade?.id ? `-${grade.id}` : ""}`] ?? null}
                                onChange={e =>
                                  setAnswers({
                                    ...answers,
                                    [`${id}-${questionId}${grade?.id ? `-${grade.id}` : ""}`]: parseInt(
                                      e.target.value,
                                      10,
                                    ),
                                  })
                                }
                              >
                                <FormControlLabel value={1} control={<Radio />} label="1" />
                                <FormControlLabel value={2} control={<Radio />} label="2" />
                                <FormControlLabel value={3} control={<Radio />} label="3" />
                                <FormControlLabel value={4} control={<Radio />} label="4" />
                                <FormControlLabel value={5} control={<Radio />} label="5" />
                                <FormControlLabel value={0} control={<Radio />} label="Não se aplica" />
                              </RadioGroup>
                            </CardActions>
                          </Card>
                        </Grid>
                      );
                    })}
                  </Grid>
                </StyledDiv>
              </Paper>
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <FormLabel>Comentario:</FormLabel>
          <TextareaAutosize
            value={observation}
            onChange={e => setObservation(e.target.value)}
            style={{ width: "100%" }}
            rowsMin={4}
          />
        </Grid>

        {!hasntStarteAnswering && (
          <Grid container item alignItems="flex-end" xs={12}>
            <Button variant="contained" color="primary" size="large" onClick={submitQuestions}>
              {isLoadingAnswer || isLoadingMakeObservation ? (
                <CircularProgress color="secondary" size={26} />
              ) : (
                "ENVIAR"
              )}
            </Button>
          </Grid>
        )}
      </Grid>
    );
  }

  return null;
}
