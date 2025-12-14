import FormUser from "./FormUser";
import {useNavigate} from "react-router-dom";

function UserEdit() {

    const navigate = useNavigate();

    //Vamos supor que este usuário veio do backend
    const user = {
        firstName: "Fulano",
        lastName : "da Silva",
        login: "fulano@ifpb.com",
        password: "",
        password2: "",
        gender: "NOT_SPECIFY",
        dateOfBirth : "2020-04-02",
        statusConta: "Ativo",
        roles: ["1", "3"]
    };

  const handleEdit = (data) => {
    console.log('Editando usuario: ');
    console.log(data);
  };

  const handleCancel = () => {
    navigate(`/userlist`);
  }

  return (
    <div>
      <h3>Editar Usuário</h3>
      <FormUser userData={user} onSubmit={handleEdit} onCancel={handleCancel}/>
    </div>
  );
}

export default UserEdit;