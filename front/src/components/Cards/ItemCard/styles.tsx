import styled from 'styled-components';
import { Icon } from '@iconify/react';

export const Container = styled.div<{ isSelected: boolean }>`
  display: flex;
  align-items: center;
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  flex-direction: column;
  background-color: white;
  padding: 15px;
  gap: 10px;
  width: 100%;
  height: 100%;
  text-align: center;
  border: 2px solid ${(props) => (props.isSelected ? '#313131' : 'transparent')};

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
`;

export const StyledIcon = styled(Icon)`
  color: #24292e;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: #f6f7f9;
  transition: transform 0.5s ease-in-out;
`;
