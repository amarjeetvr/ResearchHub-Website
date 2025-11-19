import { Briefcase, GraduationCap } from 'lucide-react';
import { CLIENT_STEPS, FREELANCER_STEPS } from '../../../utils/constants';

export default function HowItWorksSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F1F1F] mb-3 sm:mb-4">
            How It Works — Fast & Simple
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Get started in minutes, whether you're hiring or offering expertise
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          {/* For Companies / Clients */}
          <div>
            <div className="bg-gradient-to-r from-[#2D6CDF] to-[#1F1F1F] text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                <Briefcase size={24} className="flex-shrink-0" />
                <span>For Companies / Clients</span>
              </h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {CLIENT_STEPS.map((step, idx) => (
                <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100 relative">
                  <div className="absolute -left-2 sm:-left-3 -top-2 sm:-top-3 w-8 h-8 sm:w-10 sm:h-10 bg-[#2D6CDF] rounded-full flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                    {step.step}
                  </div>
                  <div className="flex gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#F5F7FA] rounded-xl flex items-center justify-center flex-shrink-0">
                      <step.icon className="text-[#2D6CDF]" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base sm:text-lg font-bold text-[#1F1F1F] mb-1 sm:mb-2">{step.title}</h4>
                      <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For Researchers / Experts */}
          <div>
            <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white rounded-xl sm:rounded-2xl p-4 sm:p-6 mb-6 sm:mb-8">
              <h3 className="text-xl sm:text-2xl font-bold flex items-center gap-3">
                <GraduationCap size={24} className="flex-shrink-0" />
                <span>For Researchers / Experts</span>
              </h3>
            </div>
            <div className="space-y-4 sm:space-y-6">
              {FREELANCER_STEPS.map((step, idx) => (
                <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-md border border-gray-100 relative">
                  <div className="absolute -left-2 sm:-left-3 -top-2 sm:-top-3 w-8 h-8 sm:w-10 sm:h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-bold shadow-lg text-sm sm:text-base">
                    {step.step}
                  </div>
                  <div className="flex gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                      <step.icon className="text-green-600" size={20} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-base sm:text-lg font-bold text-[#1F1F1F] mb-1 sm:mb-2">{step.title}</h4>
                      <p className="text-sm sm:text-base text-gray-600">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
