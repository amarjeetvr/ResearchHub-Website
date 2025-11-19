import { Building2 } from 'lucide-react';
import { TRUSTED_BY } from '../../../utils/constants';

export default function TrustedBySection() {
  return (
    <section className="py-12 sm:py-16 bg-white border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h3 className="text-xs sm:text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Trusted By</h3>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8">
          {TRUSTED_BY.map((entity, idx) => (
            <div key={idx} className="flex items-center justify-center">
              <div className="text-center">
                <Building2 className="text-gray-400 mx-auto mb-2" size={28} />
                <span className="text-xs sm:text-sm font-semibold text-gray-600">{entity}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
