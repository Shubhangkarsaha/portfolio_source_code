import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import {
  LayoutDashboard,
  FolderKanban,
  Award,
  Trophy,
  X,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react'

const AdminSidebar = ({ isOpen, onClose }) => {
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [darkMode, setDarkMode] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  const menuItems = [
    { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/admin/projects', label: 'Projects', icon: FolderKanban, badge: 2 },
    { href: '/admin/certificates', label: 'Certificates', icon: Award },
    { href: '/admin/achievements', label: 'Achievements', icon: Trophy },
  ]

  return (
    <div
      className={`fixed inset-y-0 left-0 z-50 transform transition-all duration-300
      ${collapsed ? 'w-20' : 'w-64'}
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      lg:translate-x-0 h-screen
      bg-gradient-to-b from-gray-900 to-gray-950 dark:from-black dark:to-gray-900`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-800">
          {!collapsed && (
            <h2 className="text-lg font-semibold text-white">Admin Panel</h2>
          )}
          <div className="flex gap-2">
            <button onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? (
                <Sun className="h-5 w-5 text-gray-400 hover:text-white" />
              ) : (
                <Moon className="h-5 w-5 text-gray-400 hover:text-white" />
              )}
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:block"
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5 text-gray-400" />
              ) : (
                <ChevronLeft className="h-5 w-5 text-gray-400" />
              )}
            </button>
            <button onClick={onClose} className="lg:hidden">
              <X className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>

        {/* Navigation */}
        <nav className="relative flex-1 px-2 py-6 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = router.pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="relative flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-gray-800 transition"
              >
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-xl bg-blue-600/20"
                  />
                )}

                <Icon className="h-5 w-5 z-10" />

                {!collapsed && (
                  <span className="z-10 font-medium">{item.label}</span>
                )}

                {item.badge && !collapsed && (
                  <span className="ml-auto z-10 text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}

export default AdminSidebar
