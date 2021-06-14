import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";
export default function btnRespuesta(props) {
  //   console.log(props.lista);
  //   console.log(props.filtrados);
  return (
    <table>
      <thead>
        <tr>
          <td>id</td>
          <td>Title</td>
          <td>Description</td>
        </tr>
      </thead>
      {props.lista
        .filter((val) => {
          if (props.filtrados === "") {
            return val;
          } else if (
            val.text.includes(props.filtrados) ||
            val.isCorrect.includes(props.filtrados)
          ) {
            return val;
          }
        })
        .map((val, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td style={{ width: "8%" }}>{val.idrespuesta}</td>
                <td style={{ width: "70%" }}>{val.text}</td>
                <td style={{ width: "20%" }}>
                  {val.isCorrect === "true" ? (
                    <div className="isVerdadero">verdadero</div>
                  ) : (
                    <div className="isFalso"> falso</div>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => props.botonUpdate(val.idrespuesta)}
                  >
                    <FaPen />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => props.botonDelete(val.idrespuesta)}
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
