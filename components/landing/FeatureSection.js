import Image from 'next/image';
import * as FiIcons from 'react-icons/fi';

const features = [
  {
    icon: <FiIcons.FiClock className="h-8 w-8 text-white" />,
    title: 'Fast Delivery',
    description: 'Get your groceries delivered in as fast as 15 minutes.',
  },
  {
    icon: <FiIcons.FiBox className="h-8 w-8 text-white" />,
    title: 'Wide Selection',
    description: 'Choose from a wide variety of fresh products and essentials.',
  },
  {
    icon: <FiIcons.FiSmile className="h-8 w-8 text-white" />,
    title: 'Happy Customers',
    description: 'Join thousands of satisfied customers in your neighborhood.',
  },
];

const FeatureSection = () => {
  return (
    <section className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">Why Choose Us</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Everything you need, delivered fast.
          </p>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            We are committed to providing you with the best online grocery shopping experience.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.title} className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-indigo-500 rounded-md shadow-lg">
                        {feature.icon}
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">{feature.title}</h3>
                    <p className="mt-5 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
