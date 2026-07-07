export interface Service {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  icon: string; // lucide icon name
  basePrice: number;
  unit: string;
  category: 'laundry' | 'dry-cleaning' | 'cleaning';
  features: string[];
}

export interface PricingPackage {
  id: string;
  name: string;
  price: string;
  unit: string;
  description: string;
  features: string[];
  popular: boolean;
  category: 'laundry' | 'cleaning' | 'all';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  text: string;
  image: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'laundry' | 'cleaning' | 'before-after';
  image: string;
  beforeImage?: string;
  afterImage?: string;
}

export interface BookingForm {
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  preferredDate: string;
  message: string;
  selectedItems: { [key: string]: number };
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

