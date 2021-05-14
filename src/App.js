import React, { useState, useEffect } from "react";
import Formulario from "./components/Formulario";
import ListadeImagenes from "./components/ListadeImagenes";

function App() {
  const [busqueda, guardarBusqueda] = useState("");
  const [imagenes, guardarImagen] = useState([]);

  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {
    if (busqueda === "") return;

    const consultarApi = async () => {
      const imagenesPorPagina = 30;
      const key = "21609311-644f187f6c86bbbbf19829669";
      const api = `https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`;

      const respuesta = await fetch(api);
      const resultado = await respuesta.json();

      guardarImagen(resultado.hits);

      const calcularTotalpaginas = Math.ceil(
        resultado.hits / imagenesPorPagina
      );
      guardarTotalPaginas(calcularTotalpaginas);

      const jumbotron = document.querySelector(".jumbotron");
      jumbotron.scrollIntoView({ behavior: "smooth" });
    };

    consultarApi();
  }, [busqueda, paginaActual]);

  const paginaAnterior = () => {
    const pagActual = paginaActual - 1;

    if (pagActual === 0) return;

    guardarPaginaActual(pagActual);
  };

  const paginaSiguiente = () => {
    const pagActual = paginaActual + 1;

    if (pagActual > totalPaginas) return;

    guardarPaginaActual(pagActual);
  };

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imagenes</p>
        <Formulario guardarBusqueda={guardarBusqueda} />
      </div>
      <div className="row justify-content-center">
        <ListadeImagenes imagenes={imagenes} />
        {paginaActual === 1 ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaAnterior}
          >
            &laquo;Anterior{" "}
          </button>
        )}
        {paginaActual === totalPaginas ? null : (
          <button
            type="button"
            className="bbtn btn-info mr-1"
            onClick={paginaSiguiente}
          >
            Siguiente &raquo;
          </button>
        )}
      </div>
    </div>
  );
}

export default App;
