import {useState, useEffect} from "react";
import 'bootswatch/dist/darkly/bootstrap.min.css';
import '../../App.css';
import {useNavigate} from "react-router-dom";
import { api } from "../../api";
import { toast } from "react-toastify";

function FormUser({userData, onSubmit, onCancel}) {

  const [allRoles, setAllRoles] = useState([]);

  useEffect( ()=>{
    api().get("/api/role/list")
    .then(
      response => setAllRoles(response.data)
    ).catch(
      err => {
        console.log(err)
      }
    )  
  } , []);

  //suponha que as permissões vieram do backend
  // const allRoles = [
  //   {id:"1", role:"Administrador"},
  //   {id:"2", role:"Diretor"},
  //   {id:"3", role:"Coordenador"},
  //   {id:"4", role:"Professor"},
  //   {id:"5", role:"Aluno"}]

  const [formData, setFormData] = useState(userData || {
    firstName: "",
    lastName : "",
    login: "",
    password: "",
    password2: "",
    gender: "",
    dateOfBirth : "",
    status: "Ativo",
    roles: [],
    foto: null
  });

  const [foto, setFoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
     setFormData({ 
        ...formData, 
        [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
      const id = e.target.value;
      const text = document.getElementById("lck_" + id).innerText;

      if(formData.roles.some(item => item.id === id)) {
        // se já tiver no array, remove
        setFormData({ 
          ...formData, 
          ['roles']: formData.roles.filter((r) => r.id !== id) })
      } else {
        // caso contrário, adiciona
        setFormData({ 
          ...formData, 
          ['roles']: [...formData.roles, {"id": id, "role":  text}] })
      }

      // if(formData.roles.includes(id)) {
      //   // se já tiver no array, remove
      //   setFormData({ 
      //     ...formData, 
      //     ['roles']: formData.roles.filter((r) => r !== id) })
      // } else {
      //     setFormData({ 
      //       ...formData, 
      //       ['roles']: [...formData.roles, id] })
      // }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    // setFoto(file);
    setFormData({...formData, foto: file});
    setPreview(URL.createObjectURL(file)); // preview da imagem
  };

  const handleSubmit =  (e) => {
    e.preventDefault();

    if(formData.password != formData.password2){
      toast.error("As senhas não conferem!");
      return;
    }

    onSubmit(formData);
  }

  return (
    <>
      <div className="center">
        <form onSubmit={handleSubmit} className="p-4 bg-dark border rounded">

          <label htmlFor="idfirstName">Nome* </label>
          <input
                    id="idfirstName"
                    name="firstName"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Seu nome"
                    className="form-control mb-2" 
                    required={true}
                    />

          <label>Sobrenome* </label>
          <input
                    id="idlastName"
                    name="lastName"
                    type="text"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Seu sobrenome"
                    className="form-control mb-2"
                    required={true}
                    />
          
          <label>Login* </label>
          <input
                    id="idlogin"
                    name="login"
                    type="text"
                    value={formData.login}
                    onChange={handleChange}
                    placeholder="Seu email"
                    className="form-control mb-2"
                    required={true}
                    />

          <label htmlFor="idpassword">Senha* </label>
          <input
                    id="idpassword"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-control mb-2" 
                    required={true}
                    />

          <label htmlFor="idpassword2">Re-Senha* </label>
          <input
                    id="idpassword2"
                    name="password2"
                    type="password"
                    value={formData.password2}
                    onChange={handleChange}
                    className="form-control mb-2" 
                    required={true}
                    />
          
          <label htmlFor="idgender1">Gênero* </label>
          <div className="container_grid">
            <input 
              type="radio" 
              name="gender" 
              id="idgender1" 
              value="MALE" 
              onChange={handleChange}
              className="form-check-input"
              checked={formData.gender === 'MALE'}/>
            Masculino

            <input 
              type="radio" 
              name="gender" 
              id="idgender2" 
              value="FEMALE" 
              onChange={handleChange}
              className="form-check-input"
              checked={formData.gender === 'FEMALE'}/>
            Feminino

            <input 
              type="radio" 
              name="gender" 
              id="idgender3" 
              value="OTHER" 
              onChange={handleChange}
              className="form-check-input"
              checked={formData.gender === 'OTHER'}/>
            Outro

            <input 
              type="radio" 
              name="gender" 
              id="idgender4" 
              value="NOT_SPECIFY" 
              onChange={handleChange}
              className="form-check-input"
              checked={formData.gender === 'NOT_SPECIFY'}/>
            Não lhe interessa
          </div>

          <label htmlFor="iddateOfBirth">Data de nascimento* </label>
          <div>
            <input
                    id="iddateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required={true}
                    />
          </div>

          <label htmlFor="statusConta" className="form-label mt-4">Status:</label>
          <select className="form-select" id="idstatusConta" name="status" onChange={handleChange}>
            <option value='Ativo' defaultChecked>Ativo</option>
            <option value='Inativo'>Inativo</option>
            <option value='Bloqueado'>Bloqueado</option>
            <option value='Pendente'>Pendente</option>
          </select>

          <label className="mt-4">Permissões</label>
          <div>
            {/* [
            {id: 1, role: 'ROLE_ADMIN'}, 
            {id: 2, role: 'ROLE_USER'}] */}
             {allRoles.map((r) => (
                <div key={r.id}>
                  <input
                    type="checkbox"
                    value={r.id}
                    checked={formData.roles.some(item => item.id == r.id)}
                    onChange={handleRoleChange}></input>
                  <label id={"lck_" + (r.id)} style={{padding: '5px'}}> {r.role}</label>
                </div>
                )
             )}
          </div>

          <label>Foto do usuário:</label>
          <input
            className="form-control"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
          {preview && (
            <div className="mb-2">
              <img src={preview} alt="Preview" width="120" className="rounded" />
            </div>
          )}

          <br/>
          <div className="center">
            <button className="btn btn-primary" type="submit">Salvar</button>
            <button className="btn btn-danger" type="button" onClick={onCancel}>Cancelar</button>
          </div>
        </form>
      </div>
    </>

  );
}

export default FormUser;