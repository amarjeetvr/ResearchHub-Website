import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../../../utils/constants';

export default function TestimonialsSection() {
  return (
    <section className="py-12 sm:py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#1F1F1F] mb-3 sm:mb-4">
            What Our Community Says
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of innovators and researchers worldwide
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {TESTIMONIALS.map((testimonial, idx) => (
            <div key={idx} className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-md hover:shadow-xl transition-all border border-gray-100 relative">
              <Quote className="absolute top-4 sm:top-6 right-4 sm:right-6 text-[#2D6CDF] opacity-20" size={36} />
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#2D6CDF] to-[#1F1F1F] rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg flex-shrink-0">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-bold text-sm sm:text-base text-[#1F1F1F]">{testimonial.name}</div>
                  <div className="text-xs sm:text-sm text-gray-600">{testimonial.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-1 mb-3 sm:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="text-yellow-400 fill-yellow-400" size={14} />
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed mb-3 sm:mb-4">{testimonial.text}</p>
              <div className="text-xs sm:text-sm text-gray-500 italic">{testimonial.organization}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
