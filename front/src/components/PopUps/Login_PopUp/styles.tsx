import styled from 'styled-components';
import { Button } from '../../ButtonComponent/styles';
import { Input } from '../../InputComponent/styles';

export const ContentPopup = styled.div`
  max-width: 23rem;
  max-height: 40rem;
  padding: 1.7rem;

  h2 {
    font-family: 'Inter', sans-serif;
    font-weight: 900;
    margin-top: 1.2rem;
    font-size: 1.2rem;
  }

  p{
    font-size: 0.6rem;
    margin: 0.8rem;
  }

  a{
    display: flex;
    font-weight: 500;
    text-decoration:underline;
    justify-content: right;
    font-size: 0.68rem;
    margin: 0.7rem;
  }

  .imputDiv{
    display: flex;
    flex-direction: column;
    
    p{
      margin: 0.2rem;
      margin-top: 1rem;
      display: flex;
      justify-content: left;
      font-size: 0.9em;
      color: #F6821F;
      font-weight: 600;
      margin-right: 25rem;
      width: 100%;
    }
  }
`;


export const InputPhone = styled(Input)`
  border: 1.3px solid #F6821F;
  border-radius: 10px;
  padding: 0.7em;
  width: 100%;

  &::placeholder {
    color: #F6821F;
    font-weight: 700;
  }
`;

export const ButtonSubumit = styled(Button)`
  height: 2.7rem;
  width: 100%;
  margin: 0;
  border-radius: 10px;
  font-size: 0.9rem;
  padding: 0.5em;
  background-color: #F6821F;
  `;

  
export const ButtonCriarConta = styled(Button)`
  height: 2.7rem;
  width: 100%;
  margin: 0;
  border-radius: 10px;
  font-size: 0.9rem;
  color: #F6821F;
  padding: 0.5em;
  border: 1px solid #F6821F;
  background-color: white;
`;