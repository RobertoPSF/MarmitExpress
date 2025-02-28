import { useState } from 'react';
import Button from '../../Button';
import Text from '../../Text';
import Input from '../../Input';
import AuthService from '../../../services/AuthService'; // Importando o AuthService

interface RestauranteLoginProps {
  onForgotPassword: () => void;
}

const RestauranteLoginForm: React.FC<RestauranteLoginProps> = ({ onForgotPassword }) => {
  const [formDataLogin, setFormDataLogin] = useState({
    email: '',
    senha: '',
  });

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async () => {
    try {
      const authService = new AuthService();
      const response = await authService.loginUser({
        email: formDataLogin.email,
        senha: formDataLogin.senha,
      });

      if (response && response.status === 200) {
        alert('Login realizado com sucesso!');
        // Aqui você pode armazenar o token se necessário
        const { token } = response.data;
        console.log('Token recebido:', token);
      } else {
        alert('Erro ao fazer Login. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <>
      <Input
        placeHolderContainer="Email"
        name="email"
        type="email"
        placeholder="email@exemplo.com"
        value={formDataLogin.email}
        onChange={handleChangeLogin}
      />

      <Input
        placeHolderContainer="Senha"
        name="senha"
        type="password"
        placeholder="******"
        value={formDataLogin.senha}
        onChange={handleChangeLogin}
      />

      <Text onClick={onForgotPassword}>Esqueceu a senha?</Text>

      <Button type={'orange'} onClick={handleSubmitLogin}>
        Continuar
      </Button>
    </>
  );
};

export default RestauranteLoginForm;
