import styled from 'styled-components';
import ImgCard from '../../../assets/marmita.svg?react';

export const Container = styled.div<{ isSelected: boolean }>`
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  width: 300px;
  height: 300px;
  padding: 20px;
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
  
  justify-content: center;
  margin: 50px;
`;

export const Image = styled.img`
  max-width: 10rem;
  max-height: 10rem;
  margin-bottom: 20px; 
`;
