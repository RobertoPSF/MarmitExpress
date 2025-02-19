import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';

// Função para aplicar a máscara de telefone
const formatPhoneNumber = (value: string) => {
  const rawValue = value.replace(/\D/g, '').slice(0, 11); // Garante no máximo 11 números

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
    usuario: '',
    senha: '',
    nome: '',
    endereco: '',
    telefone: '',
    descricao: '',
  });

  const handleChangeCadastro = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormDataCadastro((prev) => ({
      ...prev,
      [name]: name === 'telefone' ? formatPhoneNumber(value) : value,
    }));
  };

  const validarFormulario = () => {
    const { usuario, senha, nome, endereco, telefone, descricao } =
      formDataCadastro;
    if (!usuario || !senha || !nome || !endereco || !telefone || !descricao) {
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
      const response = await fetch('http://localhost:8080/restaurantes', {
        // Corrigido endpoint
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer O#~Sn]9fnojT3'OO*:W9?C4",
        },
        body: JSON.stringify(formDataCadastro),
      });

      if (response.ok) {
        alert('Cadastro realizado com sucesso!');
      } else {
        const errorMessage = await response.text();
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
        name="usuario"
        placeholder="username"
        value={formDataCadastro.usuario}
        onChange={handleChangeCadastro}
        placeHolderContainer="Username"
      />

      <Input
        name="nome"
        placeholder="Nome do Restaurante"
        value={formDataCadastro.nome}
        onChange={handleChangeCadastro}
        placeHolderContainer="Nome"
      />

      <Input
        name="descricao"
        placeholder="Comida caseira"
        value={formDataCadastro.descricao}
        onChange={handleChangeCadastro}
        placeHolderContainer="Descrição"
      />

      <Input
        name="endereco"
        placeholder="Rua Exemplo, 123"
        value={formDataCadastro.endereco}
        onChange={handleChangeCadastro}
        placeHolderContainer="Endereço"
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
