import styled from 'styled-components';
import interrogacao from '../../../assets/interrogacaoHome.svg?react';

export const Container = styled.div`
  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  background-color: white;
  border-radius: 15px;
  display: flex;
  gap: 10px;
  min-height: 100px;
  width: 100%;
  padding: 10px;
  transition: box-shadow 0.2s ease-in-out;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
`;

export const Img = styled(interrogacao)`
  height: 100%;
  width: 30%;
`;
