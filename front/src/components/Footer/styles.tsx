import styled from 'styled-components';
import logo from '../../assets/logo.svg?react';

export const Container = styled.div`
  @media (max-width: 768px) {
    padding: 100px 5%;
  }
  background-color: #24292e;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  height: 26vh;
  justify-content: center;
  width: 100%;
`;

export const NavLinksContainer = styled.div`
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 10px;
  }
  align-items: center;
  display: flex;
  font-size: small;
  gap: 5%;
  justify-content: center;
  width: 100%;
`;

export const LogoContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 5px;
`;

export const Logo = styled(logo)`
  width: auto;
  height: 2rem;

  &:hover,
  &:active {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export const Link = styled.a`
  &:hover,
  &:active {
    cursor: pointer;
    opacity: 0.8;
  }
  color: #ffffff;
  display: flex;
  font-weight: 400;
  font-weight: bold;
`;
