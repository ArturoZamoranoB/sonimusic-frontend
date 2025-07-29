import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Reproductor from "../Components/Redroductor";
import "../CSS/Buscador.css";

const Buscador = () => {
  const [searchParams] = useSearchParams();
  const [resultados, setResultados] = useState([]);
  const [cancionActual, setCancionActual] = useState(null);

  const query = searchParams.get("q") || "";

  useEffect(() => {
    const buscar = async () => {
      if (!query.trim()) return;
      const res = await fetch(`http://localhost:3001/api/buscar?q=${query}`);
      const data = await res.json();
      setResultados(data);
    };

    buscar();
  }, [query]);

  return (
    <div className="buscador-page">
      <h2>Resultados para: "{query}"</h2>
      <div className="grid-canciones">
        {resultados.map(c => (
          <div key={c.id} className="card-cancion" onClick={() => setCancionActual(c)}>
            <img src={c.portada} alt={c.titulo} />
            <h4>{c.titulo}</h4>
            <p>{c.artista}</p>
          </div>
        ))}
      </div>

      {cancionActual && (
        <Reproductor
          cancion={cancionActual}
          onClose={() => setCancionActual(null)}
          listaCanciones={resultados}
          setCancionActual={setCancionActual}
        />
      )}
    </div>
  );
};

export default Buscador;
