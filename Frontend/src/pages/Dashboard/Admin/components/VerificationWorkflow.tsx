interface Verification {
  id: number;
  freelancer: string;
  type: string;
  submittedDate: string;
  documents: number;
}

export default function VerificationWorkflow({ verifications }: { verifications: Verification[] }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6">
      <h3 className="text-xl font-bold text-white mb-6">Pending Verifications ({verifications.length})</h3>
      <div className="space-y-4">
        {verifications.map(verification => (
          <div key={verification.id} className="flex items-center justify-between p-6 border border-white/20 rounded-xl hover:border-cyan-400/50 transition-all bg-white/5 backdrop-blur-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                {verification.freelancer}
              </div>
              <div>
                <div className="font-bold text-white mb-1">{verification.type} Verification</div>
                <div className="text-sm text-gray-300">Submitted {verification.submittedDate} • {verification.documents} documents</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 px-6 py-2 rounded-xl font-semibold hover:bg-cyan-500/30 transition-all">
                Review
              </button>
              <button className="bg-green-500/20 text-green-400 border border-green-400/30 px-6 py-2 rounded-xl font-semibold hover:bg-green-500/30 transition-all">
                Approve
              </button>
              <button className="bg-red-500/20 text-red-400 border border-red-400/30 px-6 py-2 rounded-xl font-semibold hover:bg-red-500/30 transition-all">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
