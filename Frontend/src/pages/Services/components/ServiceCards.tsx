interface SubService {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface ServiceCardsProps {
  subServices: SubService[];
  serviceName: string;
}

export default function ServiceCards({ subServices, serviceName }: ServiceCardsProps) {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Popular {serviceName} Services
          </h2>
          <p className="text-lg text-gray-600">
            Choose from our most requested {serviceName.toLowerCase()} solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subServices.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105 border border-gray-100"
            >
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}