export default function TrustedBySection() {
  const companies = [
    { name: 'Amazon', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
    { name: 'Google', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
    { name: 'Meta', logo: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg' },
    { name: 'Netflix', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg' },
    { name: 'Airbnb', logo: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg' },
    { name: 'Adobe', logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Adobe_Logo.svg' },
    { name: 'Facebook', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_%282019%29.png' },
    { name: 'Deloitte', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/56/Deloitte.svg' },
    { name: 'NASA', logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e5/NASA_logo.svg' },
    { name: 'IBM', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg' },
    { name: 'Telstra', logo: 'https://upload.wikimedia.org/wikipedia/commons/0/05/Telstra_logo.svg' },
    { name: 'Fujitsu', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Fujitsu-Logo.svg' },
  ];

  return (
    <section className="relative py-12 sm:py-14 lg:py-6 bg-gradient-to-br from-[#0A0E27] via-[#1a1f3a] to-[#0f1629] overflow-hidden">
      {/* background glow */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-48 sm:w-64 h-48 sm:h-64 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-48 sm:w-64 h-48 sm:h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* responsive logos row */}
        <div className="
          flex items-center
          gap-6 sm:gap-8 lg:gap-10
          overflow-x-auto lg:overflow-visible
          justify-start lg:justify-center
          scrollbar-hide
          px-1
        ">
          {companies.map((company) => (
            <div
              key={company.name}
              className="
                flex-shrink-0
                flex items-center justify-center
                opacity-40 hover:opacity-100
                grayscale hover:grayscale-0
                transition-all duration-300
              "
            >
              <img
                src={company.logo}
                alt={company.name}
                className="
                  h-6 sm:h-7 lg:h-8
                  w-auto
                  object-contain
                  filter brightness-0 invert
                "
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement!.innerHTML = `<span class="text-gray-400 text-xs sm:text-sm font-semibold">${company.name}</span>`;
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
