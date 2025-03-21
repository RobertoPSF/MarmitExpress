import { useEffect, useState } from 'react';
import Button from '../../Button';
import Input from '../../Input';
import RestauranteService from '../../../services/RestauranteService';
import ClienteService from '../../../services/ClienteService';

// Função para aplicar a máscara de telefone
const formatPhoneNumber = (value: string) => {
  const rawValue = value.replace(/\D/g, '');
  if (rawValue.length <= 2) {
    return `(${rawValue}`;
  } else if (rawValue.length <= 6) {
    return `(${rawValue.slice(0, 2)}) ${rawValue.slice(2)}`;
  } else {
    return `(${rawValue.slice(0, 2)}) ${rawValue.slice(2, 7)}-${rawValue.slice(7, 11)}`;
  }
};

interface Restaurante {
  id: string;
  nome: string;
  endereco: string;
  descricao: string;
  telefone: string;
  aceitandoPedidos: boolean;
  chavePix: string;
}

interface Cliente {
  id: string;
  nome: string;
  endereco: string;
  telefone: string;
}

interface EditProfileProps {
  onClose: () => void;
}

const EditProfileForm: React.FC<EditProfileProps> = ({ onClose }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const token = localStorage.getItem('authToken');
  const [restaurante, setRestaurante] = useState<Restaurante | null>(null);
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const restauranteService = new RestauranteService();
  const clienteService = new ClienteService();

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT
        setUserRole(payload.role); // Pega a role do usuário
        console.log(payload.role);

        if (payload.role === 'ROLE_CLIENTE') {
          const fetchCliente = async () => {
            try {
              const response = await clienteService.getMeuPerfil();
              if (response?.status === 200) {
                setCliente(response.data);
              } else {
                console.error('Erro ao buscar cliente:', response);
              }
            } catch (error) {
              console.error('Erro ao buscar cliente:', error);
            }
          };
          fetchCliente();
        } else if (payload.role === 'ROLE_RESTAURANTE') {
          const fetchRestaurant = async () => {
            try {
              const response = await restauranteService.getMyProfile();
              if (response?.status === 200) {
                setRestaurante(response.data);
              } else {
                console.error('Erro ao buscar restaurante:', response);
              }
            } catch (error) {
              console.error('Erro ao buscar restaurante:', error);
            }
          };
          fetchRestaurant();
        } else {
          console.error('Erro ao buscar: usuário não tem role.');
        }
      } catch (error) {
        console.error('Erro ao decodificar o token:', error);
      }
    }
  }, [token]);

  const [formDataPerfil, setFormDataPerfil] = useState({
    telefone: '',
    nome: '',
    endereco: '',
    descricao: '',
    chavePix: '',
    aceitandoPedidos: '',
  });

  const handleChangePerfil = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === 'telefone') {
      setFormDataPerfil({
        ...formDataPerfil,
        [name]: formatPhoneNumber(value),
      });
    } else {
      setFormDataPerfil({ ...formDataPerfil, [name]: value });
    }
  };

  const handleSubmitPerfil = async () => {
    try {
      if (userRole === 'ROLE_CLIENTE') {
        const response = await clienteService.updateMeuPerfil({
          nome: formDataPerfil.nome,
          endereco: formDataPerfil.endereco,
          telefone: formDataPerfil.telefone,
        });
        if (response?.status === 200) {
          alert('Perfil atualizado com sucesso!');
          onClose();
        } else {
          alert(
            'Erro ao atualizar perfil. Verifique os dados e tente novamente.',
          );
        }
      } else if (userRole === 'ROLE_RESTAURANTE') {
        const response = await restauranteService.updateMyProfile({
          nome: formDataPerfil.nome,
          endereco: formDataPerfil.endereco,
          telefone: formDataPerfil.telefone,
          descricao: formDataPerfil.descricao,
          chavePix: formDataPerfil.chavePix,
          aceitandoPedidos: formDataPerfil.aceitandoPedidos,
        });
        if (response?.status === 200) {
          alert('Perfil atualizado com sucesso!');
          onClose();
        } else {
          alert(
            'Erro ao atualizar perfil. Verifique os dados e tente novamente.',
          );
        }
      } else {
        alert('Erro ao atualizar perfil. Role desconhecida.');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <>
      {token ? (
        userRole === 'ROLE_CLIENTE' ? (
          <>
            <p>Usuário Cliente</p>
            <p>{cliente?.nome}</p>
          </>
        ) : userRole === 'ROLE_RESTAURANTE' ? (
          <>
            <p>Usuário Restaurante</p>
            <p>{restaurante?.nome}</p>
          </>
        ) : (
          <p>{'Role não identificada...'}</p>
        )
      ) : null}

      <Input
        placeHolderContainer="Nome"
        name="nome"
        value={formDataPerfil.nome}
        onChange={handleChangePerfil}
      />
      <Input
        placeHolderContainer="Endereço"
        name="endereco"
        value={formDataPerfil.endereco}
        onChange={handleChangePerfil}
      />
      <Input
        placeHolderContainer="Telefone"
        name="telefone"
        value={formDataPerfil.telefone}
        onChange={handleChangePerfil}
      />
      {userRole === 'ROLE_RESTAURANTE' && (
        <>
          <Input
            placeHolderContainer="Descrição"
            name="descricao"
            value={formDataPerfil.descricao}
            onChange={handleChangePerfil}
          />
          <Input
            placeHolderContainer="Chave Pix"
            name="chavePix"
            value={formDataPerfil.chavePix}
            onChange={handleChangePerfil}
          />
          <Input
            placeHolderContainer="Aceitando Pedidos"
            name="aceitandoPedidos"
            value={formDataPerfil.aceitandoPedidos}
            onChange={handleChangePerfil}
          />
        </>
      )}
      <Button type="orange" onClick={handleSubmitPerfil}>
        Atualizar Perfil
      </Button>
    </>
  );
};

export default EditProfileForm;
