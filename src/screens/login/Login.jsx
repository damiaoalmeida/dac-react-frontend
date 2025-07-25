import FormInput from "../../components/FormInput";
import { useState } from "react";
import { useNavigate} from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import '../../App.css';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ login: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
      navigate("/home");
    } catch(err) {
      if (err.message.includes("code 400")) {
        setMessage("Usuário ou senha inválidos");
        // Remove a mensagem após 3 segundos
        setTimeout(() => setMessage(""), 3000);
      } else {
        console.log(err.message);
        setMessage("Erro ao fazer login");
      }
    }
  };

  const handleRegister = () => {
    alert("Redirecionando para a tela de cadastro...");
  };

  return (
    <>
      {message && (
        <div className="alert">
          {message}
        </div>
      )}

    <h2>Login</h2>
    <div className="row">
      <form onSubmit={handleSubmit}>
        <FormInput 
          label='Login:' 
          id='idlogin' 
          name="login"
          type='text' 
          value={formData.login}
          onChange={handleChange}
          placeholder="Digite seu login">
        </FormInput>

        <FormInput
          label='Password:' 
          id='idpass' 
          name="password"
          type='password' 
          value={formData.password}
          onChange={handleChange}
          placeholder="Digite sua senha">
        </FormInput>
        <div>
          {/* <button className="btn btn-primary" onClick={() => navigate("/home")}>Entrar</button> */}
          <button className="btn btn-primary" type="submit">Entrar</button>
          <button className="btn btn-secondary" onClick={() => navigate("/createuser", {state:{hideNavbar:true}})}>Cadastrar</button>
        </div>
      </form>
    </div>
    </>
  );
}

export default Login;

//   return (
//     <>
//     <h2>Login</h2>
//     <div className="row">
//       <div>
//         <label>Email:</label>
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Digite seu e-mail"
//           className="form-control"
//         />
//       </div>
//       <div>
//         <label>Senha:</label>
//         <input
//           type="password"
//           value={senha}
//           onChange={(e) => setSenha(e.target.value)}
//           placeholder="Digite sua senha"
//           className="form-control"
//         />
//       </div>
//       <div>
//         <button className="btn btn-primary" onClick={handleLogin}>Entrar</button>
//         <button className="btn btn-secondary" onClick={handleRegister}>Cadastrar</button>
//       </div>
//     </div>
//     </>
//   );
// }

// export default Login;