import styled from 'styled-components';
import { Icon } from '@iconify/react';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 64.5vh;
  width: 60vw;
  margin: 4vh 0;
  gap: 2rem;
  h1 {
    align-self: flex-start;
  }

  @media (max-width: 999px) {
    width: 90vw;
    padding: 10vh;
  }
`;

export const TitleSection = styled.div`
  width: 100%;
  justify-content: space-between;
  display: flex;
  align-items: center;
  height: auto;
`;

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 90%;
  flex-wrap: wrap;
  gap: 1rem;
`;

const Button = styled.button`
  background: none;
  border: none;
  width: 45px;
  height: 45px;
  cursor: pointer;
  display: flex;
  align-self: end;
  justify-self: end;

  :hover {
    opacity: 0.7;
  }
`;

export const IconAdd = styled(Icon)`
  width: 100%;
  height: 100%;
`;

interface AddButtonProps {
  icon: string;
  onClick: () => void;
}

export const AddButton = ({ icon, onClick }: AddButtonProps) => {
  return (
    <Button onClick={onClick}>
      <IconAdd icon={icon} />
    </Button>
  );
};
