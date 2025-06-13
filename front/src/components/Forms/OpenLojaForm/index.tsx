import { useEffect, useState } from 'react';
import Button from '../../Button';
import RestauranteService from '../../../services/RestauranteService';
import Notification from '../../Notification';

interface Profile {
  aceitandoPedidos: boolean;
}

interface OpenLojaProps {
  onClose: () => void;
}

const OpenLojaForm: React.FC<OpenLojaProps> = ({ onClose }) => {
  const [notificacao, setNotificacao] = useState<null | { message: string; type?: "success" | "error" }>(null);
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

        setNotificacao({ message: "Perfil atualizado com sucesso!", type: "success" });
        
        // Fecha o modal depois de 0.5s (tempo suficiente para o usuário ler a notificação)
        setTimeout(() => {
          setNotificacao(null);
          onClose(); // Fecha o modal
          window.location.reload(); // Recarrega a página após a atualização
        }, 500);

      } else {
        setNotificacao({ message: "Erro ao atualizar perfil. Verifique os dados e tente novamente!", type: "success" });
      }
    } catch (error) {
      setNotificacao({ message: "Erro ao conectar com o servidor.", type: "error" });
      console.error('Erro na requisição:', error);
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

export default OpenLojaForm;
