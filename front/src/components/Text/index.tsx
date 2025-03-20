import { TextStyled } from './styles';

type TextProps = {
    children: React.ReactNode;
    onClick?: (event: React.MouseEvent<HTMLSpanElement>) => void; // Tipando o onClick
  };
  
  export default function Text({ children, onClick }: TextProps) {
    return (
      <TextStyled onClick={onClick}>
        {children}
      </TextStyled>
    );
  }
  