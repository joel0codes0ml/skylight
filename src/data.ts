import { Service, PricingPackage, Testimonial, GalleryItem, FAQItem } from './types';

// Exact generated image paths matching the user's uploads!
export const IMAGES = {
  hero: '/src/assets/images/skylight_laundry_hero_1783433147017.jpg',
  laundryTowels: '/src/assets/images/laundry_services_1783433163764.jpg',
  laundryWashingMachine: '/src/assets/images/laundry_washing_machine_1783436582464.jpg',
  homeCleaningLivingRoom: '/src/assets/images/home_cleaning_1783433177299.jpg',
  kitchenMaroon: '/src/assets/images/kitchen_maroon_1783436598541.jpg',
  dryCleaningSuits: '/src/assets/images/dry_cleaning_ironing_1783433190169.jpg',
  couchDirty: '/src/assets/images/couch_dirty_1783436613210.jpg',
  couchClean: '/src/assets/images/couch_clean_1783436631299.jpg',
  seatDirty: '/src/assets/images/seat_dirty_1783436646939.jpg',
  seatClean: '/src/assets/images/seat_clean_1783436661000.jpg'
};

export const SERVICES: Service[] = [
  {
    id: 'laundry',
    name: 'Laundry Services',
    description: 'Everyday wear professional washing, drying, and folding with high-quality, fabric-safe detergents.',
    longDescription: 'Our standard laundry service separates light and dark clothes, washes them at safe temperatures, tumbles them dry, and carefully folds them. Perfect for your weekly wear in Nairobi.',
    icon: 'Shirt',
    basePrice: 150,
    unit: 'kg',
    category: 'laundry',
    features: [
      'Separation of darks, whites, and delicates',
      'Premium hypoallergenic detergents',
      'Neatly folded and stacked in fresh packaging',
      'Standard 24-hour turnaround'
    ]
  },
  {
    id: 'house-cleaning',
    name: 'House Cleaning',
    description: 'Regular, dependable house cleaning including dusting, mopping, vacuuming, and surface sanitation.',
    longDescription: 'Comprehensive home cleaning designed to keep your Nairobi residence tidy and fresh. Our expert staff covers bedrooms, living rooms, and common pathways, leaving no corner neglected.',
    icon: 'Home',
    basePrice: 3000,
    unit: 'session',
    category: 'cleaning',
    features: [
      'Thorough dusting and wet-mopping',
      'Upholstery vacuuming & trash removal',
      'Clean counters and polished surfaces',
      'Eco-friendly, safe cleaning products'
    ]
  },
  {
    id: 'office-cleaning',
    name: 'Office Cleaning',
    description: 'Professional cleaning for corporate workspaces to maintain a healthy, productive, and germ-free environment.',
    longDescription: 'A clean and sanitized office enhances employee health and leaves a strong impression on clients. We clean desks, meeting rooms, common areas, and restrooms with zero disruption to your daily operations.',
    icon: 'Building',
    basePrice: 5000,
    unit: 'session',
    category: 'cleaning',
    features: [
      'Sanitization of high-touch areas & electronics',
      'Trash sorting and recycling management',
      'Flexible schedules (after hours or weekends)',
      'Trained, professional, and vetted cleaners'
    ]
  },
  {
    id: 'carpet-cleaning',
    name: 'Carpet Cleaning',
    description: 'Deep hot-water extraction and steam cleaning to remove dust, allergens, and stubborn stains from carpets.',
    longDescription: 'Using advanced steam extraction and specialized stain removers, we revive your dirty carpets, restoring pile softness, colors, and completely eliminating odors and embedded dust mites.',
    icon: 'Layers',
    basePrice: 2000,
    unit: 'carpet',
    category: 'cleaning',
    features: [
      'Deep hot-water pressure extraction',
      'Stain spotting and heavy odor elimination',
      'Fast-drying equipment and technology',
      'Safe for wool, nylon, and synthetic fibers'
    ]
  },
  {
    id: 'sofa-cleaning',
    name: 'Sofa & Upholstery Cleaning',
    description: 'Thorough steam and shampoo treatment for fabric and leather sofas to remove grease, dirt, and stains.',
    longDescription: 'Restore the color and texture of your sofas and armchairs. Our deep sanitization process removes food spills, pet hair, dust accumulation, and body oils, giving your upholstery a brand-new look.',
    icon: 'Sparkles',
    basePrice: 1500,
    unit: 'seat',
    category: 'cleaning',
    features: [
      'Gentle fiber-safe foam extraction',
      'Effective stain removal on microfibers',
      'Deodorizing and fabric freshening treatment',
      'Protective sealant application optional'
    ]
  },
  {
    id: 'mattress-cleaning',
    name: 'Mattress Cleaning',
    description: 'Deep vacuuming and UV sanitization to extract dust mites, sweat stains, and allergens for healthy sleep.',
    longDescription: 'Enjoy a hygienic night\'s sleep. We deeply clean your mattresses, targeting dust mites, pet dander, urine/sweat stains, and mold spores using safe extraction and non-toxic sanitizing agents.',
    icon: 'Heart',
    basePrice: 2500,
    unit: 'mattress',
    category: 'cleaning',
    features: [
      'Extraction of deep-seated microscopic dust',
      'Sanitization of sweat, urine, and grease stains',
      'Gentle eco-friendly active-oxygen treatment',
      'Odor-neutralizing fresh scent'
    ]
  },
  {
    id: 'window-cleaning',
    name: 'Window Cleaning',
    description: 'Streak-free professional window cleaning for residential and commercial properties, inside and out.',
    longDescription: 'Crystal clear views for your home or business. We clean window panes, frames, sills, and tracks, removing dust buildup, water spots, and atmospheric grime.',
    icon: 'Monitor',
    basePrice: 1500,
    unit: 'session',
    category: 'cleaning',
    features: [
      'Streak-free squeeze-wash detailing',
      'Sills, tracks, and frames fully cleared of dust',
      'Safe high-reach equipment and tools',
      'Waterproof sealing inspection included'
    ]
  },
  {
    id: 'deep-cleaning',
    name: 'Deep Cleaning',
    description: 'Heavy-duty top-to-bottom clean of your entire premises, scrubbing behind appliances and hard-to-reach areas.',
    longDescription: 'The ultimate detailed clean. This goes far beyond standard cleaning, addressing grease buildup on stovetops, hard water scaling on tiles, dust behind wardrobes, and detailed hand-cleaning of baseboards and light switches.',
    icon: 'Shield',
    basePrice: 6000,
    unit: 'session',
    category: 'cleaning',
    features: [
      'Kitchen grease extraction & oven deep clean',
      'Grout scrubbing & tile scaling removal',
      'Hand-washing baseboards, vents, and switches',
      'Complete sanitization of all surfaces'
    ]
  },
  {
    id: 'move-cleaning',
    name: 'Move In / Move Out Cleaning',
    description: 'A comprehensive sanitization of empty apartments or houses to prepare them perfectly for new occupants.',
    longDescription: 'Whether moving in or vacating, make the transition seamless. We deep-clean every room, including inside drawers, wardrobes, refrigerators, and sanitizing the bathroom and kitchen areas completely.',
    icon: 'Truck',
    basePrice: 7000,
    unit: 'session',
    category: 'cleaning',
    features: [
      'Detailed interior wardrobe and cabinet clean',
      'Spotless sanitization of kitchen appliances',
      'Thorough steam mop for pristine wood/tiles',
      'Landlord inspection-ready guarantee'
    ]
  },
  {
    id: 'apartment-cleaning',
    name: 'Apartment Cleaning',
    description: 'Tailored cleaning routines designed specifically for Nairobi apartments, flats, and duplexes.',
    longDescription: 'Compact or spacious, we customize our routines to fit the apartment layout. From balcony dusting to corridor sanitizing, we ensure your apartment remains pristine and beautifully fresh.',
    icon: 'Tv',
    basePrice: 3500,
    unit: 'apartment',
    category: 'cleaning',
    features: [
      'Balcony washing and glass cleaning',
      'Dusting light fixtures and ceiling fans',
      'Bathroom scaling and mold treatment',
      'Daily, weekly, or bi-weekly schedules'
    ]
  },
  {
    id: 'airbnb-cleaning',
    name: 'Airbnb Cleaning',
    description: 'Fast-turnaround, premium turnover cleaning including linen changes and guest amenity restocking.',
    longDescription: 'Keep your host rating at 5 stars! We offer rapid, meticulously detailed turnovers. We wash bedsheets, replace towels, sanitize bathrooms, tidy up the kitchen, and verify amenities are perfect for your next guest.',
    icon: 'Key',
    basePrice: 2500,
    unit: 'session',
    category: 'cleaning',
    features: [
      'Rapid turnaround between check-out & check-in',
      'Full linen laundry and fresh bedding layout',
      'Trash removal and bathroom double-sanitizing',
      'Welcome pack setup & checklist reporting'
    ]
  },
  {
    id: 'post-construction',
    name: 'Post Construction Cleaning',
    description: 'Specialist dust and residue removal following remodeling, painting, or construction projects.',
    longDescription: 'Construction leaves behind dangerous fine silica dust, paint splashes, plaster drips, and packaging. Our post-construction crews use heavy-duty commercial vacuums and scraping tools to make your new space completely clean and liveable.',
    icon: 'Wrench',
    basePrice: 12000,
    unit: 'session',
    category: 'cleaning',
    features: [
      'Fine dust filtration & chemical residue removal',
      'Paint splatters and silicone spots cleaned off',
      'Thorough high and low level vacuuming',
      'Polishing of all brass, chrome, and glass'
    ]
  },
  {
    id: 'kitchen-cleaning',
    name: 'Kitchen Cleaning',
    description: 'Deep degreasing of counters, ovens, stove hoods, sinks, refrigerators, and tile splashbacks.',
    longDescription: 'Kitchens demand hygienic, food-safe preparation surfaces. We dismantle oven racks, scrub stovetop burners, steam-clean sinks, degrease extraction hoods, and polish cabinetry to pristine state.',
    icon: 'Flame',
    basePrice: 2000,
    unit: 'session',
    category: 'cleaning',
    features: [
      'Complete extraction of tough oil and grease',
      'Sanitizing food preparation surfaces & sinks',
      'Polishing stainless steel appliances',
      'Mopping with medical-grade sanitizers'
    ]
  },
  {
    id: 'bathroom-sanitization',
    name: 'Bathroom Sanitization',
    description: 'Disinfection of toilets, showers, bathtubs, sinks, mirrors, tiles, and grout lines to eliminate germs.',
    longDescription: 'We focus on high-traffic hygiene. Our team uses powerful, safe biocides to clean limescale, mildew, and yellowing, sanitizing the toilet bowl, shower glass, bathroom mirrors, and drain lines.',
    icon: 'Sparkles',
    basePrice: 1500,
    unit: 'session',
    category: 'cleaning',
    features: [
      'Limescale and yellow stain removal',
      'Mildew and black mold tile-joint scrubbing',
      'Disinfection of toilets, taps, and handles',
      'Streak-free mirrors and shiny metal fixtures'
    ]
  },
  {
    id: 'ironing-folding',
    name: 'Ironing & Folding',
    description: 'Crisp, wrinkle-free steam ironing and folding for suits, shirts, dresses, and clean household linens.',
    longDescription: 'Look sharp and feel confident. We use state-of-the-art steam-assisted professional irons to smoothly eliminate creases from clothing, returning them perfectly folded or hung according to your preference.',
    icon: 'Pocket',
    basePrice: 100,
    unit: 'item',
    category: 'laundry',
    features: [
      'Professional steam-pressing for suits & dresses',
      'Collar and cuff crisp finish detailing',
      'Hanger placement or tight luxury folds',
      'Eco-friendly starch application on request'
    ]
  }
];

export const PACKAGES: PricingPackage[] = [
  {
    id: 'pkg-laundry-starter',
    name: 'Weekly Laundry Basket',
    price: 'KSh 2,500',
    unit: 'week',
    description: 'Perfect for busy singles or young professionals in Nairobi who want to delegate their weekly laundry chores.',
    features: [
      'Up to 15 kgs of wash & fold laundry',
      'Premium detergents & fabric softeners',
      'Free pickup & next-day delivery',
      'Stain spotting treatment included'
    ],
    popular: false,
    category: 'laundry'
  },
  {
    id: 'pkg-laundry-popular',
    name: 'The Skylight Family Care',
    price: 'KSh 5,000',
    unit: 'week',
    description: 'Comprehensive laundry management for busy families. Handles laundry mountain with absolute ease.',
    features: [
      'Up to 35 kgs of wash & fold laundry',
      'Separation of delicates & special wash',
      '10 garments crisp-pressed & hung',
      'Priority pickup & same-day return optional'
    ],
    popular: true,
    category: 'laundry'
  },
  {
    id: 'pkg-cleaning-standard',
    name: 'Essential Home Clean',
    price: 'KSh 4,500',
    unit: 'visit',
    description: 'Perfect for maintaining a tidy, hygienic, and welcoming home space on a bi-weekly or monthly basis.',
    features: [
      'Up to 3 bedrooms and 2 bathrooms',
      'Dusting, vacuuming, and mopping',
      'Kitchen counter & appliance exterior clean',
      'Eco-friendly, non-toxic products'
    ],
    popular: false,
    category: 'cleaning'
  },
  {
    id: 'pkg-cleaning-premium',
    name: 'Skylight Deep Sanctuary',
    price: 'KSh 8,500',
    unit: 'visit',
    description: 'Our most thorough, top-to-bottom scrubbing and detailing service to make your home look brand-new.',
    features: [
      'Deep inside kitchen/appliances scrub',
      'Deep bathroom disinfection & grout scrub',
      'Baseboard and window frame detailing',
      '1 complimentary laundry load (wash/dry)'
    ],
    popular: true,
    category: 'cleaning'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Sarah Jenkins',
    role: 'Homeowner in Kilimani, Nairobi',
    rating: 5,
    text: 'Skylight Laundry has saved me hours of precious weekend time! The wash-and-fold service is meticulous – everything arrives smelling so fresh and folded so perfectly that putting it away is a breeze. Highly recommended!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 't2',
    name: 'Michael Otieno',
    role: 'Business Consultant in Westlands',
    rating: 5,
    text: 'Their dry cleaning and ironing services are immaculate. My shirts are crisp, and suits are returned looking pristine. The convenience of their service combined with their friendly customer care makes them the best in town.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200'
  },
  {
    id: 't3',
    name: 'Emily Thompson',
    role: 'Airbnb Host in Lavington',
    rating: 5,
    text: 'We hired Skylight for our Airbnb turnover cleaning, and the results are spectacular. The apartment is always spotless and guests consistently leave 5-star reviews for cleanliness! Extremely reliable team!',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Modern Washing Machine Setup',
    category: 'laundry',
    image: IMAGES.laundryWashingMachine
  },
  {
    id: 'g2',
    title: 'Polished High-Gloss Kitchen',
    category: 'cleaning',
    image: IMAGES.kitchenMaroon
  },
  {
    id: 'g3',
    title: 'Freshly Laundered Fluffy Towels',
    category: 'laundry',
    image: IMAGES.laundryTowels
  },
  {
    id: 'g4',
    title: 'Spotless Living Room Result',
    category: 'cleaning',
    image: IMAGES.homeCleaningLivingRoom
  },
  {
    id: 'g5',
    title: 'Professional Suit Dry Cleaning',
    category: 'laundry',
    image: IMAGES.dryCleaningSuits
  },
  {
    id: 'g6',
    title: 'Sofa Cleaning Before & After',
    category: 'before-after',
    image: IMAGES.couchClean,
    beforeImage: IMAGES.couchDirty,
    afterImage: IMAGES.couchClean
  },
  {
    id: 'g7',
    title: 'Car Seat Stain Removal',
    category: 'before-after',
    image: IMAGES.seatClean,
    beforeImage: IMAGES.seatDirty,
    afterImage: IMAGES.seatClean
  }
];

export const FAQS: FAQItem[] = [
  {
    id: 'faq1',
    question: 'Do you offer same-day cleaning?',
    answer: 'Yes! We offer same-day laundry and basic residential cleaning services across Nairobi. For same-day service, please book or call us before 10:00 AM so we can coordinate our crew and equipment.'
  },
  {
    id: 'faq2',
    question: 'Are your cleaning products safe?',
    answer: 'Absolutely. We care deeply about your family and pets. Skylight utilizes 100% biodegradable, non-toxic, and hypoallergenic cleaning agents that effectively disinfect surfaces and fabrics without leaving harsh chemical odors or residues.'
  },
  {
    id: 'faq3',
    question: 'Do you clean offices?',
    answer: 'Yes, we provide highly professional commercial and office cleaning solutions tailored for companies of all sizes in Nairobi. We can operate after-hours, during weekends, or set up customized recurring cleaning rotas.'
  },
  {
    id: 'faq4',
    question: 'Do you work on weekends?',
    answer: 'Yes, we work 24/7, including Saturdays, Sundays, and public holidays. Our professional teams are ready to serve you at any hour, ensuring your cleaning tasks fit perfectly into your busy lifestyle.'
  },
  {
    id: 'faq5',
    question: 'How can I request a quotation?',
    answer: 'You can request a quotation easily! Fill out our interactive online quote calculator on this website, send us a request through the booking form, call us directly at +254 748 425965, or click the WhatsApp button to chat instantly with our manager.'
  }
];
