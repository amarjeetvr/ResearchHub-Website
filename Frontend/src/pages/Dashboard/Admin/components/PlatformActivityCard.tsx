export default function PlatformActivityCard() {
  return (
    <div className="bg-white/80 backdrop-blur-sm border-2 border-slate-200/60 rounded-3xl shadow-xl hover:border-indigo-300/60 transition-all duration-300">
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 mb-3 pb-2 border-b border-slate-100">Platform Activity</h3>
      </div>
      <div className="px-4 pb-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg hover:shadow-sm transition-all duration-200">
            <span className="text-gray-700 text-sm">New Projects (Today)</span>
            <span className="font-bold text-blue-600 text-lg">23</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-indigo-50 border border-indigo-200 rounded-lg hover:shadow-sm transition-all duration-200">
            <span className="text-gray-700 text-sm">Completed Projects (Week)</span>
            <span className="font-bold text-indigo-600 text-lg">67</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg hover:shadow-sm transition-all duration-200">
            <span className="text-gray-700 text-sm">Platform Commission (Month)</span>
            <span className="font-bold text-purple-600 text-lg">$28,492</span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center p-3 bg-blue-100 border border-blue-300 rounded-lg hover:shadow-sm transition-all duration-200">
              <div className="text-xl font-bold text-blue-700">4,238</div>
              <div className="text-xs text-gray-600">Active Freelancers</div>
            </div>
            <div className="text-center p-3 bg-green-100 border border-green-300 rounded-lg hover:shadow-sm transition-all duration-200">
              <div className="text-xl font-bold text-green-700">8,609</div>
              <div className="text-xs text-gray-600">Active Clients</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
