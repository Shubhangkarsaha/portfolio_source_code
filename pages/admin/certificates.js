import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/admin/AdminLayout'
import Table from '../../components/admin/Table'
import ModalForm from '../../components/admin/ModalForm'
import { Plus } from 'lucide-react'

export default function AdminCertificates() {
  const router = useRouter()
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingCertificate, setEditingCertificate] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    issueDate: '',
    image: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchCertificates()
  }, [router])

  const fetchCertificates = async () => {
    try {
      const response = await fetch('/api/certificates')
      const data = await response.json()
      setCertificates(data)
    } catch (error) {
      console.error('Error fetching certificates:', error)
    } finally {
      setLoading(false)
    }
  }

  const getToken = () => {
    return localStorage.getItem('adminToken')
  }

  const handleAdd = () => {
    setEditingCertificate(null)
    setFormData({
      title: '',
      issuer: '',
      issueDate: '',
      image: '',
    })
    setIsModalOpen(true)
  }

  const handleEdit = (certificate) => {
    setEditingCertificate(certificate)
    setFormData({
      title: certificate.title || '',
      issuer: certificate.issuer || '',
      issueDate: certificate.issueDate || '',
      image: certificate.image || '',
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (certificate) => {
    if (!confirm(`Are you sure you want to delete "${certificate.title}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/certificates/${certificate._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })

      if (response.ok) {
        fetchCertificates()
      } else {
        alert('Failed to delete certificate')
      }
    } catch (error) {
      console.error('Error deleting certificate:', error)
      alert('An error occurred')
    }
  }

  const handleSave = async () => {
    try {
      const url = editingCertificate
        ? `/api/certificates/${editingCertificate._id}`
        : '/api/certificates'
      const method = editingCertificate ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setIsModalOpen(false)
        fetchCertificates()
      } else {
        const data = await response.json()
        alert(data.message || 'Failed to save certificate')
      }
    } catch (error) {
      console.error('Error saving certificate:', error)
      alert('An error occurred')
    }
  }

  const tableData = certificates.map((certificate) => ({
    title: certificate.title,
    issuer: certificate.issuer || '-',
    issueDate: certificate.issueDate || '-',
    image: certificate.image || '-',
    _id: certificate._id,
  }))

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Certificates</h2>
            <p className="text-gray-600 mt-1">Manage your certificates</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add Certificate
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <Table
            columns={['Title', 'Issuer', 'Issue Date', 'Image']}
            data={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingCertificate ? 'Edit Certificate' : 'Add New Certificate'}
          onSave={handleSave}
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issuer *
              </label>
              <input
                type="text"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Issue Date *
              </label>
              <input
                type="text"
                value={formData.issueDate}
                onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="January 2024"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="/images/certificate.png"
              />
            </div>
          </div>
        </ModalForm>
      </div>
    </AdminLayout>
  )
}

