interface Verification {
  id: number;
  freelancer: string;
  type: string;
  submittedDate: string;
  documents: number;
}

export default function VerificationWorkflow({ verifications }: { verifications: Verification[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-xl font-bold text-[#1F1F1F] mb-6">Pending Verifications ({verifications.length})</h3>
      <div className="space-y-4">
        {verifications.map(verification => (
          <div key={verification.id} className="flex items-center justify-between p-6 border border-gray-200 rounded-xl hover:border-[#2D6CDF] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#2D6CDF] rounded-full flex items-center justify-center text-white font-bold">
                {verification.freelancer}
              </div>
              <div>
                <div className="font-bold text-[#1F1F1F] mb-1">{verification.type} Verification</div>
                <div className="text-sm text-gray-600">Submitted {verification.submittedDate} • {verification.documents} documents</div>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="bg-[#2D6CDF] text-white px-6 py-2 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all">
                Review
              </button>
              <button className="bg-green-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-green-600 transition-all">
                Approve
              </button>
              <button className="bg-red-500 text-white px-6 py-2 rounded-xl font-semibold hover:bg-red-600 transition-all">
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
