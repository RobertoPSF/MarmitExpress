import styled from 'styled-components';
import ImgCard from '../../../assets/marmita.svg?react';

export const Container = styled.div<{ isSelected: boolean }>`
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  max-width: 15rem;
  flex-direction: column;
  padding: 1rem;
  position: relative;
  border: 2px solid ${props => (props.isSelected ? '#313131' : 'transparent')};
  
  h3 {
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
  }

  p {
    font-size: 0.8rem;
    color: #24292e;
    max-width: 75%;
  }

  #preco {
    display: flex;
    align-self: self-end;
    bottom: 20px;
    right: 20px;
    font-size: 1rem;
  }
  justify-content: center;
  margin: 50px;
`;

export const Image = styled.img`
  min-width: 100%;
  max-width: 100%;
  margin-bottom: 20px; 
`;
