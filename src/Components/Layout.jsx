import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "../CSS/Layout.css";

const Layout = () => {
  const location = useLocation();
  const [busqueda, setBusqueda] = useState("");
  const handleBuscar = (e) => setBusqueda(e.target.value);

  const esRutaConBusqueda = location.pathname.includes("canciones") || location.pathname.includes("artistas");

  return (
    <>
      <nav className="menu">
        <div className="menu-logo">🎵 Spotify Premium</div>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/canciones">Canciones</Link></li>
          <li><Link to="/artistas">Artistas</Link></li>
        </ul>
        {esRutaConBusqueda && (
          <input
            type="text"
            placeholder="Buscar..."
            value={busqueda}
            onChange={handleBuscar}
            className="barra-busqueda"
          />
        )}
      </nav>

      <div className="layout">
        <section className="catalogo">
          <Outlet context={{ busqueda }} />
        </section>
      </div>
    </>
  );
};

export default Layout;