import { useEffect, useRef, useState } from "react";
import "../CSS/Reproductor.css";

const Reproductor = ({ cancion, onClose, listaCanciones, setCancionActual }) => {
  const audioRef = useRef(null);
  const [duracion, setDuracion] = useState(30);
  const [tiempo, setTiempo] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);

  // 🔁 Obtener el preview actualizado al cambiar de canción
  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/preview/${cancion.deezerId}`);
        const data = await res.json();
        setPreviewUrl(data.preview);
      } catch (err) {
        console.error("Error obteniendo preview:", err);
        setPreviewUrl(null);
      }
    };

    fetchPreview();
  }, [cancion]);

  // 🎵 Reproducir audio cuando esté listo
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !previewUrl) return;

    audio.pause();
    audio.currentTime = 0;

    const reproducirSiActivo = async () => {
      if (isPlaying) {
        try {
          await audio.play();
        } catch (err) {
          console.error("Error al reproducir:", err);
          setIsPlaying(false);
        }
      }
    };

    reproducirSiActivo();

    const actualizarTiempo = () => {
      if (audio.currentTime >= 30) {
        audio.pause();
        setIsPlaying(false);
      } else {
        setTiempo(audio.currentTime);
      }
    };

    const detener = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", actualizarTiempo);
    audio.addEventListener("ended", detener);

    return () => {
      audio.removeEventListener("timeupdate", actualizarTiempo);
      audio.removeEventListener("ended", detener);
    };
  }, [previewUrl, isPlaying]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const siguienteCancion = () => {
    const index = listaCanciones.findIndex(c => c.id === cancion.id);
    const siguiente = (index + 1) % listaCanciones.length;
    setCancionActual(listaCanciones[siguiente]);
  };

  const anteriorCancion = () => {
    const index = listaCanciones.findIndex(c => c.id === cancion.id);
    const anterior = (index - 1 + listaCanciones.length) % listaCanciones.length;
    setCancionActual(listaCanciones[anterior]);
  };

  const formatTime = (seg) => {
    const m = Math.floor(seg / 60);
    const s = Math.floor(seg % 60);
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const progreso = (tiempo / duracion) * 100;

  return (
    <div className="player-fixed">
      <div className="player-content">
        <img className="player-img" src={cancion.portada} alt={cancion.titulo} />
        <div className="player-info">
          <button onClick={onClose} className="player-close">✖</button>
          <div className="player-text">
            <p className="now-playing">Now Playing</p>
            <h3>{cancion.titulo}</h3>
            <p className="artist">{cancion.artista}</p>
          </div>

          <div className="player-controls">
            <span>{formatTime(tiempo)}</span>
            <input type="range" min="0" max="100" value={progreso} readOnly />
            <span>{formatTime(duracion)}</span>
          </div>

          <div className="player-buttons">
            <button onClick={anteriorCancion}>⏮</button>
            <button onClick={togglePlay}>{isPlaying ? "⏸" : "▶️"}</button>
            <button onClick={siguienteCancion}>⏭</button>
          </div>
        </div>

        {/* 🎧 Audio con preview actualizado */}
        {previewUrl && <audio ref={audioRef} src={previewUrl} />}
      </div>
    </div>
  );
};

export default Reproductor;
