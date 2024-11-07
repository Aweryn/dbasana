"use client";

import { useGetTeamsQuery } from '@/state/api';
import React from 'react'
import { useAppSelector } from '../redux';
import Header from '@/components/Header';
import { DataGrid, GridColDef, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton } from '@mui/x-data-grid';
import { dataGridClassNames, dataGridSxStyles } from '@/lib/utils';

const Teams = () => {
    const { data: teams, isLoading, isError } = useGetTeamsQuery();
    const isDarkMode = useAppSelector((state) => state.global.isDarkMode);

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching teams</div>;

    const CustomToolbar = () => {
        return (
            <GridToolbarContainer className="toolbar flex gap-2">
                <GridToolbarFilterButton />
                <GridToolbarExport />
            </GridToolbarContainer>
        );
    }

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "teamName", headerName: "Team Name", flex: 1 },
        { field: "productOwnerUsername", headerName: "Product Owner", flex: 1 },
        { field: "projectManagerUsername", headerName: "Project Manager", flex: 1 },
    ];

  return (
    <div className="flex w-full flex-col p-8">
        <Header name="Teams" />
        <div style={{ height: "650px", width: "100%" }}>
            <DataGrid
                rows={teams || []}
                columns={columns}
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

export default Teams