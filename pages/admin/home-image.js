import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/admin/AdminLayout'
import { Image as ImageIcon } from 'lucide-react'
import Image from 'next/image'

export default function AdminHomeImage() {
  const router = useRouter()
  const [currentImage, setCurrentImage] = useState(null)
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
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
    } catch (err) {
      console.error('Error fetching home image:', err)
      setError('Failed to load current home image')
    } finally {
      setLoading(false)
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      setError('Image size must be less than 10MB')
      return
    }

    setError('')
    setSelectedFile(file)

    // Create preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      setPreviewUrl(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const getToken = () => localStorage.getItem('adminToken')

  const handleSave = async () => {
    setError('')
    if (!selectedFile) {
      setError('Please select an image file')
      return
    }

    try {
      // Step 1: Upload to Cloudinary
      setUploading(true)
      const formData = new FormData()
      formData.append('image', selectedFile)

      const uploadRes = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData,
      })

      const uploadData = await uploadRes.json()

      if (!uploadRes.ok) {
        setError(uploadData.message || 'Failed to upload image')
        setUploading(false)
        return
      }

      // Step 2: Save URL to MongoDB
      setUploading(false)
      setSaving(true)

      const saveRes = await fetch('/api/home-image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ image: uploadData.url }),
      })

      const saveData = await saveRes.json()

      if (!saveRes.ok) {
        setError(saveData.message || 'Failed to save image URL')
        setSaving(false)
        return
      }

      // Success - update current image and reset form
      setCurrentImage(saveData)
      setSelectedFile(null)
      setPreviewUrl('')
      
      // Reset file input
      const fileInput = document.getElementById('image-file-input')
      if (fileInput) fileInput.value = ''
    } catch (err) {
      console.error('Error saving home image:', err)
      setError('An error occurred while saving')
    } finally {
      setUploading(false)
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
                  Image File *
                </label>
                <input
                  id="image-file-input"
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none text-sm"
                />
                <p className="mt-1 text-xs text-gray-500">
                  Select an image file (max 10MB). Supported formats: JPG, PNG, GIF, WebP.
                </p>
              </div>

              {/* Preview */}
              {previewUrl && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
                  <div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      fill
                      sizes="(min-width: 1024px) 50vw, 100vw"
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                </div>
              )}

              <button
                onClick={handleSave}
                disabled={!selectedFile || uploading || saving}
                className="inline-flex items-center justify-center px-4 py-2 rounded-md bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {uploading ? 'Uploading...' : saving ? 'Saving...' : 'Save Image'}
              </button>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  )
}


