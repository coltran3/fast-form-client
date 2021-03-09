import styled from 'styled-components'

export const Button = styled.button`
  /* max-width: 153px; */
  height: 45px;
  background: ${({ theme }) => theme.colors.brand01};
  box-shadow: 0px 10px 25px rgba(0, 154, 147, 0.32);
  border-radius: 100px;
  color: #fff;
  padding: 12px 24px;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;

  display: flex;
  align-items: center;

  &:hover {
    opacity: 0.7;
  }
`
