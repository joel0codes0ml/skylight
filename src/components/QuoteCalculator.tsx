import React, { useState } from 'react';
import { SERVICES } from '../data';
import { Calculator, Check, ArrowRight } from 'lucide-react';

interface QuoteCalculatorProps {
  onApplyBooking: (serviceId: string, quantities: { [key: string]: number }, totalCost: number) => void;
}

export default function QuoteCalculator({ onApplyBooking }: QuoteCalculatorProps) {
  const [selectedServiceId, setSelectedServiceId] = useState('laundry');
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({
    'laundry': 10,
    'house-cleaning': 1,
    'office-cleaning': 1,
    'carpet-cleaning': 2,
    'sofa-cleaning': 3,
    'mattress-cleaning': 1,
    'window-cleaning': 1,
    'deep-cleaning': 1,
    'move-cleaning': 1,
    'apartment-cleaning': 1,
    'airbnb-cleaning': 1,
    'post-construction': 1,
    'kitchen-cleaning': 1,
    'bathroom-sanitization': 1,
    'ironing-folding': 10,
  });

  const selectedService = SERVICES.find(s => s.id === selectedServiceId) || SERVICES[0];

  const updateQuantity = (serviceId: string, value: number) => {
    setQuantities(prev => ({
      ...prev,
      [serviceId]: Math.max(0, value)
    }));
  };

  const getPriceBreakdown = () => {
    const qty = quantities[selectedServiceId] || 0;
    const price = selectedService.basePrice * qty;
    return { qty, price };
  };

  const { qty, price } = getPriceBreakdown();

  const handleApply = () => {
    onApplyBooking(selectedServiceId, quantities, price);
  };

  return (
    <div id="quote-calculator" className="bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-2xl flex flex-col md:flex-row">
      {/* Left side: Selections */}
      <div className="p-6 md:p-8 bg-slate-50/50 md:w-3/5 border-b md:border-b-0 md:border-r border-slate-100 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-brand-100 text-brand-600 rounded-lg">
              <Calculator className="w-5 h-5" />
            </div>
            <span className="font-display font-semibold text-brand-600 text-sm tracking-wide uppercase">Quote Estimator</span>
          </div>
          <h3 className="font-display font-bold text-2xl text-slate-800 mb-2">Instant Pricing Estimate</h3>
          <p className="text-slate-500 text-sm mb-6">Select a service and adjust quantities to see a live cost calculation. No hidden fees.</p>

          {/* Service Selector Dropdown */}
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">1. Choose Service</label>
          <div className="mb-6">
            <select
              id="calc-service-select"
              value={selectedServiceId}
              onChange={(e) => setSelectedServiceId(e.target.value)}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-700 text-sm focus:border-brand-500 focus:ring-2 focus:ring-brand-100 outline-none transition-all cursor-pointer font-medium"
            >
              {SERVICES.map(s => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.category.replace('-', ' ')})
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Controls */}
          <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">2. Specify Amount</label>
          <div className="bg-white p-4 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-medium text-slate-700 text-sm sm:text-base">{selectedService.name}</span>
              <p className="text-xs text-slate-400">
                Rate: KSh {selectedService.basePrice.toLocaleString()} per {selectedService.unit}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                id="calc-qty-minus"
                onClick={() => updateQuantity(selectedServiceId, qty - 1)}
                disabled={qty <= 0}
                className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50 cursor-pointer"
              >
                -
              </button>
              <input
                type="number"
                id="calc-qty-input"
                value={qty}
                onChange={(e) => updateQuantity(selectedServiceId, parseFloat(e.target.value) || 0)}
                className="w-20 h-10 border border-slate-200 rounded-lg text-center font-semibold text-slate-700"
              />
              <button
                id="calc-qty-plus"
                onClick={() => updateQuantity(selectedServiceId, qty + 1)}
                className="w-10 h-10 rounded-lg border border-slate-200 flex items-center justify-center font-bold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                +
              </button>
              <span className="text-sm font-medium text-slate-500 w-12 text-center">{selectedService.unit}s</span>
            </div>
          </div>
        </div>

        <div className="mt-6 text-xs text-slate-400 border-t border-slate-100 pt-4">
          * This is an estimated price based on our standard rate card. Final price may vary slightly depending on item complexity.
        </div>
      </div>

      {/* Right side: Calculations */}
      <div className="p-6 md:p-8 md:w-2/5 bg-brand-900 text-white flex flex-col justify-between">
        <div>
          <span className="text-brand-300 text-xs font-semibold tracking-wider uppercase">Your Estimate</span>
          <div className="mt-4 pb-6 border-b border-white/10 flex flex-col">
            <span className="text-4xl font-display font-extrabold text-white">KSh {price.toLocaleString()}</span>
            <span className="text-brand-300 text-xs block mt-1">Estimated total cost</span>
          </div>

          <div className="mt-6 space-y-3">
            <h4 className="text-xs font-semibold tracking-widest text-brand-300 uppercase">Includes:</h4>
            <ul className="space-y-2 text-sm text-brand-100">
              {selectedService.features.slice(0, 3).map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-brand-300 shrink-0 mt-0.5" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8">
          <button
            id="calc-apply-btn"
            onClick={handleApply}
            className="w-full py-4 px-6 bg-brand-500 hover:bg-brand-600 active:bg-brand-700 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-brand-500/20 group cursor-pointer"
          >
            Apply to Booking Form
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="text-[10px] text-center text-brand-200/70 mt-2">
            Loads selections straight into the service booking system
          </p>
        </div>
      </div>
    </div>
  );
}
