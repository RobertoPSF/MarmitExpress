import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "../src/pages/Home"
import Restaurantes from "./pages/Restaurantes"
import MeusPedidos from "./pages/MeusPedidos"
import Contato from "./pages/Contato"
import Sobre from "./pages/Sobre"
import Status from "./pages/Status"

export default function AppRoutes() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/restaurantes" element={<Restaurantes />} />
				<Route path="/meus-pedidos" element={<MeusPedidos />} />
				<Route path="/contato" element={<Contato />} />
				<Route path="/sobre" element={<Sobre/>} />
				<Route path="/status" element={<Status/>} />
			</Routes>
		</BrowserRouter>
	)
}
