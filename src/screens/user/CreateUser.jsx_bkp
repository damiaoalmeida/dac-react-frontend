import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FormInput from "../../components/FormInput";
import Navbar from "../../components/Navbar";
import axios from "axios";

function CreateUser() {
  const location = useLocation();
  //location.state?. -> significa: se state existir, então pega o valor da propriedade hideNavBar
  const hideNavbar = location.state?.hideNavbar || false; // Se vier do login, esconde a Navbar

  const navigate = useNavigate();

  const [message, setMessage] = useState(""); // Estado para exibir a notificação
  const [mensagemErro, setMensagemErro] = useState("");

  const user = location.state?.userData; // Acessa o JSON que veio de outro componente
  const title = user ? "Editar Usuário" : "Cadastro de Usuário";
  const msgButton = user ? "Editar" : "Cadastrar";

  const [formData, setFormData] = useState(user || {
    firstName: "",
    lastName : "",
    dateOfBirth : "",
    email: "",
    gender: "",
    password: "",
    confirmarSenha: "",
  });

  const handleChange = (e) => {
     setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value });
  };

  const handleCancel = () => {
    if(user)
      navigate("/userlist")
    else if (!hideNavbar)
      navigate("/home")
    else
      navigate("/")
  }

  const handleSubmit =  (e) => {
    e.preventDefault();

    if(formData.password != formData.confirmarSenha){
      alert("As senhas não conferem!")
      return;
    }

    axios.post('http://localhost:8080/api/user/basicregister', formData) 
      .then(() => {
          response => console.log(response)
          // Exibe a mensagem de sucesso
          setMessage("Usuário cadastrado com sucesso!");

          // Remove a mensagem após 3 segundos
          setTimeout(() => setMessage(""), 3000);
          setFormData({
            firstName: "",
            lastName : "",
            dateOfBirth : "",
            email: "",
            gender: "",
            password: "",
            confirmarSenha: ""
          })
          if(user){
            navigate("/userlist");
          }
        }
      ).catch(
        error => console.log(error)
      );
  };

  return (
    <div>
      {/* Notificação de sucesso */}
      {message && (
        <div className="alert">
          {message}
        </div>
      )}

      {!hideNavbar && <Navbar />}

      <div className="card border-primary mb-3" style={{width: "500px"}}>

        <div className="card-header">{title}</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <FormInput
                label='Nome*:' 
                id='idNome'
                name="firstName"
                type='text' 
                value={formData.firstName} 
                onChange={handleChange}
                placeholder="Digite seu nome"
                required={true}>
            </FormInput>

            <FormInput
                label='Sobrenome*:' 
                id='idSobrenome'
                name="lastName"
                type='text' 
                value={formData.lastName} 
                onChange={handleChange}
                placeholder="Digite seu sobrenome"
                required={true}>
            </FormInput>

            <FormInput
                label='Data de Nascimento*:' 
                id='idDatanascimento'
                name="dateOfBirth"
                type='date' 
                value={formData.dateOfBirth} 
                onChange={handleChange}
                placeholder="Data de nascimento"
                required={true}>
            </FormInput>

            <div>
              <label className="form-label mt-4">Selecione seu gênero:</label>
              <select className="form-select" name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Selecione...</option>
                <option value="MALE">Masculino</option>
                <option value="FEMALE">Feminino</option>
                <option value="OTHER">Outro</option>
                <option value="NOT_SPECIFY">Não Informar</option>
              </select>
            </div>

            <FormInput
                label='Email*:' 
                id='idEmail'
                name="email"
                type='email' 
                value={formData.email} 
                onChange={handleChange}
                placeholder="Digite seu email"
                required={true}>
            </FormInput>

            <FormInput
                label='Senha*:' 
                id='idSenha'
                name="password"
                type='password' 
                value={formData.password} 
                onChange={handleChange}
                placeholder=""
                required={true}>
            </FormInput>

            <FormInput
                label='Confirmação de Senha*:' 
                id='idConfirmacaoSenha'
                name="confirmarSenha"
                type='password' 
                value={formData.confirmarSenha} 
                onChange={handleChange}
                placeholder=""
                required={true}>
            </FormInput>

            {mensagemErro && <p style={{ color: "red" }}>{mensagemErro}</p>}

            <div style={{paddingTop: "10px"}}>
              <button className="btn btn-primary" type="submit">{msgButton}</button>
              <button className="btn btn-danger" onClick={() => handleCancel()}>Cancelar</button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}

export default CreateUser;
