import styled from "styled-components";

export const Container = styled.div`
 max-width: 250px;
  padding: 16px;
  background: #fff;
  border-radius: 10px;
  border: 1px solid  #f3f3f3;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items:center;
`;
export const Content = styled.div`
width: 100%;
margin: 0 12px;


display:flex;
flex-direction:column;
strong {
  font-size:16px;
  margin-bottom:4px;
}
span {
font-size: 10px;
}

`;