import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProvider, useApp } from './context/AppContext'
import Layout from './components/Layout'
import Home from './pages/Home'
import Trips from './pages/Trips'
import TripDetails from './pages/TripDetails'
import Gallery from './pages/Gallery'
import About from './pages/About'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Admin from './pages/Admin'

function GuardedRoutes() {
  const { admin } = useApp()

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/trips" element={<Trips />} />
        <Route path="/trips/:id" element={<TripDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={admin ? <Admin /> : <Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <GuardedRoutes />
      </BrowserRouter>
    </AppProvider>
  )
}