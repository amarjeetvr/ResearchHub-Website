interface Dispute {
  id: number;
  project: string;
  client: string;
  freelancer: string;
  amount: number;
  status: string;
  date: string;
}

export default function DisputeResolution({ disputes }: { disputes: Dispute[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold text-[#1F1F1F] mb-6">Active Disputes ({disputes.length})</h3>
      <div className="space-y-4">
        {disputes.map(dispute => (
          <div key={dispute.id} className="border border-gray-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-[#1F1F1F] text-lg mb-2">{dispute.project}</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <div>Client: <span className="font-semibold">{dispute.client}</span> • Freelancer: <span className="font-semibold">{dispute.freelancer}</span></div>
                  <div>Amount in Escrow: <span className="font-semibold text-[#2D6CDF]">${dispute.amount}</span></div>
                  <div>Reported: {dispute.date}</div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                dispute.status === 'open' ? 'bg-yellow-100 text-yellow-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {dispute.status}
              </span>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-[#2D6CDF] text-white py-2 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all">
                Review Details
              </button>
              <button className="flex-1 border-2 border-green-500 text-green-600 py-2 rounded-xl font-semibold hover:bg-green-50 transition-all">
                Resolve in Favor of Client
              </button>
              <button className="flex-1 border-2 border-blue-500 text-blue-600 py-2 rounded-xl font-semibold hover:bg-blue-50 transition-all">
                Resolve in Favor of Freelancer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
