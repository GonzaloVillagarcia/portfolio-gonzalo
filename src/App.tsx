import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/home';
import PediTuLavado from './pages/peditulavado';
import Brooklyns from './pages/Brooklyns';
import RsConnecting from './pages/rsconnecting';
import DonQuijote from './pages/donquijote';
import AcademiaDeRiego from './pages/academiaderiego';
import CasaDePastas361 from './pages/361casadepastas';
import LosTucus from './pages/lostucus';
import Museo3D from './pages/museo3d';
import Zygma from './pages/zygma';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { ROUTE_META } from './seo';


// Este componente hace que al cambiar de ruta, la página aparezca arriba de todo
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Actualiza título y descripción al navegar dentro de la SPA (los HTML estáticos por ruta los genera vite.config.ts)
const RouteMeta = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const meta = ROUTE_META[pathname] ?? ROUTE_META['/'];
    document.title = meta.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', meta.description);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <RouteMeta />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/peditulavado" element={<PediTuLavado />} />
        <Route path="/brooklyns" element={<Brooklyns />} />
        <Route path="/rsconnecting" element={<RsConnecting />} />
        <Route path="/donquijote" element={<DonQuijote />} />
        <Route path="/academiaderiego" element={<AcademiaDeRiego />} />
        <Route path="/361casadepastas" element={<CasaDePastas361 />} />
        <Route path="/lostucus" element={<LosTucus />} />
        <Route path="/museo3d" element={<Museo3D />} />
        <Route path="/zygma" element={<Zygma />} />

        {/* <Route path="/xcapit" element={<Xcapit />} /> */}
      </Routes>
      <FloatingWhatsApp />
    </Router>
  );
}