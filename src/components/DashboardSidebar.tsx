'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface SidebarProps {
  user: any
}

export default function DashboardSidebar({ user }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/login')
    router.refresh()
  }

  const menuItems = [
    { label: 'Overview', href: '/dashboard', icon: '📊' },
    { label: 'Projects', href: '/projects', icon: '📁' },
    { label: 'Team', href: '/team', icon: '👥' },
    { label: 'Settings', href: '/settings', icon: '⚙️' },
  ]

  return (
    <aside className="sidebar">
      <div className="logo-container">
        <div className="logo-icon">TM</div>
        <span className="logo-text">TaskManager</span>
      </div>

      <nav className="nav-menu">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`nav-item ${pathname === item.href ? 'active' : ''}`}
          >
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="avatar">{user?.name?.[0] || 'U'}</div>
          <div className="details">
            <span className="name">{user?.name}</span>
            <span className="role">{user?.role}</span>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>

      <style jsx>{`
        .sidebar {
          width: 260px;
          height: 100vh;
          background: var(--sidebar-bg);
          border-right: 1px solid var(--card-border);
          display: flex;
          flex-direction: column;
          padding: 24px;
          position: sticky;
          top: 0;
        }
        .logo-container {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 40px;
        }
        .logo-icon {
          width: 32px;
          height: 32px;
          background: var(--accent-color);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-family: 'Outfit', sans-serif;
        }
        .logo-text {
          font-size: 1.25rem;
          font-weight: 700;
          font-family: 'Outfit', sans-serif;
        }
        .nav-menu {
          display: flex;
          flex-direction: column;
          gap: 8px;
          flex: 1;
        }
        .nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          transition: all 0.2s ease;
        }
        .nav-item:hover {
          background: var(--card-bg);
          color: var(--text-primary);
        }
        .nav-item.active {
          background: var(--card-bg);
          color: var(--accent-color);
          font-weight: 600;
        }
        .sidebar-footer {
          margin-top: auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding-top: 24px;
          border-top: 1px solid var(--card-border);
        }
        .user-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .avatar {
          width: 36px;
          height: 36px;
          background: #27272a;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
        }
        .details {
          display: flex;
          flex-direction: column;
        }
        .name {
          font-size: 0.9rem;
          font-weight: 600;
        }
        .role {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .logout-btn {
          text-align: left;
          font-size: 0.9rem;
          color: var(--danger-color);
          opacity: 0.8;
        }
        .logout-btn:hover {
          opacity: 1;
        }
      `}</style>
    </aside>
  )
}
