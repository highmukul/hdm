import Link from 'next/link';
import { FaApple, FaCheese, FaCookieBite, FaGlassMartiniAlt } from 'react-icons/fa';

const categories = [
  { name: 'Vegetables & Fruits', icon: <FaApple />, href: '/shop?category=vegetables-fruits', color: 'bg-green-500' },
  { name: 'Dairy & Breakfast', icon: <FaCheese />, href: '/shop?category=dairy-breakfast', color: 'bg-yellow-500' },
  { name: 'Munchies', icon: <FaCookieBite />, href: '/shop?category=munchies', color: 'bg-orange-500' },
  { name: 'Cold Drinks & Juices', icon: <FaGlassMartiniAlt />, href: '/shop?category=cold-drinks-juices', color: 'bg-blue-500' },
];

const CategoryGrid = () => {
  return (
    <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="text-3xl font-bold text-center mb-12 text-text-primary">Shop by Category</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link href={category.href} key={category.name}>
            <a className={`group p-6 rounded-xl flex flex-col items-center text-center text-white transition-transform transform hover:-translate-y-2 ${category.color}`}>
              <div className="text-5xl mb-4">{category.icon}</div>
              <h3 className="font-semibold text-lg">{category.name}</h3>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default CategoryGrid;
