import { Star } from 'lucide-react';

interface Expert {
  id: string;
  name: string;
  role: string;
  rating: number;
  hourlyRate: number;
  avatar: string;
  skills: string[];
}

interface ExpertsListProps {
  experts: Expert[];
  serviceName: string;
}

export default function ExpertsList({ experts, serviceName }: ExpertsListProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Featured {serviceName} Experts
          </h2>
          <p className="text-lg text-gray-600">
            Work with top-rated professionals in {serviceName.toLowerCase()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experts.map((expert) => (
            <div
              key={expert.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {expert.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    {expert.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {expert.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-3">
                <div className="flex items-center">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="ml-1 text-sm font-medium text-gray-900">
                    {expert.rating}
                  </span>
                </div>
                <div className="ml-auto">
                  <span className="text-lg font-bold text-gray-900">
                    ${expert.hourlyRate}/hr
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex flex-wrap gap-2">
                  {expert.skills.slice(0, 3).map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <button className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:from-cyan-600 hover:to-blue-700 transition-all duration-300">
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}