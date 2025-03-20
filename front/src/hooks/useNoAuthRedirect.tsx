import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useNoAuthRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('authToken');

    if (token) {
      navigate('/'); // Redireciona para a home se estiver logado
    }
  }, [navigate]);
}
