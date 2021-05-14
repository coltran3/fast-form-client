import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background: #fff;
  margin: auto;
  width: 60%;
  height: 80%;
  padding: 120px 52px 0;
  overflow: scroll;

  .question {
    border: 1px solid #000;
    border-radius: 16px;
    padding: 12px;

    display: flex;
    justify-content: space-between;
  }
  .add-question {
    margin: 36px 0px;
    input {
      width: 100%;
    }
  }
  label {
    margin-bottom: 8px;
  }
`;
