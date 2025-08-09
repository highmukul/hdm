import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const socialLinks = [
    { icon: <FaFacebook />, href: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaTwitter />, href: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaInstagram />, href: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaLinkedin />, href: 'https://linkedin.com', label: 'LinkedIn' },
  ];

  const footerSections = [
    {
      title: 'Categories',
      links: [
        { name: 'Vegetables & Fruits', href: '/shop?category=vegetables-fruits' },
        { name: 'Dairy & Breakfast', href: '/shop?category=dairy-breakfast' },
        { name: 'Munchies', href: '/shop?category=munchies' },
        { name: 'Cold Drinks & Juices', href: '/shop?category=cold-drinks-juices' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About', href: '/about' },
        { name: 'Careers', href: '/careers' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact Us', href: '/contact' },
      ],
    },
     {
      title: 'For Consumers',
      links: [
        { name: 'Terms Of Use', href: '/terms' },
        { name: 'FAQ', href: '/faq' },
        { name: 'Privacy Policy', href: '/privacy' },
        { name: 'Sitemap', href: '/sitemap' },
      ],
    }
  ];

  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Logo and Social */}
          <div className="md:col-span-1 lg:col-span-2">
            <h2 className="text-3xl font-bold text-white mb-4">Hadoti Daily Mart</h2>
            <p className="text-gray-400 mb-6">Your daily essentials, delivered in minutes.</p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                  {social.icon}
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
          
          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold tracking-wider uppercase mb-4">{section.title}</h3>
              <ul>
                {section.links.map((link) => (
                  <li key={link.name} className="mb-2">
                    <Link href={link.href} className="text-gray-400 hover:text-white transition-colors">{link.name}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Hadoti Daily Mart. All rights reserved.</p>
          <p className="text-sm mt-1">
            Built with ❤️ for a better tomorrow.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;