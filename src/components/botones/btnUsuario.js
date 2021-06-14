import React from "react";
import { FaTrash, FaPen } from "react-icons/fa";

export default function btnUsuario(props) {
  //  console.log(props.val)
  return (
    <table>
    <thead>
      <tr>
        <th>Email</th>
        <th>Password</th>
      </tr>
    </thead>
    {props.lista
      .filter((val) => {
        if (props.filtrados === "") {
          return val;
        } else if (
          val.email
            .toLocaleLowerCase()
            .includes(props.filtrados.toLocaleLowerCase())
        ) {
          return val;
        }
      })
      .map((val) => {
        return (
    <tbody key={val.idusuario} >
      <tr>
        <td style={{width: '30%'}}>{val.email}</td>
        <td style={{width: '30%'}}>{val.password}</td>
        {/* <td>{props.val.category}</td> */}
        <td>
          <button
            className="btn btn-outline-secondary btn-sm"
            onClick={() =>
              props.botonUpdate(val.idusuario)
            }
          >
            <FaPen />
          </button>
        </td>
        <td>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => 
            props.botonDelete(val.idusuario)}
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

