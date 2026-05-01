import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'

export default async function TeamPage() {
  const session = await getSession()
  const users = await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      _count: {
        select: { tasks: true }
      }
    }
  })

  return (
    <div className="animate-fade-in">
      <header className="page-header">
        <h1 className="heading">Team Members</h1>
        <p className="subtext">Manage your team and track their performance</p>
      </header>

      <div className="team-grid glass">
        <table className="team-table">
          <thead>
            <tr>
              <th>Member</th>
              <th>Role</th>
              <th>Active Tasks</th>
              <th>Joined Date</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user: any) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <div className="avatar">{user.name?.[0]}</div>
                    <div className="info">
                      <span className="name">{user.name}</span>
                      <span className="email">{user.email}</span>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={`role-badge ${user.role.toLowerCase()}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user._count.tasks} Tasks</td>
                <td>{new Date(user.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
