import styled from 'styled-components';
import image from '../../../assets/imageExemplo.svg?react';
import presente from '../../../assets/presenteIcon.svg?react';
import { Icon } from '@iconify/react';

export const Container = styled.div`
  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
  display: flex;
  background-color: white;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
  width: auto;
  height: 120px;
  padding: 10px;
  transition: box-shadow 0.2s ease-in-out;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  #descricao {
    margin-top: 0.5rem;
    font-size: 0.6rem;
    color: #7a7a7a;
  }

  #avaliacoes {
    display: flex;
    flex-direction: row;
    align-items: center;
    p {
      font-size: 0.6rem;
      font-weight: 400;
    }
  }

  #fidelidade {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #f1f1f1;
    border-radius: 0.3rem;
    padding: 1px;
    max-height: 1rem;
    margin-top: 0.4rem;
    p {
      font-size: 0.5rem;
      margin-left: 0.2rem;
    }

    #verificado {
      color: grey;
    }
  }
`;

export const Img = styled(image)`
  height: 100%;
  width: 30%;
`;

export const StyledIcon = styled(Icon)`
  color: #24292e;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: #f6f7f9;
  transition: transform 0.5s ease-in-out;
`;

export const Presente = styled(presente)`
  width: 0.6rem;
  margin-left: 2px;
`;

export const Title = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
`;

interface OpenProps {
  $isOpen?: boolean;
}

export const Open = styled.div<OpenProps>`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${({ $isOpen }) => ($isOpen ? 'green' : 'red')};
`;
