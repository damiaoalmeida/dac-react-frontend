import { useState, useEffect } from "react";
import axios from "axios";
import Message from "../../components/Message";
import { useNavigate } from "react-router-dom";
import { api } from "../../api";
import 'bootswatch/dist/darkly/bootstrap.min.css';
import Pagination from "@mui/material/Pagination";
import { toast } from "react-toastify";

function UserList() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName : "",
    size: 10
  });

  const [users, setUsers] = useState([]); // Estado para armazenar os usuários
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0); // Estado para armazenar o total de páginas

  const handleChange = (e) => {
     setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    loadUsers();
    console.log("Pesquisa enviada:", formData);
  };

  useEffect(() => {
     setFormData({ 
        ...formData, 
        "page": page });
    loadUsers();
  }, [page]);

  const loadUsers = () => {
    api().get("/api/user/page/filter", 
      {params: {
        firstName: formData.firstName || null,  
        lastName: formData.lastName || null,
        page: page,
        size: formData.size
      }},
      {
        headers: {
          Authorization: `Bearer ${token}` // Envia o token no cabeçalho
        }
      })
      .then(response => {
        console.log(response.data);
        setUsers(response.data.content); // Atualiza a lista de usuários
        setTotalPages(response.data.totalPages);
      })
      .catch(error => {
        toast.error("Erro no carregamento dos dados.");
        console.log(error);
      });
  }

  const handleEditUser = (id) => {
    navigate(`/edituser/${id}`);
  }

  const handleDeleteUser = (id) => {
    api().delete(`api/user/delete/${id}`)
      .then(() => {
        // Atualiza a lista após remoção
        setUsers(users.filter(user => user.id !== id));

        // Exibe a mensagem de sucesso
        toast.success("Usuário removido com sucesso!");
      })
      .catch(error => 
        toast.error("Erro ao excluir usuário")
      );
  }







  const token = localStorage.getItem("token"); // Recupera o token do localStorage
  const [loading, setLoading] = useState(true); // Estado para exibir "Carregando..."
  const [error, setError] = useState(null); // Estado para capturar erros

  const [message, setMessage] = useState(""); // Estado para exibir a notificação






  return (
    <div>
      <h4>Pesquisa:</h4>
      <div style={{marginTop: 30}}>
      <form onSubmit={handleSubmit} className="p-4 bg-dark border rounded">
        <label htmlFor="idfirstName">Nome: </label>
        <input
            id="idfirstName"
            name="firstName"
            type="text"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Nome"
        />

        <label>Sobrenome: </label>
        <input
            id="idlastName"
            name="lastName"
            type="text"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Sobrenome"
            />
        <button className="btn btn-primary btn-sm" type="submit">Pesquisar</button>
      </form>
      </div>
     
      <h2>Lista de Usuários</h2>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Login</th>
            <th scope="col">Status</th>
            <th scope="col">Comandos</th>
          </tr>
        </thead>
        <tbody>
          {
            users.map(user => (
              <tr className="table-active" key={user.id}>
                <td>{user.id}</td>
                <td>{user.firstName} {user.lastName}</td>
                <td>{user.login}</td>
                <td>{user.status}</td>
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

      {/*Paginação */}
      <div className="center">
        <div style={{ backgroundColor: 'white', width: 'fit-content'}}>
          <Pagination 
            count={totalPages} 
            variant="outlined" 
            shape="primary"
            onChange={(e, value) => setPage(value - 1)}
            />
        </div>
      </div>
    </div>
  );
}

export default UserList;
