import React, { useState, useEffect } from "react";
import "./botones/nav/Menu.css";
import Nav from "./botones/nav/Nav";
import Buscador from "./botones/Buscador";
import Botones from "./botones/btnUsuario";
import axios from "axios";
import Swal from "sweetalert2";

export default function Usuario() {
  const correo = /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/;
  // password numero, letra minuscula otra mayuscula y simbolo ($@_) de 4 a 12 uno o varios
  const pass =
    /^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@_])(?!.*[iIoO])\S{4,12}$/;
  const [validarEmail, setValidarEmail] = useState(false);
  const [validarPass, setValidarPass] = useState(false);

  const [bandera, SetBandera] = useState(true);
  const [lista, setLista] = useState([]);
  const [id, setId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [filtrados, setFiltrados] = useState("");

  const URL_HTTP = "http://localhost/gestion/apirest4/";

  useEffect(() => {
    listadoRegistro();
  }, []);

  const listadoRegistro = async () => {
    const opcion = "listadoUsuario";
    const res = await axios.get(URL_HTTP + "?opcion=" + opcion);
    setLista(res.data);
  };

  // añadir usuario
  const addRegistro = async () => {
    const obj = { email, password, opcion: "addUsuario" };
    if (!correo.test(email)) {
      setValidarEmail(true);
    } else if (!pass.test(password)) {
      setValidarEmail(false);
      setValidarPass(true);
    } else {
      setValidarPass(false);
      const res = await axios.post(URL_HTTP, obj);
      // console.log(res)
      listadoRegistro();
      limpiarEstado();
      Swal.fire({
        title: "Enhorabuena!",
        text: res.data.msg,
        // icon: 'error',
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };
  // update usuario
  const updateRegistro = async () => {
    const obj = { id, email, password, opcion: "updateUsuario" };
    if (!correo.test(email)) {
      setValidarEmail(true);
    } else if (!pass.test(password)) {
      setValidarEmail(false);
      setValidarPass(true);
    } else {
      setValidarPass(false);
      const res = await axios.put(URL_HTTP, obj);

      listadoRegistro();
      limpiarEstado();
      Swal.fire({
        title: "Enhorabuena!",
        text: res.data.msg,
        // icon: 'error',
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };

  // boton guardar/update
  const btnGuardar = (e) => {
    e.preventDefault();
    bandera ? addRegistro() : updateRegistro();
  };

  // delete usuario
  const btnDelete = async (idusuario) => {
    const opcion = "deleteUsuario";
    if (window.confirm("¿Quieres eliminar el registro?")) {
      const res = await axios.delete(
        URL_HTTP + "?id=" + idusuario + "&opcion=" + opcion
      );

      if (res.data.msg === "Usuario eliminado") {
        Swal.fire({
          icon: "success",
          title: res.data.msg,
        });
      } else if (res.data.msg === "Usuario no eliminado") {
        Swal.fire({
          icon: "error",
          title: res.data.msg,
        });
      }
      listadoRegistro();
    }
  };

  // boton recuperar usuario
  const btnRecuperarEdit = async (id) => {
    SetBandera(false);
    const opcion = "recuperaUsuario";
    const res = await axios.get(URL_HTTP + "?id=" + id + "&opcion=" + opcion);
    setId(res.data.idusuario);
    setEmail(res.data.email);
  };

  // limpiar formulario
  const limpiarEstado = () => {
    setEmail("");
    setPassword("");
    SetBandera(true);
  };

  return (
    <div className="contenedor">
      <Nav />
      <div className="contenedor-form">
        <div className="form-input">
          <div className="titulo-formulario">usuario</div>
          <p className="anade-edita">
            {bandera ? <b>Añade Usuario</b> : <b>Update Usuario</b>}
          </p>
          <form>
            <p className="block">
              <label htmlFor="name">Email</label>
              <input
                type="text"
                name="email"
                autoFocus
                placeholder="Eje: correo@correo.com"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              {validarEmail && <span>Error de email</span>}
            </p>

            <p className="block">
              <label htmlFor="descripcion">Password</label>
              <input
                type="text"
                name="password"
                placeholder="Eje: aA1$  de 4 a 8 digitos"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              {validarPass && <span>Error de password</span>}
            </p>
            <p className="block">
              <button type="submit" onClick={(e) => btnGuardar(e)}>
                {bandera ? "Añadir" : "Update"}
              </button>
            </p>
          </form>
        </div>

        <div className="form-list">
          <Buscador
            tituloListado="Listado de usuario"
            setFiltrados={setFiltrados}
          />

          <Botones
            lista={lista}
            filtrados={filtrados}
            botonUpdate={btnRecuperarEdit}
            botonDelete={btnDelete}
          />
        </div>
      </div>
    </div>
  );
}
