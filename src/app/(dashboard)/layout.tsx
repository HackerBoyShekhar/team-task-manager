import { getSession } from '@/lib/auth'
import DashboardSidebar from '@/components/DashboardSidebar'
import { redirect } from 'next/navigation'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getSession()
  
  if (!session) {
    redirect('/login')
  }

  return (
    <div className="dashboard-container">
      <DashboardSidebar user={session.user} />
      <main className="content-area">
        {children}
      </main>
    </div>
  )
}
