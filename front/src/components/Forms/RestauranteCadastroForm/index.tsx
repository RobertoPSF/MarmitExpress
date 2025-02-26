import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import AuthService from '../../../services/AuthService';

const formatPhoneNumber = (value: string) => {
  const rawValue = value.replace(/\D/g, '').slice(0, 11);

  if (rawValue.length <= 2) {
    return `(${rawValue}`;
  } else if (rawValue.length <= 6) {
    return `(${rawValue.slice(0, 2)}) ${rawValue.slice(2)}`;
  } else {
    return `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 7)}-${rawValue.slice(7)}`;
  }
};

const RestauranteCadastroForm: React.FC = () => {
  const [formDataCadastro, setFormDataCadastro] = useState({
    email: '',
    senha: '',
    nome: '',
    endereco: '',
    telefone: '',
  });

  const handleChangeCadastro = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormDataCadastro((prev) => ({
      ...prev,
      [name]: name === 'telefone' ? formatPhoneNumber(value) : value,
    }));
  };

  const validarFormulario = () => {
    const { email, senha, nome, endereco, telefone } = formDataCadastro;
    if (!email || !senha || !nome || !endereco || !telefone) {
      alert('Todos os campos são obrigatórios.');
      return false;
    }
    if (telefone.replace(/\D/g, '').length !== 11) {
      alert('Telefone inválido. Use o formato correto: (XX) 9XXXX-XXXX.');
      return false;
    }
    return true;
  };

  const handleSubmitCadastro = async () => {
    if (!validarFormulario()) return;

    try {
      const authService = new AuthService();
      const response = await authService.registerUser({
        email: formDataCadastro.email,
        senha: formDataCadastro.senha,
        nome: formDataCadastro.nome,
        endereco: formDataCadastro.endereco,
        telefone: formDataCadastro.telefone,
        role: 'RESTAURANTE',
      });

      if (response && response.status === 201) {
        alert('Cadastro realizado com sucesso!');
      } else {
        const errorMessage = await response?.statusText;
        alert(`Erro ao cadastrar: ${errorMessage}`);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <>
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
        placeholder="Nome do Restaurante"
        value={formDataCadastro.nome}
        onChange={handleChangeCadastro}
        placeHolderContainer="Nome"
      />

      <Input
        name="email"
        placeholder="email@restaurante.com"
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

      <Button type="orange" onClick={handleSubmitCadastro}>
        Concluir Cadastro
      </Button>
    </>
  );
};

export default RestauranteCadastroForm;
