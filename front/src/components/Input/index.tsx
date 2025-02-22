import React from 'react';
import { Container, ContainerInput, Div, InputStyled } from './styles';

interface Props {
  name?: string;
  type?: string;
  placeHolderContainer: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: any;
  value?: any;
  required?: any;
  autoComplete?: any;
}

const Input: React.FC<Props> = (props) => {
  return (
    <Container>
      <Div>{props.placeHolderContainer}</Div>
      <ContainerInput>
        <InputStyled
          name={props.name}
          onChange={props.onChange}
          type={props.type}
          placeholder={props.placeholder}
          disabled={props.disabled}
          value={props.value}
          required={props.required}
          autoComplete={props.autoComplete}
        />
      </ContainerInput>
    </Container>
  );
};

export default Input;
