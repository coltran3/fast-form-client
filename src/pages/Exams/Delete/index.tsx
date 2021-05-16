import { useMutation, useQuery } from "react-query";
import { useHistory, useParams } from "react-router";
import { apiClient } from "../../../api";
import { ApiEntityWrapper } from "../../../api/types";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@material-ui/core";
import { useAuthContext, useNotificationContext } from "../../../stores";
import { Exam, ExamRouteParams } from "../types";
import { PageLoad } from "../../../components/PageLoad";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";

const PageLoadWrapper = styled.div`
  padding: 24px;
`;

export function Delete() {
  const { user } = useAuthContext();
  const { push } = useHistory();
  const { showNotification } = useNotificationContext();
  const { examId } = useParams<ExamRouteParams>();
  const { data: exam, isLoading } = useQuery<ApiEntityWrapper<Exam>>(
    ["exam", examId],
    () => {
      return apiClient.get(`/exam/${examId}`, { headers: { Authorization: `Bearer ${user}` } });
    },
    {
      onError: () => {
        showNotification({ message: "Houve um erro ao tentar buscar a avaliação", type: "error" });
      },
    },
  );

  function handleClose() {
    push("/exams");
  }

  const { mutate: deleteExam, isLoading: isLoadingDeleteExam } = useMutation(
    (id: number) => {
      return apiClient.delete(`/exam/${id}`, { headers: { Authorization: `Bearer ${user}` } });
    },
    {
      onSuccess: () => {
        showNotification({ message: "Avaliação apagada com sucesso", type: "success" });
        handleClose();
      },
      onError: () => {
        showNotification({ message: "Houve um erro ao tentar apagar a avaliação", type: "error" });
      },
    },
  );

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open>
      {isLoading ? (
        <PageLoadWrapper>
          <PageLoad />
        </PageLoadWrapper>
      ) : (
        <>
          <DialogTitle id="simple-dialog-title">Apagar avaliação</DialogTitle>
          <DialogContent>Tem certeza que deseja excluir a avaliação: {exam?.data.data.title}</DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                if (exam) {
                  deleteExam(exam?.data.data.id);
                }
              }}
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              autoFocus
            >
              {isLoadingDeleteExam ? <CircularProgress color="primary" size={25} /> : "Apagar"}
            </Button>
          </DialogActions>
        </>
      )}
    </Dialog>
  );
}
