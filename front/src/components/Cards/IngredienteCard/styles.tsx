import styled from 'styled-components';
import image from '../../../assets/imageExemplo.svg?react';
import { Icon } from '@iconify/react';

export const Container = styled.div`
  position: relative;
  display: flex;
  background-color: white;
  align-items: center;
  border-radius: 15px;
  display: flex;
  width: 100%;
  height: 100px;
  padding: 10px;
  gap: 1rem;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

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
  width: 70px;
  height: 70px;
  border-radius: 10px;
  background-color: #f1f2f3;
`;

const Button = styled.button`
  position: absolute;
  background: none;
  border: none;
  width: 45px;
  height: 45px;
  cursor: pointer;
  top: 0;
  right: 0;
  align-self: end;
  justify-self: end;

  :hover {
    opacity: 0.7;
  }
`;

export const IconAdd = styled(Icon)`
  color: red;
  width: 100%;
  height: 100%;
`;

interface DeleteButtonProps {
  icon: string;
  onClick: () => void;
}

export const DeleteButton = ({ icon, onClick }: DeleteButtonProps) => {
  return (
    <Button onClick={onClick}>
      <IconAdd icon={icon} />
    </Button>
  );
};
