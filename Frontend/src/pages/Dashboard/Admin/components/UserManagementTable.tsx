interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  joined: string;
  status: string;
}

export default function UserManagementTable({ users }: { users: User[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <select className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]">
            <option>All Roles</option>
            <option>Clients</option>
            <option>Freelancers</option>
          </select>
          <select className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF]">
            <option>All Status</option>
            <option>Active</option>
            <option>Pending</option>
            <option>Suspended</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search users..."
          className="px-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2D6CDF] w-64"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr className="text-left">
              <th className="pb-3 font-semibold text-gray-600">User</th>
              <th className="pb-3 font-semibold text-gray-600">Email</th>
              <th className="pb-3 font-semibold text-gray-600">Role</th>
              <th className="pb-3 font-semibold text-gray-600">Status</th>
              <th className="pb-3 font-semibold text-gray-600">Joined</th>
              <th className="pb-3 font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-gray-100 last:border-0">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#2D6CDF] rounded-full flex items-center justify-center text-white text-sm font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium">{user.name}</span>
                  </div>
                </td>
                <td className="py-4 text-gray-600">{user.email}</td>
                <td className="py-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs font-semibold capitalize">
                    {user.role}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 text-gray-600">{user.joined}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button className="text-[#2D6CDF] font-semibold hover:text-[#1F1F1F] text-sm">
                      View
                    </button>
                    <button className="text-red-600 font-semibold hover:text-red-700 text-sm">
                      Suspend
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
