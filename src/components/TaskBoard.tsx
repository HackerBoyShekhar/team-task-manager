'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface Task {
  id: string
  title: string
  description: string | null
  status: string
  priority: string
  assignedTo: { name: string } | null
}

export default function TaskBoard({ initialTasks, projectId }: { initialTasks: any[], projectId: string }) {
  const [tasks, setTasks] = useState(initialTasks)
  const router = useRouter()

  const columns = [
    { id: 'TODO', title: 'To Do', color: '#a1a1aa' },
    { id: 'IN_PROGRESS', title: 'In Progress', color: '#f59e0b' },
    { id: 'COMPLETED', title: 'Completed', color: '#10b981' },
  ]

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/tasks/${taskId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (res.ok) {
        setTasks(tasks.map(t => t.id === taskId ? { ...t, status: newStatus } : t))
        router.refresh()
      }
    } catch (err) {
      console.error(err)
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'HIGH': return '#ef4444';
      case 'MEDIUM': return '#f59e0b';
      case 'LOW': return '#10b981';
      default: return '#a1a1aa';
    }
  }

  return (
    <div className="board-grid">
      {columns.map(col => (
        <div key={col.id} className="board-column">
          <div className="column-header">
            <span className="dot" style={{ background: col.color }}></span>
            <h3 className="column-title">{col.title}</h3>
            <span className="count">{tasks.filter(t => t.status === col.id).length}</span>
          </div>

          <div className="task-container">
            {tasks.filter(t => t.status === col.id).map(task => (
              <div key={task.id} className="task-card glass">
                <div className="task-top">
                  <span className="priority" style={{ background: `${getPriorityColor(task.priority)}15`, color: getPriorityColor(task.priority) }}>
                    {task.priority}
                  </span>
                  <select 
                    value={task.status} 
                    onChange={(e) => handleStatusChange(task.id, e.target.value)}
                    className="status-select"
                  >
                    {columns.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
                  </select>
                </div>
                <h4 className="task-title">{task.title}</h4>
                <p className="task-desc">{task.description}</p>
                <div className="task-footer">
                  <div className="assignee">
                    <div className="avatar">{task.assignedTo?.name?.[0] || '?'}</div>
                    <span>{task.assignedTo?.name || 'Unassigned'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      <style jsx>{`
        .board-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          align-items: start;
        }
        .board-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .column-header {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
        }
        .dot { width: 8px; height: 8px; border-radius: 50%; }
        .column-title { font-size: 1rem; color: var(--text-primary); }
        .count { font-size: 0.8rem; color: var(--text-secondary); background: var(--card-bg); padding: 2px 8px; border-radius: 10px; }
        
        .task-container { display: flex; flex-direction: column; gap: 16px; min-height: 200px; }
        .task-card {
          padding: 20px;
          border-radius: var(--radius-md);
          display: flex;
          flex-direction: column;
          gap: 12px;
          cursor: grab;
        }
        .task-top { display: flex; justify-content: space-between; align-items: center; }
        .priority { font-size: 0.7rem; font-weight: 700; padding: 2px 8px; border-radius: 4px; }
        .status-select { font-size: 0.75rem; padding: 4px; background: transparent; border: none; color: var(--text-secondary); }
        
        .task-title { font-size: 1rem; }
        .task-desc { font-size: 0.85rem; color: var(--text-secondary); line-height: 1.4; }
        
        .task-footer { border-top: 1px solid var(--card-border); padding-top: 12px; margin-top: 4px; }
        .assignee { display: flex; items-center; gap: 8px; font-size: 0.8rem; color: var(--text-secondary); }
        .avatar { width: 24px; height: 24px; background: var(--accent-color); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.7rem; color: white; font-weight: bold; }
      `}</style>
    </div>
  )
}
