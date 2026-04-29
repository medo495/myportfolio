import { useState, useEffect } from 'react';
import { Menu, X, Shield, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { isDark, toggle } = useTheme();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg shadow-black/10'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => handleNav('#hero')}
          className="flex items-center gap-2 group"
        >
          <Shield className="w-6 h-6 text-cyber-500 group-hover:text-cyber-400 transition-colors" />
          <span className="font-mono font-semibold text-gray-900 dark:text-white text-sm">
            <span className="text-cyber-500">&gt;</span> aitelhadj.sec
          </span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-cyber-500 dark:hover:text-cyber-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:text-cyber-500 dark:hover:text-cyber-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 px-4 py-4 flex flex-col gap-3">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => handleNav(link.href)}
              className="text-left text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-cyber-500 dark:hover:text-cyber-400 py-1 transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
