import styled from 'styled-components';
import { Icon } from '@iconify/react';

export const PopUpContainer = styled.div`
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
`;

export const PopUpContent = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-width: 300px;
  position: relative;
  text-align: center;
`;

export const CloseButton = styled.button`
  &:hover {
    cursor: pointer;
  }
  background: none;
  border: none;
  font-size: 1.2em;
  position: absolute;
  right: 2px;
  top: 5px;
`;
export const StyledIcon = styled(Icon)`
  color: black;
  height: 2rem;
  font-size: 1.3rem;
  margin-right: 5px;
`;
