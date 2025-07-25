import { useState, useEffect } from "react";
import axios from "axios";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";

function UserList() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token"); // Recupera o token do localStorage
  const [users, setUsers] = useState([]); // Estado para armazenar os usuários
  const [loading, setLoading] = useState(true); // Estado para exibir "Carregando..."
  const [error, setError] = useState(null); // Estado para capturar erros

  const [message, setMessage] = useState(""); // Estado para exibir a notificação

  //O useEffect() garante que a requisição aconteça apenas uma vez (quando o componente for montado)
  useEffect(() => {
    axios.get("http://localhost:8080/api/user/list", 
      {
        headers: {
          Authorization: `Bearer ${token}` // Envia o token no cabeçalho
        }
      })
      .then(response => {
        setUsers(response.data); // Atualiza a lista de usuários
        setLoading(false);
      })
      .catch(error => {
        setError("Erro ao carregar usuários! ");
        console.log(error);
        setLoading(false);
      });
  }, []); // O array vazio faz a requisição rodar apenas 1 vez
  

  if (loading) return <p>Carregando usuários...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const handleEditUser = (id) => {
    navigate(`/edituser/${id}`);
  }

  const handleDeleteUser = (id) => {
    axios.delete(`http://localhost:8080/api/user/delete/${id}`)
      .then(() => {
        // Atualiza a lista após remoção
        setUsers(users.filter(user => user.id !== id));

        // Exibe a mensagem de sucesso
        setMessage("Usuário removido com sucesso!");

        // Remove a mensagem após 3 segundos
        setTimeout(() => setMessage(""), 3000);
      })
      .catch(error => console.error("Erro ao excluir usuário:", error));
  }

  return (
    <div>

      {/* Notificação de sucesso  */}
      {message && (
        <div className="alert">
          {message}
        </div>
      )}
      <Message type="sucess" msg={message}/>
      <h2>Lista de Usuários</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Comandos</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr className="table-active" key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.email}</td>
                <td>
                  <button 
                    type="button" 
                    className="btn btn-success" 
                    title="Editar"
                    onClick={() => handleEditUser(user.id)}>E</button>

                  <button 
                    type="button" 
                    className="btn btn-danger" 
                    title="Remover" 
                    onClick={() => handleDeleteUser(user.id)}>X</button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default UserList;
