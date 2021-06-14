import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";

export default function btnCuestionario(props) {
  // console.log(props.lista);

  return (
    <table>
      <thead>
        <tr>
          <td style={{width:"15%"}}>Selección</td>
          <td style={{width:"30%"}}>Nombre</td>
          <td style={{width:"35%"}}>Descripcion</td>
          <td style={{width:"20%"}}>Category</td>
        </tr>
      </thead>

      {props.lista
        .filter((val) => {
          if (props.filtrados === "") {
            return val;
          } else if (
            val.name
              .toLocaleLowerCase()
              .includes(props.filtrados.toLocaleLowerCase()) ||
            val.description
              .toLocaleLowerCase()
              .includes(props.filtrados.toLocaleLowerCase()) ||
            val.category
              .toLocaleLowerCase()
              .includes(props.filtrados.toLocaleLowerCase())
          ) {
            return val;
          }
        })
        .map((val) => {
          return (
            <tbody key={val.idcuestionario}>
              <tr>
                <td>
                  <input
                    type="radio"
                    name="mismo"
                    onChange={() =>
                      props.valorRadio(val.idcuestionario, val.name)
                    }
                  />
                </td>
              
                <td style={{ width: "30%" }}>{val.name}</td>
                <td style={{ width: "35%" }}>{val.description}</td>
                <td style={{ width: "20%" }}>{val.category}</td>
                <td>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => props.botonUpdate(val.idcuestionario)}
                  >
                    <FaPen />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => props.botonDelete(val.idcuestionario)}
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            </tbody>
          );
        })}
    </table>
  );
}
