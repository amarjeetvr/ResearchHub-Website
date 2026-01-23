interface ServiceDescriptionProps {
  title: string;
  content: string[];
}

export default function ServiceDescription({ title, content }: ServiceDescriptionProps) {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">{title}</h2>
            {content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-600 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="flex justify-center">
            <div className="w-96 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
              <div className="text-6xl">💼</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}