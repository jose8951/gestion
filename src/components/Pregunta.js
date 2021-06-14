import React, { useState, useEffect } from "react";
import Buscador from "./botones/Buscador";
import "./botones/nav/Menu.css";
import Nav from "./botones/nav/Nav";
import Botones from "./botones/btnPregunta";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const cookies = new Cookies();

export default function Pregunta() {
  const regTitle = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s0-9]{4,25}$/;
  const regDescription = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s0-9]{4,55}$/;
  const [validarTitle, setValidarTitle] = useState(false);
  const [validarDescri, setValidarDescri] = useState(false);

  const [bandera, setBandera] = useState(true);
  // const [bloqueo, setBloqueo] = useState(false);
  const [filtrados, setFiltrados] = useState([]);
  const [lista, setLista] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [id, setId] = useState("");
  // const [pregunta, setPregunta] = useState(false);

  const URL_HTTP = "http://localhost/gestion/apirest4/";
  //recupera el id del radio de bloque
  const idbloque = cookies.get("idbloque");
  const bloqueName = cookies.get("bloqueName");
  const idCorreo = cookies.get("id");

  useEffect(() => {
    comprobarRadio();
  },[]);

  const comprobarRadio = () => {
    if (idbloque === undefined) {
      Swal.fire("The Internet?", "Seleccione una bloque!!", "question");
      // setPregunta(true);
    } else {
      listadoRegistro(idbloque);
    }
  };

  // listrado de preguntas
  const listadoRegistro = async (idbloque) => {
    const opcion = "listadoPregunta";
    const res = await axios.get(
      URL_HTTP +
        "?opcion=" +
        opcion +
        "&id=" +
        idCorreo +
        "&idbloque=" +
        idbloque
    );
    setLista(res.data);
  };

  // Añadir pregunta
  const addRegistro = async () => {
    const obj = { title, description, idbloque, opcion: "addPregunta" };

    if (!regTitle.test(title)) {
      setValidarTitle(true);
    } else if (!regDescription.test(description)) {
      setValidarDescri(true);
      setValidarTitle(false);
    } else {
      setValidarDescri(false);
      setValidarTitle(false);
      const res = await axios.post(URL_HTTP, obj);
  
      listadoRegistro(idbloque);
      limpiarEstado();
      Swal.fire({
        title: "Enhorabuena!",
        text: "Pregunta agregada",
        // icon: 'error',
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };

  // update pregunta
  const updateRegistro = async () => {
    const obj = { id, title, description, opcion: "updatePregunta" };

    if (!regTitle.test(title)) {
      setValidarTitle(true);
    } else if (!regDescription.test(description)) {
      setValidarTitle(false);
      setValidarDescri(true);
    } else {
      setValidarDescri(false);
      setValidarTitle(false);
      const res = await axios.put(URL_HTTP, obj);
      listadoRegistro(idbloque);
      limpiarEstado();
      const val = res.data.msg;
          Swal.fire({
        title: "Enhorabuena!",
        // text: "Cuestionario actualizado!!",
        text: val,
        // icon: 'error',
        icon: "success",
        confirmButtonText: "Ok",
      });
    }
  };

  // boton guardar /update
  const btnGuardar = (e) => {
    e.preventDefault();
    bandera ? addRegistro() : updateRegistro();
  };

  // boton delete pregunta
  const btnDelete = async (id) => {
    const opcion = "deletePregunta";
    if (window.confirm("¿Quieres eliminar pregunta?")) {
      const res = await axios.delete(
        URL_HTTP + "?id=" + id + "&opcion=" + opcion
      );

      if (res.data.msg === "Pregunta eliminada") {
        Swal.fire({
          icon: "success",
          title: "Pregunta eliminado...",
        });
      } else if (res.data.msg === "Pregunta no eliminada") {
        Swal.fire({
          icon: "error",
          title: "Pregunta NO eliminado...",
        });
      }
    }
    listadoRegistro(idbloque);
    limpiarEstado();
  };

  // boton para recuperar pregunta
  const btnRecuperarEdit = async (id) => {
    setBandera(false);
    const opcion = "recuperarPregunta";
    const res = await axios.get(URL_HTTP + "?id=" + id + "&opcion=" + opcion);
    setId(res.data.idpregunta);
    setTitle(res.data.title);
    setDescription(res.data.description);
  };

  const valorRadio = (idpregunta, preguntaTitle) => {
    cookies.set("idpregunta", idpregunta, { path: "/" });
    cookies.set("preguntaTitle", preguntaTitle, { path: "/" });    
  };

  // limpiar formulario
  const limpiarEstado = () => {
    setTitle("");
    setDescription("");
  };

  return (
    <div className="contenedor">
      <Nav />
      <div className="contenedor-form">
        <div className="form-input">
          <div className="titulo-formulario"> Pregunta</div>
          <p className="anade-edita">
            {bandera ? <b>Añade Pregunta</b> : <b>Update Bloque</b>}
          </p>
          <form>
            <p className="block">
              <label htmlFor="name">Titulo</label>
              <input
                type="text"
                name="title"
                autoFocus
                placeholder="Eje: Titulo"
                required
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
              {validarTitle && <span>Error del titulo</span>}
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
                // disabled={bloqueo}
              >
                {bandera ? "Añadir" : "Update"}
              </button>
            </p>
          </form>
        </div>
        <div className="form-list">
          <Buscador
            tituloListado="Listado de pregunta"
            cuestionario="Pregunta: "
            cuetionarioName={bloqueName}
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
