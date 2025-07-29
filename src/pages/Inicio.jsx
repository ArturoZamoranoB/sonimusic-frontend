import "../CSS/Inicio.css";

const Inicio = () => {
  return (
    <div className="inicio-contenedor">
      <div className="inicio-banner">
        <h1>🎵 Descubre la música que amas</h1>
        <p>Explora miles de canciones, crea tus playlists favoritas y vive la experiencia musical definitiva con <strong>Purple Haze</strong>.</p>
        <a href="/canciones" className="btn-explorar">Explorar Canciones</a>
      </div>

      <div className="inicio-secciones">
        <div className="card-info">
          <h3>🎧 Escucha sin límites</h3>
          <p>Disfruta de tu música favorita en cualquier momento, sin interrupciones.</p>
        </div>
        <div className="card-info">
          <h3>⭐ Guarda tus favoritas</h3>
          <p>Marca canciones y artistas para tener acceso rápido desde tu lista personal.</p>
        </div>
        <div className="card-info">
          <h3>🔥 Tendencias semanales</h3>
          <p>Descubre lo más escuchado por la comunidad musical.</p>
        </div>
      </div>
    </div>
  );
};

export default Inicio;
