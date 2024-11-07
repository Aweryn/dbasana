import React from 'react'
import { RootState, useAppSelector } from '@/app/redux';
import { useGetTasksQuery } from '@/state/api';
import Header from '@/components/Header';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';
import { PlusSquare } from 'lucide-react';

type TableViewProps = {
    id: string;
    setIsModalNewTaskOpen: (value: boolean) => void;
}
// Define grid
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
        renderCell: (params) => params.value?.author || "Unknown"
     },
     {
        field: "assignee", 
        headerName: "Assignee", 
        width: 100,
        renderCell: (params) => params.value?.assignee || "Unknown"
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

const TableView = ({ id, setIsModalNewTaskOpen }: TableViewProps) => {

    const isDarkMode = useAppSelector((state: RootState) => state.global.isDarkMode);

    const { data: tasks, isLoading, error } = useGetTasksQuery({ projectId: Number(id) });

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error occured while fetching tasks</div>;

  return (
    <div className="h-[540px] w-full px-4 pb-8 xl:px-6">
        <div className="pt-5">
            <Header
                name="Table"
                isSmallText={true}
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
        <DataGrid 
            rows={tasks || []}
            columns={columns}
            className={dataGridClassNames}
            sx={dataGridSxStyles(isDarkMode)}
        />
    </div>
  )
}

export default TableView