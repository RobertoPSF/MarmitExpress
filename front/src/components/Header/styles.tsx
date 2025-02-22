import styled from 'styled-components';
import logo from '../../assets/logo.svg?react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

export const Container = styled.div`
  @media (max-width: 768px) {
    padding: 0 3vw;
  }
  align-items: center;
  background-color: #2b3137;
  color: #ffffff;
  display: flex;
  height: 9.5vh;
  justify-content: space-between;
  padding: 0 7.8vw;
  position: fixed;
  top: 0;
  width: 100%;
`;

export const LogoContainer = styled.div`
  &:hover,
  &:active {
    cursor: pointer;
  }
  align-items: center;
  display: flex;
  font-size: 1rem;
`;

export const Logo = styled(logo)`
  width: auto;
  height: 2rem;
  margin-right: 10px;
`;

export const TituloLogo = styled.p`
  align-self: center;
  color: #ffffff;
`;

export const LinkComponent = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 165px;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.9rem;
  background-color: #2b3137;

  &.active {
    background-color: #24292e;
    text-decoration: underline;
    text-underline-offset: 5px;
  }

  &:hover,
  &:active {
    cursor: pointer;
    background-color: #24292e;
  }
`;

export const PopUpButton = styled.button`
  &:hover,
  &:active {
    cursor: pointer;
  }
  align-items: center;
  background-color: #2b3137;
  border: none;
  border-radius: 5px;
  color: white;
  display: flex;
  font-size: 0.9rem;
  height: auto;
  justify-content: center;
  padding: 5px;
  width: 165px;
`;

export const StyledIcon = styled(Icon)`
  color: #ffffff;
  height: 2rem;
  font-size: 1.3rem;
  margin-right: 5px;
`;
