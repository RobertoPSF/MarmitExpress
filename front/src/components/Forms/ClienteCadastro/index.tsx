import { useState } from "react";
import Button from "../../Button";
import Input from "../../Input";

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

interface ClienteCadastroProps {
  onClose: () => void; 
}

const ClienteCadastro: React.FC<ClienteCadastroProps> = ({ onClose }) => {
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
        onClose(); // Chamando o onClose para fechar o pop-up após o cadastro
      } else {
        alert('Erro ao cadastrar. Verifique os dados e tente novamente.');
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
    </>
  );
};

export default ClienteCadastro;
