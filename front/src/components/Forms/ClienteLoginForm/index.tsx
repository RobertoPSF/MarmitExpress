import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import AuthService from '../../../services/AuthService';

interface ClienteLoginProps {
  onClose: () => void;
}

const ClienteLoginForm: React.FC<ClienteLoginProps> = ({ onClose }) => {
  const [formDataLogin, setFormDataLogin] = useState({
    email: '',
    senha: '',
  });

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  };

  const isEmailValid = (email: string) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const handleSubmitLogin = async () => {
    const { email, senha } = formDataLogin;

    // Verificações mínimas
    if (!email || !senha) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    if (!isEmailValid(email)) {
      alert('Digite um e-mail válido.');
      return;
    }

    try {
      const authService = new AuthService();
      const response = await authService.loginUser({ email, senha });

      if (response && response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        onClose();
        window.location.href = '/';
      } else {
        alert('Senha ou Email incorretos. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <>
      <p>Seja bem-vindo. Faça seu login abaixo:</p>
      <Input
        placeHolderContainer="E-mail"
        name="email"
        type="email"
        placeholder="Digite seu e-mail"
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

      <Button type={'orange'} onClick={handleSubmitLogin}>
        Continuar
      </Button>
    </>
  );
};

export default ClienteLoginForm;
