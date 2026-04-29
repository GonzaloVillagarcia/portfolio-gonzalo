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

// Este componente hace que al cambiar de ruta, la página aparezca arriba de todo
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/peditulavado" element={<PediTuLavado />} />
        <Route path="/brooklyns" element={<Brooklyns />} />
        <Route path="/rsconnecting" element={<RsConnecting />} />
        <Route path="/donquijote" element={<DonQuijote />} />
        <Route path="/academiaderiego" element={<AcademiaDeRiego />} />
        <Route path="/361casadepastas" element={<CasaDePastas361 />} />
        <Route path="/lostucus" element={<LosTucus />} />
        {/* <Route path="/xcapit" element={<Xcapit />} /> */}
      </Routes>
    </Router>
  );
}