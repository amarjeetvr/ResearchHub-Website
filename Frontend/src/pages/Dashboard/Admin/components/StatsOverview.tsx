import { Users, FolderOpen, DollarSign, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatCardProps {
  label: string;
  value: string;
  icon: any;
  color: string;
  change: string;
  trend: 'up' | 'down';
}

export default function StatsOverview({ stats }: { stats: StatCardProps[] }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300
      }
    }
  };

  const numberVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        delay: 0.2
      }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
    >
      {stats.map((stat, idx) => (
        <motion.div
          key={idx}
          data-testid={`stat-${stat.label.toLowerCase().replace(/\s+/g, '-')}`}
          variants={itemVariants}
          whileHover={{ 
            y: -8, 
            scale: 1.02,
            boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(99, 102, 241, 0.1)`
          }}
          className="group relative bg-white/80 backdrop-blur-sm border border-slate-200/50 rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 overflow-hidden"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
          
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-6">
              <div className={`w-14 h-14 ${stat.color} rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110`}>
                <stat.icon className="text-white" size={28} />
              </div>
              <div className="flex items-center gap-1">
                {stat.trend === 'up' ? (
                  <TrendingUp size={16} className="text-green-500" />
                ) : (
                  <TrendingDown size={16} className="text-red-500" />
                )}
                <span className={`text-sm font-bold ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.change}
                </span>
              </div>
            </div>
            
            <div className="space-y-2">
              <motion.div 
                variants={numberVariants}
                className="text-3xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-slate-800"
              >
                {stat.value}
              </motion.div>
              <div className="text-sm font-medium text-slate-600 group-hover:text-slate-700 transition-colors duration-300">
                {stat.label}
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="mt-4 h-1 bg-slate-100 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: stat.trend === 'up' ? '75%' : '45%' }}
                transition={{ duration: 1, delay: idx * 0.2 + 0.5 }}
                className={`h-full rounded-full ${stat.color.replace('bg-', 'bg-gradient-to-r from-').replace('-500', '-400 to-').replace('to-', stat.color.replace('bg-', '') + '-600')}`}
              ></motion.div>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}