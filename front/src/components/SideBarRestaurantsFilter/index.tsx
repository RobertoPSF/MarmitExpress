import { useState } from "react";
import { Container, FilterGroup, FilterButton, Label, InputGroup, Input } from "./styles";

interface SidebarFiltrosProps {
  setFiltros: (filtros: any) => void;
}

export default function SidebarFiltros({ setFiltros }: SidebarFiltrosProps) {
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedCozinha, setSelectedCozinha] = useState("");

  const handleSelect = (type: string, value: string) => {
    if (type === "area") {
      setSelectedArea(value);
      setFiltros((prev: any) => ({ ...prev, area: value }));
    } else if (type === "cozinha") {
      setSelectedCozinha(value);
      setFiltros((prev: any) => ({ ...prev, cozinha: value }));
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFiltros((prev: any) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <Container>
      <Label>Área:</Label>
      <FilterGroup>
        {["Centro", "Zona Sul", "Norte"].map((area) => (
          <FilterButton
            key={area}
            className={selectedArea === area ? "active" : ""}
            onClick={() => handleSelect("area", area)}
          >
            {area}
          </FilterButton>
        ))}
      </FilterGroup>

      <Label>Faixa de Preço (R$):</Label>
      <InputGroup>
        <Input type="number" name="precoMin" placeholder="Mínimo" onChange={handlePriceChange} />
        <Input type="number" name="precoMax" placeholder="Máximo" onChange={handlePriceChange} />
      </InputGroup>

      <Label>Tipo de Cozinha:</Label>
      <FilterGroup>
        {["Italiana", "Japonesa", "Fast Food"].map((cozinha) => (
          <FilterButton
            key={cozinha}
            className={selectedCozinha === cozinha ? "active" : ""}
            onClick={() => handleSelect("cozinha", cozinha)}
          >
            {cozinha}
          </FilterButton>
        ))}
      </FilterGroup>
    </Container>
  );
}
