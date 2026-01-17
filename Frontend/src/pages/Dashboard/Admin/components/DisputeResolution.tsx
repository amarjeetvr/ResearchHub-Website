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
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Active Disputes ({disputes.length})</h3>
      <div className="space-y-4">
        {disputes.map(dispute => (
          <div key={dispute.id} className="border border-white/20 rounded-xl p-6 bg-white/5 backdrop-blur-sm">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="font-bold text-white text-lg mb-2">{dispute.project}</h4>
                <div className="text-sm text-gray-300 space-y-1">
                  <div>Client: <span className="font-semibold">{dispute.client}</span> • Freelancer: <span className="font-semibold">{dispute.freelancer}</span></div>
                  <div>Amount in Escrow: <span className="font-semibold text-cyan-400">${dispute.amount}</span></div>
                  <div>Reported: {dispute.date}</div>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                dispute.status === 'open' ? 'bg-yellow-500/20 text-yellow-400 border-yellow-400/30' : 'bg-blue-500/20 text-blue-400 border-blue-400/30'
              }`}>
                {dispute.status}
              </span>
            </div>
            <div className="flex gap-3">
              <button className="flex-1 bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 py-2 rounded-xl font-semibold hover:bg-cyan-500/30 transition-all">
                Review Details
              </button>
              <button className="flex-1 bg-green-500/20 text-green-400 border border-green-400/30 py-2 rounded-xl font-semibold hover:bg-green-500/30 transition-all">
                Resolve in Favor of Client
              </button>
              <button className="flex-1 bg-blue-500/20 text-blue-400 border border-blue-400/30 py-2 rounded-xl font-semibold hover:bg-blue-500/30 transition-all">
                Resolve in Favor of Freelancer
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
