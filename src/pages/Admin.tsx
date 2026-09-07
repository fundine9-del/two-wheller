import { useNavigate } from 'react-router-dom'
import type { ChangeEvent, FormEvent } from 'react'
import Eyebrow from '../components/Eyebrow'
import ImageInput from '../components/ImageInput'
import AdminManagement from './AdminManagement'
import { useApp } from '../context/AppContext'
import { ArrowRight } from '../icons'
import { clearDraft, readDraft, saveDraft } from '../types'
import { db, upload } from '../lib/supabase'

const inputClass =
  'w-full rounded-lg border border-slate bg-slate px-4 py-3 text-silver outline-none placeholder:text-silver/50'

export default function Admin() {
  const navigate = useNavigate()
  const { home, trips, gallery, adminTab, setAdminTab, busy, setBusy, message, setMessage, load, signOut } = useApp()

  const homeDraft = readDraft('home')
  const tripDraft = readDraft('trip')
  const galleryDraft = readDraft('gallery')

  const persist = (name: string) => (e: ChangeEvent<HTMLFormElement>) => {
    const target = e.target as unknown as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    if (target.name) saveDraft(name, target.name, target.value)
  }

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const homeSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!db) return
    setBusy(true)
    setMessage('')
    try {
      const form = new FormData(e.currentTarget)
      const file = form.get('image') as File
      const hero_image = file?.size ? await upload('home', file) : home?.hero_image
      const data = {
        hero_image,
        hero_eyebrow: form.get('eyebrow'),
        hero_title: form.get('title'),
        hero_subtitle: form.get('subtitle'),
      }
      const { error } = home?.id
        ? await db.from('home_content').update(data).eq('id', home.id)
        : await db.from('home_content').insert(data)
      if (error) throw error
      clearDraft('home')
      await load()
      setMessage('Home page updated.')
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not update home.')
    }
    setBusy(false)
  }

  const tripSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!db) return
    setBusy(true)
    setMessage('')
    try {
      const form = e.currentTarget
      const f = new FormData(form)
      const file = f.get('image') as File
      const cover = file?.size ? await upload('trips', file) : null
      const { error } = await db.from('trips').insert({
        title: f.get('title'),
        date: f.get('date'),
        location: f.get('location'),
        distance: f.get('distance'),
        description: f.get('description'),
        ride_type: f.get('ride_type'),
        status: f.get('status'),
        cover_image: cover,
      })
      if (error) throw error
      form.reset()
      clearDraft('trip')
      await load()
      setMessage('Trip published.')
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not save trip.')
    }
    setBusy(false)
  }

  const gallerySubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!db) return
    setBusy(true)
    setMessage('')
    try {
      const form = e.currentTarget
      const f = new FormData(form)
      const file = f.get('image') as File
      if (!file?.size) throw Error('Choose an image first.')
      const image_url = await upload('gallery', file)
      const { error } = await db.from('gallery_images').insert({ image_url, caption: f.get('caption') })
      if (error) throw error
      form.reset()
      clearDraft('gallery')
      await load()
      setMessage('Gallery photo published.')
    } catch (e) {
      setMessage(e instanceof Error ? e.message : 'Could not upload photo.')
    }
    setBusy(false)
  }

  return (
    <div className="mx-auto w-[min(100%,900px)] px-[7%] pb-[70px] pt-[110px] max-md:pt-[70px]">
      <div className="flex items-center justify-between">
        <div>
          <Eyebrow>CREW CONTROL</Eyebrow>
          <h2 className="font-display text-[clamp(32px,4vw,52px)] font-extrabold leading-none">Content manager</h2>
        </div>
        <button
          className="inline-flex items-center justify-center rounded border border-amber px-4 py-2.5 text-[13px] font-extrabold text-amber hover:bg-amber/10"
          onClick={handleSignOut}
        >
          Sign out
        </button>
      </div>

      <div className="mb-6 mt-6 flex gap-1.5 border-b border-slate">
        {(['home', 'trips', 'gallery'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setAdminTab(tab)}
            className={`bg-transparent px-4 py-3 text-[13px] font-extrabold capitalize ${
              adminTab === tab ? 'border-b-2 border-amber text-amber' : 'text-silver/70'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {message && (
        <p className="mb-4 rounded-md border border-amber/40 bg-amber/10 px-3.5 py-3 text-sm text-silver">{message}</p>
      )}

      {adminTab === 'home' && (
        <form
          className="grid w-full gap-3.5 rounded-lg border border-slate bg-slate/20 p-7"
          onSubmit={homeSubmit}
          onChange={persist('home')}
        >
          <h3 className="text-lg font-bold">Home page content</h3>
          <input name="eyebrow" defaultValue={homeDraft.eyebrow ?? home?.hero_eyebrow ?? ''} placeholder="Hero label" className={inputClass} />
          <input
            name="title"
            defaultValue={homeDraft.title ?? home?.hero_title ?? ''}
            placeholder="Hero title (use a new line for amber line)"
            className={inputClass}
          />
          <textarea name="subtitle" defaultValue={homeDraft.subtitle ?? home?.hero_subtitle ?? ''} placeholder="Hero subtitle" rows={3} className={`${inputClass} resize-y`} />
          <ImageInput name="image" label="Hero image" />
          <button
            className="inline-flex items-center justify-center gap-2.5 rounded bg-amber px-4 py-3 text-[13px] font-extrabold text-charcoal hover:bg-amber/90 disabled:opacity-50"
            disabled={busy}
          >
            Save home content <ArrowRight size={16} />
          </button>
        </form>
      )}

      {adminTab === 'trips' && (
        <form
          className="grid w-full gap-3.5 rounded-lg border border-slate bg-slate/20 p-7"
          onSubmit={tripSubmit}
          onChange={persist('trip')}
        >
          <h3 className="text-lg font-bold">Add a trip</h3>
          <input name="title" defaultValue={tripDraft.title || ''} placeholder="Trip title" required className={inputClass} />
          <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            <input name="date" type="date" defaultValue={tripDraft.date || ''} required className={inputClass} />
            <select name="status" defaultValue={tripDraft.status || 'upcoming'} className={`${inputClass} bg-slate text-silver`}>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past / archive</option>
            </select>
          </div>
          <input name="location" defaultValue={tripDraft.location || ''} placeholder="Destination / location" required className={inputClass} />
          <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
            <input name="distance" defaultValue={tripDraft.distance || ''} placeholder="Distance e.g. 120 km" required className={inputClass} />
            <input name="ride_type" defaultValue={tripDraft.ride_type || ''} placeholder="Ride type e.g. Group Ride" required className={inputClass} />
          </div>
          <textarea name="description" defaultValue={tripDraft.description || ''} placeholder="Trip description" rows={4} required className={`${inputClass} resize-y`} />
          <ImageInput name="image" label="Trip cover image" />
          <button
            className="inline-flex items-center justify-center gap-2.5 rounded bg-amber px-4 py-3 text-[13px] font-extrabold text-charcoal hover:bg-amber/90 disabled:opacity-50"
            disabled={busy}
          >
            Publish trip <ArrowRight size={16} />
          </button>
        </form>
      )}

      {adminTab === 'gallery' && (
        <form
          className="grid w-full gap-3.5 rounded-lg border border-slate bg-slate/20 p-7"
          onSubmit={gallerySubmit}
          onChange={persist('gallery')}
        >
          <h3 className="text-lg font-bold">Add gallery photo</h3>
          <input name="caption" defaultValue={galleryDraft.caption || ''} placeholder="Photo caption" className={inputClass} />
          <ImageInput name="image" label="Image" required />
          <button
            className="inline-flex items-center justify-center gap-2.5 rounded bg-amber px-4 py-3 text-[13px] font-extrabold text-charcoal hover:bg-amber/90 disabled:opacity-50"
            disabled={busy}
          >
            Publish photo <ArrowRight size={16} />
          </button>
        </form>
      )}

      <AdminManagement tab={adminTab} trips={trips} gallery={gallery} reload={load} notify={setMessage} />
    </div>
  )
}