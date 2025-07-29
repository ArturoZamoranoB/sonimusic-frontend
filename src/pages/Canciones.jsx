import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import Reproductor from "../Components/Redroductor";

const Canciones = () => {
  const [canciones, setCanciones] = useState([]);
  const [favoritos, setFavoritos] = useState(new Set());
  const [cancionActual, setCancionActual] = useState(null);
  const { busqueda } = useOutletContext(); // Recibe la búsqueda global

  useEffect(() => {
    const fetchCanciones = async () => {
      const res = await fetch("http://localhost:3001/api/canciones");
      const data = await res.json();
      setCanciones(data);
    };
    fetchCanciones();
  }, []);

  const cancionesFiltradas = canciones.filter((c) =>
    c.titulo.toLowerCase().includes(busqueda.toLowerCase())
  );

  const toggleFav = (id) => {
    const copia = new Set(favoritos);
    copia.has(id) ? copia.delete(id) : copia.add(id);
    setFavoritos(copia);
  };

  return (
    <>
      {favoritos.size > 0 && (
        <>
          <h2>⭐ Favoritos</h2>
          <div className="grid-canciones">
            {[...favoritos].map((id) => {
              const fav = canciones.find(c => c.id === id);
              if (!fav) return null;
              return (
                <div key={fav.id} className="card-cancion" onClick={() => setCancionActual(fav)}>
                  <img src={fav.portada} alt={fav.titulo} />
                  <h4>{fav.titulo}</h4>
                  <p>{fav.artista}</p>
                  <span
                    className="estrella fav"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFav(fav.id);
                    }}
                  >
                    ★
                  </span>
                </div>
              );
            })}
          </div>
        </>
      )}

      <h2>🎵 Todas las canciones</h2>
      <div className="grid-canciones">
        {cancionesFiltradas.length > 0 ? (
          cancionesFiltradas.map((c) => (
            <div key={c.id} className="card-cancion" onClick={() => setCancionActual(c)}>
              <img src={c.portada} alt={c.titulo} />
              <h4>{c.titulo}</h4>
              <p>{c.artista}</p>
              <span
                className={`estrella ${favoritos.has(c.id) ? "fav" : ""}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFav(c.id);
                }}
              >
                {favoritos.has(c.id) ? "★" : "☆"}
              </span>
            </div>
          ))
        ) : (
          <p style={{ marginTop: "1rem", textAlign: "center" }}>No se encontraron canciones</p>
        )}
      </div>

      {cancionActual && (
        <Reproductor
          cancion={cancionActual}
          onClose={() => setCancionActual(null)}
          listaCanciones={cancionesFiltradas}
          setCancionActual={setCancionActual}
        />
      )}
    </>
  );
};

export default Canciones;
