import styled from "styled-components";

export const Container = styled.div`
  background: #fff;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  max-width: 23rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px; /* Aumentei o espaçamento */
  color: black;
`;

export const Label = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const FilterButton = styled.button`
  padding: 10px 15px;
  background: #f3f3f3;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s;

  &:hover, &.active {
    background: #007bff;
    color: white;
  }
`;

export const InputGroup = styled.div`
  display: flex;
  gap: 10px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
  background-color: #f9f9f9;
  outline: none;
  transition: 0.3s;

  &:focus {
    border-color: #007bff;
    background-color: #fff;
  }
`;
