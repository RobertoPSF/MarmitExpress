import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import AuthService from '../../../services/AuthService';
import Notification from '../../Notification';

interface ClienteLoginProps {
  onClose: () => void;
}

const ClienteLoginForm: React.FC<ClienteLoginProps> = ({ onClose }) => {
  const [notificacao, setNotificacao] = useState<null | { message: string; type?: "success" | "error" }>(null);

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
      setNotificacao({ message: "Por favor, preencha todos os campos.", type: "error" });
      return;
    }

    if (!isEmailValid(email)) {
      setNotificacao({ message: "Digite um e-mail válido.", type: "error" });
      return;
    }

    try {
      const authService = new AuthService();
      const response = await authService.loginUser({ email, senha });

      if (response && response.status === 200) {
        const { token } = response.data;
        localStorage.setItem('authToken', token);
        setNotificacao({ message: "Login efetuado com sucesso!", type: "success" });
        
        // Fecha o modal depois de 0.5s (tempo suficiente para o usuário ler a notificação)
        setTimeout(() => {
          setNotificacao(null);
          onClose(); // Fecha o modal
          window.location.href = '/';
        }, 500);
        
      } else {
        setNotificacao({ message: "Senha ou Email incorretos. Verifique os dados e tente novamente.", type: "error" });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
        setNotificacao({ message: "Erro ao conectar com o servidor.", type: "error" });      
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

export default ClienteLoginForm;
