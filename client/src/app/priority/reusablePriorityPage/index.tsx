"use client";

import { Priority, Task, useGetUserTasksQuery } from '@/state/api'
import React, { useState } from 'react'
import { useAppSelector } from '../../redux';
import ModalNewTask from '@/components/ModalNewTask';
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';

type Props = {
    priority: Priority
}

const columns: GridColDef[] = [
    { field: "title", headerName: "Title", width: 100 },
    { field: "description", headerName: "Description", width: 200 },
    { field: "priority", headerName: "Priority", width: 100 },
    { field: "tags", headerName: "Tags", width: 130 },
    { field: "startDate", headerName: "Start Date", width: 150 },
    { field: "dueDate", headerName: "Due Date", width: 150 },
    { 
        field: "author", 
        headerName: "Author", 
        width: 100,
        renderCell: (params) => params.value?.username || "Unknown"
     },
     {
        field: "assignee", 
        headerName: "Assignee", 
        width: 100,
        renderCell: (params) => params.value?.username || "Unknown"
     },
    { 
        field: "status", 
        headerName: "Status", 
        width: 100,
        renderCell: (params) => (
            <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
                {params.value}
            </span>
        )
    },
];

const ReusablePriorityPage = ({ priority }: Props) => {
    const [view, setView] = useState("list");
    const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
    const userId = 1;
    const { data: tasks, isLoading, isError: isTasksError } = useGetUserTasksQuery({ userId: userId || 0 }, { skip: !userId });

    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    const filteredTasks = tasks?.filter((task: Task) => task.priority === priority);

    if (isTasksError || !tasks) return <div>Error loading tasks</div>;

  return (
    <div className="m-5 p-4">
        <ModalNewTask isOpen={isModalNewTaskOpen} onClose={() => setIsModalNewTaskOpen(false)} />
        <Header name={`${priority} Priority Tasks`} buttonComponent={
            <button className="mr-3 rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-500"
                onClick={() => setIsModalNewTaskOpen(true)}
            >
                Add Task
            </button>
        } />
        <div className="mb-4 flex justify-start">
            <button className={`px-4 py-2 ${
                view === "list" ? "bg-gray-300" : "bg-white"
            } rounded-l`}
            onClick={() => setView("list")}
            >
                List
            </button>
            <button className={`px-4 py-2 ${
                view === "table" ? "bg-gray-300" : "bg-white"
            } rounded-l`}
            onClick={() => setView("table")}
            >
                table
            </button>
        </div>
        {isLoading ? (<div>Loading...</div>) : (
            view === "list" 
            ? (<div className="grid grid-cols-1 gap-4">
                {filteredTasks?.map((task: Task) => (
                    <TaskCard 
                        key={task.id} 
                        task={task} 
                    />
                ))}
            </div>) 
            : ( view === "table" && filteredTasks && (<div className="w-full">
                <DataGrid
                    rows={filteredTasks}
                    columns={columns}
                    checkboxSelection
                    getRowId={(row) => row.id}
                    className={dataGridClassNames}
                    sx={dataGridSxStyles(isDarkMode)}
                />
            </div>) )
        )}
    </div>
  )
}

export default ReusablePriorityPage