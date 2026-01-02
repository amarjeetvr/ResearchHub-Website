export default function PlatformSettings() {
  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-md p-6">
        <h3 className="text-xl font-bold text-[#1F1F1F] mb-6">Platform Settings</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div>
              <div className="font-semibold text-[#1F1F1F]">Platform Commission</div>
              <div className="text-sm text-gray-600">Current rate applied to completed projects</div>
            </div>
            <div className="flex items-center gap-4">
              <input
                type="number"
                defaultValue="10"
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-center font-bold"
              />
              <span className="text-gray-600">%</span>
            </div>
          </div>
          <div className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
            <div>
              <div className="font-semibold text-[#1F1F1F]">Minimum Project Budget</div>
              <div className="text-sm text-gray-600">Minimum amount allowed for projects</div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-gray-600">$</span>
              <input
                type="number"
                defaultValue="50"
                className="w-24 px-3 py-2 border border-gray-300 rounded-lg text-center font-bold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
