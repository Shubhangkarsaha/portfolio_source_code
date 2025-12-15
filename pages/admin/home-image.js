import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/admin/AdminLayout'
import { Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

export default function AdminHomeImage() {
  const router = useRouter()
  const [currentImage, setCurrentImage] = useState(null)
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchCurrentImage()
  }, [router])

  const fetchCurrentImage = async () => {
    try {
      const res = await fetch('/api/home-image')
      const data = await res.json()
      setCurrentImage(data)
      if (data?.image) {
        setImageUrl(data.image)
      }
    } catch (err) {
      console.error('Error fetching home image:', err)
      setError('Failed to load current home image')
    } finally {
      setLoading(false)
    }
  }

  const getToken = () => localStorage.getItem('adminToken')

  const handleSave = async () => {
    setError('')
    if (!imageUrl) {
      setError('Please enter an image URL')
      return
    }

    try {
      setSaving(true)
      const res = await fetch('/api/home-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ image: imageUrl }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Failed to save image')
        return
      }

      setCurrentImage(data)
    } catch (err) {
      console.error('Error saving home image:', err)
      setError('An error occurred while saving')
    } finally {
      setSaving(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <ImageIcon className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Home Page Image</h2>
              <p className="text-gray-600 mt-1">
                Manage the image displayed on the right side of the home page.
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Current preview */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Image</h3>
              {currentImage?.image ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={currentImage.image}
                    alt="Home image"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center h-48 rounded-lg border border-dashed border-gray-300 text-gray-500 text-sm">
                  No image set yet
                </div>
              )}
            </div>

            {/* Form */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Update Image</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image URL *
                </label>
                <input
                  type="text"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                  placeholder="https://your-cdn.com/image.png or /images/home-hero.png"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Use a full URL (CDN, GitHub, etc.) or a path from the public folder (e.g., /images/home-hero.png).
                </p>
              </div>

              <button
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {saving ? 'Saving...' : 'Save Image'}
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}


