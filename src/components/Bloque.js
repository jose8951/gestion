import React, { useState, useEffect } from "react";
import Buscador from "./botones/Buscador";
import "./botones/nav/Menu.css";
import Cookies from "universal-cookie";
import Nav from "./botones/nav/Nav";
import Botones from "./botones/btnBloque";
import axios from "axios";
import Swal from "sweetalert2";

const cookies = new Cookies();

export default function Bloque() {
  // validaciones del formulario
  const regNombre = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s0-9]{4,35}$/;
  const regDescription = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s0-9]{4,45}$/;
  const [validarNombre, setValidarNombre] = useState(false);
  const [validarDescri, setValidarDescri] = useState(false);

  const [bandera, setBandera] = useState(true);
  const [lista, setLista] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [filtrados, setFiltrados] = useState([]);
  const [bloqueo, setBloqueo] = useState(false);

  const URL_HTTP = "http://localhost/gestion/apirest4/";
  const idRadio = cookies.get("idradio");
  const cuestionarioName = cookies.get("cuestionarioName");
  // const cookiesId = cookies.get("id");

  useEffect(() => {
    comprobarRadio();
  }, []);

  const comprobarRadio = () => {
    if (idRadio === undefined) {
      Swal.fire("The Internet?", "Seleccione un cuestionario!!", "question");
      setBloqueo(true);
    } else {
      listadoRegistro(idRadio);
    }
  };

  const listadoRegistro = async (idRadio) => {
    const opcion = "listadoBloque";
    const idCorreo = cookies.get("id");
    const res = await axios.get(
      URL_HTTP + "?opcion=" + opcion + "&id=" + idCorreo + "&idRadio=" + idRadio
    );
    setLista(res.data);
  };

  const addRegistro = async () => {
    const obj = { name, description, idRadio, opcion: "addBloque" };

    if (!regNombre.test(name)) {
      setValidarNombre(true);
    } else if (!regDescription.test(description)) {
      setValidarNombre(false);
      setValidarDescri(true);
    } else {
      setValidarDescri(false);
      setValidarNombre(false);
      const res = await axios.post(URL_HTTP, obj);
      listadoRegistro(idRadio);
      Swal.fire({
        title: "Enhorabuena!",
        text: res.data.msg,
        // icon: 'error',
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };

  const updateRegistro = async () => {
    const obj = { id, name, description, opcion: "updateBloque" };

    if (!regNombre.test(name)) {
      setValidarNombre(true);
    } else if (!regDescription.test(description)) {
      setValidarNombre(false);
      setValidarDescri(true);
    } else {
      setValidarDescri(false);
      setValidarNombre(false);
      limpiarEstado();

      const res = await axios.put(URL_HTTP, obj);
      listadoRegistro(idRadio);
      const val = res.data.msg;
      Swal.fire({
        title: "Enhorabuena!",
        text: val,
        // icon: 'error',
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };

  const btnGuardar = (e) => {
    e.preventDefault();
    bandera ? addRegistro() : updateRegistro();
  };

  const btnDelete = async (id) => {
    const opcion = "deleteBloque";
    if (window.confirm("¿Quieres eliminar bloque?")) {
      const res = await axios.delete(
        URL_HTTP + "?id=" + id + "&opcion=" + opcion
      );

      if (res.data.msg === "Bloque eliminado") {
        Swal.fire({
          icon: "success",
          title: "Bloque eliminado...",
        });
      } else if (res.data.msg === "Bloque no eliminado") {
        Swal.fire({
          icon: "error",
          title: "Bolque NO eliminado...",
        });
      }
    }
    listadoRegistro(idRadio);
  };

  const btnRecuperarEdit = async (id) => {
    setBandera(false);
    const opcion = "recuperarBloque";
    const res = await axios.get(URL_HTTP + "?id=" + id + "&opcion=" + opcion);

    setId(res.data.idbloque);
    setName(res.data.name);
    setDescription(res.data.description);
  };

  const valorRadio = (idbloque, bloqueName) => {
    cookies.set("idbloque", idbloque, { path: "/" });
    cookies.set("bloqueName", bloqueName, { path: "/" });
  };

  const limpiarEstado = () => {
    setName("");
    setDescription("");
    setBandera(true);
  };

  return (
    <div className="contenedor">
      <Nav />
      <div className="contenedor-form">
        <div className="form-input">
          <div className="titulo-formulario">Bloque</div>
          <p className="anade-edita">
            {bandera ? <b>Añade Bloque</b> : <b>Update Bloque</b>}
          </p>
          <form>
            <p className="block">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                autoFocus
                placeholder="Eje: Nombre"
                required
                onChange={(e) => setName(e.target.value)}
                value={name}
              />

              {validarNombre && <span>Error del nombre</span>}
            </p>

            <p className="block">
              <label htmlFor="descripcion">Descripción</label>
              <input
                type="text"
                name="description"
                placeholder="Eje: descripción"
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              {validarDescri && <span>Error de la descripción</span>}
            </p>
            <p className="block">
              <button
                type="submit"
                onClick={(e) => btnGuardar(e)}
                disabled={bloqueo}
              >
                {bandera ? "Añadir" : "Update"}
              </button>
            </p>
          </form>
        </div>

        <div className="form-list">
          <Buscador
            tituloListado="Listado de bloque"
            cuestionario="Cuestionario: "
            cuetionarioName={cuestionarioName}
            setFiltrados={setFiltrados}
          />

          <Botones
            lista={lista}
            filtrados={filtrados}
            valorRadio={valorRadio}
            botonUpdate={btnRecuperarEdit}
            botonDelete={btnDelete}
          />
        </div>
      </div>
    </div>
  );
}
