import styled from 'styled-components';
import { Icon } from '@iconify/react';

export const Container = styled.div`
  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  display: flex;
  background-color: white;
  align-items: center;
  border-radius: 15px;
  display: flex;
  gap: 10px;
  width: auto;
  height: 120px;
  padding: 10px;
  transition: box-shadow 0.2s ease-in-out;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
  h3 {
    font-size: 0.8rem;
  }
  p {
    white-space: nowrap; /* Impede que o texto quebre para a próxima linha */
    overflow: hidden; /* Oculta qualquer conteúdo que ultrapasse o pai */
    text-overflow: ellipsis; /* Adiciona "..." no final do texto cortado */
    max-width: 100%;
  }
`;

export const StyledIcon = styled(Icon)`
  color: #24292e;
  background-color: #f1f2f3;
  border-radius: 7px;
  height: min-content;
  width: 100px;
`;

interface OpenProps {
  $isOpen?: boolean;
}

export const Open = styled.div<OpenProps>`
  color: ${({ $isOpen }) => ($isOpen ? 'green' : 'red')};
`;
