export default function PlatformActivityCard() {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Platform Activity</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <span className="text-gray-300">New Projects (Today)</span>
          <span className="font-bold text-cyan-400 text-xl">23</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <span className="text-gray-300">Completed Projects (Week)</span>
          <span className="font-bold text-cyan-400 text-xl">67</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl">
          <span className="text-gray-300">Platform Commission (Month)</span>
          <span className="font-bold text-cyan-400 text-xl">$28,492</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-xl">
            <div className="text-2xl font-bold text-blue-400">4,238</div>
            <div className="text-sm text-gray-300">Active Freelancers</div>
          </div>
          <div className="text-center p-4 bg-green-500/20 backdrop-blur-sm border border-green-400/30 rounded-xl">
            <div className="text-2xl font-bold text-green-400">8,609</div>
            <div className="text-sm text-gray-300">Active Clients</div>
          </div>
        </div>
      </div>
    </div>
  );
}
