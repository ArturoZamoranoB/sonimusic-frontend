import { useEffect, useState } from "react";
import "../CSS/CancionesPorArtista.css";
import Reproductor from "../Components/Redroductor";
import { useOutletContext } from "react-router-dom";

const Artistas = () => {
  const { busqueda } = useOutletContext();
  const [todas, setTodas] = useState([]);
  const [agrupadas, setAgrupadas] = useState({});
  const [cancionActual, setCancionActual] = useState(null);

 useEffect(() => {
    const fetchCanciones = async () => {
      const res = await fetch("https://sonimusic-backend-production.up.railway.app/api/canciones");
      const data = await res.json();

      setTodas(data); 
    };
    fetchCanciones();
  }, []);


  useEffect(() => {
    const agrupadasPorArtista = {};
    todas
      .filter((c) => c.artista.toLowerCase().includes(busqueda.toLowerCase()))
      .forEach((c) => {
        if (!agrupadasPorArtista[c.artista]) agrupadasPorArtista[c.artista] = [];
        agrupadasPorArtista[c.artista].push(c);
      });
    setAgrupadas(agrupadasPorArtista);
  }, [busqueda, todas]);

  return (
    <div className="artistas-page">
      {Object.entries(agrupadas).length === 0 ? (
        <p style={{ textAlign: "center", marginTop: "1rem" }}>No se encontraron artistas</p>
      ) : (
        Object.entries(agrupadas).map(([artista, canciones]) => (
          <div key={artista} className="bloque-artista">
            <h2>{artista}</h2>
            <p className="subtitulo">Canciones populares</p>
            <div className="grid-canciones">
              {canciones.map((c) => (
                <div
                  key={c.id}
                  className="card-cancion"
                  onClick={() => setCancionActual(c)}
                >
                  <img src={c.portada} alt={c.titulo} />
                  <h4>{c.titulo}</h4>
                  <p>{c.artista}</p>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {cancionActual && (
        <Reproductor
          cancion={cancionActual}
          onClose={() => setCancionActual(null)}
          listaCanciones={todas}
          setCancionActual={setCancionActual}
        />
      )}
    </div>
  );
};

export default Artistas;
