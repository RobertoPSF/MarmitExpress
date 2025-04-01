import { useEffect, useState } from 'react';
import Button from '../../Button';
import RestauranteService from '../../../services/RestauranteService';

interface Profile {
  aceitandoPedidos: boolean;
}

interface OpenLojaProps {
  onClose: () => void;
}

const OpenLojaForm: React.FC<OpenLojaProps> = ({ onClose }) => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [aceitandoPedidos, setAceitandoPedidos] = useState<boolean>(false);
  const restauranteService = new RestauranteService();

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        const response = await restauranteService.getMyProfile();
        if (response?.status === 200) {
          setProfile(response.data);
          setAceitandoPedidos(response.data.aceitandoPedidos);
        } else {
          console.error('Erro ao buscar restaurante:', response);
        }
      } catch (error) {
        console.error('Erro ao buscar restaurante:', error);
      }
    };
    fetchRestaurant();
  }, []);

  const handleSubmitPerfil = async () => {
    if (!profile) return;

    try {
      const response = await restauranteService.updateMyProfile({
        aceitandoPedidos,
      });
      if (response?.status === 200) {
        alert('Perfil atualizado com sucesso!');
        onClose();
        window.location.reload();
      } else {
        alert(
          'Erro ao atualizar perfil. Verifique os dados e tente novamente.',
        );
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
      alert('Erro ao conectar com o servidor.');
    }
  };

  return (
    <>
      <h2>Aceitando pedidos?</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <label>
          <input
            type="radio"
            name="aceitandoPedidos"
            value="true"
            checked={aceitandoPedidos === true}
            onChange={() => setAceitandoPedidos(true)}
          />
          Aberto
        </label>
        <label>
          <input
            type="radio"
            name="aceitandoPedidos"
            value="false"
            checked={aceitandoPedidos === false}
            onChange={() => setAceitandoPedidos(false)}
          />
          Fechado
        </label>
      </div>
      <Button type="orange" onClick={handleSubmitPerfil}>
        Atualizar
      </Button>
    </>
  );
};

export default OpenLojaForm;
