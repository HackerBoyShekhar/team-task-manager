import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await getSession()
  const userId = session?.user.id

  const isAdmin = session?.user.role === 'ADMIN'
  const filter = isAdmin ? {} : { assignedToId: userId }

  const stats = {
    total: await prisma.task.count({ where: filter }),
    completed: await prisma.task.count({ where: { ...filter, status: 'COMPLETED' } }),
    inProgress: await prisma.task.count({ where: { ...filter, status: 'IN_PROGRESS' } }),
    overdue: await prisma.task.count({ 
      where: { 
        ...filter,
        status: { not: 'COMPLETED' },
        dueDate: { lt: new Date() }
      } 
    })
  }

  const recentTasks = await prisma.task.findMany({
    where: filter,
    take: 5,
    orderBy: { updatedAt: 'desc' },
    include: { project: true }
  })

  return (
    <div className="animate-fade-in">
      <header className="page-header">
        <h1 className="heading">Dashboard Overview</h1>
        <p className="subtext">Welcome back, {session?.user.name}</p>
      </header>

      <section className="stats-grid">
        <div className="stat-card glass">
          <span className="label">Total Tasks</span>
          <span className="value">{stats.total}</span>
        </div>
        <div className="stat-card glass">
          <span className="label">Completed</span>
          <span className="value success">{stats.completed}</span>
        </div>
        <div className="stat-card glass">
          <span className="label">In Progress</span>
          <span className="value warning">{stats.inProgress}</span>
        </div>
        <div className="stat-card glass">
          <span className="label">Overdue</span>
          <span className="value danger">{stats.overdue}</span>
        </div>
      </section>

      <section className="recent-section">
        <h2 className="heading section-title">Recent Tasks</h2>
        <div className="task-list glass">
          {recentTasks.length === 0 ? (
            <p className="empty-msg">No tasks found. Start by creating a project and adding tasks!</p>
          ) : (
            recentTasks.map((task: any) => (
              <div key={task.id} className="task-item">
                <div className="task-info">
                  <span className="task-title">{task.title}</span>
                  <span className="task-project">{task.project.name}</span>
                </div>
                <div className="task-meta">
                  <span className={`status-badge ${task.status.toLowerCase()}`}>
                    {task.status.replace('_', ' ')}
                  </span>
                  <span className="due-date">
                    {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  )
}
