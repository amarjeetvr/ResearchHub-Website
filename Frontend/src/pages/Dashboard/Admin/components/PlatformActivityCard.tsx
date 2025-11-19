export default function PlatformActivityCard() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold text-[#1F1F1F] mb-6">Platform Activity</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-xl">
          <span className="text-gray-700">New Projects (Today)</span>
          <span className="font-bold text-[#2D6CDF] text-xl">23</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-xl">
          <span className="text-gray-700">Completed Projects (Week)</span>
          <span className="font-bold text-[#2D6CDF] text-xl">67</span>
        </div>
        <div className="flex items-center justify-between p-4 bg-[#F5F7FA] rounded-xl">
          <span className="text-gray-700">Platform Commission (Month)</span>
          <span className="font-bold text-[#2D6CDF] text-xl">$28,492</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-blue-50 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">4,238</div>
            <div className="text-sm text-gray-600">Active Freelancers</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-xl">
            <div className="text-2xl font-bold text-green-600">8,609</div>
            <div className="text-sm text-gray-600">Active Clients</div>
          </div>
        </div>
      </div>
    </div>
  );
}
