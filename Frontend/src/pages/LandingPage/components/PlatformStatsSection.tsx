import { motion } from 'framer-motion';

export default function PlatformStatsSection() {
  const stats = [
    { number: '10M+', label: 'Total Researchers' },
    { number: '5M+', label: 'Projects Completed' },
    { number: '98%', label: 'Customer Satisfaction' },
    { number: '190+', label: 'Countries' },
  ];

  return (
    <section className="relative py-20 bg-white overflow-hidden border-y border-gray-200">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-8 text-center hover:shadow-xl hover:scale-105 transition-all"
            >
              <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                {stat.number}
              </div>
              <div className="text-lg text-gray-700 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
