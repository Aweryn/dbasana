"use client";

import { useGetUsersQuery } from '@/state/api';
import React from 'react'
import { useAppSelector } from '../redux';
import Header from '@/components/Header';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import Image from 'next/image';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';

const Users = () => {
    const { data: users, isLoading, isError } = useGetUsersQuery();
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching users</div>;

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer className="toolbar flex gap-2">
                <GridToolbarFilterButton />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const columns: GridColDef[] = [
        { field: "profilePictureUrl", headerName: "Profile Picture", width: 50, 
            renderCell: (params) => {
                return (
                    <div className="flex h-full w-full items-center justify-center">
                        <div className="h-9 w-9">
                        <Image 
                            src={`/${params.value}`} 
                            alt="profile"
                            width={36} 
                            height={36} 
                            />
                        </div>
                    </div>
                );
            }
         },
        { field: "userId", headerName: "ID", width: 100 },
        { field: "username", headerName: "Username", flex: 1 },
        { field: "email", headerName: "Email", flex: 1 },
    ];

  return (
    <div className="flex w-full flex-col p-8">
        <Header name="Users" />
        <div style={{ height: "650px", width: "100%" }}>
            <DataGrid
                rows={users || []}
                columns={columns}
                getRowId={(row) => row.userId}
                className={dataGridClassNames}
                sx={dataGridSxStyles(isDarkMode)}
                slots={{
                    toolbar: CustomToolbar,
                }}
            />
        </div>
    </div>
  )
}

export default Users