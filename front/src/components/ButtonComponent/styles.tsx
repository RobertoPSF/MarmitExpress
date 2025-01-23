import styled from 'styled-components';


export const Button = styled.button`
  background-color: #F6821F;
  border: none; 
  border-radius: 1rem;
  height: 4rem;
  width: 23rem;
  color: white;
  font-size: 1.7rem;
  font-weight: 600;
  font-family: "Roboto", sans-serif;
  margin: 5rem;

  &:hover,:active {
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  @media (max-width: 768px) {
    padding: 0 3vw;
  }
`;
