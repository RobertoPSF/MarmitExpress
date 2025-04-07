import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
// import AuthService from '../../../services/AuthService';

interface RestauranteRecuperacaoProps {
  onClose: () => void;
}

const RestauranteRecuperacaoForm: React.FC<RestauranteRecuperacaoProps> = ({
  onClose,
}) => {
  const [formDataRecuperacao, setFormDataRecuperacao] = useState({
    email: '',
  });

  const handleChangeRecuperacao = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataRecuperacao({
      ...formDataRecuperacao,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitRecuperacao = async () => {
    try {
      // const authService = new AuthService();
      // const response = await authService.recuperarSenha({
      //   email: formDataRecuperacao.email,
      // });
      // if (response && response.status === 200) {
      //   alert('Instruções de recuperação de senha enviadas para o seu e-mail.');
      // } else {
      //   alert('Erro ao enviar instruções de recuperação. Verifique o e-mail e tente novamente.');
      // }

      onClose();
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <>
      <Input
        placeHolderContainer="E-mail"
        name="email"
        type="email"
        placeholder="Digite seu e-mail"
        value={formDataRecuperacao.email}
        onChange={handleChangeRecuperacao}
      />

      <Button type={'orange'} onClick={handleSubmitRecuperacao}>
        Recuperar Senha
      </Button>
    </>
  );
};

export default RestauranteRecuperacaoForm;
