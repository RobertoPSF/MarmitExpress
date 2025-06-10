import styled from "styled-components";
import { Icon } from '@iconify/react';

export const Container = styled.div<{ type: "success" | "error" }>`
  display: flex;
  position: fixed;
  top: 20px;
  right: 20px; 
  gap: 10px;
  align-items: center;
  border: 1px solid ${({ type }) => (type === "success" ? "#168821" : "#E52207")};
  background-color: ${({ type }) => (type === "success" ? "#168821" : "#E52207")};
  color: ${({ type }) => (type === "success" ? "#fff" : "#fff")};
  padding: 10px 20px;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  z-index: 9999;
`;

export const StyledIcon = styled(Icon)`
  color: #ffffff;
  min-width: 24px;
  font-size: 1.3rem;
  height: 2rem;
  transition: transform 0.5s ease-in-out;
`;