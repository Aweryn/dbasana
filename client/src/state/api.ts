import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Project {
    id: number;
    name: string;
    description?: string;
    startDate?: string;
    endDate?: string;
}

export enum Status {
    ToDo = "To Do",
    WorkInProgress = "Work In Progress",
    UnderReview = "Under Review",
    Done = "Done",
}

export enum Priority {
    Low = "Low",
    Medium = "Medium",
    High = "High",
    Urgent = "Urgent",
    Backlog = "Backlog",
}

export interface User {
    userId?: number;
    username: string;
    email: string;
    profilePictureUrl?: string;
    cognitoId?: string;
    teamId?: number;
}

export interface Attachment {
    id: number;
    fileURL: string;
    fileName: string;
    taskId: number;
    uploadedById: number;
}

export interface Task {
    id: number;
    title: string;
    description?: string;
    status?: Status;
    priority?: Priority;
    tags?: string;
    startDate?: string;
    dueDate?: string;
    points?: number;
    projectId: number;
    authorUserId?: number;
    assignedUserId?: number;

    author?: User;
    assignee?: User;
    comments?: Comment[];
    attachments?: Attachment[];
}

export interface SearchResults {
    tasks?: Task[];
    projects?: Project[];
    users?: User[];
}

export interface Team {
    id: number;
    teamName: string;
    productOwnerUserId?: number;
    projectManagerUserId?: number;
}

export const api = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    reducerPath: "api",
    tagTypes: ["Projects", "Tasks", "Users", "Teams"],
    endpoints: (build) => ({
        getProjects: build.query<Project[], void>({
            query: () => "projects",
            providesTags: ["Projects"],
        }),
        createProject: build.mutation<Project, Partial<Project>>({
            query: (project) => ({
                url: "projects",
                method: "POST",
                body: project,
            }),
            invalidatesTags: ["Projects"],
        }),
        getTasks: build.query<Task[], { projectId: number }>({
            query: ({ projectId }) => `tasks?projectId=${projectId}`,
            providesTags: (result) => result ? result.map(({ id }) => ({ type: "Tasks" as const, id })) : [{ type: "Tasks" as const }],
        }),
        createTask: build.mutation<Task, Partial<Task>>({
            query: (task) => ({
                url: "tasks",
                method: "POST",
                body: task,
            }),
            invalidatesTags: ["Tasks"],
        }),
        updateTaskStatus: build.mutation<Task, { taskId: number; status: Status }>({
            query: ({ taskId, status }) => ({
                url: `tasks/${taskId}/status`,
                method: "PATCH",
                body: { status },
            }),
            invalidatesTags: (result, error, { taskId }) => [{ type: "Tasks", id: taskId }],
        }),
        getUsers: build.query<User[], void>({
            query: () => "users",
            providesTags: ["Users"],
        }),
        getUserTasks: build.query<Task[], { userId: number }>({
            query: ({ userId }) => `tasks/user/${userId}`,
            providesTags: (result, error, arg) => 
                result 
                ? result.map(({ id }) => ({ type: "Tasks" as const, id })) 
                : [{ type: "Tasks" as const, id: arg.userId }],
        }),
        getTeams: build.query<Team[], void>({
            query: () => "teams",
            providesTags: ["Teams"],
        }),
        search: build.query<SearchResults, { query: string }>({
            query: ({ query }) => `search?query=${query}`,
        }),
    }),
});

export const {
    useGetProjectsQuery,
    useCreateProjectMutation,
    useGetTasksQuery,
    useCreateTaskMutation,
    useUpdateTaskStatusMutation,
    useSearchQuery,
    useGetUsersQuery,
    useGetTeamsQuery,
    useGetUserTasksQuery,
} = api;