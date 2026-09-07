/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { db } from '../lib/supabase'
import { sample } from '../types'
import type { AdminTab, Gallery, Home, Trip } from '../types'

type AppContextValue = {
  trips: Trip[]
  gallery: Gallery[]
  home: Home | null
  ready: boolean
  user: User | null
  admin: boolean
  authError: string
  adminTab: AdminTab
  busy: boolean
  message: string
  setAdminTab: (tab: AdminTab) => void
  setBusy: (busy: boolean) => void
  setMessage: (message: string) => void
  setAuthError: (error: string) => void
  load: () => Promise<void>
  checkRole: (user: User | null) => Promise<boolean>
  signOut: () => Promise<void>
}

const AppContext = createContext<AppContextValue | null>(null)

export function AppProvider({ children }: { children: ReactNode }) {
  const [trips, setTrips] = useState<Trip[]>([])
  const [gallery, setGallery] = useState<Gallery[]>([])
  const [home, setHome] = useState<Home | null>(null)
  const [ready, setReady] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [admin, setAdmin] = useState(false)
  const [authError, setAuthError] = useState('')
  const [adminTab, setAdminTab] = useState<AdminTab>('home')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  const load = useCallback(async () => {
    if (!db) {
      setTrips(sample)
      return
    }
    const [t, g, h] = await Promise.all([
      db.from('trips').select('*').order('date', { ascending: false }),
      db.from('gallery_images').select('*').order('created_at', { ascending: false }),
      db.from('home_content').select('*').limit(1).maybeSingle(),
    ])
    if (!t.error) setTrips(t.data as Trip[])
    if (!g.error) setGallery(g.data as Gallery[])
    if (!h.error) setHome(h.data as Home | null)
  }, [])

  const checkRole = useCallback(async (u: User | null) => {
    setUser(u)
    if (!u || !db) {
      setAdmin(false)
      return false
    }
    const { data, error } = await db.from('profiles').select('role').eq('id', u.id).maybeSingle()
    const ok = !error && data?.role === 'admin'
    setAdmin(ok)
    return ok
  }, [])

  useEffect(() => {
    let active = true
    const init = async () => {
      await load()
      if (active) setReady(true)
    }
    void init()
    if (!db) {
      return () => {
        active = false
      }
    }
    db.auth.getUser().then(({ data }) => checkRole(data.user))
    const {
      data: { subscription },
    } = db.auth.onAuthStateChange((_event, session) => {
      checkRole(session?.user ?? null)
    })
    return () => {
      active = false
      subscription.unsubscribe()
    }
  }, [load, checkRole])

  const signOut = useCallback(async () => {
    await db?.auth.signOut()
  }, [])

  return (
    <AppContext.Provider
      value={{
        trips,
        gallery,
        home,
        ready,
        user,
        admin,
        authError,
        adminTab,
        busy,
        message,
        setAdminTab,
        setBusy,
        setMessage,
        setAuthError,
        load,
        checkRole,
        signOut,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext)
  if (!ctx) throw Error('useApp must be used within AppProvider')
  return ctx
}