import React, { useState } from "react";
import Error from './Error';

const Formulario = ({guardarBusqueda}) => {
  const [termino, guardarTermino] = useState('');
  const [error, guardarError] = useState(false);

  const buscarImagen = (e) => {
    e.preventDefault();

    if (termino.trim() === '') {
      guardarError(true);
      return;
    }

    guardarError(false);

    guardarBusqueda(termino);
  };

  return (
    <form onSubmit={buscarImagen}>
      <div className="row">
        <div className="form-group col-md-8">
          <input
            type="text"
            className="form-control form-control-lg"
            placeholder="Busca una imagen, ejemplo: futbol o café"
            onChange={(e) => guardarTermino(e.target.value)}
          />
        </div>
        <div className="form-group col-md-4">
          <input
            type="submit"
            className="btn btn-lg btn-danger btn-block"
            value="Buscar"
          />
        </div>
      </div>

      {error ? <Error mensaje="Agregar un termino a la busqueda" /> : null}
    </form>
  );
};

export default Formulario;
