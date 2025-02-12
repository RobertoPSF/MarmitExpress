import styled from 'styled-components'
import ImgCard from '../../assets/imageExemplo.svg?react'
import presenteIcon from '../../assets/presenteIcon.svg?react'
import verificadoFidelidade from '../../assets/iconFidelidadeOff.svg?react'
import { Icon } from '@iconify/react';

export const Container = styled.div`
  display: flex;
  max-width: auto;
  max-height: auto;
  flex-direction: column;
  padding: 10px;
  margin: 50px;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  align-items: center;
  justify-content: space-between;

  .mainContainer{
    display: flex;
  }

  #nomeRestaurante{
    font-size: 0.9rem;
  }

  #horarioFuncionamento{
    font-size: 0.6rem;
    color: #878787;
    margin-top: 0.8rem;
  }

  .avaliacao{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: left;
    margin-top: 0.2rem;
    
    p{
      font-size: 0.65rem;
    }
  }

  .programaFidelidade{
    display:  flex;
    flex-direction: row;
    margin-top: 0.4rem;
    p{
      font-size: 0.47rem;
      padding: 0.1rem;
    }
  }
`;

export const Imagem = styled(ImgCard)`
  max-width: 5rem;
  max-height: 5rem;
  margin-right: 1rem;
`;

export const Presente = styled(presenteIcon)`
  height: 0.8rem;
  width:0.8rem;
`;

export const Verificado = styled(verificadoFidelidade)`
  display: flex;
  height: 0.5rem;
  width: 0.5rem;
  margin-top: 0.2rem;
  margin-left: 1.7rem;
`;

export const StyledIcon = styled(Icon)`
  color: black;
  height: 0.9rem;
`;
