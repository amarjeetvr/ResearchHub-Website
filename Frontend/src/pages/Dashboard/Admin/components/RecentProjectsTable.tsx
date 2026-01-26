interface Project {
  id: number;
  title: string;
  client: string;
  freelancer: string | null;
  amount: number;
  status: string;
  date: string;
}

export default function RecentProjectsTable({ projects }: { projects: Project[] }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-2 border-slate-200/60 rounded-3xl shadow-xl hover:border-green-300/60 transition-all duration-300">
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-slate-100">Recent Projects</h3>
      </div>
      <div className="px-4 pb-4">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-slate-200 bg-slate-50/50">
              <tr className="text-left">
                <th className="py-2 px-3 font-medium text-gray-700 text-sm">Project</th>
                <th className="py-2 px-3 font-medium text-gray-700 text-sm">Client</th>
                <th className="py-2 px-3 font-medium text-gray-700 text-sm">Freelancer</th>
                <th className="py-2 px-3 font-medium text-gray-700 text-sm">Amount</th>
                <th className="py-2 px-3 font-medium text-gray-700 text-sm">Status</th>
                <th className="py-2 px-3 font-medium text-gray-700 text-sm">Date</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id} className="border-b border-slate-100/60 last:border-0 hover:bg-slate-50/50 transition-all duration-200">
                  <td className="py-3 px-3 font-medium text-gray-900 text-sm">{project.title}</td>
                  <td className="py-3 px-3 text-gray-600 text-sm">{project.client}</td>
                  <td className="py-3 px-3 text-gray-600 text-sm">{project.freelancer || '-'}</td>
                  <td className="py-3 px-3">
                    <span className="font-semibold text-green-600 bg-green-50 px-2 py-1 rounded border border-green-200 text-sm">
                      ${project.amount}
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${
                      project.status === 'completed' ? 'bg-green-100 text-green-700 border-green-300' :
                      project.status === 'in-progress' ? 'bg-blue-100 text-blue-700 border-blue-300' :
                      'bg-yellow-100 text-yellow-700 border-yellow-300'
                    }`}>
                      {project.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-gray-600 text-sm">{project.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
