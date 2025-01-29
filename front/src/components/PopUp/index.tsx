import { PopUpContainer, PopUpContent, CloseButton, StyledIcon} from './styles';

interface PopUpProps {
  children: React.ReactNode;
  onClose: () => void;
}

const PopUp: React.FC<PopUpProps> = ({children, onClose}) => {
  
  return (
    <PopUpContainer>
      <PopUpContent>
        {children}
        <CloseButton onClick={onClose} >
          <StyledIcon icon="simple-line-icons:close" />
        </CloseButton>
      </PopUpContent>
    </PopUpContainer>
  );
};

export default PopUp;