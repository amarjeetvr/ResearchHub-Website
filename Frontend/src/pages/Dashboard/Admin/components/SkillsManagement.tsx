export default function SkillsManagement({ skills }: { skills: string[] }) {
  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-white">Skills Database ({skills.length})</h3>
        <button className="bg-cyan-500/20 text-cyan-400 border border-cyan-400/30 px-6 py-2.5 rounded-xl font-semibold hover:bg-cyan-500/30 transition-all">
          Add New Skill
        </button>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-xl">
            <span className="font-medium text-white">{skill}</span>
            <button className="text-red-400 hover:text-red-300">×</button>
          </div>
        ))}
      </div>
    </div>
  );
}
