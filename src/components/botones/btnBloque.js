import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";

export default function btnBloque(props) {
  
  return (
    <table>
      <thead>
        <tr>
          <th style={{ width:"8%" }}>id</th>
          <th style={{ width: "20%" }}>name</th>
          <th style={{ width: "60%" }}>descripción</th>
        </tr>
      </thead>
      {props.lista
        .filter((val) => {
          if (props.filtrados === "") {
            return val;
          } else if (val.name.includes(props.filtrados) ||
          val.description.includes(props.filtrados))
          {
            return val;
          }
        })
        .map((val, index) => {
          return (
            <tbody key={index}>
              <tr>
                <td style={{ width:"8%" }}>
                  <input type='radio' name="radio"    
                      onChange ={()=>props.valorRadio(val.idbloque, val.name)}
                  />  {val.idbloque}
                </td>
                
                <td style={{ width: "20%" }}>{val.name}</td>
                <td style={{ width: "60%" }}>{val.description}</td>
                <td>
                  <button
                    className="btn btn-outline-secondary btn-sm"
                    onClick={() => props.botonUpdate(val.idbloque)}
                  >
                    <FaPen />
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => props.botonDelete(val.idbloque)}
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
