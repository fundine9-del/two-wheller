import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import { useApp } from '../context/AppContext'

export default function Layout() {
  const { ready } = useApp()

  return (
    <>
      <Header />
      <main className="min-h-[calc(100vh-100px)] lg:min-h-[calc(100vh-126px)]">
        {ready ? (
          <Outlet />
        ) : (
          <div className="grid min-h-[calc(100vh-100px)] place-items-center text-silver/60 lg:min-h-[calc(100vh-126px)]">
            Loading…
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}