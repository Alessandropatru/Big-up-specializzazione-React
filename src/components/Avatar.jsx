import { useEffect, useState } from 'react'
import supabase from '../supabase/supabase-client'
import "../components/css/account.css";

export default function Avatar({ url, size = 150, onUpload }) {
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) {
      downloadImage(url)
    }
  }, [url])

  const downloadImage = async (path) => {
    try {
      const { data, error } = await supabase.storage.from('avatars').download(path)
      if (error) throw error

      const imageUrl = URL.createObjectURL(data)
      setAvatarUrl(imageUrl)
    } catch (error) {
      console.error('Errore nel download dell \'immagine:', error.message)
    }
  }

  const uploadAvatar = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('Seleziona un\'immagine da caricare.')
      }

      const file = event.target.files[0]
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (uploadError) throw uploadError

      onUpload(event, filePath) 
    } catch (error) {
      alert(error.message)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="text-center">
    {avatarUrl ? (
      <img
        src={avatarUrl}
        alt="Avatar"
        className="profile-avatar glitch-avatar"
        style={{ height: size, width: size }}
      />
    ) : (
      <div
        className="profile-avatar"
        style={{
          height: size,
          width: size,
          background: "#ddd",
          display: "inline-block",
        }}
      />
    )}
  
    <div className="mt-3">
      <label className="upload-label">
        {uploading ? "Caricamento..." : "Cambia Avatar"}
        <input
          type="file"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
          className="upload-input"
        />
      </label>
    </div>
  </div>
  )
}
