import Modal from '@/components/Modal';
import { Priority, Status, useCreateTaskMutation } from '@/state/api';
import React, { useState } from 'react'
import { formatISO } from 'date-fns';

type Props = {
    id?: string | null;
    isOpen: boolean;
    onClose: () => void;
}

const ModalNewTask = ({ id = null, isOpen, onClose }: Props) => {
    const [createTask, { isLoading }] = useCreateTaskMutation();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState<Status>(Status.ToDo);
    const [priority, setPriority] = useState<Priority>(Priority.Low);
    const [tags, setTags] = useState('');
    const [startDate, setStartDate] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [authorUserId, setAuthorUserId] = useState('');
    const [assignedUserId, setAssignedUserId] = useState('');
    const [projectId, setProjectId] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title || !authorUserId || !(id !== null || projectId)) return;

        const formattedStartDate = formatISO(new Date(startDate), { representation: 'complete' });
        const formattedDueDate = formatISO(new Date(dueDate), { representation: 'complete' });

        await createTask({ 
            title, 
            description,
            status,
            priority,
            tags,
            startDate: formattedStartDate, 
            dueDate: formattedDueDate,
            authorUserId: parseInt(authorUserId),
            assignedUserId: parseInt(assignedUserId),
            projectId: id !== null ? Number(id) : Number(projectId)
        });

        clearForm();
        onClose();
    }

    const isFormValid = () => {
        return title && authorUserId && (id !== null || projectId);
    }

    const selectStyles = "w-full rounded bg-white border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

    const inputStyles = "w-full rounded border border-gray-300 p-2 shadow-sm dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none";

    const clearForm = () => {
        setTitle('');
        setDescription('');
        setStatus(Status.ToDo);
        setPriority(Priority.Low);
        setTags('');
        setStartDate('');
        setDueDate('');
        setAuthorUserId('');
        setAssignedUserId('');
        setProjectId('');
    };

    const handleClose = () => {
        clearForm();
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} name="Create New Task">
            <form className="mt-4 space-y-6"
            onSubmit={(e) => {
                e.preventDefault();
                handleSubmit(e);
            }}
            >
                <input type="text" 
                  className={inputStyles}
                  placeholder="Task Title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <textarea 
                  className={inputStyles}
                  placeholder="Task Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <select className={selectStyles} value={status} onChange={(e) => setStatus(Status[e.target.value as keyof typeof Status])}>
                      <option value="">Select Status</option>
                      <option value={Status.ToDo}>To Do</option>
                      <option value={Status.WorkInProgress}>Work In Progress</option>
                      <option value={Status.UnderReview}>Under Review</option>
                      <option value={Status.Done}>Done</option>
                    </select>
                    <select className={selectStyles} value={priority} onChange={(e) => setPriority(Priority[e.target.value as keyof typeof Priority])}>
                      <option value="">Select Priority</option>
                      <option value={Priority.Low}>Low</option>
                      <option value={Priority.Medium}>Medium</option>
                      <option value={Priority.High}>High</option>
                      <option value={Priority.Urgent}>Urgent</option>
                      <option value={Priority.Backlog}>Backlog</option>
                    </select>
                </div>

                <input type="text" 
                  className={inputStyles}
                  placeholder="Set Tags (comma separated)" 
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <input type="date" 
                    className={inputStyles}
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    />

                    <input type="date" 
                    className={inputStyles}
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    />
                </div>

                <input type="text" 
                  className={inputStyles}
                  placeholder="Author User ID" 
                  value={authorUserId}
                  onChange={(e) => setAuthorUserId(e.target.value)}
                />

                <input type="text" 
                  className={inputStyles}
                  placeholder="Assigned User ID" 
                  value={assignedUserId}
                  onChange={(e) => setAssignedUserId(e.target.value)}
                />
                {id === null && (
                  <input type="text" 
                    className={inputStyles}
                    placeholder="Project ID" 
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                />  
                )}
                <button type="submit"
                    className={`
                        mt-4 flex w-full justify-center rounded-md border border-transparent bg-blue-primary px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus-offset-2
                        ${!isFormValid() || isLoading ? "opacity-50 cursor-not-allowed" : ""}
                        `}
                    disabled={!isFormValid() || isLoading}
                    >
                    {isLoading ? "Creating..." : "Create Task"}
                </button>
            </form>
        </Modal>
    )
}

export default ModalNewTask;