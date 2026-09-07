import { useState } from 'react'
import type { FormEvent } from 'react'
import ImageInput from '../components/ImageInput'
import { db, upload } from '../lib/supabase'
import { fmt } from '../types'
import type { AdminTab, Gallery, Trip } from '../types'

type Props = {
  tab: AdminTab
  trips: Trip[]
  gallery: Gallery[]
  reload: () => Promise<void>
  notify: (message: string) => void
}

export default function AdminManagement({ tab, trips, gallery, reload, notify }: Props) {
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null)
  const [editingGallery, setEditingGallery] = useState<Gallery | null>(null)
  const [saving, setSaving] = useState(false)

  const saveTrip = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!db || !editingTrip) return
    setSaving(true)
    try {
      const form = new FormData(e.currentTarget)
      const file = form.get('image') as File
      const cover_image = file?.size ? await upload('trips', file) : editingTrip.cover_image
      const data = {
        title: String(form.get('title')),
        date: String(form.get('date')),
        location: String(form.get('location')),
        distance: String(form.get('distance')),
        description: String(form.get('description')),
        ride_type: String(form.get('ride_type')),
        status: String(form.get('status')) as Trip['status'],
        cover_image,
      }
      const { error } = await db.from('trips').update(data).eq('id', editingTrip.id)
      if (error) throw error
      setEditingTrip(null)
      await reload()
      notify('Trip updated.')
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Could not update trip.')
    }
    setSaving(false)
  }

  const saveGallery = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!db || !editingGallery) return
    setSaving(true)
    try {
      const form = new FormData(e.currentTarget)
      const file = form.get('image') as File
      const image_url = file?.size ? await upload('gallery', file) : editingGallery.image_url
      const { error } = await db
        .from('gallery_images')
        .update({ caption: String(form.get('caption')), image_url })
        .eq('id', editingGallery.id)
      if (error) throw error
      setEditingGallery(null)
      await reload()
      notify('Gallery photo updated.')
    } catch (error) {
      notify(error instanceof Error ? error.message : 'Could not update gallery photo.')
    }
    setSaving(false)
  }

  const remove = async (table: 'trips' | 'gallery_images', id: string) => {
    if (!db || !window.confirm('Delete this item?')) return
    setSaving(true)
    const { error } = await db.from(table).delete().eq('id', id)
    if (error) {
      notify(error.message)
    } else {
      if (table === 'trips') setEditingTrip(null)
      else setEditingGallery(null)
      await reload()
      notify('Item deleted.')
    }
    setSaving(false)
  }

  if (tab === 'trips') {
    return (
      <div className="mx-auto mt-7 w-[min(100%,900px)]">
        <h3 className="mb-3.5 text-lg font-bold">Posted trips</h3>
        {editingTrip && (
          <form className="mb-6 grid gap-3.5 rounded-lg border border-slate bg-slate/20 p-7" onSubmit={saveTrip}>
            <input
              name="title"
              defaultValue={editingTrip.title}
              required
              className="w-full rounded-lg border border-slate bg-slate px-4 py-3 text-silver outline-none placeholder:text-silver/50"
            />
            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              <input
                name="date"
                type="date"
                defaultValue={editingTrip.date}
                required
                className="w-full rounded-lg border border-slate bg-slate px-4 py-3 text-silver outline-none"
              />
              <select
                name="status"
                defaultValue={editingTrip.status}
                className="w-full rounded-lg border border-slate bg-slate px-4 py-3 text-silver outline-none"
              >
                <option value="upcoming">Upcoming</option>
                <option value="past">Past / archive</option>
              </select>
            </div>
            <input
              name="location"
              defaultValue={editingTrip.location}
              required
              className="w-full rounded-lg border border-slate bg-slate px-4 py-3 text-silver outline-none placeholder:text-silver/50"
            />
            <div className="grid grid-cols-2 gap-3 max-md:grid-cols-1">
              <input
                name="distance"
                defaultValue={editingTrip.distance}
                required
                className="w-full rounded-lg border border-slate bg-slate px-4 py-3 text-silver outline-none placeholder:text-silver/50"
              />
              <input
                name="ride_type"
                defaultValue={editingTrip.ride_type}
                required
                className="w-full rounded-lg border border-slate bg-slate px-4 py-3 text-silver outline-none placeholder:text-silver/50"
              />
            </div>
            <textarea
              name="description"
              defaultValue={editingTrip.description}
              rows={4}
              required
              className="w-full resize-y rounded-lg border border-slate bg-slate px-4 py-3 text-silver outline-none placeholder:text-silver/50"
            />
            <ImageInput name="image" label="Replace cover image" />
            <div className="flex items-center gap-2">
              <button
                className="inline-flex items-center justify-center rounded bg-amber px-4 py-3 text-[13px] font-extrabold text-charcoal hover:bg-amber/90 disabled:opacity-50"
                disabled={saving}
              >
                Save changes
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded border border-amber px-4 py-2.5 text-[13px] font-extrabold text-amber hover:bg-amber/10"
                onClick={() => setEditingTrip(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {trips.length ? (
          trips.map((trip) => (
            <article key={trip.id} className="flex items-center gap-4 border-t border-slate py-3.5">
              <div className="grid flex-1 gap-1">
                <strong>{trip.title}</strong>
                <span className="text-xs text-silver/70">
                  {fmt(trip.date)} · {trip.location} · {trip.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center justify-center rounded border border-amber px-4 py-2.5 text-[13px] font-extrabold text-amber hover:bg-amber/10"
                  onClick={() => setEditingTrip(trip)}
                >
                  Edit
                </button>
                <button
                  className="inline-flex items-center justify-center rounded border border-red-500 px-4 py-2.5 text-[13px] font-extrabold text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                  onClick={() => remove('trips', trip.id)}
                  disabled={saving}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        ) : (
          <p className="text-xs text-silver/70">No posted trips yet.</p>
        )}
      </div>
    )
  }

  if (tab === 'gallery') {
    return (
      <div className="mx-auto mt-7 w-[min(100%,900px)]">
        <h3 className="mb-3.5 text-lg font-bold">Posted gallery photos</h3>
        {editingGallery && (
          <form className="mb-6 grid gap-3.5 rounded-lg border border-slate bg-slate/20 p-7" onSubmit={saveGallery}>
            <input
              name="caption"
              defaultValue={editingGallery.caption || ''}
              placeholder="Photo caption"
              className="w-full rounded-lg border border-slate bg-slate px-4 py-3 text-silver outline-none placeholder:text-silver/50"
            />
            <ImageInput name="image" label="Replace image" />
            <div className="flex items-center gap-2">
              <button
                className="inline-flex items-center justify-center rounded bg-amber px-4 py-3 text-[13px] font-extrabold text-charcoal hover:bg-amber/90 disabled:opacity-50"
                disabled={saving}
              >
                Save changes
              </button>
              <button
                type="button"
                className="inline-flex items-center justify-center rounded border border-amber px-4 py-2.5 text-[13px] font-extrabold text-amber hover:bg-amber/10"
                onClick={() => setEditingGallery(null)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
        {gallery.length ? (
          gallery.map((photo) => (
            <article key={photo.id} className="flex items-center gap-4 border-t border-slate py-3.5">
              <img
                src={photo.image_url}
                alt={photo.caption || 'Gallery photo'}
                className="h-16 w-16 flex-none rounded bg-slate bg-cover bg-center object-cover"
              />
              <div className="min-w-0 flex-1">
                <strong>{photo.caption || 'Untitled photo'}</strong>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="inline-flex items-center justify-center rounded border border-amber px-4 py-2.5 text-[13px] font-extrabold text-amber hover:bg-amber/10"
                  onClick={() => setEditingGallery(photo)}
                >
                  Edit
                </button>
                <button
                  className="inline-flex items-center justify-center rounded border border-red-500 px-4 py-2.5 text-[13px] font-extrabold text-red-400 hover:bg-red-500/10 disabled:opacity-50"
                  onClick={() => remove('gallery_images', photo.id)}
                  disabled={saving}
                >
                  Delete
                </button>
              </div>
            </article>
          ))
        ) : (
          <p className="text-xs text-silver/70">No gallery photos yet.</p>
        )}
      </div>
    )
  }

  return null
}