import React from 'react'
import { Project } from '@/state/api'

type Props = {
    project: Project
}

const ProjectCard = ({ project }: Props) => {
  return (
    <div className="rounded border p-4 shadow">
        <h3 className="text-lg font-bold">{project.name}</h3>
        <p className="text-sm text-gray-500">{project.description}</p>
        <p className="text-sm text-gray-500">Start Date: {project.startDate}</p>
        <p className="text-sm text-gray-500">End Date: {project.endDate}</p>
    </div>
  )
}

export default ProjectCard