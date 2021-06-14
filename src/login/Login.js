import axios from "axios";
import React, { useState } from "react";
import "./Login.css";
import LogoImagen from "./logo.svg";
import Cookies from "universal-cookie";
import { useHistory } from "react-router-dom";

const cookies = new Cookies();

export default function Login() {
  const history = useHistory();
  // const [lista, setLista] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [id, setId] = useState("");
  const [error, setError] = useState(false);

  const URL_HTTP = "http://localhost/gestion/apirest4/";

  const addUpdate = async (e) => {
    e.preventDefault();
    const opcion = "login";
    const obj = { email, password, opcion };
    const res = await axios.post(URL_HTTP, obj);

    if (res.data.msg === "usuarioOK") {
      cookies.set("id", res.data.idusuario, { path: "/" });
      cookies.set("email", res.data.email, { path: "/" });
      history.push("/usuario");
    } else if (res.data.msg === "usuarioNoEncotrado") {
      setError("Usuario No encotrado");
    } else if (res.data.msg === "errorDeContraseña") {
      setError("Error de contraseña");
    }
  };

  return (
    <div className="login">
      <div className="row">
        <div className="col-sm-4 offset-4 mt-5">
          <div className="card pt-5">
            <div className="card-header text-center">
              <img src={LogoImagen} className="App-logo" alt="logo" />
              Login
            </div>
            <div className="card-body">
              <form>
                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon1">
                      📧
                    </span>
                  </div>

                  <input
                    type="email"
                    className="form-control"
                    placeholder="email"
                    name="email"
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>

                <div className="input-group mb-3">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="basic-addon2">
                      🔒
                    </span>
                  </div>
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    name="password"
                    aria-label="clave"
                    aria-describedby="basic-addon2"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                  />
                </div>

                {error && <div className="alert alert-danger">{error}</div>}

                <button
                  className="btn btn-info btn-lg btn-block"
                  onClick={(e) => addUpdate(e)}
                >
                  Acceder
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
