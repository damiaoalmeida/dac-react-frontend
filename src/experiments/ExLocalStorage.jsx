import { useState, useEffect } from "react";

function ExLocalStorage() {
  const [nome, setNome] = useState("");

  // Carregar nome salvo no localStorage ao iniciar
  useEffect(() => {
    const nomeSalvo = localStorage.getItem("nome");
    if (nomeSalvo) {
      setNome(nomeSalvo);
    }
  }, []);

  // Salvar nome no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("nome", nome);
  }, [nome]);

  return (
    <div>
      <h1>Olá, {nome || "Usuário"}!</h1>
      <input 
        type="text" 
        value={nome} 
        onChange={(e) => setNome(e.target.value)} 
        placeholder="Digite seu nome"
      />
    </div>
  );
}

export default ExLocalStorage;
