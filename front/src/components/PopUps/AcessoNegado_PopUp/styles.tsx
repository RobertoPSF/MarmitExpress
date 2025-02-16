import styled from 'styled-components';
import { Button } from '../../ButtonComponent/styles';

export const ContentPopup = styled.div`
  max-width: 23rem;
  max-height: 40rem;
  padding: 1.7rem;

  h2 {
    font-family: 'Inter', sans-serif;
    font-weight: 900;
    margin-top: 0.8rem;
    font-size: 1rem;
  }

  p{
    font-size: 0.8rem;
    margin-top: 1rem;
  }
`;

export const ButtonEntrar = styled(Button)`
  height: 2.7rem;
  width: 100%;
  margin-top: 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  padding: 0.5em;
  background-color: #F6821F;
`;