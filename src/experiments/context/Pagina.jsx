import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

function Pagina() {
  const { tema, alternarTema } = useContext(ThemeContext);

  return (
    <div style={{ background: tema === "light" ? "#fff" : "#333", color: tema === "light" ? "#000" : "#fff", padding: "20px" }}>
      <h1>Tema Atual: {tema}</h1>
      <button onClick={alternarTema}>Alternar Tema</button>
    </div>
  );
}

export default Pagina;
