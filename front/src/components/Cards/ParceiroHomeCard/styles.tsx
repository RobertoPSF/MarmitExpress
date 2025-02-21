import styled from 'styled-components';
import house from '../../../assets/house-home.svg?react';
import { NavLink } from 'react-router-dom';

export const Container = styled(NavLink)`
  display: flex;
  width: 350px;
  height: 100px;
  align-items: center;
  border-radius: 15px;
  padding: 10px;
  gap: 10px;
  background-color: white;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

export const Information = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
`;

export const Img = styled(house)`
  max-height: 80px;
  width: 80px;
`;
