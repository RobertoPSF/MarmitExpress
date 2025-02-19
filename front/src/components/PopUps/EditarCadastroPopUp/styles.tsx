import styled from 'styled-components';

export const ContentPopup = styled.div`
  h2 {
    font-family: 'Inter', sans-serif;
    font-weight: 900;
    margin-top: 1rem;
    font-size: 1.2rem;
  }

  p {
    font-size: 0.6rem;
    margin: 0.8rem;
  }

  a {
    display: flex;
    font-weight: 500;
    text-decoration: underline;
    justify-content: right;
    font-size: 0.68rem;
    margin: 0.7rem;
  }

  .imputDiv {
    display: flex;
    flex-direction: column;

    p {
      margin: 0.2rem;
      margin-top: 0.6rem;
      display: flex;
      justify-content: left;
      font-size: 0.8em;
      color: #f6821f;
      font-weight: 600;
      margin-right: 25rem;
      width: 100%;
    }
  }
  max-width: 23rem;
  padding: 1.7rem;
`;

export const InputPhone = styled.button`
  &::placeholder {
    color: #f6821f;
    font-weight: 700;
    font-size: 0.8rem;
  }
  border: 1.3px solid #f6821f;
  border-radius: 10px;
  padding: 0.8em;
  width: 100%;
`;

export const ButtonSubumit = styled.button`
  background-color: #f6821f;
  border-radius: 10px;
  font-size: 0.9rem;
  height: auto;
  margin-top: 1rem;
  padding: 0.7rem;
  width: 100%;
`;
