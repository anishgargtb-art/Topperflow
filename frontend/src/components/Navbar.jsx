'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Home' },
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/profile', label: 'Profile' },
  { href: '/login', label: 'Login' },
  { href: '/signup', label: 'Signup' }
];

export function Navbar() {
  const pathname = usePathname();
  return (
    <header className="border-b bg-white">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-xl font-bold text-indigo-600">TopperFlow</Link>
        <div className="flex flex-wrap gap-3 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className={pathname === link.href ? 'font-semibold text-indigo-600' : 'text-slate-600'}>
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
