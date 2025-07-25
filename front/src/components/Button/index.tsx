import { ButtonStyled } from './styles';

type ButtonProps = {
  children: React.ReactNode;
  type: string;
  disabled?: boolean; // Tipando o disabled
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void; // Tipando o onClick
};

export default function Button({ children, type, onClick }: ButtonProps) {
  return (
    <ButtonStyled type={type} onClick={onClick}>
      {children}
    </ButtonStyled>
  );
}
