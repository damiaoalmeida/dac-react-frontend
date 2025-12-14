import FormUser from "./FormUser";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import { api } from "../../api";
import { toast } from "react-toastify";


function UserCreate({returnPath}) {

  const navigate = useNavigate();

  const handleCreate = (data) => {
    console.log('Novo usuario: ');
    console.log(data);

    const {foto, ...dadosSemFoto} = data;

    const fd = new FormData();
    fd.append(
      "user",
        new Blob([JSON.stringify(dadosSemFoto)], {type:"application/json"}));
    fd.append("foto", foto);

    api().post('/api/user/save', fd, {headers: {"Content-Type":"multipart/form-data"}})
      .then((resp) => {
        console.log(resp.data)
        toast.success("Usuário salvo com sucesso!");
        navigate(returnPath)
      }).catch(err => {
        console.log(err)
        toast.error("Erro ao salvar o usuário.");
      })
  };

  const handleCancel = () => {
    navigate(returnPath)
  }

  return (
    <div>
      <h3>Criar Usuário</h3>
      <FormUser onSubmit={handleCreate} onCancel={handleCancel}/>
    </div>
  );
}

export default UserCreate;