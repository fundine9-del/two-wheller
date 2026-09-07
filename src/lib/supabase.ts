import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined

export const db = url && key ? createClient(url, key) : null

export const WHATSAPP_URL = 'https://chat.whatsapp.com/IIUouYVyQepKzRrtNDHz8w'

export const HERO_FALLBACK =
  'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=1800&q=80'

export const upload = async (bucket: string, file: File): Promise<string> => {
  if (!db) throw Error('Supabase is not configured.')
  const path = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`
  const { error } = await db.storage.from(bucket).upload(path, file, { upsert: false })
  if (error) throw error
  return db.storage.from(bucket).getPublicUrl(path).data.publicUrl
}