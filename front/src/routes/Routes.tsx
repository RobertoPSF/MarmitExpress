import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Restaurantes from '../pages/Restaurantes';
import MeusPedidos from '../pages/MeusPedidos';
import MeusPedidosRestaurante from '../pages/MeusPedidosRestaurante';
import Contato from '../pages/Contato';
import Sobre from '../pages/Sobre';
import Status from '../pages/Status';
import Parceiro from '../pages/Parceiro';
import AboutParceiro from '../pages/AboutParceiro';
import TopContainer from '../components/TopContainer';
import Header from '../components/Header';
import Blank from '../pages/BlankPage';
import Cardapio from '../pages/Cardapio';
import Pedido from '../pages/Pedido';
import PedidoRestaurante from '../pages/PedidoRestaurante';
import MeuRestaurante from '../pages/MeuRestaurante';

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <TopContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/restaurantes" element={<Restaurantes />} />
        <Route path="/meus-pedidos" element={<MeusPedidos />} />
        <Route path="/meus-pedidos/:id" element={<Pedido />} />
        <Route path="/pedidos/:id" element={<PedidoRestaurante />} />
        <Route path="/pedidos" element={<MeusPedidosRestaurante />} />
        <Route path="/meu-restaurante" element={<MeuRestaurante />} />
        <Route path="/contato" element={<Contato />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/status" element={<Status />} />
        <Route path="/auth/parceiro" element={<Parceiro />} />
        <Route path="/about/parceiro" element={<AboutParceiro />} />
        <Route path="/blank" element={<Blank />} />
        <Route path="/restaurante/:id/cardapio" element={<Cardapio />} />
      </Routes>
    </BrowserRouter>
  );
}
