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
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Recent Projects</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-white/20">
            <tr className="text-left">
              <th className="pb-3 font-semibold text-gray-300">Project</th>
              <th className="pb-3 font-semibold text-gray-300">Client</th>
              <th className="pb-3 font-semibold text-gray-300">Freelancer</th>
              <th className="pb-3 font-semibold text-gray-300">Amount</th>
              <th className="pb-3 font-semibold text-gray-300">Status</th>
              <th className="pb-3 font-semibold text-gray-300">Date</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id} className="border-b border-white/10 last:border-0">
                <td className="py-4 font-medium text-white">{project.title}</td>
                <td className="py-4 text-gray-300">{project.client}</td>
                <td className="py-4 text-gray-300">{project.freelancer || '-'}</td>
                <td className="py-4 font-semibold text-cyan-400">${project.amount}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    project.status === 'completed' ? 'bg-green-500/20 text-green-400 border border-green-400/30' :
                    project.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400 border border-blue-400/30' :
                    'bg-yellow-500/20 text-yellow-400 border border-yellow-400/30'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="py-4 text-gray-300">{project.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
