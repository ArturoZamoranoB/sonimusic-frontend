import { Routes, Route } from "react-router-dom";
import Layout from "./Components/Layout";
import Inicio from "./pages/Inicio";
import Canciones from "./pages/Canciones";
import CancionesPorArtista from "./pages/CacionesPorArtistas";
import Buscador from "./Components/Buscador";


const App = () => (
  <Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<Inicio />} />
      <Route path="canciones" element={<Canciones />} />
      <Route path="artistas" element={<CancionesPorArtista />} />
      <Route path="/buscar" element={<Buscador />} />

    </Route>
  </Routes>
);

export default App;
