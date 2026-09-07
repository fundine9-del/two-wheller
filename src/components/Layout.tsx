import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useApp } from '../context/AppContext'

export default function Layout() {
  const { ready } = useApp()

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-82px)]">
        {ready ? (
          <Outlet />
        ) : (
          <div className="grid min-h-[calc(100vh-82px)] place-items-center text-silver/60">Loading…</div>
        )}
      </main>
      <Footer />
    </>
  )
}