import React from 'react'
import { Task, useGetTasksQuery } from '@/state/api';
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import { PlusSquare } from 'lucide-react';

type ListViewProps = {
    id: string;
    setIsModalNewTaskOpen: (value: boolean) => void;
}

const ListView = ({ id, setIsModalNewTaskOpen }: ListViewProps) => {
    const { data: tasks, isLoading, error } = useGetTasksQuery({ projectId: Number(id) });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occured while fetching tasks</div>;

  return (
    <div className="px-4 pb-8 xl:px-6">
        <div className="pt-5">
            <Header
                isSmallText={true}
                name="List"
                buttonComponent={
                    <button className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
                    onClick={() => setIsModalNewTaskOpen(true)}
                    >
                        <PlusSquare className="mr-2 h-5 w-5" />
                        Add Task
                    </button>
                }
            />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tasks?.map((task: Task) => (
                <TaskCard key={task.id} task={task} />
            ))}
        </div>
    </div>
  )
}

export default ListView