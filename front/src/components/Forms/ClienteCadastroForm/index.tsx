import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import AuthService from '../../../services/AuthService'; // Importando o AuthService
import Notification from '../../Notification';

// Função para aplicar a máscara de telefone
const formatPhoneNumber = (value: string) => {
  const rawValue = value.replace(/\D/g, '');
  if (rawValue.length <= 2) {
    return `(${rawValue}`;
  } else if (rawValue.length <= 6) {
    return `(${rawValue.slice(0, 2)}) ${rawValue.slice(2)}`;
  } else {
    return `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 7)}-${rawValue.slice(
      7,
      11,
    )}`;
  }
};

interface ClienteCadastroProps {
  onClose: () => void;
}

const ClienteCadastroForm: React.FC<ClienteCadastroProps> = ({ onClose }) => {
  const [notificacao, setNotificacao] = useState<null | { message: string; type?: "success" | "error" }>(null);

  const [formDataCadastro, setFormDataCadastro] = useState({
    telefone: '',
    nome: '',
    senha: '',
    email: '',
    endereco: '',
  });

  const handleChangeCadastro = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'telefone') {
      setFormDataCadastro({
        ...formDataCadastro,
        [name]: formatPhoneNumber(value),
      });
    } else {
      setFormDataCadastro({ ...formDataCadastro, [name]: value });
    }
  };

  const handleSubmitCadastro = async () => {
    try {
      const authService = new AuthService();
      const { nome, email, senha, endereco, telefone } = formDataCadastro;

      const response = await authService.registerUser({
        nome,
        email,
        senha,
        endereco,
        telefone,
        role: 'CLIENTE',
      });

      if (response && response.status === 201) {
        // Cadastro bem-sucedido, agora fazer login
        const loginResponse = await authService.loginUser({ email, senha });

        if (loginResponse?.data?.token) {
          localStorage.setItem('authToken', loginResponse.data.token);

          setNotificacao({ message: "Cadastro e login realizados com sucesso!", type: "success" });

          // Fecha o modal depois de 0.5s (tempo suficiente para o usuário ler a notificação)
          setTimeout(() => {
            setNotificacao(null);
            onClose(); // Fecha o modal
            window.location.href = '/';
          }, 500);

        } else {
          setNotificacao({ message: "Cadastro realizado, mas erro ao fazer login automático.", type: "error" });
        }
      } else {
        setNotificacao({ message: "Erro ao cadastrar. Verifique os dados e tente novamente.", type: "error" });
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      setNotificacao({ message: "Erro ao conectar com o servidor.", type: "error" });
    }
  };

  return (
    <>
      <p>Para se cadastrar, preencha os dados abaixo:</p>
      <Input
        name="telefone"
        placeholder="(00) 90000-0000"
        value={formDataCadastro.telefone}
        onChange={handleChangeCadastro}
        placeHolderContainer="Telefone"
      />

      <Input
        name="endereco"
        placeholder="Rua Exemplo, 123"
        value={formDataCadastro.endereco}
        onChange={handleChangeCadastro}
        placeHolderContainer="Endereço"
      />

      <Input
        name="nome"
        placeholder="Seu nome"
        value={formDataCadastro.nome}
        onChange={handleChangeCadastro}
        placeHolderContainer="Nome"
      />

      <Input
        name="email"
        placeholder="user@gmail.com"
        value={formDataCadastro.email}
        onChange={handleChangeCadastro}
        placeHolderContainer="Email"
      />

      <Input
        name="senha"
        type="password"
        placeholder="******"
        value={formDataCadastro.senha}
        onChange={handleChangeCadastro}
        placeHolderContainer="Senha"
      />

      <Button type={'orange'} onClick={handleSubmitCadastro}>
        Concluir Cadastro
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

export default ClienteCadastroForm;
