import prisma from '@/lib/prisma'
import { getSession } from '@/lib/auth'
import { notFound } from 'next/navigation'
import TaskBoard from '@/components/TaskBoard'
import CreateTaskButton from '@/components/CreateTaskButton'

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getSession()
  
  const project = await prisma.project.findUnique({
    where: { id },
    include: {
      tasks: {
        include: { assignedTo: true },
        orderBy: { updatedAt: 'desc' }
      }
    }
  })

  if (!project) notFound()

  const team = await prisma.user.findMany({
    select: { id: true, name: true }
  })

  return (
    <div className="animate-fade-in">
      <header className="page-header flex justify-between items-center">
        <div>
          <h1 className="heading">{project.name}</h1>
          <p className="subtext">{project.description}</p>
        </div>
        <CreateTaskButton projectId={project.id} team={team} />
      </header>

      <TaskBoard initialTasks={project.tasks} projectId={project.id} />
    </div>
  )
}
