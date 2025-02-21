import styled from 'styled-components';

export const Container = styled.div`
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 25%;
  min-width: 300px;
  height: min-content;
  border: 1px solid #f6821f;
  border-radius: 15px;
  justify-self: center;
  display: flex;
  background: #fff;
  flex-direction: column;
  gap: 20px;
  color: black;

  h2 {
    display: flex;
    justify-content: center;
  }

  @media (max-width: 999px) {
    flex-direction: column;
    width: auto;
  }
`;

export const Label = styled.h3`
  display: flex;
  align-items: center;
  font-weight: 200;
  justify-content: flex-start;

  hr {
    box-shadow: none;
    margin: 0;
    margin-right: 10px;
    height: 30px;
    width: 5px;
    border: none;
    border-color: #f6821f;
    background-color: #f6821f;
    border-radius: 10px;
  }
`;

export const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FilterButton = styled.button`
  display: flex;
  padding: 5px 10px;
  border: 1px solid black;
  background: white;
  border-radius: 20px;
  color: black;
  font-weight: bold;
  opacity: 0.5;
  cursor: pointer;
  transition: 0.3s;
  width: max-content;

  &.active {
    opacity: 1;
    border: 1px solid green;
    background: white;
    color: green;
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
    border-color: #f6821f;
    background-color: #fff;
  }
`;
