import Link from 'next/link';
import { useRouter } from 'next/router';
import { FiHome, FiShoppingBag, FiUser } from 'react-icons/fi';

export const BottomNav = () => {
    const router = useRouter();

    const navItems = [
        { href: '/customer/home', icon: <FiHome />, label: 'Home' },
        { href: '/customer/orders', icon: <FiShoppingBag />, label: 'Orders' },
        { href: '/customer/profile', icon: <FiUser />, label: 'Profile' },
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
            <div className="flex justify-around max-w-lg mx-auto">
                {navItems.map(({ href, icon, label }) => (
                    <Link href={href} key={label}>
                        <a className={`flex flex-col items-center justify-center p-3 w-full text-sm transition-colors ${router.pathname === href ? 'text-blue-600' : 'text-gray-500 hover:text-blue-600'}`}>
                            <span className="text-2xl">{icon}</span>
                            <span>{label}</span>
                        </a>
                    </Link>
                ))}
            </div>
        </div>
    );
};
