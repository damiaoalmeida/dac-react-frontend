import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function EditUser() {

    const { id } = useParams(); // Captura o ID da URL
    const navigate = useNavigate();

    // Carregar dados do usuário ao montar
    useEffect(() => {
        axios.get(`http://localhost:8080/api/user/get/${id}`)
        .then((response) => {
            response.data.confirmarSenha = response.data.password;
            console.log(response.data);
            navigate(`/createUser`, { state: { userData: response.data } }); // Passa JSON
        })
        .catch(() => alert("Erro ao carregar usuário!", "error"));
    }, [id]);
};

export default EditUser;