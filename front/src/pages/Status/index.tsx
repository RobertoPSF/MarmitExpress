import { Container, Response, StatusColumn } from "./styles";
import { useEffect, useState } from "react";

export default function Status() {
	const [statusMessage, setStatusMessage] = useState<string>("Carregando...");
	const [isError, setIsError] = useState<boolean>(false); 

	useEffect(() => {
		const fetchStatus = async () => {
			try {
				const response = await fetch("http://localhost:8080/health", {
					method: "GET",
					headers: {
						"Content-Type": "application/json",
					},
				});

				const text = await response.text();

				if (response.status !== 200) {
					setStatusMessage("Erro ao obter status do site");
					setIsError(true);
					console.error(text);
				} else {
					setStatusMessage(text || "Site funcionando corretamente");
					setIsError(false);
				}
			} catch (error) {
				setStatusMessage("Erro ao conectar com o servidor");
				setIsError(true);
				console.error(error);
			}
		};

		fetchStatus();
	}, []);

	return (
		<Container>
			<StatusColumn>
				<div>Health:<Response $isError={isError}>{statusMessage}</Response></div>
			</StatusColumn>
		</Container>
	);
}
