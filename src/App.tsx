import React, { useState, useRef } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import QuoteCalculator from './components/QuoteCalculator';
import ServiceDetailsModal from './components/ServiceDetailsModal';
import BookingSuccessModal from './components/BookingSuccessModal';
import { SERVICES, PACKAGES, TESTIMONIALS, GALLERY_ITEMS, IMAGES, FAQS } from './data';
import { Service } from './types';
import * as LucideIcons from 'lucide-react';
import {
  Sparkles,
  ShieldCheck,
  ThumbsUp,
  Clock,
  Check,
  Star,
  Phone,
  Mail,
  MapPin,
  Calendar,
  MessageSquare,
  ArrowRight,
  Info,
  Layers,
  Award,
  ChevronRight,
  Calculator,
  ChevronDown,
  ArrowUp,
  X,
  Zap,
  DollarSign,
  Briefcase,
  Smile,
  CheckCircle,
  Eye
} from 'lucide-react';

export default function App() {
  // Navigation scrolling
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // State managers
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'laundry' | 'cleaning'>('all');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  
  // New States
  const [activeFaqId, setActiveFaqId] = useState<string | null>(null);
  const [activeLightboxImage, setActiveLightboxImage] = useState<string | null>(null);
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);

  React.useEffect(() => {
    const handleScrollVisibility = () => {
      if (window.scrollY > 300) {
        setIsBackToTopVisible(true);
      } else {
        setIsBackToTopVisible(false);
      }
    };
    window.addEventListener('scroll', handleScrollVisibility);
    return () => window.removeEventListener('scroll', handleScrollVisibility);
  }, []);

  // Booking Form State
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: 'laundry',
    preferredDate: '',
    message: ''
  });
  const [selectedItemsQty, setSelectedItemsQty] = useState<{ [key: string]: number }>({});
  const [estimatedPrice, setEstimatedPrice] = useState<number>(0);
  
  // Success state
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [successBookingData, setSuccessBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    serviceType: '',
    preferredDate: '',
    message: ''
  });

  // Gallery view state
  const [galleryFilter, setGalleryFilter] = useState<'all' | 'laundry' | 'cleaning' | 'before-after'>('all');

  // Load quote estimates into the booking form
  const handleApplyQuoteToBooking = (serviceId: string, quantities: { [key: string]: number }, totalCost: number) => {
    const serviceObj = SERVICES.find(s => s.id === serviceId);
    setBookingForm(prev => ({
      ...prev,
      serviceType: serviceId,
      message: `Quote Estimate: KSh ${totalCost.toLocaleString()} based on ${quantities[serviceId] || 0} ${serviceObj?.unit || 'units'} of ${serviceObj?.name || 'service'}.`
    }));
    setSelectedItemsQty(quantities);
    setEstimatedPrice(totalCost);

    // Scroll down to the booking form
    scrollToSection('contact');

    // Trigger a temporary visual toast or notify
    alert(`Estimate applied! Selected service is now ${serviceObj?.name} and a cost estimate of KSh ${totalCost.toLocaleString()} has been pre-loaded into your booking request.`);
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple verification
    if (!bookingForm.name || !bookingForm.email || !bookingForm.phone) {
      alert('Please fill out your Name, Email, and Phone number to request a booking.');
      return;
    }

    // Capture success data
    setSuccessBookingData({ ...bookingForm });
    setIsSuccessModalOpen(true);

    // Reset form after submit
    setBookingForm({
      name: '',
      email: '',
      phone: '',
      serviceType: 'laundry',
      preferredDate: '',
      message: ''
    });
    setEstimatedPrice(0);
    setSelectedItemsQty({});
  };

  const filteredServices = SERVICES.filter(s => {
    if (selectedCategory === 'all') return true;
    if (selectedCategory === 'laundry') return s.category === 'laundry' || s.category === 'dry-cleaning';
    return s.category === 'cleaning';
  });

  const filteredGallery = GALLERY_ITEMS.filter(item => {
    if (galleryFilter === 'all') return true;
    return item.category === galleryFilter;
  });

  return (
    <div className="font-sans text-slate-600 bg-white min-h-screen selection:bg-brand-500 selection:text-white scroll-smooth flex flex-col">
      {/* Sticky Top Header */}
      <Header onScrollToSection={scrollToSection} />

      {/* Main Container */}
      <main className="grow">
        
        {/* HERO SECTION */}
        <section id="home" className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden">
          {/* Background image overlay */}
          <div className="absolute inset-0 z-0">
            <img
              src={IMAGES.hero}
              alt="Skylight Laundry facility"
              className="w-full h-full object-cover object-center filter brightness-[0.25] scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Soft geometric sky gradients */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-900/60 via-slate-900/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Hero Content */}
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
                {/* Promo Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-400/20 text-brand-300 text-xs font-semibold tracking-wide uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-brand-400 animate-spin" />
                  Premium Laundry & Home Sanitation
                </div>

                <div className="space-y-4">
                  <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] text-balance">
                    Fresh, Clean & <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-300 via-brand-100 to-white">
                      Sparkling Every Time
                    </span>
                  </h1>
                  <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed text-balance">
                    Experience elite-level laundry and professional cleaning tailored to your active life. Trusted, eco-friendly, and delivered with immaculate precision.
                  </p>
                </div>

                {/* Features inline */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0 pt-2 text-left">
                  {[
                    'Free Pickup & Delivery',
                    'Eco-Friendly Solvents',
                    '24h Fast Turnaround'
                  ].map((feat, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center border border-brand-500/30">
                        <Check className="w-3 h-3 text-brand-300" />
                      </div>
                      <span className="text-xs text-slate-300 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <button
                    id="hero-book-now-btn"
                    onClick={() => scrollToSection('pricing')}
                    className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-bold rounded-2xl shadow-xl shadow-brand-500/25 hover:shadow-brand-500/40 transform hover:-translate-y-0.5 transition-all text-center cursor-pointer"
                  >
                    Calculate Your Quote
                  </button>
                  <button
                    id="hero-learn-more-btn"
                    onClick={() => scrollToSection('about')}
                    className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-semibold rounded-2xl backdrop-blur-md transition-all text-center cursor-pointer"
                  >
                    Learn About Us
                  </button>
                </div>
              </div>

              {/* Quick Hero Floating Card */}
              <div className="lg:col-span-5 hidden lg:block">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl p-6 shadow-2xl border border-white/20 space-y-6 relative overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-brand-100 rounded-full filter blur-3xl -z-10" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-bold text-brand-600 uppercase tracking-widest">Active Stats</span>
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                  </div>

                  <h3 className="font-display font-extrabold text-xl text-slate-800">Why Customers Trust Skylight</h3>
                  
                  <div className="space-y-4">
                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">100% Satisfaction Guarantee</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Not perfectly clean? We will reclean it completely free of charge.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl">
                        <ThumbsUp className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">Highly Verified & Insured</h4>
                        <p className="text-slate-500 text-xs mt-0.5">Every technician and courier is fully background checked and insured.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5">
                      <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl">
                        <Clock className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-800 text-sm">On-Time Or It's Free</h4>
                        <p className="text-slate-500 text-xs mt-0.5">We respect your schedule. Prompt pickups and drop-offs, guaranteed.</p>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span>★ 4.9 out of 5 Rating</span>
                    <span>1,500+ Happy Homes</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* ABOUT US SECTION */}
        <section id="about" className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              
              {/* Column 1: Image representation */}
              <div className="lg:col-span-5 relative">
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
                  <img
                    src={IMAGES.laundryTowels}
                    alt="Pristine laundry stack"
                    className="w-full h-[450px] object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
                  
                  {/* Floating badge inside image */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md rounded-2xl p-4 shadow-lg border border-slate-100 flex items-center gap-3">
                    <div className="w-12 h-12 bg-brand-500 rounded-xl flex items-center justify-center text-white font-display font-extrabold text-lg shadow-md shrink-0">
                      10+
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-slate-800 text-sm">Years of Pure Quality</h4>
                      <p className="text-xs text-slate-500">Serving residential and commercial laundry needs.</p>
                    </div>
                  </div>
                </div>

                {/* Decorative background shape */}
                <div className="absolute -top-6 -left-6 w-32 h-32 bg-brand-100 rounded-full -z-10 filter blur-xl" />
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-brand-50 rounded-full -z-10 filter blur-2xl" />
              </div>

              {/* Column 2: Content */}
              <div className="lg:col-span-7 space-y-6">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block">About Our Company</span>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 tracking-tight text-balance">
                    Dedicated to Raising the Standards of Pure Freshness
                  </h2>
                </div>

                <p className="text-slate-600 text-base leading-relaxed text-balance">
                  At Skylight Laundry Cleaning Services, we believe that clean linens and spotless spaces are fundamental to comfort and peace of mind. Founded with a vision to deliver premium, reliable cleaning solutions, we have built a reputation of trust, timeliness, and meticulous quality.
                </p>

                <p className="text-slate-600 text-base leading-relaxed text-balance">
                  Whether we are restoring a stained woolen dress, handling bulk commercial washing, or polishing a residential kitchen, we apply the same unyielding standard of excellence. We use energy-efficient appliances, non-toxic eco-friendly solvents, and pristine purified water systems to protect both your health and the environment.
                </p>

                {/* Values Checklist Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">Hypoallergenic & Odorless</h4>
                      <p className="text-xs text-slate-500">Perfect for sensitive skin and children's linens.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">Certified Specialists</h4>
                      <p className="text-xs text-slate-500">Highly trained experts in fabric and surface care.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">Flexible Booking Schedules</h4>
                      <p className="text-xs text-slate-500">Schedule pickups and visits whenever fits you.</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <div className="w-5 h-5 bg-brand-50 text-brand-600 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">100% Carbon-Conscious</h4>
                      <p className="text-xs text-slate-500">Eco-friendly detergents and bio-degradable hangers.</p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
                  <button
                    id="about-cta-btn"
                    onClick={() => scrollToSection('services')}
                    className="w-full sm:w-auto px-6 py-3.5 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white text-sm font-bold rounded-xl shadow-lg hover:shadow-brand-600/10 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    Explore Our Services
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 bg-brand-50 text-brand-600 rounded-full">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 block">Immediate Questions?</span>
                      <a href="tel:+254748425965" className="text-slate-800 font-bold hover:text-brand-600 transition-colors">
                        +254 748 425965
                      </a>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>


        {/* WHY CHOOSE US SECTION */}
        <section id="why-choose-us" className="py-24 bg-slate-50 relative border-t border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block">The Skylight Promise</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 tracking-tight">
                Why Nairobi Prefers Our Services
              </h2>
              <p className="text-slate-500 text-sm sm:text-base text-balance">
                We combine industry-leading fabric care technology, certified sanitization experts, and unmatched service terms to deliver a pristine experience.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  id: "staff",
                  icon: ShieldCheck,
                  title: "Professional Staff",
                  desc: "Background-checked, fully insured, and highly trained specialists in fabric care and premium property hygiene.",
                  color: "bg-blue-50 text-blue-600"
                },
                {
                  id: "prices",
                  icon: DollarSign,
                  title: "Affordable Prices",
                  desc: "Clear, competitive, and transparent rate cards customized to your budget with absolutely zero hidden fees.",
                  color: "bg-emerald-50 text-emerald-600"
                },
                {
                  id: "same-day",
                  icon: Zap,
                  title: "Same Day Service",
                  desc: "Need immediate results? We offer express premium dry cleaning and emergency property sanitization sessions.",
                  color: "bg-amber-50 text-amber-600"
                },
                {
                  id: "eco",
                  icon: Sparkles,
                  title: "Eco-Friendly Products",
                  desc: "We prioritize your health by utilizing bio-degradable, non-toxic, and allergen-free premium cleaning solutions.",
                  color: "bg-teal-50 text-teal-600"
                },
                {
                  id: "avail",
                  icon: Clock,
                  title: "24/7 Availability",
                  desc: "Cleanliness never sleeps. Our field teams and dispatch drivers are on call around the clock, 365 days a year.",
                  color: "bg-indigo-50 text-indigo-600"
                },
                {
                  id: "guarantee",
                  icon: ThumbsUp,
                  title: "Satisfaction Guaranteed",
                  desc: "Our gold standard. If you are not completely thrilled, we'll re-clean the area or garment entirely free of charge.",
                  color: "bg-rose-50 text-rose-600"
                },
                {
                  id: "response",
                  icon: MessageSquare,
                  title: "Fast Response",
                  desc: "Your time is valuable. Our dedicated scheduling team responds to messages, bookings, and calls within 15 minutes.",
                  color: "bg-purple-50 text-purple-600"
                },
                {
                  id: "trusted",
                  icon: Star,
                  title: "Trusted by Customers",
                  desc: "Proudly serving 15,000+ households, offices, and elite apartments in Westlands, Kilimani, and across Nairobi.",
                  color: "bg-orange-50 text-orange-600"
                }
              ].map((item) => {
                const IconComp = item.icon;
                return (
                  <div
                    key={item.id}
                    className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:border-slate-200 transition-all duration-300"
                  >
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${item.color}`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h3 className="font-display font-semibold text-slate-800 text-base mb-2">{item.title}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* HOW IT WORKS SECTION */}
        <section id="how-it-works" className="py-24 bg-white relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block">Seamless Experience</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 tracking-tight">
                Our 4-Step Cleaning Process
              </h2>
              <p className="text-slate-500 text-sm sm:text-base text-balance">
                We have streamlined our scheduling and execution to fit effortlessly around your lifestyle or commercial activities.
              </p>
            </div>

            <div className="relative">
              {/* Connector line for desktop */}
              <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-slate-100 -translate-y-12 -z-10" />

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    step: "01",
                    icon: MessageSquare,
                    title: "1. Contact Us",
                    desc: "Call or WhatsApp +254 748 425965, or drop a quick query on our booking scheduler form below.",
                    color: "border-blue-100 text-blue-600"
                  },
                  {
                    step: "02",
                    icon: Calculator,
                    title: "2. Get a Free Quote",
                    desc: "Input your requirements in our instant pricing estimator to receive an immediate tailored quote.",
                    color: "border-emerald-100 text-emerald-600"
                  },
                  {
                    step: "03",
                    icon: Calendar,
                    title: "3. Schedule Cleaning",
                    desc: "Arrange a pickup time for your laundry garments or reserve a slot for our deep property cleaning teams.",
                    color: "border-amber-100 text-amber-600"
                  },
                  {
                    step: "04",
                    icon: Sparkles,
                    title: "4. Enjoy a Spotless Home",
                    desc: "Relax and enjoy your immaculate, freshly fragranced garments and pristine living or working spaces.",
                    color: "border-teal-100 text-teal-600"
                  }
                ].map((item, i) => {
                  const IconComp = item.icon;
                  return (
                    <div key={i} className="flex flex-col items-center text-center group">
                      <div className="relative mb-6">
                        <div className="w-16 h-16 rounded-2xl bg-white border-2 border-slate-150 flex items-center justify-center group-hover:border-brand-500 group-hover:shadow-lg transition-all duration-300 relative z-10">
                          <IconComp className="w-6 h-6 text-slate-700 group-hover:text-brand-600 transition-colors" />
                        </div>
                        <span className="absolute -top-3 -right-3 text-2xl font-display font-black text-slate-100 group-hover:text-brand-100 select-none transition-colors z-0">
                          {item.step}
                        </span>
                      </div>
                      <h3 className="font-display font-semibold text-slate-800 text-lg mb-2">{item.title}</h3>
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed max-w-xs">{item.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>


        {/* OUR SERVICES SECTION */}
        <section id="services" className="py-24 bg-slate-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Header titles */}
            <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block">Our Core Capabilities</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 tracking-tight">
                Flawless Cleaning and Fabric Solutions
              </h2>
              <p className="text-slate-500 text-base text-balance">
                We handle delicate laundering, specialized dry cleaning, and heavy-duty home disinfection with the utmost care and professional grade technology.
              </p>

              {/* Quick Filter tabs */}
              <div className="flex items-center justify-center gap-2 pt-4">
                {[
                  { id: 'all', label: 'All Services' },
                  { id: 'laundry', label: 'Laundry & Dry Cleaning' },
                  { id: 'cleaning', label: 'Home & Office Cleaning' }
                ].map(tab => (
                  <button
                    key={tab.id}
                    id={`service-tab-${tab.id}`}
                    onClick={() => setSelectedCategory(tab.id as any)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      selectedCategory === tab.id
                        ? 'bg-brand-600 text-white shadow-md'
                        : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredServices.map(service => {
                // Dynamically select image matching category
                let cardImage = IMAGES.laundryTowels;
                const id = service.id.toLowerCase();
                if (id.includes('laundry') || id.includes('ironing')) {
                  cardImage = IMAGES.laundryWashingMachine;
                } else if (id.includes('dry-cleaning')) {
                  cardImage = IMAGES.dryCleaningSuits;
                } else if (id.includes('office') || id.includes('construction') || id.includes('kitchen') || id.includes('bathroom')) {
                  cardImage = IMAGES.kitchenMaroon;
                } else if (id.includes('house') || id.includes('home') || id.includes('apartment') || id.includes('airbnb') || id.includes('deep') || id.includes('move') || id.includes('window')) {
                  cardImage = IMAGES.homeCleaningLivingRoom;
                } else if (id.includes('carpet') || id.includes('sofa') || id.includes('mattress') || id.includes('couch') || id.includes('seat')) {
                  cardImage = IMAGES.couchClean;
                }

                // Dynamically resolve Lucide Icon
                const IconComponent = (LucideIcons as any)[service.icon] || Info;

                return (
                  <div
                    key={service.id}
                    id={`service-card-${service.id}`}
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                  >
                    {/* Image Header with Badge */}
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={cardImage}
                        alt={service.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md flex items-center gap-1">
                        <IconComponent className="w-3 h-3 text-brand-600" />
                        {service.category.replace('-', ' ')}
                      </div>
                      <div className="absolute bottom-4 left-4 text-white">
                        <h3 className="font-display font-bold text-lg leading-tight">{service.name}</h3>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div className="space-y-4">
                        <p className="text-slate-500 text-sm leading-relaxed">
                          {service.description}
                        </p>
                        
                        <div className="flex items-baseline gap-1">
                          <span className="text-sm font-semibold text-slate-400">Rates from</span>
                          <span className="text-xl font-bold text-slate-800">KSh {service.basePrice.toLocaleString()}</span>
                          <span className="text-slate-500 text-xs font-medium">/ {service.unit}</span>
                        </div>

                        <ul className="space-y-1 text-xs text-slate-500">
                          {service.features.slice(0, 2).map((feat, idx) => (
                            <li key={idx} className="flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* CTA inside card */}
                      <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                        <button
                          id={`service-learn-${service.id}`}
                          onClick={() => setSelectedService(service)}
                          className="text-xs font-semibold text-slate-500 hover:text-brand-600 flex items-center gap-1 cursor-pointer"
                        >
                          Learn Details
                          <ChevronRight className="w-3 h-3" />
                        </button>
                        <button
                          id={`service-book-${service.id}`}
                          onClick={() => {
                            setBookingForm(prev => ({ ...prev, serviceType: service.id }));
                            scrollToSection('contact');
                          }}
                          className="px-4 py-2 bg-brand-50 hover:bg-brand-100 text-brand-700 text-xs font-bold rounded-xl transition-all cursor-pointer"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>
        </section>


        {/* INTERACTIVE BEFORE-AFTER & GALLERY SECTION */}
        <section id="gallery" className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Titles */}
            <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block">Visual Proof of Quality</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 tracking-tight">
                Our Stunning Results in Action
              </h2>
              <p className="text-slate-500 text-base text-balance">
                Drag the interactive sliders on our before & after cards to inspect the immaculate results our deep sanitization process achieves.
              </p>

              {/* Gallery category filter buttons */}
              <div className="flex items-center justify-center gap-2 pt-4">
                {[
                  { id: 'all', label: 'All Photos' },
                  { id: 'laundry', label: 'Laundry & Dry Clean' },
                  { id: 'cleaning', label: 'Sanitation & Cleaning' },
                  { id: 'before-after', label: 'Before & After Sliders' }
                ].map(f => (
                  <button
                    key={f.id}
                    id={`gallery-filter-${f.id}`}
                    onClick={() => setGalleryFilter(f.id as any)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      galleryFilter === f.id
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-600'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Gallery Slider Grid / Gallery grid */}
            {galleryFilter === 'before-after' ? (
              // Explicitly show only before-after interactive sliders
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <BeforeAfterSlider
                  beforeImage={IMAGES.couchDirty}
                  afterImage={IMAGES.couchClean}
                  title="Sofa Steam Restoration"
                />
                <BeforeAfterSlider
                  beforeImage={IMAGES.seatDirty}
                  afterImage={IMAGES.seatClean}
                  title="Car Seat Stain Extraction"
                />
              </div>
            ) : (
              // Responsive grid combining standard layout and sliders
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredGallery.map((item) => {
                  if (item.category === 'before-after' && item.beforeImage && item.afterImage) {
                    return (
                      <div key={item.id} className="sm:col-span-2 lg:col-span-2">
                        <BeforeAfterSlider
                          beforeImage={item.beforeImage}
                          afterImage={item.afterImage}
                          title={item.title}
                        />
                      </div>
                    );
                  }

                  return (
                    <div
                      key={item.id}
                      id={`gallery-photo-${item.id}`}
                      onClick={() => setActiveLightboxImage(item.image)}
                      className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-md group relative h-72 sm:h-80 cursor-pointer"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white/90 text-brand-600 flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                          <Eye className="w-5 h-5" />
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/75 via-slate-900/10 to-transparent pointer-events-none" />
                      
                      <div className="absolute bottom-4 left-4 right-4 text-white pointer-events-none">
                        <span className="text-[10px] font-bold tracking-widest text-brand-300 uppercase block mb-1">
                          {item.category.toUpperCase()}
                        </span>
                        <h4 className="font-display font-bold text-lg">{item.title}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        </section>


        {/* PRICING & QUOTE CALCULATOR SECTION */}
        <section id="pricing" className="py-24 bg-slate-50 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Headers */}
            <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block">Transparent Estimates</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 tracking-tight">
                Honest Rates, No Hidden Surcharges
              </h2>
              <p className="text-slate-500 text-base text-balance">
                Choose a pre-defined flat rate package or use our interactive real-time calculator to build an instant custom estimate for your unique needs.
              </p>
            </div>

            {/* Flat-Rate Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
              {PACKAGES.map((pkg) => (
                <div
                  key={pkg.id}
                  id={`pkg-card-${pkg.id}`}
                  className={`bg-white rounded-3xl p-6 border transition-all duration-300 relative flex flex-col justify-between ${
                    pkg.popular
                      ? 'border-brand-500 shadow-xl scale-102 ring-4 ring-brand-100'
                      : 'border-slate-200 shadow-md hover:border-slate-300'
                  }`}
                >
                  {pkg.popular && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-600 text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      Most Popular Plan
                    </span>
                  )}

                  <div className="space-y-6">
                    <div>
                      <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{pkg.category.replace('-', ' ')}</span>
                      <h3 className="font-display font-bold text-xl text-slate-800 mt-1">{pkg.name}</h3>
                      <p className="text-xs text-slate-500 mt-2 min-h-12">{pkg.description}</p>
                    </div>

                    <div className="pb-4 border-b border-slate-100">
                      <span className="font-display font-extrabold text-4xl text-slate-800">{pkg.price}</span>
                      <span className="text-slate-500 text-xs font-medium">/ {pkg.unit}</span>
                    </div>

                    <ul className="space-y-3">
                      {pkg.features.map((feat, index) => (
                        <li key={index} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <button
                    id={`select-pkg-${pkg.id}`}
                    onClick={() => {
                      setBookingForm(prev => ({
                        ...prev,
                        serviceType: pkg.category === 'laundry' ? 'laundry' : 'home-cleaning',
                        message: `Interested in purchasing the flat-rate package: "${pkg.name}" priced at ${pkg.price} per ${pkg.unit}.`
                      }));
                      scrollToSection('contact');
                    }}
                    className={`w-full py-3 rounded-xl font-bold mt-8 text-xs transition-colors cursor-pointer text-center ${
                      pkg.popular
                        ? 'bg-brand-600 hover:bg-brand-700 text-white'
                        : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    Select This Plan
                  </button>
                </div>
              ))}
            </div>

            {/* Live Interactive Quote Calculator Card */}
            <div className="max-w-4xl mx-auto">
              <QuoteCalculator onApplyBooking={handleApplyQuoteToBooking} />
            </div>

          </div>
        </section>


        {/* CUSTOMER TESTIMONIALS */}
        <section className="py-24 bg-white relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            
            {/* Headers */}
            <div className="text-center space-y-4 max-w-2xl mx-auto mb-16">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block">Reviews & Feedback</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 tracking-tight">
                What Our Happy Clients Say
              </h2>
              <p className="text-slate-500 text-base text-balance">
                Our business is built on transparency, quality, and complete client satisfaction. Read reviews from local homeowners and corporate partners.
              </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {TESTIMONIALS.map((t) => (
                <div
                  key={t.id}
                  id={`testimonial-card-${t.id}`}
                  className="bg-white border border-slate-100 rounded-3xl p-6 md:p-8 shadow-xl flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Stars */}
                    <div className="flex gap-0.5 text-amber-400">
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    {/* Text */}
                    <p className="text-slate-600 text-sm italic leading-relaxed">
                      "{t.text}"
                    </p>
                  </div>

                  {/* Profile info */}
                  <div className="flex items-center gap-3.5 pt-6 mt-6 border-t border-slate-50">
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-11 h-11 rounded-full object-cover border border-slate-200"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">{t.name}</h4>
                      <p className="text-slate-400 text-xs">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Quick stats banner below testimonials */}
            <div className="mt-16 bg-brand-900 rounded-3xl p-8 md:p-10 text-white text-center md:text-left flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-800 rounded-full filter blur-3xl -z-10" />
              
              <div className="space-y-2">
                <span className="text-brand-300 text-xs font-bold uppercase tracking-widest">Get The Clean Advantage</span>
                <h3 className="font-display font-bold text-2xl md:text-3xl">Ready for Pure, Unmatched Freshness?</h3>
                <p className="text-brand-100 text-sm md:text-base">Experience cleaning done right. Call us, WhatsApp us, or complete an instant estimate form.</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                <a
                  href="https://wa.me/254748425965?text=Hi,%20I'm%20interested%20in%20booking%20a%20cleaning/laundry%20service."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3.5 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/10 text-sm"
                >
                  <Phone className="w-4 h-4" />
                  Chat via WhatsApp
                </a>
                <button
                  id="stats-book-btn"
                  onClick={() => scrollToSection('contact')}
                  className="py-3.5 px-6 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-xl text-center shadow-lg transition-colors text-sm cursor-pointer"
                >
                  Schedule A Pickup
                </button>
              </div>
            </div>

          </div>
        </section>


        {/* FAQ ACCORDION SECTION */}
        <section id="faqs" className="py-24 bg-white relative border-t border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-16">
              <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block font-sans">Frequently Asked Questions</span>
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 tracking-tight">
                Clear Answers to Common Questions
              </h2>
              <p className="text-slate-500 text-sm sm:text-base">
                Have questions about our professional techniques, detergents, scheduling flexibility, or locations? Find all answers below.
              </p>
            </div>

            <div className="space-y-4">
              {FAQS.map((faq) => {
                const isOpen = activeFaqId === faq.id;
                return (
                  <div
                    key={faq.id}
                    id={`faq-item-${faq.id}`}
                    className="border border-slate-200/80 rounded-2xl bg-white overflow-hidden transition-all duration-300"
                  >
                    <button
                      type="button"
                      id={`faq-btn-${faq.id}`}
                      onClick={() => setActiveFaqId(isOpen ? null : faq.id)}
                      className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-800 hover:text-brand-600 hover:bg-slate-50/50 transition-colors cursor-pointer"
                    >
                      <span className="text-sm sm:text-base font-display">{faq.question}</span>
                      <div className={`p-1 bg-slate-100 text-slate-500 rounded-lg shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-brand-50 text-brand-600' : ''}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>
                    
                    <div
                      className={`transition-all duration-300 ease-in-out ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                      }`}
                    >
                      <div className="p-5 pt-0 text-slate-500 text-xs sm:text-sm leading-relaxed border-t border-slate-100 bg-slate-50/20">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-12 text-center p-6 bg-brand-50 rounded-2xl border border-brand-100">
              <p className="text-slate-700 text-sm font-medium">Still have an unanswered question?</p>
              <p className="text-slate-500 text-xs mt-1">Our customer helpline is active 24 Hours. Give us a call or chat with us on WhatsApp anytime.</p>
              <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="tel:+254748425965"
                  className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  Call +254 748 425965
                </a>
                <a
                  href="https://wa.me/254748425965?text=Hi,%20I%20have%20a%20question%20about%20your%20cleaning%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-xs rounded-xl shadow-sm transition-colors"
                >
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </section>


        {/* BOOK NOW & CONTACT SECTION */}
        <section id="contact" className="py-24 bg-slate-50 relative border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Column 1: Contact details & Working Hours */}
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-bold text-brand-600 uppercase tracking-widest block">Get In Touch</span>
                  <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-800 tracking-tight">
                    We Are Ready to Serve You
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed text-balance">
                    Whether you have questions about dry cleaning delicate wools or need to arrange customized office sanitation routines, our helpful coordination specialists are ready to respond.
                  </p>
                </div>

                {/* Contact items list */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-slate-100">
                    <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">Headquarters Address</h4>
                      <p className="text-slate-500 text-xs mt-1">Sky Plaza, Woodvale Grove, Westlands, Nairobi, Kenya</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-slate-100">
                    <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">Customer Helpline</h4>
                      <a href="tel:+254748425965" className="text-slate-600 text-xs hover:text-brand-600 font-bold block mt-1">
                        +254 748 425965
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 bg-white p-4 rounded-2xl border border-slate-100">
                    <div className="p-2.5 bg-brand-50 text-brand-600 rounded-xl shrink-0">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-800 text-sm">Support Email</h4>
                      <a href="mailto:info@skylightcleaning.co.ke" className="text-slate-600 text-xs hover:text-brand-600 font-bold block mt-1">
                        info@skylightcleaning.co.ke
                      </a>
                    </div>
                  </div>
                </div>

                {/* Embedded Map Representation */}
                <div className="bg-white rounded-3xl p-4 border border-slate-100 shadow-md">
                  <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase block mb-3">Service Location coverage</span>
                  
                  {/* Google Maps Embed */}
                  <div className="w-full h-56 rounded-2xl overflow-hidden border border-slate-150 shadow-inner">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.275066929944!2d36.80122244243572!3d-1.2625828945686008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f173c9f225e37%3A0x63351336173b22e1!2sWestlands%2C%20Nairobi!5e0!3m2!1sen!2ske!4v1710000000000!5m2!1sen!2ske"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen={true}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Skylight Cleaning Services location"
                    ></iframe>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="inline-block bg-brand-50 text-brand-700 text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
                      ★ Serving All of Nairobi & Surrounding Counties
                    </span>
                  </div>
                </div>
              </div>

              {/* Column 2: Booking Form */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-xl">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-brand-50 text-brand-600 rounded-lg">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <span className="font-display font-semibold text-brand-600 text-xs tracking-wider uppercase">Online Scheduler</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-slate-800 mb-2">Book Your Cleaning Session</h3>
                <p className="text-slate-500 text-sm mb-6">Complete our secure form and our scheduling manager will contact you within 1 hour to finalize.</p>

                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        placeholder="(123) 456-7890"
                        value={bookingForm.phone}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, phone: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={bookingForm.email}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Preferred Date</label>
                      <input
                        type="date"
                        value={bookingForm.preferredDate}
                        onChange={(e) => setBookingForm(prev => ({ ...prev, preferredDate: e.target.value }))}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Select Service Category</label>
                    <select
                      value={bookingForm.serviceType}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, serviceType: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all cursor-pointer"
                    >
                      {SERVICES.map(s => (
                        <option key={s.id} value={s.id}>{s.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 mb-1">Your Message or Instructions</label>
                    <textarea
                      rows={4}
                      placeholder="Specify laundry weight, fabric type, or instructions. If you used the price calculator above, details will be listed here automatically."
                      value={bookingForm.message}
                      onChange={(e) => setBookingForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-700 text-sm focus:bg-white focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all resize-none"
                    />
                  </div>

                  {estimatedPrice > 0 && (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex justify-between items-center text-emerald-800 text-sm font-semibold">
                      <span>Loaded Estimate Total:</span>
                      <span className="text-xl font-bold font-display">KSh {estimatedPrice.toLocaleString()}</span>
                    </div>
                  )}

                  <button
                    id="booking-submit-btn"
                    type="submit"
                    className="w-full py-4 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-brand-600/15 transform hover:-translate-y-0.5 transition-all text-sm cursor-pointer"
                  >
                    Submit Booking Request
                  </button>
                </form>
              </div>

            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <Footer onScrollToSection={scrollToSection} />

      {/* FLOATING ACTION UTILITIES (WhatsApp, Call, Back to Top) */}
      <div className="fixed bottom-6 right-6 z-30 flex flex-col gap-3.5">
        
        {/* Back to Top */}
        {isBackToTopVisible && (
          <button
            type="button"
            id="back-to-top"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-12 h-12 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer"
            aria-label="Back to top"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        {/* Floating Call Now Button */}
        <a
          href="tel:+254748425965"
          id="phone-floating-bubble"
          className="w-12 h-12 bg-brand-600 hover:bg-brand-700 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all"
          aria-label="Call Customer helpline"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Floating WhatsApp Chat */}
        <a
          href="https://wa.me/254748425965?text=Hello%20Skylight%20Laundry%20Cleaning%20Services,%20I'd%20like%20to%20get%20a%20quote!"
          target="_blank"
          rel="noopener noreferrer"
          id="whatsapp-floating-bubble"
          className="w-12 h-12 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all group relative"
          aria-label="Contact us on WhatsApp"
        >
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-20 group-hover:opacity-30"></span>
          <MessageSquare className="w-5 h-5 relative z-10 shrink-0" />
        </a>

      </div>

      {/* IMAGE LIGHTBOX OVERLAY */}
      {activeLightboxImage && (
        <div
          id="gallery-lightbox"
          className="fixed inset-0 bg-slate-900/95 z-50 flex items-center justify-center p-4 transition-all duration-300 animate-fade-in"
          onClick={() => setActiveLightboxImage(null)}
        >
          <button
            type="button"
            id="close-lightbox"
            onClick={() => setActiveLightboxImage(null)}
            className="absolute top-6 right-6 text-white hover:text-brand-300 p-2.5 bg-slate-800/50 hover:bg-slate-800/80 rounded-xl transition-all cursor-pointer"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
          <div className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl relative" onClick={(e) => e.stopPropagation()}>
            <img
              src={activeLightboxImage}
              alt="High resolution view"
              className="w-full h-auto max-h-[80vh] object-contain rounded-2xl shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      )}

      {/* SERVICE DETAILS MODAL */}
      <ServiceDetailsModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onBook={(serviceId) => {
          setBookingForm(prev => ({ ...prev, serviceType: serviceId }));
          scrollToSection('contact');
        }}
      />

      {/* BOOKING SUCCESS MODAL */}
      <BookingSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        bookingData={successBookingData}
        estimatedPrice={estimatedPrice}
      />

    </div>
  );
}
