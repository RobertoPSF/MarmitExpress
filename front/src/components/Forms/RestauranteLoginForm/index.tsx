import { useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';

const RestauranteLoginForm: React.FC = () => {
  const [formDataLogin, setFormDataLogin] = useState({
    usuario: '',
    senha: '',
  });

  const handleChangeLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormDataLogin({ ...formDataLogin, [e.target.name]: e.target.value });
  };

  const handleSubmitLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/restaurantes/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: "Bearer O#~Sn]9fnojT3'OO*:W9?C4",
        },
        body: JSON.stringify({
          usuario: formDataLogin.usuario,
          senha: formDataLogin.senha,
        }),
      });

      if (response.ok) {
        alert('Login realizado com sucesso!');
      } else {
        alert('Erro ao fazer Login. Verifique os dados e tente novamente.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <>
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
    </>
  );
};

export default RestauranteLoginForm;
