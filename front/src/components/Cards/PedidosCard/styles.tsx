import styled from 'styled-components';
import { Icon } from '@iconify/react';
import { NavLink } from 'react-router-dom';

export const Container = styled(NavLink)`
  position: relative;
  display: flex;
  flex-direction: column;
  background-color: white;
  align-items: center;
  border-radius: 15px;
  width: auto;
  height: 10rem;
  padding: 10px;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    cursor: pointer;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 80%;
`;

export const Footer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 90%;
  height: 20%;
`;

export const Informations = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 100%;

  #nomeRestaurante {
    font-weight: 500;
  }

  #dataPedido {
    margin-top: 10%;
    font-size: 0.8rem;
    color: #636363;
    font-weight: 400;
  }

  #totalPedido {
    margin-top: 5%;
    color: #3d3d3d;
    font-weight: 400;
  }
`;

export const Line = styled.div`
  width: 100%;
  border-top: 2px solid #c5c5c5;
  margin: 2%;
`;

export const StyledIcon = styled(Icon)`
  color: #24292e;
  width: 20%;
  height: 100%;
  color: #5e5e5e;
`;
