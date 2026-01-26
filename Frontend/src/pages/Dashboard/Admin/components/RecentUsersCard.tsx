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
    <div className="bg-white/80 backdrop-blur-sm border-2 border-slate-200/60 rounded-3xl shadow-xl hover:border-blue-300/60 transition-all duration-300">
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-slate-100">Recent Users</h3>
      </div>
      <div className="px-4 pb-4">
        <div className="space-y-2">
          {users.slice(0, 5).map(user => (
            <div key={user.id} className="flex items-center justify-between py-2 px-3 border-b border-slate-100/60 last:border-0 rounded-lg hover:bg-slate-50/50 transition-all duration-200">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white font-semibold text-xs shadow-sm border border-blue-200/50">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-gray-900 text-sm">{user.name}</div>
                  <div className="text-xs text-gray-600">{user.email}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-gray-500 mb-1">{user.joined}</div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-blue-600 capitalize bg-blue-50 px-2 py-0.5 rounded border border-blue-200">{user.role}</span>
                  {user.verified && <CheckCircle className="text-green-600" size={12} />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
