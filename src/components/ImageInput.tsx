import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Image } from '../icons'

type Props = {
  name: string
  label?: string
  required?: boolean
}

export default function ImageInput({ name, label, required }: Props) {
  const ref = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  useEffect(() => () => {
    if (preview) URL.revokeObjectURL(preview)
  }, [preview])

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setPreview((old) => {
      if (old) URL.revokeObjectURL(old)
      return file ? URL.createObjectURL(file) : null
    })
  }

  return (
    <div>
      {label && <span className="text-xs text-silver/70">{label}</span>}
      <button
        type="button"
        onClick={() => ref.current?.click()}
        className="mt-1.5 flex h-40 w-40 flex-col items-center justify-center gap-2 overflow-hidden rounded-lg border-2 border-dashed border-silver/40 bg-slate/20 text-silver/60 transition-colors hover:border-amber hover:text-amber"
      >
        {preview ? (
          <img src={preview} alt="Upload preview" className="h-full w-full object-cover" />
        ) : (
          <>
            <Image size={28} />
            <span className="px-2 text-center text-xs">Click to upload</span>
          </>
        )}
      </button>
      <input
        ref={ref}
        name={name}
        type="file"
        accept="image/*"
        required={required}
        className="hidden"
        onChange={onChange}
      />
    </div>
  )
}