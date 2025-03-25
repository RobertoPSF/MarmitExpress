import styled from 'styled-components';
import image from '../../../assets/imageExemplo.svg?react';
import { Icon } from '@iconify/react';

export const Container = styled.div`
position: relative;
  display: flex;
  align-items: center;
  width: 90%;
  padding: 1rem;
  
  h1{
    color: #24292e;
    font-size: 1.5rem;
  }
  p{
    color: #999999;
    font-size: 1rem;
  }
`;

export const Information = styled.div`
  margin-left: 10%;
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
