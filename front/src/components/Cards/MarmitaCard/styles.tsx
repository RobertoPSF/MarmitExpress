import styled from 'styled-components';
import image from '../../../assets/imageExemplo.svg?react';
import { Icon } from '@iconify/react';

export const Container = styled.div<{ isSelected: boolean }>`
  position: relative;
  display: flex;
  flex-direction: row;
  background-color: white;
  align-items: center;
  border-radius: 15px;
  display: flex;
  width: 100%;
  height: auto;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding: 10px;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  h3 {
    position: absolute;
    right: 10px;
    bottom: 10px;
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

  h2 {
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
  width: 100px;
  height: 100px;
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

export const IconDelete = styled(Icon)`
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
      <IconDelete icon={icon} />
    </Button>
  );
};
