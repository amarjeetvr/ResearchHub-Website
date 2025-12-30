import { CheckCircle } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  verified: boolean;
  joined: string;
  status: string;
}

export default function RecentUsersCard({ users }: { users: User[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold text-[#1F1F1F] mb-6">Recent Users</h3>
      <div className="space-y-4">
        {users.slice(0, 5).map(user => (
          <div key={user.id} className="flex items-center justify-between pb-4 border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#2D6CDF] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <div className="font-semibold text-[#1F1F1F]">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-500 mb-1">{user.joined}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-[#2D6CDF] capitalize">{user.role}</span>
                {user.verified && <CheckCircle className="text-green-500" size={14} />}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
