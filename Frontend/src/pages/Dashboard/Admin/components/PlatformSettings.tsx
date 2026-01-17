export default function PlatformSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Platform Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm">
            <div>
              <div className="font-semibold text-white">Platform Commission</div>
              <div className="text-sm text-gray-300">Current rate applied to completed projects</div>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                defaultValue="10"
                className="w-20 px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-center font-bold backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <span className="text-gray-300">%</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border border-white/20 rounded-xl bg-white/5 backdrop-blur-sm">
            <div>
              <div className="font-semibold text-white">Minimum Project Budget</div>
              <div className="text-sm text-gray-300">Minimum amount allowed for projects</div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-300">$</span>
              <input
                type="number"
                defaultValue="50"
                className="w-24 px-3 py-2 bg-white/10 border border-white/20 text-white rounded-lg text-center font-bold backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
