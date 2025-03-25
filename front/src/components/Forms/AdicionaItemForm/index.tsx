import Button from '../../Button';
import Input from '../../Input';
import RestauranteService from '../../../services/RestauranteService';
import ClienteService from '../../../services/ClienteService';

interface EditProfileProps {
  onClose: () => void;
}

const EditProfileForm: React.FC<EditProfileProps> = ({ onClose }) => {
  
  return (
    <>
      <Input
        placeHolderContainer="Nome"
        name="nome"
      />

      <Button type="orange" onClick={() => {}}>Adicionar Item</Button>
    </>
  );
};

export default EditProfileForm;
