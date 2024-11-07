"use client";

import React, { useEffect, useState } from 'react'
import { useSearchQuery } from '@/state/api';
import { debounce } from 'lodash';
import Header from '@/components/Header';
import TaskCard from '@/components/TaskCard';
import ProjectCard from '@/components/ProjectCard';
import UserCard from '@/components/UserCard';

const Search = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const { data : searchResults, isLoading, isError } = useSearchQuery({ query: searchTerm }, { skip: searchTerm.length < 3 });

    const handleSearch = debounce(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(event.target.value);
        }, 500
    );

    useEffect(() => {
        return handleSearch.cancel;
    }, [handleSearch.cancel]);

  return (
    <div className="p-8">
        <Header name="Search" />
        <div>
            <input type="text" placeholder="Search" onChange={handleSearch} className="w-full lg:w-1/2 rounded border p-3 shadow" />
        </div>
        <div className="p-5">
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching data</p>}
            {!isLoading && !isError && searchResults && (
                <div>
                    {searchResults.tasks && searchResults.tasks?.length > 0 && (
                        <h2>Tasks</h2>
                    )}
                    {searchResults.tasks?.map((task) => (
                        <TaskCard key={task.id} task={task} />
                    ))}
                </div>
            )}

            {!isLoading && !isError && searchResults && (
                <div>
                    {searchResults.projects && searchResults.projects?.length > 0 && (
                        <h2>Projects</h2>
                    )}
                    {searchResults.projects?.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </div>
            )}

            {!isLoading && !isError && searchResults && (
                <div>
                    {searchResults.users && searchResults.users?.length > 0 && (
                        <h2>Users</h2>
                    )}
                    {searchResults.users?.map((user) => (
                        <UserCard key={user.userId} user={user} />
                    ))}
                </div>
            )}
        </div>
    </div>
  )
}

export default Search