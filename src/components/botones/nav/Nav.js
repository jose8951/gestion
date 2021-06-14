import React, { Fragment, useEffect } from "react";
import Cookies from "universal-cookie";
import { NavLink, useHistory } from "react-router-dom";

const cookies = new Cookies();
export default function Nav(props) {
  const history = useHistory();

  useEffect(() => {
    if (!cookies.get("id")) {
      history.push("/");
    }
  });


// borrado de las cookies 
  const cerrar = () => {
    // cookies.remove()
    cookies.remove("id", { path: "/" });
    cookies.remove("idradio", { path: "/" });
    cookies.remove("cuestionarioName", {path:"/"} )

    cookies.remove("idbloque", {path:"/"} )
    cookies.remove("bloqueName", {path: "/"})

    cookies.remove('idpregunta', {path:'/'})
    cookies.remove('preguntaTitle', {path:'/'})
    history.push("./");
  };





  return (
    <Fragment>
      <div className="cont-cabecera">
        <div className="titulo">hubiqus</div>
        <div className="usuarioRegistrado">
          <span>
            Usuario id: <b> {cookies.get('id')}</b>
          </span>
          <span>
            Usuario email: <b> {cookies.get('email')}</b>
          </span>
        </div>
      </div>

      <div>
        <button className="cerrar-sesion" onClick={cerrar}>
          Cerrar sesión
        </button>
      </div>

      <div className="menu-botones">
        <nav>
          <NavLink
            to="usuario"
            exact
            activeClassName="active"
            className="navegador izq"
          >
            Usuario
          </NavLink>
          <NavLink
            to="cuestionario"
            exact
            activeClassName="active"
            className="navegador"
          >
            Cuestionario
          </NavLink>
          <NavLink
            to="/bloque"
            exact
            activeClassName="active"
            className="navegador"           
          >
            Boqueo
          </NavLink>
          <NavLink
            to="/pregunta"
            exact
            activeClassName="active"
            className="navegador"
          >
            Pregunta
          </NavLink>
          <NavLink
            to="/respuesta"
            exact
            activeClassName="active"
            className="navegador der"
          >
            Respueta
          </NavLink>
        </nav>
      </div>
    </Fragment>
  );
}
