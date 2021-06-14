import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";

export default function btnPregunta(props) {
  // console.log(props.filtrados)
  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>Titulo</th>
          <th>descripción</th>
        </tr>
      </thead>
      {props.lista
        .filter((val) => {
          if (props.filtrados === "") {
            return val;
          } else if (
            val.title.includes(props.filtrados) ||
            val.description.includes(props.filtrados)
          ) {
            return val;
          }
        })
        .map((val, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td style={{width: "10%"}}>
                  <input type="radio" name="radio"
                    onChange={()=>props.valorRadio(val.idpregunta, val.title)}
                  /> {val.idpregunta}
                </td>
           
                {/* <td style={{ width: "10%" }}></td> */}
                <td style={{ width: "30%" }}>{val.title}</td>
                <td style={{ width: "60%" }}>{val.description}</td>
                <td>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => props.botonUpdate(val.idpregunta)}
                  >
                    <FaPen />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => props.botonDelete(val.idpregunta)}
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
