
import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  margin-top: 20.5vh;
  padding-top: 40px;
  width: 100%;
  gap: 40px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;

  h1 {
    text-align: center;
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 40px;
  justify-content: center;
  margin-right: 5%;
  margin-left: 5%;
`;

export const Hr = styled.hr`
  color: black;
  width: 60vw;
`;