"use client";

import { RootState, useAppSelector } from '@/app/redux';
import { useGetProjectsQuery } from '@/state/api';
import React, { useMemo, useState } from 'react'
import { DisplayOption, Gantt, Task, ViewMode } from 'gantt-task-react';
import "gantt-task-react/dist/index.css";

type TaskTypeItems = "task" | "milestone" | "project";

const TimelineView = () => {
    const isDarkMode = useAppSelector((state: RootState) => state.global.isDarkMode);
    const { data: projects, isLoading, error } = useGetProjectsQuery();

    if (isLoading) return <div>Loading...</div>;
    if (error || !projects) return <div>Error occured while fetching projects</div>;

    const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
        viewMode: ViewMode.Month,
        locale: "fi-FI"
    });

    const ganttTasks = useMemo(() => {
        return (
            projects?.map((project) => ({
                start: new Date(project.startDate as string),
                end: new Date(project.endDate as string),
                name: project.name,
                id: `Project-${project.id}`,
                type: "project" as TaskTypeItems,
                progress: 50,
                isDisabled: false
            })) || []
        )
    }, [projects]);

    const handleViewModeChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setDisplayOptions((prev) => ({
            ...prev,
            viewMode: event.target.value as ViewMode
        }));
    }
    
  return (
    <div className="max-w-full p-8">
        <header className="mb-4 flex items-center justify-between">
            <h1 className="me-2 text-lg font-bold dark:text-white">Projects Timeline</h1>
            <div className="relative inline-block w-64">
                <select
                    className="focus:shadow-outline block w-full appearance-none rounded border border-gray-200 bg-white px-4 py-2 pr-8 leading-tight hover:border-gray-500 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
                    value={displayOptions.viewMode}
                    onChange={handleViewModeChange}
                >
                    <option value={ViewMode.Day}>Day</option>
                    <option value={ViewMode.Week}>Week</option>
                    <option value={ViewMode.Month}>Month</option>
                </select>
            </div>
        </header>

        <div className="overflow-hidden rounded-md bg-white shadow dark:bg-dark-secondary dark:text-white">
            <div className="timeline">
                <Gantt
                    tasks={ganttTasks}
                    viewMode={displayOptions.viewMode}
                    {...displayOptions}
                    columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
                    listCellWidth="100px"
                    projectBackgroundColor={isDarkMode ? "#101214" : "#1f2937"}
                    projectProgressColor={isDarkMode ? "#1f2937" : "#aeb8c2"}
                    projectProgressSelectedColor={isDarkMode ? "#000" : "#9ba1a6"}
                />
            </div>
        </div>
    </div>
  )
}

export default TimelineView