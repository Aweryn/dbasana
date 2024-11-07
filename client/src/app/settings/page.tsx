import Header from '@/components/Header';
import React from 'react'

const Settings = () => {
    const userSettings = {
        username: "John Doe",
        email: "john.doe@example.com",
        profilePictureUrl: "/p1.jpeg",
        teamName: "Development Team",
        roleName: "Developer",
    }

    const labelStyles = "block text-sm font-medium dark:text-white";
    const textStyles = "mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 dark:text-white";

  return (
    <div className="p-8">
        <Header name="Settings" />
        <div className="space-y-4">
            <div>
                <label className={labelStyles}>Username</label>
                <input type="text" value={userSettings.username} className={textStyles} />
            </div>
            <div>
                <label className={labelStyles}>Email</label>
                <input type="text" value={userSettings.email} className={textStyles} />
            </div>
            <div>
                <label className={labelStyles}>Team Name</label>
                <input type="text" value={userSettings.teamName} className={textStyles} />
            </div>
            <div>
                <label className={labelStyles}>Role</label>
                <input type="text" value={userSettings.roleName} className={textStyles} />
            </div>
        </div>
    </div>
  )
}

export default Settings