import styled from 'styled-components';
import logo from '../../assets/logo.svg?react';
import { NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

export const Container = styled.div`
  @media (max-width: 768px) {
    padding: 0 3vw;
    justify-content: space-around;
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
  z-index: 999;
`;

export const Logo = styled(logo)`
  width: auto;
  height: 2rem;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }
`;

export const LinkComponent = styled(NavLink)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  width: 170px;
  padding: 5px;
  border-radius: 5px;
  font-size: 0.9rem;
  background-color: #2b3137;
  gap: 10px;
  transition:
    background-color 0.3s ease-in-out,
    transform 1s ease-out;

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

  @media (max-width: 768px) {
    width: auto;
    min-width: 50px;
    padding: 8px;

    p {
      display: none;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
  }
`;

export const PopUpButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #2b3137;
  border: none;
  border-radius: 5px;
  color: white;
  font-size: 0.9rem;
  height: auto;
  padding: 5px;
  width: 170px;
  transition:
    background-color 0.3s ease-in-out,
    transform 1s ease-out;

  &:hover,
  &:active {
    cursor: pointer;
    background-color: #24292e;
  }

  @media (max-width: 768px) {
    width: 50px;
    padding: 8px;

    p {
      display: none;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;
    }
  }
`;

export const StyledIcon = styled(Icon)`
  color: #ffffff;
  min-width: 24px;
  font-size: 1.3rem;
  height: 2rem;
  transition: transform 0.5s ease-in-out;
`;
