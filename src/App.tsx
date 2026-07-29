import { Routes, Route, useNavigate } from 'react-router'
import { useEffect } from 'react'
import Home from './pages/Home'
import Login from "./pages/Login"
import AreaRiservata from "./pages/AreaRiservata"
import NotFound from "./pages/NotFound"
import { ProjectDetailPage } from "./pages/ProjectDetail"
import { ProjectsList } from "./components/ProjectsList"

function RedirectHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirect = params.get('spaPath') || params.get('redirect');
    if (redirect) {
      window.history.replaceState({}, document.title, window.location.pathname);
      navigate(decodeURIComponent(redirect));
    }
  }, [navigate]);
  return null;
}

export default function App() {
  return (
    <>
      <RedirectHandler />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/area-riservata" element={<AreaRiservata />} />
        <Route path="/progetti" element={<ProjectsList />} />
        <Route path="/progetti/:slug" element={<ProjectDetailPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}