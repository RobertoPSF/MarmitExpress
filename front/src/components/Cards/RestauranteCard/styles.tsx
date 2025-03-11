import styled from 'styled-components';
import image from '../../../assets/imageExemplo.svg?react';
import presente from '../../../assets/presenteIcon.svg?react'
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
  max-width: 15rem;
  min-width: 15rem;
  padding: 10px;
  transition: box-shadow 0.2s ease-in-out;
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 70%;
  h3{
    font-size: 1rem;
  }
  #descricao{
    margin-top: 0.5rem; 
    font-size: 0.6rem;
    color: #7A7A7A;
  }

  #avaliacoes{
    display: flex;
    flex-direction: row;
    align-items: center;
    p{
      font-size: 0.6rem;
      font-weight: 400;
    }
  }

  #fidelidade{
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #f1f1f1;
    border-radius: 0.3rem;
    padding: 1px;
    max-height: 1rem;
    margin-top: 0.4rem;
    p{
      font-size: 0.5rem;
      margin-left: 0.2rem;
    }

    #verificado{
      color: grey;
    }
  }
`;

export const StyledIcon = styled(Icon)`
  color: #ffffff;
  height: 0.8rem;
`;

export const Img = styled(image)`
  height: 100%;
  width: 30%;
`;


export const Presente = styled(presente)`
  width: 0.6rem;
  margin-left: 2px;
`;
