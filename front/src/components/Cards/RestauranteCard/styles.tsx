import styled from 'styled-components';
import image from '../../../assets/imageExemplo.svg?react';
import { Icon } from '@iconify/react';

export const Container = styled.div`
  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  display: flex;
  align-items: center;
  background-color: white;
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
  width: 80%;
`;

export const ImgRestaurante = styled(image)`
  height: 8rem;
  width: 8rem;
  //Quando tiver imagem esse container será útil
`;

export const EditIcon = styled(Icon)`
  width: 100%;
  height: 100%;
`;

interface OpenProps {
  $isOpen?: boolean;
}

export const Open = styled.div<OpenProps>`
  margin-right: 1rem;
  color: ${({ $isOpen }) => ($isOpen ? 'green' : 'red')};
`;
