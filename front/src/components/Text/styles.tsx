import styled from 'styled-components';

export const TextStyled = styled.span`
  display: inline-block;
  color: #333;
  font-size: 1rem;
  padding: 0.2em 0.4em;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }
`;
