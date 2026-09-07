import type { FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import Eyebrow from '../components/Eyebrow'
import { useApp } from '../context/AppContext'
import { ArrowRight } from '../icons'
import { db } from '../lib/supabase'

export default function Login() {
  const navigate = useNavigate()
  const { authError, busy, setBusy, setAuthError, checkRole } = useApp()

  const submit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (busy) return
    if (!db) {
      setAuthError('Supabase keys are missing.')
      return
    }
    setBusy(true)
    setAuthError('')
    const fd = new FormData(e.currentTarget)
    const { data, error } = await db.auth.signInWithPassword({
      email: String(fd.get('email')),
      password: String(fd.get('password')),
    })
    if (error) {
      setAuthError(error.message)
      setBusy(false)
      return
    }
    if (await checkRole(data.user)) {
      navigate('/admin')
    } else {
      await db.auth.signOut()
      setAuthError('This account is not an administrator.')
    }
    setBusy(false)
  }

  const isBusy = busy

  return (
    <section className="grid min-h-[66vh] place-items-center px-5 py-14">
      <form onSubmit={submit} className="grid w-[min(100%,620px)] gap-3.5 rounded-lg border border-slate bg-slate/20 p-7">
        <Eyebrow>CREW ACCESS</Eyebrow>
        <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-none">Admin login</h2>
        <p className="mb-2 leading-[1.75] text-silver/70">Only approved Two Wheelers admins can manage content.</p>
        <input
          name="email"
          type="email"
          placeholder="Email address"
          required
          className="w-full rounded-lg border border-slate bg-slate px-4 py-3 text-silver outline-none placeholder:text-silver/50"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded-lg border border-slate bg-slate px-4 py-3 text-silver outline-none placeholder:text-silver/50"
        />
        {authError && <p className="m-0 text-red-400">{authError}</p>}
        <button
          className="inline-flex items-center justify-center gap-2.5 rounded bg-amber px-4 py-3 text-[13px] font-extrabold text-charcoal hover:bg-amber/90 disabled:opacity-50"
          disabled={isBusy}
        >
          {isBusy ? 'Checking access…' : 'Login'} <ArrowRight size={16} />
        </button>
      </form>
    </section>
  )
}