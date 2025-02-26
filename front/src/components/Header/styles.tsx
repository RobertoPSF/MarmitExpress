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

export const InvisibleDiv = styled.div`
  @media (max-width: 768px) {
    width: auto;
  }
  visibility: 'hidden';
  width: 170px;
`;

export const PopUpButton = styled.button`
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
  align-items: center;
  background-color: #2b3137;
  border: none;
  border-radius: 5px;
  color: white;
  display: flex;
  font-size: 0.9rem;
  gap: 10px;
  height: auto;
  justify-content: center;
  padding: 5px;
  transition:
    background-color 0.3s ease-in-out,
    transform 1s ease-out;
  width: 170px;
`;

export const StyledIcon = styled(Icon)`
  color: #ffffff;
  min-width: 24px;
  font-size: 1.3rem;
  height: 2rem;
  transition: transform 0.5s ease-in-out;
`;

export const DropdownMenu = styled.div`
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  padding: 8px 0;
  position: absolute;
  right: 0;
  top: 100%;
  width: 170px;
  z-index: 1000;
`;

export const DropdownItem = styled(NavLink)`
  display: block;
  padding: 10px 15px;
  color: #333;
  text-decoration: none;
  font-size: 14px;
  transition: background 0.2s ease-in-out;

  &:hover {
    background: #f1f1f1;
  }
`;

export const DropdownButton = styled.button`
  &:hover {
    background: #f1f1f1;
  }
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  display: block;
  font-size: 14px;
  padding: 10px 15px;
  text-align: left;
  width: 100%;
`;
