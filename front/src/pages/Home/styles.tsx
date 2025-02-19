import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 40px;
  h1 {
    text-align: center;
  }
  justify-content: center;
  margin-bottom: 50px;
  margin-top: 20.5vh;
  padding-top: 40px;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  margin-left: 5%;
  margin-right: 5%;
`;

export const Hr = styled.hr`
  color: black;
  width: 60vw;
`;
