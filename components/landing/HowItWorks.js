import Image from 'next/image';
import * as FiIcons from 'react-icons/fi';

const steps = [
  {
    icon: <FiIcons.FiSearch className="h-8 w-8 text-white" />,
    title: 'Browse Stores',
    description: 'Find your favorite local stores and browse their products.',
  },
  {
    icon: <FiIcons.FiShoppingBag className="h-8 w-8 text-white" />,
    title: 'Add to Cart',
    description: 'Select the items you need and add them to your shopping cart.',
  },
  {
    icon: <FiIcons.FiGift className="h-8 w-8 text-white" />,
    title: 'Fast Delivery',
    description: 'Get your order delivered to your doorstep in minutes.',
  },
];

const HowItWorks = () => {
  return (
    <section className="relative bg-gray-50 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base font-semibold text-indigo-600 tracking-wide uppercase">How It Works</h2>
          <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
            Get your groceries in 3 simple steps.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {steps.map((step, i) => (
              <div key={step.title} className="text-center">
                <div className="flex items-center justify-center h-16 w-16 mx-auto bg-indigo-500 rounded-full">
                  {step.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-gray-900">{step.title}</h3>
                <p className="mt-2 text-base text-gray-500">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
