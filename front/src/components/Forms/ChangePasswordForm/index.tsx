import { useEffect, useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import AuthService from '../../../services/AuthService';

interface ChangePasswordProps {
  onClose: () => void;
}

const ChangePasswordForm: React.FC<ChangePasswordProps> = ({ onClose }) => {
  const [formDataChangePassword, setFormDataChangePassword] = useState({
    email: '',
    senha: '',
  });

  useEffect(() => {
    // Obtém o token armazenado
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT
        console.log(payload);
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
    try {
      const authService = new AuthService();
      const response = await authService.changePassword({
        email: formDataChangePassword.email,
        senha: formDataChangePassword.senha,
      });

      if (response?.status === 200) {
        alert('Senha alterada com sucesso!');
        onClose(); // Fecha o modal de ChangePassword
      } else {
        alert(
          'Erro ao fazer alteração de senha. Verifique os dados e tente novamente.',
        );
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar com o servidor.');
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

      <Button type="orange" onClick={handleSubmitChangePassword}>
        Redefinir
      </Button>
    </>
  );
};

export default ChangePasswordForm;
