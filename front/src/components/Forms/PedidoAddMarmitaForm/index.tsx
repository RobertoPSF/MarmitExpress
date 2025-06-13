import { useEffect, useState } from 'react';
import Button from '../../Button';
import RestauranteService from '../../../services/RestauranteService';
import Notification from '../../Notification';

interface Ingrediente {
  id: string;
  nome: string;
}

interface AddMarmitaProps {
  idMarmita: string;
  idRestaurante: string;
  onClose: () => void;
  onAddMarmita: (marmita: {
    idMarmita: string;
    ingredientes: string[];
  }) => void; // <-- Novo prop
}

const AddMarmitaForm: React.FC<AddMarmitaProps> = ({
  onClose,
  idMarmita,
  idRestaurante,
  onAddMarmita, // <-- Recebendo callback
}) => {
  const [notificacao, setNotificacao] = useState<null | { message: string; type?: "success" | "error" }>(null);
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [selectedIngredientes, setSelectedIngredientes] = useState<string[]>(
    [],
  );

  useEffect(() => {
    const fetchIngredientes = async () => {
      try {
        const restauranteService = new RestauranteService();
        const response =
          await restauranteService.getRestaurantById(idRestaurante);

        if (response?.status === 200 && response.data.ingredientes) {
          setIngredientes(response.data.ingredientes);
        }
      } catch (error) {
        console.error('Erro ao buscar ingredientes:', error);
      }
    };

    fetchIngredientes();
  }, [idRestaurante]);

  const handleSelectIngrediente = (id: string) => {
    setSelectedIngredientes((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSubmitAddMarmita = () => {
    onAddMarmita({
      idMarmita,
      ingredientes: selectedIngredientes,
    });

    onClose(); // Fecha o pop-up
  };

  return (
    <>
      <h2>Acompanhamentos</h2>
      <p>Selecione os acompanhamentos:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {ingredientes.length > 0 ? (
          ingredientes.map((ingrediente) => (
            <label
              key={ingrediente.id}
              style={{
                display: 'flex',
                justifyContent: 'left',
                marginLeft: '50px',
              }}
            >
              <input
                type="checkbox"
                checked={selectedIngredientes.includes(ingrediente.id)}
                onChange={() => handleSelectIngrediente(ingrediente.id)}
              />
              {ingrediente.nome}
            </label>
          ))
        ) : (
          <p>Não há acompanhamentos disponíveis.</p>
        )}
      </div>

      <Button type="orange" onClick={handleSubmitAddMarmita}>
        Adicionar Marmita ao Pedido
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

export default AddMarmitaForm;
