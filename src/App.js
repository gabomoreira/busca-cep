import { useState } from "react";
import "./styles.css";
import { FiSearch } from "react-icons/fi";
import api from "./services/api";

function App() {
  const [input, setInput] = useState("");
  const [cep, setCep] = useState({});

  const handleSearch = async (e) => {
    if (!input) {
      alert("Informe um CEP");
      return;
    }

    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data);
      setInput("");
    } catch (error) {
      alert("CEP inválido");
      setInput("");
    }
  };

  return (
    <div className="container">
      <h1 className="title">Busca Cep</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button className="buttonSearch" onClick={handleSearch}>
          <FiSearch size={25} color="#fff" />
        </button>
      </div>
      {Object.keys(cep).length > 0 && (
        <main className="main">
          <h2>CEP: {cep.cep || "*Sem dados*"} </h2>

          <span>Rua: {cep.logradouro || "*Sem dados*"}</span>
          <span>Complemento: {cep.complemento || "*Sem dados*"}</span>
          <span>Bairro: {cep.bairro || "*Sem dados*"}</span>
          <span>
            {cep.localidade || "*Sem dados*"} - {cep.uf || "*Sem dados*"}
          </span>
          <span>DDD: {cep.ddd || "*Sem dados*"}</span>
        </main>
      )}
    </div>
  );
}

export default App;
