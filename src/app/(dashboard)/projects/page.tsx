import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import Link from 'next/link'
import CreateProjectButton from '@/components/CreateProjectButton'

export default async function ProjectsPage() {
  const session = await getSession()
  const projects = await prisma.project.findMany({
    where: session?.user.role === 'ADMIN' ? {} : { ownerId: session?.user.id },
    include: {
      _count: {
        select: { tasks: true }
      }
    }
  })

  return (
    <div className="animate-fade-in">
      <header className="page-header flex justify-between items-center">
        <div>
          <h1 className="heading">Projects</h1>
          <p className="subtext">Manage your team's projects and initiatives</p>
        </div>
        <CreateProjectButton />
      </header>

      <div className="projects-grid">
        {projects.length === 0 ? (
          <div className="empty-state glass">
            <span className="icon">📁</span>
            <h3>No projects yet</h3>
            <p>Create your first project to start tracking tasks.</p>
          </div>
        ) : (
          projects.map((project: any) => (
            <Link href={`/projects/${project.id}`} key={project.id} className="project-card glass">
              <div className="card-header">
                <h3 className="project-name">{project.name}</h3>
                <span className="task-count">{project._count.tasks} Tasks</span>
              </div>
              <p className="project-desc">{project.description || 'No description provided.'}</p>
              <div className="card-footer">
                <span className="view-link">View Details →</span>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
