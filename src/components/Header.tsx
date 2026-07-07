import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, Phone, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Header({ onScrollToSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About Us' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'contact', label: 'Contact Us' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Simple scroll spy logic
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    onScrollToSection(sectionId);
  };

  return (
    <header
      id="app-header"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-md shadow-md border-b border-slate-100 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            id="header-logo-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:bg-brand-600 transition-colors">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <span className={`font-display font-extrabold text-lg leading-tight block ${isScrolled ? 'text-slate-800' : 'text-slate-800'}`}>
                Skylight
              </span>
              <span className="font-sans text-[10px] font-bold tracking-wider text-brand-600 uppercase block -mt-1">
                Laundry & Clean
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.id}
                id={`nav-link-${item.id}`}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`font-sans font-medium text-sm transition-colors relative py-1 hover:text-brand-600 cursor-pointer ${
                  activeSection === item.id
                    ? 'text-brand-600'
                    : 'text-slate-600'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
                )}
              </a>
            ))}
          </nav>

          {/* Contact & CTA Buttons */}
          <div className="hidden lg:flex items-center gap-4">
            <a
              href="tel:+254748425965"
              id="header-phone"
              className="flex items-center gap-2 text-slate-700 hover:text-brand-600 transition-colors text-sm font-medium"
            >
              <div className="p-1.5 bg-brand-50 text-brand-600 rounded-lg">
                <Phone className="w-4 h-4" />
              </div>
              <span>+254 748 425965</span>
            </a>
            <button
              id="header-book-btn"
              onClick={() => handleNavClick('pricing')}
              className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-sm font-semibold rounded-xl transition-all shadow-md hover:shadow-brand-600/10 cursor-pointer"
            >
              Get a Quote
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-slate-700 hover:bg-slate-50 rounded-xl transition-colors cursor-pointer"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      <div
        id="mobile-nav-drawer"
        className={`lg:hidden fixed inset-x-0 top-[65px] bg-white border-b border-slate-100 shadow-xl transition-all duration-300 ease-in-out ${
          isMobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="px-4 py-6 space-y-4 bg-white">
          <div className="grid grid-cols-2 gap-3">
            {navItems.map((item) => (
              <a
                key={item.id}
                id={`mobile-nav-link-${item.id}`}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`flex items-center justify-center py-3 px-4 rounded-xl text-center text-sm font-semibold transition-all cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-brand-50 text-brand-700 border border-brand-100'
                    : 'bg-slate-50 text-slate-700 border border-slate-100 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4 flex flex-col gap-3">
            <a
              href="tel:+254748425965"
              id="mobile-phone-cta"
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-100 text-slate-700 text-sm font-semibold transition-all"
            >
              <Phone className="w-4 h-4 text-brand-600" />
              Call us: +254 748 425965
            </a>
            <button
              id="mobile-book-cta"
              onClick={() => handleNavClick('pricing')}
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold rounded-xl text-center shadow-lg transition-all cursor-pointer"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
