import { useEffect, useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import AuthService from '../../../services/AuthService';
import Notification from '../../Notification';

interface ChangePasswordProps {
  onClose: () => void;
}

const ChangePasswordForm: React.FC<ChangePasswordProps> = ({ onClose }) => {
  const [notificacao, setNotificacao] = useState<null | { message: string; type?: "success" | "error" }>(null);
  const [formDataChangePassword, setFormDataChangePassword] = useState({
    email: '',
    senha: '',
  });
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar botão desabilitado

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        setFormDataChangePassword((prev) => ({
          ...prev,
          email: payload.email,
        }));
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }, []);

  const handleChangeChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setFormDataChangePassword({
      ...formDataChangePassword,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitChangePassword = async () => {
    setIsLoading(true);
    try {
      const authService = new AuthService();
      const response = await authService.changePassword({
        email: formDataChangePassword.email,
        senha: formDataChangePassword.senha,
      });

      if (response?.status === 200) {
        setNotificacao({ message: "Senha alterada com sucesso!", type: "success" });

        // Fecha o modal depois de 0.5s (tempo suficiente para o usuário ler a notificação)
        setTimeout(() => {
          setNotificacao(null);
          onClose(); // Fecha o modal
        }, 500);
      } else {
        setNotificacao({
          message: "Erro ao fazer alteração de senha. Verifique os dados e tente novamente.",
          type: "error",
        });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setNotificacao({
          message: "Erro ao conectar com o servidor.",
          type: "error",
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Input
        placeHolderContainer="Nova senha"
        name="senha"
        type="password"
        placeholder="******"
        value={formDataChangePassword.senha}
        onChange={handleChangeChangePassword}
      />

      <Button type="orange" onClick={handleSubmitChangePassword} disabled={isLoading}>
        {isLoading ? 'Enviando...' : 'Redefinir'}
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

export default ChangePasswordForm;
