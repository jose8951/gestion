import React, { useState, useEffect } from "react";
import "./botones/nav/Menu.css";
import Nav from "./botones/nav/Nav";
import Buscador from "./botones/Buscador";
import Botones from "./botones/btnRespuesta";
import Cookies from "universal-cookie";
import axios from "axios";
import Swal from "sweetalert2";

const cookies = new Cookies();
export default function Respuesta() {
  const regText = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s0-9]{4,50}$/;
  const regIsCorret = /(true|false)/;

  const [validarText, setValidarText] = useState(false);
  const [validarIsCorrect, setValidarIsCorrect] = useState(false);
  const [bandera, setBandera] = useState(true);
  const [valor, setValor] = useState("false");
  const [bloqueo, setBloqueo] = useState(false);
  const [filtrados, setFiltrados] = useState([]);
  const [lista, setLista] = useState([]);
  const [text, setText] = useState("");
  const [id, setId] = useState("");

  const idpregunta = cookies.get("idpregunta");
  const preguntaTitle = cookies.get("preguntaTitle");
  const idradio = cookies.get("idradio");
  const idbloque = cookies.get("idbloque");
  const idCookieUsuario = cookies.get("id");

  const URL_HTTP = "http://localhost/gestion/apirest4/";

  useEffect(() => {
    comprobarRadio();
   
  }, []);

  const comprobarRadio = () => {
    //idpregunta variable con el radio de pregunta
    if (idpregunta === undefined) {
      Swal.fire("The Internet?", "Seleccione una pregunta!!", "question");
      setBloqueo(true);
    } else {
      listadoRegistro(idpregunta);
    }
  };

  const listadoRegistro = async (idpregunta) => {
    console.log(idCookieUsuario, idradio, idbloque, idpregunta);

    const opcion = "listadoRespuesta";
    const res = await axios.get(
      URL_HTTP +
        "?opcion=" +
        opcion +
        "&idCookieUsuario=" +
        idCookieUsuario +
        "&idradio=" +
        idradio +
        "&idbloque=" +
        idbloque +
        "&idpregunta=" +
        idpregunta
    );
    setLista(res.data);
  };

  const addRegistro = async () => {
    const obj = { text, value: valor, idpregunta, opcion: "addRespuesta" };

    if (!regText.test(text)) {
      setValidarText(true);
    } else if (!regIsCorret.test(valor)) {
      setValidarIsCorrect(true);
      setValidarText(false);
    } else {
      setValidarIsCorrect(false);
      const res = await axios.post(URL_HTTP, obj);
      listadoRegistro(idpregunta);
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

  const updateRegistro = async () => {
    const obj = { id, text, valor, opcion: "updateRespuesta" };

    if (!regText.test(text)) {
      setValidarText(true);
    } else if (!regIsCorret.test(valor)) {
      setValidarIsCorrect(true);
      setValidarText(false);
    } else {
      setValidarIsCorrect(false);
      setValidarText(false);
      const res = await axios.put(URL_HTTP, obj);
      setBandera(true);
      listadoRegistro(idpregunta);
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

  const btnGuardar = (e) => {
    e.preventDefault();
    bandera ? addRegistro() : updateRegistro();
  };

  const btnDelete = async (id) => {
    const opcion = "deleteRespuesta";
    if (window.confirm("¿Quieres eliminar respuesta?")) {
      const res = await axios.delete(
        URL_HTTP + "?id=" + id + "&opcion=" + opcion
      );

      if (res.data.msg === "Respuesta eliminada") {
        Swal.fire({
          icon: "success",
          title: "Respuesta eliminado...",
        });
      } else if (res.data.msg === "Respuesta no eliminada") {
        Swal.fire({
          icon: "error",
          title: "Respuesta NO eliminado...",
        });
      }
    }
    listadoRegistro(idpregunta);
  };

  const btnRecuperarEdit = async (id) => {
    setBandera(false);
    const opcion = "recuperarRespuesta";
    const res = await axios.get(URL_HTTP + "?id=" + id + "&opcion=" + opcion);
    setId(res.data.idrespuesta);
    setText(res.data.text);
    setValor(res.data.isCorrect);
  };

  const limpiarEstado = () => {
    setText("");
    setValor("false");
  };

  return (
    <div className="contenedor">
      <Nav />
      <div className="contenedor-form">
        <div className="form-input">
          <div className="titulo-formulario">Respuesta</div>
          <p className="anade-edita">
            {bandera ? <b>Añade Respuesta</b> : <b>update Respuesta</b>}
          </p>
          <form>
            <p className="block">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="text"
                autoFocus
                placeholder="Eje: Texto"
                required
                onChange={(e) => setText(e.target.value)}
                value={text}
              />
              {validarText && <span>Error del texto</span>}
            </p>

            <p className="block tituloRadio">Respuesta verdadera/falsa</p>
            <div className="contenedorRadio">
              <div className="respuestaRadio">
                <label htmlFor="verdadero">Verdadero</label>
                <input
                  type="radio"
                  id="verdadero"
                  name="isCorrect"
                  value="true"
                  onChange={(e) => setValor(e.target.value)}
                  checked={valor === "true"}
                />
              </div>
              <div className="respuestaRadio">
                <label htmlFor="falso">Falso</label>
                <input
                  type="radio"
                  id="falso"
                  name="isCorrect"
                  value="false"
                  onChange={(e) => setValor(e.target.value)}
                  checked={valor === "false"}
                />
              </div>
            </div>

            {validarIsCorrect && (
              <div className="errorRespuesta">
                <br />
                Error vacío
              </div>
            )}
            <p className="block">
              <button
                type="submit"
                onClick={(e) => btnGuardar(e)}
                disabled={bloqueo}
              >
                {bandera ? "Añadir" : "update"}
              </button>
            </p>
          </form>
        </div>

        <div className="form-list">
          <Buscador
            tituloListado="Listado de Respuesta"
            cuestionario="Respuesta"
            cuetionarioName={preguntaTitle}
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
