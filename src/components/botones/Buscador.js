import React from 'react'

export default function Buscador(props) {
    return (
        <div className="titulo-tabla">
        <div className="titulo1">{props.tituloListado}<span> {props.cuestionario}  {props.cuetionarioName}</span></div>
        <div className="buscador">
          <label htmlFor="buscador">Buscador</label>
          <input
            type="text"
            name="buscador"
            placeholder="Buscador..."
            onChange={(e) => {           
              props.setFiltrados(e.target.value)
            }}
          />
        </div>
      </div>
    )
}