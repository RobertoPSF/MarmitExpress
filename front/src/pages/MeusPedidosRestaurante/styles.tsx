import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 64.5vh;
  gap: 20px;
  align-items: end;
  margin-top: -50px;
  margin-bottom: 4vh;
`;

export const ContainerPedidos = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 50px;
  width: 70vw;
`;

export const FiltroWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  margin-top: -40px;
`;

export const Select = styled.select`
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
`;
