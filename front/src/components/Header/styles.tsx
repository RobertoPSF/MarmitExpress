import styled from 'styled-components';
import logo from '../../assets/logo.svg?react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

export const Container = styled.div`
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  height: 9.5vh;
  background-color: #F6821F;
  align-items: center;
  justify-content: space-between;
  padding: 0 7.8vw;
  color: #FFFFFF;

  @media (max-width: 768px) {
    padding: 0 3vw;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 1rem;

  &:hover,
  &:active {
    cursor: pointer;
  }
`;

export const Logo = styled(logo)`
  width: auto;
  height: 2rem;
  margin-right: 10px;
`;

export const TituloLogo = styled.p`
  color: #FFFFFF;
  align-self: center;
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
  background-color: #F6821F;

  &.active {
    background-color: #FCB827;
  }

  &:hover,
  &:active {
    cursor: pointer;
    border: 1px solid white;
  }
  &.active {
    border: none;
  }

  span {
    &.activated {
      border-bottom: 2px solid white;
    }
  }
`;


export const StyledIcon = styled(Icon)`
  color: #FFFFFF;
  height: 2rem;
  font-size: 1.3rem;
  margin-right: 5px;
`;
