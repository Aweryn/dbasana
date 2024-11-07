import { User } from '@/state/api'
import Image from 'next/image'
import React from 'react'

type Props = {
    user: User
}

const UserCard = ({ user }: Props) => {
  return (
    <div className="flex items-center rounded border p-4 shadow">
        {user.profilePictureUrl && (
            <Image
                src={`${process.env.NEXT_PUBLIC_S3_BUCKET_URL}/${user.profilePictureUrl}`}
                alt="Profile picture"
                width={32}
                height={32}
                className="rounded-full"
            />
        )}
        <div>
            <h3 className="text-lg font-bold">{user.userId}</h3>
            <p className="text-sm text-gray-500">{user.email}</p>
        </div>
    </div>
  )
}

export default UserCard