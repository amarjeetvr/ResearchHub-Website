import { motion } from 'framer-motion';

export default function TrustedBySection() {
  const companies = [
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
    { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
    { name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Adobe_Logo.svg' },
    { name: 'Microsoft', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg' },
    { name: 'Deloitte', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg' },
    { name: 'NASA', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg' },
    { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
    { name: 'Telstra', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Telstra_logo.svg' },
    { name: 'Fujitsu', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Fujitsu-Logo.svg' },
  ];

  return (
    <section className="relative py-12 sm:py-14 lg:py-16 bg-white overflow-hidden border-y border-gray-200">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Trusted by leading organizations worldwide</p>
        </motion.div>
        
        <div className="flex items-center gap-8 sm:gap-10 lg:gap-12 overflow-x-auto lg:overflow-visible justify-start lg:justify-center scrollbar-hide px-1">
          {companies.map((company, index) => (
            <motion.div
              key={company.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="flex-shrink-0 flex items-center justify-center opacity-50 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
            >
              <img
                src={company.logo}
                alt={company.name}
                className="h-7 sm:h-8 lg:h-9 w-auto object-contain"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-gray-600 text-sm font-semibold">${company.name}</span>`;
                  }
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
