import styled from 'styled-components';
import logo from '../../assets/logo.svg?react'

export const Container = styled.div`
  display: flex;
  height: 26vh;
  width: 100%;
  background-color: #F6821F;
  flex-direction: column;
  justify-content: center;
  color: #FFFFFF;  
  @media (max-width: 768px) {
    padding: 100px 5%;
  }
  `;

export const NavLinksContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  gap: 5%;
  font-size: small;
  
  @media (max-width: 768px) {
    flex-direction: column-reverse;
    gap: 10px;
  }
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
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
  display: flex;
  font-weight: 400;
  color: #FFFFFF;
  font-weight: bold;
  
  &:hover,
  &:active {
    cursor: pointer;
    opacity: 0.8;
  }
`;
