import { Icon } from '@iconify/react/dist/iconify.js';
import styled from 'styled-components';

export const PopUpContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const PopUpContent = styled.div`
  position: relative;
  background-color: white;
  padding: 3em;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  min-width: 150px;
  text-align: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 0px;
  right: 0px;
  background: none;
  border: none;
  width:min-content;
  height:min-content;
  font-size: 1.2em;
  &:hover {
    cursor: pointer;
  }
`;

export const OpenButton = styled.button`
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #67b173;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.1em;

  &:hover {
    background-color: #0056b3;
  }
`;

export const StyledIcon = styled(Icon)`
  color: Black;
  height: 2rem;
  font-size: 1.3rem;
`;