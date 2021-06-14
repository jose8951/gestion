import React, { useState, useEffect } from "react";
import "./botones/nav/Menu.css";
import Cookies from "universal-cookie";
import Nav from "./botones/nav/Nav";
import Buscador from "./botones/Buscador";
import Botones from "./botones/btnCuestionario";
import axios from "axios";

import Swal from "sweetalert2";


const cookies = new Cookies();

export default function Cuestionario() {
  const regNombre = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s0-9]{4,25}$/;
  const regDescription = /^[A-Za-záéíóúñÁÉÍÓÚÑ\s0-9]{4,45}$/;
  const [validarNombre, setValidarNombre] = useState(false);
  const [validarDescri, setValidarDescri] = useState(false);
  const [validarCategory, setValidarCategory] = useState(false);

  const [bandera, SetBandera] = useState(true);
  const [lista, setlista] = useState([]);
  const [filtrados, setFiltrados] = useState("");
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const URL_HTTP = "http://localhost/gestion/apirest4/";

  useEffect(() => {
    listadoRegistro();
  }, []);

  

  // el id del usuario (correo)
  const idCookieUsuario = cookies.get("id");
  // console.log(idCookieUsuario);

  const listadoRegistro = async () => {
    const opcion = "listadoCuestionario";
    const res = await axios.get(
      URL_HTTP + "?opcion=" + opcion + "&id=" + idCookieUsuario
    );
    setlista(res.data);
    // console.log(res.data[0].name)
  };

  const addRegistro = async () => {
    const opcion = "addCuestionario";
    const obj = {
      name,
      description,
      category,
      opcion,
      cookiesId: idCookieUsuario,
    };

    //validación del formulario de cuestionario
    if (!regNombre.test(name)) {
      setValidarNombre(true);
    } else if (!regDescription.test(description)) {
      setValidarNombre(false);
      setValidarDescri(true);
    } else if (category === "") {
      setValidarCategory(true);
      setValidarDescri(false);
    } else {
      setValidarCategory(false);
      limpiarEstado();
      const res = await axios.post(URL_HTTP, obj);
      listadoRegistro();
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
    const opcion = "updateCuestionario";
    const obj = { id, name, description, category, opcion };

    //validación del formulario de cuestionario
    if (!regNombre.test(name)) {
      setValidarNombre(true);
    } else if (!regDescription.test(description)) {
      setValidarNombre(false);
      setValidarDescri(true);
    } else if (category === "") {
      setValidarCategory(true);
      setValidarNombre(false);
      setValidarDescri(false);
    } else {
      setValidarCategory(false);
      setValidarDescri(false);
      limpiarEstado();
      const res = await axios.put(URL_HTTP, obj);
      listadoRegistro();
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
    const opcion = "deleteCuestionario";
    if (window.confirm("¿Quieres elimnar el cuestionario?")) {
      const res = await axios.delete(URL_HTTP + "?id=" + id + "&opcion=" + opcion);
      
   
      if(res.data.msg==="Cuestionario eliminado"){
        Swal.fire({
          icon: "success",
          title: "Cuestionario eliminado...",
        });
      }else if(res.data.msg==="Cuestionario NO eliminado"){
        Swal.fire({
          icon: "error",
          title: "Cuestionario NO eliminado...",
        });
      }
      listadoRegistro();
    }

  
  };

  const btnRecuperarEdit = async (id) => {
    SetBandera(false);
    const opcion = "recuperaCuestionario";
    const res = await axios.get(URL_HTTP + "?id=" + id + "&opcion=" + opcion);
     setId(res.data.idcuestionario);
    setName(res.data.name);
    setDescription(res.data.description);
    setCategory(res.data.category);
  };

  const valorRadio = (id, name) => {
    cookies.set("idradio", id, { path: "/" });
    cookies.set("cuestionarioName", name, { path: "/" });
  };

  const limpiarEstado = () => {
    setName("");
    setDescription("");
    setCategory("");
    SetBandera(true);
  };

  return (
    <div className="contenedor">
      <Nav />
      <div className="contenedor-form">
        <div className="form-input">
          <div className="titulo-formulario">Cuestionario</div>
          <p className="anade-edita">
            {bandera ? <b>Añade Cuestionario</b> : <b>Update Cuestionario</b>}
          </p>
          <form>
            <p className="block">
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                placeholder="Eje: de 4 a 15 caracteres..."
                autoFocus
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
              {validarNombre && <span>Error del nombre</span>}
            </p>

            <p className="block">
              <label htmlFor="description">Descripción</label>
              <input
                type="text"
                name="description"
                placeholder="Eje: de 4 a 25 caracteres..."
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              {validarDescri && <span>Error de la Descripción</span>}
            </p>
            <p>
              <label htmlFor="category">Category</label>
              <select
                name="category"
                onChange={(e) => setCategory(e.target.value)}
                value={category}
              >
                <option value="">Seleccionar campo</option>
                <option value="categoria 1">Categoria 1</option>
                <option value="categoria 2">Categoria 2</option>
                <option value="categoria 3">Categoria 3</option>
                <option value="categoria 4">Categoria 4</option>
              </select>
              {validarCategory && <span>No puede estar vacio</span>}
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
            tituloListado="Listado de custionario"
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
