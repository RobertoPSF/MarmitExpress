import React, { useState } from 'react';
import PopUpComponent from '../PopUp';
import Button from '../../Button';
import Input from '../../Input';
import { ContentPopup } from './styles';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
}

// Função para aplicar a máscara de telefone
const formatPhoneNumber = (value: string) => {
  // Remove qualquer caractere não numérico
  const rawValue = value.replace(/\D/g, '');

  // Aplica o formato da máscara (exemplo: (00) 90000-0000)
  if (rawValue.length <= 2) {
    return `(${rawValue}`;
  } else if (rawValue.length <= 6) {
    return `(${rawValue.slice(0, 2)}) ${rawValue.slice(2)}`;
  } else {
    return `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 7)}-${rawValue.slice(7, 11)}`;
  }
};

const Login_PopUp: React.FC<PopUpProps> = ({ isOpen, onClose }) => {
  const [formDataLogin, setFormDataLogin] = useState({
    usuario: '',
    senha: ''
  });

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/clientes/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: formDataLogin.usuario,
          senha: formDataLogin.senha
        })
      });

      if (response.ok) {
        alert('Login realizado com sucesso!');
        onClose();
      } else {
        alert('Erro ao fazer Login. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  const [formDataCadastro, setFormDataCadastro] = useState({
    telefone: '',
    usuario: '',
    nome: '',
    senha: '',
    email: '',
    endereco: ''
  });

  const handleChangeCadastro = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Se o campo for telefone, aplica a máscara
    if (name === 'telefone') {
      setFormDataCadastro({ ...formDataCadastro, [name]: formatPhoneNumber(value) });
    } else {
      setFormDataCadastro({ ...formDataCadastro, [name]: value });
    }
  };

  const handleSubmitCadastro = async () => {
    try {
      const response = await fetch('http://localhost:8080/clientes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          usuario: formDataCadastro.usuario,
          senha: formDataCadastro.senha,
          endereco: formDataCadastro.endereco,
          nome: formDataCadastro.nome,
          telefone: formDataCadastro.telefone
        })
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
        onClose();
      } else {
        alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  const [isLoginForm, setIsLoginForm] = useState(true); // Estado para alternar entre login e cadastro

  const handleOpenRegister = () => {
    setIsLoginForm(false); // Altera para o formulário de registro
  };

  const handleGoBackToLogin = () => {
    setIsLoginForm(true); // Volta para o formulário de login
  };

  if (!isOpen) {
    return null; // Se o pop-up não estiver aberto, não renderiza nada
  }

  return (
    <PopUpComponent onClose={onClose}>
      <ContentPopup>
        {isLoginForm ? (
          <>
            <h2>Entre na sua conta</h2>

            <Input
              placeHolderContainer="Usuário"
              name="usuario"
              type="text"
              placeholder="Nome de usuário"
              value={formDataLogin.usuario}
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

            <a>Esqueceu a senha?</a>

            <Button type={'orange'} onClick={handleSubmitLogin}>
              Continuar
            </Button>

            <p>ou</p>

            <Button type="white" onClick={handleOpenRegister}>
              Criar uma conta
            </Button>
          </>
        ) : (
          <>
            <h2>Adicione seus dados cadastrais</h2>
            <Input
              name="telefone"
              placeholder="(00) 90000-0000"
              value={formDataCadastro.telefone}
              onChange={handleChangeCadastro}
              placeHolderContainer="Telefone"
            />

            <Input
              name="usuario"
              placeholder="username"
              value={formDataCadastro.usuario}
              onChange={handleChangeCadastro}
              placeHolderContainer={'Username'}
            />

            <Input
              name="nome"
              placeholder="Seu nome"
              value={formDataCadastro.nome}
              onChange={handleChangeCadastro}
              placeHolderContainer={'Nome'}
            />

            <Input
              name="email"
              placeholder="user@gmail.com"
              value={formDataCadastro.email}
              onChange={handleChangeCadastro}
              placeHolderContainer={'Email'}
            />

            <Input
              name="endereco"
              placeholder="Rua Exemplo, 123"
              value={formDataCadastro.endereco}
              onChange={handleChangeCadastro}
              placeHolderContainer={'Endereço'}
            />

            <Input
              name="senha"
              type="password"
              placeholder="******"
              value={formDataCadastro.senha}
              onChange={handleChangeCadastro}
              placeHolderContainer={'Senha'}
            />

            <Button type={'orange'} onClick={handleSubmitCadastro}>
              Concluir Cadastro
            </Button>

            <p>ou</p>

            <Button type="white" onClick={handleGoBackToLogin}>
              Voltar para o login
            </Button>
          </>
        )}
      </ContentPopup>
    </PopUpComponent>
  );
};

export default Login_PopUp;
