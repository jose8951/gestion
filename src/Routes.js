import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './App'
import Usuario from './components/Usuario'
import Cuestionario from './components/Cuestionario'
import Bloque from './components/Bloque'
import Pregunta from './components/Pregunta'
import Respuesta from './components/Respuesta'

// las route de las páginas
export default function Routes() {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route exact path="/usuario" component={Usuario}/>
            <Route exact path="/cuestionario" component={Cuestionario}/>
            <Route exact path="/bloque" component={Bloque}/>
            <Route exact path="/pregunta" component={Pregunta}/>
            <Route exact path="/respuesta" component={Respuesta}/>
        </Switch>
        </BrowserRouter>
    )
}
