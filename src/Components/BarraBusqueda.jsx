import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import "../CSS/Barra.css";

const BarraBusqueda = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleBuscar = () => {
    if (query.trim() === "") return;
    navigate(`/buscar?q=${encodeURIComponent(query)}`);
  };

  
  const rutaActual = location.pathname;
  if (!rutaActual.startsWith("/canciones") && !rutaActual.startsWith("/artistas")) {
    return null;
  }

  return (
    <div className="barra-busqueda">
      <input
        type="text"
        placeholder="Buscar canciones o artistas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleBuscar()}
      />
      <button onClick={handleBuscar}>Buscar</button>
    </div>
  );
};

export default BarraBusqueda;
