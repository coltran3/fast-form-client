import styled from "styled-components";

export const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ContentCard = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 36px;
`;
