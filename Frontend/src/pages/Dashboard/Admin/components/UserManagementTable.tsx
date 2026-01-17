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
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-3">
          <select className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 backdrop-blur-sm">
            <option className="bg-gray-800 text-white">All Roles</option>
            <option className="bg-gray-800 text-white">Clients</option>
            <option className="bg-gray-800 text-white">Freelancers</option>
          </select>
          <select className="px-4 py-2 bg-white/10 border border-white/20 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 backdrop-blur-sm">
            <option className="bg-gray-800 text-white">All Status</option>
            <option className="bg-gray-800 text-white">Active</option>
            <option className="bg-gray-800 text-white">Pending</option>
            <option className="bg-gray-800 text-white">Suspended</option>
          </select>
        </div>
        <input
          type="text"
          placeholder="Search users..."
          className="px-4 py-2 bg-white/10 border border-white/20 text-white placeholder-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-400 w-64 backdrop-blur-sm"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/20">
            <tr className="text-left">
              <th className="pb-3 font-semibold text-gray-300">User</th>
              <th className="pb-3 font-semibold text-gray-300">Email</th>
              <th className="pb-3 font-semibold text-gray-300">Role</th>
              <th className="pb-3 font-semibold text-gray-300">Status</th>
              <th className="pb-3 font-semibold text-gray-300">Joined</th>
              <th className="pb-3 font-semibold text-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} className="border-b border-white/10 last:border-0">
                <td className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-lg">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="font-medium text-white">{user.name}</span>
                  </div>
                </td>
                <td className="py-4 text-gray-300">{user.email}</td>
                <td className="py-4">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 border border-blue-400/30 rounded-lg text-xs font-semibold capitalize">
                    {user.role}
                  </span>
                </td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                    user.status === 'active' ? 'bg-green-500/20 text-green-400 border-green-400/30' : 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-4 text-gray-300">{user.joined}</td>
                <td className="py-4">
                  <div className="flex gap-2">
                    <button className="text-cyan-400 font-semibold hover:text-cyan-300 text-sm">
                      View
                    </button>
                    <button className="text-red-400 font-semibold hover:text-red-300 text-sm">
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
