import styled from 'styled-components';
import image from '../../../assets/imageExemplo.svg?react';
import { Icon } from '@iconify/react';

export const Container = styled.div<{ isSelected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  border-radius: 15px;
  display: flex;
  width: 10rem;
  height: 14rem;
  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: 2px solid ${(props) => (props.isSelected ? '#313131' : 'transparent')};

  h3 {
    position: absolute;
    bottom: 0.5rem;
    font-size: 0.9rem;
    font-weight: 600;
  }
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  height: 2.5rem;
  text-align: center;

  p {
    font-size: 1rem;
    font-weight: 400;
    color: #293138;
  }
`;

export const Img = styled(image)`
  height: 100%;
  width: 30%;
  //Quando tiver imagem esse container será útil
`;

export const StyledIcon = styled(Icon)`
  color: #24292e;
  width: 100%;
  height: auto;
  border-radius: 10px;
  background-color: #f1f2f3;
`;
