import styled from 'styled-components';

export const ButtonStyled = styled.button<{ type: string }>`
  height: 2.7rem;
  width: 100%;
  margin: 0;
  border-radius: 10px;
  font-size: 0.9rem;
  padding: 0.5em;
  font-weight: bold;
  border: none;
  color: white;
  background-color: ${(props) =>
    props.type === 'orange' ? '#F6821F' : 'white'};
  border: ${(props) =>
    props.type === 'orange' ? 'none' : '1px solid #F6821F'};
  color: ${(props) => (props.type === 'orange' ? 'white' : '#F6821F')};

  &:hover {
    box-shadow: 0px 4px 5px rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  &:disabled {
    cursor: auto;
    opacity: 0.7;
  }
`;
