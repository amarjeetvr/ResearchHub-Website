import { TrendingUp, Clock, DollarSign } from 'lucide-react';
import { SUCCESS_STORIES } from '../../../utils/constants';

export default function SuccessStoriesSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F1F1F] mb-3 sm:mb-4">
            Success Stories
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Real projects, real innovation, real impact
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {SUCCESS_STORIES.map((story, idx) => (
            <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-green-500 flex-shrink-0" size={18} />
                <span className="text-xs sm:text-sm font-semibold text-green-600">{story.industry}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[#1F1F1F] mb-4">{story.title}</h3>
              <div className="space-y-2 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Client:</span>
                  <span className="font-semibold text-gray-800 text-right">{story.client}</span>
                </div>
                <div className="flex items-center justify-between text-xs sm:text-sm">
                  <span className="text-gray-600">Researcher:</span>
                  <span className="font-semibold text-gray-800 text-right">{story.researcher}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-4">
                  <div className="text-center p-3 bg-[#F5F7FA] rounded-lg">
                    <Clock className="mx-auto mb-1 text-[#2D6CDF]" size={18} />
                    <div className="font-bold text-[#1F1F1F] text-sm">{story.duration}</div>
                    <div className="text-xs text-gray-600">Duration</div>
                  </div>
                  <div className="text-center p-3 bg-[#F5F7FA] rounded-lg">
                    <DollarSign className="mx-auto mb-1 text-[#2D6CDF]" size={18} />
                    <div className="font-bold text-[#1F1F1F] text-sm">{story.cost}</div>
                    <div className="text-xs text-gray-600">Budget</div>
                  </div>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">{story.result}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
