import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;

  padding: 120px 36px;
  .content-input {
    width: 100%;
    display: flex;
    justify-content: flex-end;
  }
  input {
    border: 1px #000 solid;
    border-radius: 14px;
  }
`;
export const ContentCard = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 36px;
`;
