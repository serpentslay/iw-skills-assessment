import React from "react";

interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
}

interface UserRowProps {
    user: User;
}

const UserRow: React.FC<UserRowProps> = ({ user }) => {
    return (
        <tr key={user.id}>
            <td className="border px-4 py-2">{user.id}</td>
            <td className="border px-4 py-2">{user.name}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">{user.email_verified_at ? "Yes" : "No"}</td>
        </tr>
    );
};

export default UserRow;
