export default function SkillsManagement({ skills }: { skills: string[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-[#1F1F1F]">Skills Database ({skills.length})</h3>
        <button className="bg-[#2D6CDF] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#1F1F1F] transition-all">
          Add New Skill
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-[#F5F7FA] px-4 py-2 rounded-xl border border-gray-200">
            <span className="font-medium text-[#1F1F1F]">{skill}</span>
            <button className="text-red-600 hover:text-red-700">×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
