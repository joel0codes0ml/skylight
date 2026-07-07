import React from 'react';
import { Sparkles, Phone, Mail, MapPin, Clock, Facebook, Instagram, MessageSquare, Video } from 'lucide-react';

interface FooterProps {
  onScrollToSection: (sectionId: string) => void;
}

export default function Footer({ onScrollToSection }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (sectionId: string) => {
    onScrollToSection(sectionId);
  };

  return (
    <footer id="app-footer" className="bg-slate-900 text-slate-300 border-t border-slate-800">
      {/* Top Footer Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1: Brand details */}
          <div className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-brand-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-brand-500/20">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <span className="font-display font-extrabold text-xl leading-tight block text-white">
                  Skylight
                </span>
                <span className="font-sans text-[10px] font-bold tracking-wider text-brand-400 uppercase block -mt-1">
                  Laundry & Clean
                </span>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium laundry, professional dry cleaning, and meticulous home & office sanitization services. Keeping your fabrics fresh and your living spaces sparkling.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-fb"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 hover:text-white flex items-center justify-center transition-colors text-slate-400"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-ig"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 hover:text-white flex items-center justify-center transition-colors text-slate-400"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://wa.me/254748425965?text=Hello%20Skylight%20Laundry%20Cleaning%20Services!"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-wa"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 hover:text-white flex items-center justify-center transition-colors text-slate-400"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                id="footer-social-tt"
                className="w-9 h-9 rounded-lg bg-slate-800 hover:bg-brand-600 hover:text-white flex items-center justify-center transition-colors text-slate-400"
                aria-label="TikTok"
              >
                <Video className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-base mb-6 tracking-wide">Quick Links</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <a
                  href="#home"
                  onClick={(e) => { e.preventDefault(); handleNavClick('home'); }}
                  className="hover:text-brand-400 transition-colors cursor-pointer"
                >
                  Home Welcome
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}
                  className="hover:text-brand-400 transition-colors cursor-pointer"
                >
                  About Our Company
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  onClick={(e) => { e.preventDefault(); handleNavClick('services'); }}
                  className="hover:text-brand-400 transition-colors cursor-pointer"
                >
                  Our Cleaning Services
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  onClick={(e) => { e.preventDefault(); handleNavClick('gallery'); }}
                  className="hover:text-brand-400 transition-colors cursor-pointer"
                >
                  Before & After Gallery
                </a>
              </li>
              <li>
                <a
                  href="#pricing"
                  onClick={(e) => { e.preventDefault(); handleNavClick('pricing'); }}
                  className="hover:text-brand-400 transition-colors cursor-pointer"
                >
                  Pricing Packages
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-white text-base mb-6 tracking-wide">Contact Details</h4>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <span>
                  Sky Plaza, Woodvale Grove,<br />
                  Westlands, Nairobi, Kenya
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <a href="tel:+254748425965" className="hover:text-white transition-colors">
                  +254 748 425965
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <a href="mailto:info@skylightcleaning.co.ke" className="hover:text-white transition-colors">
                  info@skylightcleaning.co.ke
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Business Hours */}
          <div>
            <h4 className="font-display font-semibold text-white text-base mb-6 tracking-wide">Working Hours</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Business Hours</p>
                  <p className="text-xs text-slate-500 font-bold text-emerald-400">Open 24 Hours</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-brand-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-white font-medium">Seven Days A Week</p>
                  <p className="text-xs text-slate-500">Monday - Sunday</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal Section */}
      <div className="border-t border-slate-800 bg-slate-950 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Skylight Laundry Cleaning Services. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
