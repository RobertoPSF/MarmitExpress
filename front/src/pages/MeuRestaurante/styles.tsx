import styled from 'styled-components';
import { Icon } from '@iconify/react';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 64.5vh;
  margin: 4vh 0;
  gap: 2rem;
  h1{
    align-self: flex-start;
    margin-left: 3rem;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 90%;
  flex-wrap: wrap;
  gap: 1rem;
`

const Button = styled.button`
  background: none;
  width: 5%;
  height: 5%;
  border: none;
  cursor: pointer;
  display: flex;
  align-self: end;
  justify-self: end;
`;

export const IconAdd = styled(Icon)`
  width: 100%;
  height: 100%;

`

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