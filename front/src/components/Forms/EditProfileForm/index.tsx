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

interface Profile {
  id: string;
  nome: string;
  endereco: string;
  descricao?: string;
  telefone: string;
  aceitandoPedidos?: boolean;
  chavePix?: string;
}

interface EditProfileProps {
  onClose: () => void;
}

const EditProfileForm: React.FC<EditProfileProps> = ({ onClose }) => {
  const [userRole, setUserRole] = useState<string | null>(null);
  const token = localStorage.getItem('authToken');
  const [profile, setProfile] = useState<Profile | null>(null);
  const restauranteService = new RestauranteService();
  const clienteService = new ClienteService();

  const [formDataPerfil, setFormDataPerfil] = useState<Partial<Profile>>({});

  useEffect(() => {
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1])); // Decodifica o payload do JWT
        setUserRole(payload.role); // Define a role do usuário

        if (payload.role === 'ROLE_CLIENTE') {
          const fetchCliente = async () => {
            try {
              const response = await clienteService.getMeuPerfil();
              if (response?.status === 200) {
                setProfile(response.data);
                setFormDataPerfil(response.data); // Preenche os campos com os dados do perfil
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
                setProfile(response.data);
                setFormDataPerfil(response.data); // Preenche os campos com os dados do perfil
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

  const handleChangePerfil = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormDataPerfil((prev) => ({
      ...prev,
      [name]: name === 'telefone' ? formatPhoneNumber(value) : value,
    }));
  };

  const handleSubmitPerfil = async () => {
    if (!profile) return;

    const updatedData = {
      ...profile, // Mantém os valores originais
      ...formDataPerfil, // Substitui apenas os valores alterados
    };

    try {
      if (userRole === 'ROLE_CLIENTE') {
        const response = await clienteService.updateMeuPerfil({
          nome: updatedData.nome,
          endereco: updatedData.endereco,
          telefone: updatedData.telefone,
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
          nome: updatedData.nome,
          endereco: updatedData.endereco,
          telefone: updatedData.telefone,
          descricao: updatedData.descricao,
          chavePix: updatedData.chavePix,
          aceitandoPedidos: updatedData.aceitandoPedidos,
        });
        if (response?.status === 200) {
          alert('Perfil atualizado com sucesso!');
          onClose();
          window.location.reload(); // Recarrega a página após a atualização
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
      <Input
        placeHolderContainer="Nome"
        name="nome"
        placeholder={profile?.nome}
        value={formDataPerfil.nome || ''}
        onChange={handleChangePerfil}
      />
      <Input
        placeHolderContainer="Endereço"
        name="endereco"
        placeholder={profile?.endereco}
        value={formDataPerfil.endereco || ''}
        onChange={handleChangePerfil}
      />
      <Input
        placeHolderContainer="Telefone"
        name="telefone"
        placeholder={profile?.telefone}
        value={formDataPerfil.telefone || ''}
        onChange={handleChangePerfil}
      />
      {userRole === 'ROLE_RESTAURANTE' && (
        <>
          <Input
            placeHolderContainer="Descrição"
            name="descricao"
            placeholder={profile?.descricao}
            value={formDataPerfil.descricao || ''}
            onChange={handleChangePerfil}
          />
          <Input
            placeHolderContainer="Chave Pix"
            name="chavePix"
            placeholder={profile?.chavePix}
            value={formDataPerfil.chavePix || ''}
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
