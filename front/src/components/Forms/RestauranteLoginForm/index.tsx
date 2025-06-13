import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import AuthService from '../../../services/AuthService'; // Importando o AuthService
import Notification from '../../Notification';

interface RestauranteLoginProps {
  onForgotPassword: () => void;
}

const RestauranteLoginForm: React.FC<RestauranteLoginProps> = ({ }) => {
  const [notificacao, setNotificacao] = useState<null | { message: string; type?: "success" | "error" }>(null);
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
        // Aqui você pode armazenar o token se necessário
        const { token } = response.data;
        localStorage.setItem('authToken', token); // Armazenar token localmente
        
        setNotificacao({ message: "Login realizado com sucesso!", type: "success" });
        // Fecha a notificação depois de 0.5s (tempo suficiente para o usuário ler a notificação)
        setTimeout(() => {
          setNotificacao(null);
          window.location.href = '/meu-restaurante';
        }, 500);

      } else {
        const errorMessage = await response?.statusText;
        setNotificacao({ message: `Erro ao fazer Login: ${errorMessage}`, type: "error" });
        console.error('Erro ao fazer Login:', response);
      }
    } catch (error) {
      setNotificacao({ message: "Erro ao conectar com o servidor.", type: "error" });
      console.error('Erro na requisição:', error);
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

      {/* 
        Descomente a linha abaixo se quiser adicionar a funcionalidade de esqueci minha senha
        onForgotPassword deve ser uma função que você define para lidar com o evento de esquecimento de senha
      
        <Text onClick={onForgotPassword}>Esqueceu a senha?</Text>
      */}

      <Button type={'orange'} onClick={handleSubmitLogin}>
        Continuar
      </Button>

      {notificacao && (
        <Notification
          message={notificacao.message}
          type={notificacao.type}
          onClose={() => setNotificacao(null)}
        />
      )}
    </>
  );
};

export default RestauranteLoginForm;
