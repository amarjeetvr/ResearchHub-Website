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
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold text-[#1F1F1F] mb-6">Recent Projects</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b border-gray-200">
            <tr className="text-left">
              <th className="pb-3 font-semibold text-gray-600">Project</th>
              <th className="pb-3 font-semibold text-gray-600">Client</th>
              <th className="pb-3 font-semibold text-gray-600">Freelancer</th>
              <th className="pb-3 font-semibold text-gray-600">Amount</th>
              <th className="pb-3 font-semibold text-gray-600">Status</th>
              <th className="pb-3 font-semibold text-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id} className="border-b border-gray-100 last:border-0">
                <td className="py-4 font-medium text-[#1F1F1F]">{project.title}</td>
                <td className="py-4 text-gray-600">{project.client}</td>
                <td className="py-4 text-gray-600">{project.freelancer || '-'}</td>
                <td className="py-4 font-semibold text-[#2D6CDF]">${project.amount}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                    project.status === 'completed' ? 'bg-green-100 text-green-700' :
                    project.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {project.status}
                  </span>
                </td>
                <td className="py-4 text-gray-600">{project.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
