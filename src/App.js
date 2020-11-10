import React, { useEffect, useState } from "react";

import api from "./services/api";
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then((response) => setRepositories(response.data));
  }, []);

  async function handleAddRepository() {
    const response = await api.post("repositories", {
      title: "Desafio Node.js",
      url: "https://github.com/claudiobarsante/nodejs-concepts",
      techs: ["Node.js", "Javascript"],
    });

    const addedRepository = response.data;
    setRepositories([...repositories, addedRepository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`);
    if (response.status === 204) {
      const filteredRepositories = repositories.filter((repository) => repository.id !== id);
      setRepositories(filteredRepositories);
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
