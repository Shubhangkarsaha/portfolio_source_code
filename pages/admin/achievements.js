import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/admin/AdminLayout'
import Table from '../../components/admin/Table'
import ModalForm from '../../components/admin/ModalForm'
import { Plus } from 'lucide-react'

export default function AdminAchievements() {
  const router = useRouter()
  const [achievements, setAchievements] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAchievement, setEditingAchievement] = useState(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    year: '',
  })

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchAchievements()
  }, [router])

  const fetchAchievements = async () => {
    try {
      const response = await fetch('/api/achievements')
      const data = await response.json()
      setAchievements(data)
    } catch (error) {
      console.error('Error fetching achievements:', error)
    } finally {
      setLoading(false)
    }
  }

  const getToken = () => {
    return localStorage.getItem('adminToken')
  }

  const handleAdd = () => {
    setEditingAchievement(null)
    setFormData({
      title: '',
      description: '',
      year: '',
    })
    setIsModalOpen(true)
  }

  const handleEdit = (achievement) => {
    setEditingAchievement(achievement)
    setFormData({
      title: achievement.title || '',
      description: achievement.description || '',
      year: achievement.year || '',
    })
    setIsModalOpen(true)
  }

  const handleDelete = async (achievement) => {
    if (!confirm(`Are you sure you want to delete "${achievement.title}"?`)) {
      return
    }

    try {
      const response = await fetch(`/api/achievements/${achievement._id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })

      if (response.ok) {
        fetchAchievements()
      } else {
        alert('Failed to delete achievement')
      }
    } catch (error) {
      console.error('Error deleting achievement:', error)
      alert('An error occurred')
    }
  }

  const handleSave = async () => {
    try {
      const url = editingAchievement
        ? `/api/achievements/${editingAchievement._id}`
        : '/api/achievements'
      const method = editingAchievement ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({
          ...formData,
          year: parseInt(formData.year) || formData.year,
        }),
      })

      if (response.ok) {
        setIsModalOpen(false)
        fetchAchievements()
      } else {
        const data = await response.json()
        alert(data.message || 'Failed to save achievement')
      }
    } catch (error) {
      console.error('Error saving achievement:', error)
      alert('An error occurred')
    }
  }

  const tableData = achievements.map((achievement) => ({
    title: achievement.title,
    description: achievement.description?.substring(0, 50) + '...' || '-',
    year: achievement.year || '-',
    _id: achievement._id,
  }))

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Achievements</h2>
            <p className="text-gray-600 mt-1">Manage your achievements</p>
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="h-5 w-5" />
            Add Achievement
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <Table
            columns={['Title', 'Description', 'Year']}
            data={tableData}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <ModalForm
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={editingAchievement ? 'Edit Achievement' : 'Add New Achievement'}
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
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year *
              </label>
              <input
                type="number"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="2024"
                required
              />
            </div>
          </div>
        </ModalForm>
      </div>
    </AdminLayout>
  )
}

