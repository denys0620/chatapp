// components/chatpage/ActiveUsers.tsx

import React from "react";

interface Props {
  users: string[];
}

const ActiveUsers: React.FC<Props> = ({ users }) => {
  return (
    <div className="w-64 bg-gray-100 p-4 border-l border-gray-300">
      <h2 className="text-lg font-bold mb-2">Active Users</h2>
      <ul className="space-y-1">
        {users.map((user, i) => (
          <li key={i} className="text-gray-800 m-0.5 bg-gray-50 rounded-[2px]">{user}</li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveUsers;
