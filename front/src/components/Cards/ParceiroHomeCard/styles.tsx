import styled from 'styled-components'
import house from '../../../assets/house-home.svg?react'

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); 
  padding: 1rem;

  .contente{
    margin-left: 1rem;
    max-width: 65%;
    
    h2{
      font-size: 0.8rem;
      margin-top: 1rem;
    }

    p{
      font-size: 0.7rem;
      color: #878787;
      margin-top: 0.5rem;
    }
  }

`;


export const House = styled(house)`
  color: black;
  height: 5rem;
  width: 5rem;
`;
