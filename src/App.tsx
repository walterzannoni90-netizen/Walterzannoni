import { Routes, Route } from 'react-router'
import Home from './pages/Home'
import Login from "./pages/Login"
import AreaRiservata from "./pages/AreaRiservata"
import NotFound from "./pages/NotFound"

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/area-riservata" element={<AreaRiservata />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
