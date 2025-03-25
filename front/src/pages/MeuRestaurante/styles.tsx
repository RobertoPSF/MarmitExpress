import styled from 'styled-components';

export const Container = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  min-height: 64.5vh;
  margin: 4vh 0;
  gap: 2rem;
  h1{
    align-self: flex-start;
    margin-left: 3rem;
  }
`;

export const Section = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  width: 90%;
  flex-wrap: wrap;
  gap: 1rem;
`