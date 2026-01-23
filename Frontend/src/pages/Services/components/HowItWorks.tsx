export default function HowItWorks() {
  const steps = [
    {
      number: 1,
      title: 'Post a Job',
      description: 'Describe your project requirements and budget',
      icon: '📝'
    },
    {
      number: 2,
      title: 'Choose Experts',
      description: 'Review proposals and select the best freelancer',
      icon: '👥'
    },
    {
      number: 3,
      title: 'Track Progress',
      description: 'Monitor work progress and provide feedback',
      icon: '📊'
    },
    {
      number: 4,
      title: 'Pay Securely',
      description: 'Release payment when work is completed',
      icon: '💳'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-lg text-gray-600">
            Get your project done in 4 simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="relative mb-6">
                <div className="w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl">{step.icon}</span>
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.number}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}