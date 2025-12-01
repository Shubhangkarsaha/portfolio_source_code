import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '../../components/admin/AdminLayout'
import DashboardCard from '../../components/admin/DashboardCard'
import { FolderKanban, Award, Trophy } from 'lucide-react'

export default function AdminDashboard() {
  const router = useRouter()
  const [stats, setStats] = useState({
    projects: 0,
    certificates: 0,
    achievements: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/admin/login')
      return
    }

    fetchStats()
  }, [router])

  const fetchStats = async () => {
    try {
      const [projectsRes, certificatesRes, achievementsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/certificates'),
        fetch('/api/achievements'),
      ])

      const projects = await projectsRes.json()
      const certificates = await certificatesRes.json()
      const achievements = await achievementsRes.json()

      setStats({
        projects: projects.length || 0,
        certificates: certificates.length || 0,
        achievements: achievements.length || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
          <p className="text-gray-600 mt-1">Welcome to your admin dashboard</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Total Projects"
              count={stats.projects}
              icon={FolderKanban}
              gradient="blue"
            />
            <DashboardCard
              title="Total Certificates"
              count={stats.certificates}
              icon={Award}
              gradient="green"
            />
            <DashboardCard
              title="Total Achievements"
              count={stats.achievements}
              icon={Trophy}
              gradient="purple"
            />
          </div>
        )}
      </div>
    </AdminLayout>
  )
}

