import React from 'react';
import { Service } from '../types';
import * as LucideIcons from 'lucide-react';
import { X, Check, Calendar, ArrowRight } from 'lucide-react';

interface ServiceDetailsModalProps {
  service: Service | null;
  onClose: () => void;
  onBook: (serviceId: string) => void;
}

export default function ServiceDetailsModal({ service, onClose, onBook }: ServiceDetailsModalProps) {
  if (!service) return null;

  // Dynamically resolve Lucide Icon
  const IconComponent = (LucideIcons as any)[service.icon] || LucideIcons.HelpCircle;

  return (
    <div id="service-details-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        id="modal-backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Content */}
      <div
        id="modal-container"
        className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200 z-10"
      >
        {/* Top bar with theme color */}
        <div className="bg-brand-600 p-6 text-white relative">
          <button
            id="modal-close-btn"
            onClick={onClose}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-1 hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="p-3 bg-white/15 rounded-2xl text-white">
              <IconComponent className="w-8 h-8" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-brand-200">
                {service.category.replace('-', ' ')} Service
              </span>
              <h3 className="font-display font-bold text-2xl mt-0.5">{service.name}</h3>
            </div>
          </div>
        </div>

        {/* Body content */}
        <div className="p-6 md:p-8 space-y-6">
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Description</h4>
            <p className="text-slate-600 text-sm md:text-base leading-relaxed">
              {service.longDescription}
            </p>
          </div>

          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
            <div>
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Base Pricing</span>
              <div className="flex items-baseline gap-1 mt-1">
                <span className="text-2xl font-bold text-slate-800">KSh {service.basePrice.toLocaleString()}</span>
                <span className="text-slate-500 text-xs font-medium">/ {service.unit}</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-brand-600 font-semibold bg-brand-50 border border-brand-100 px-2.5 py-1 rounded-full">
                Eco-Friendly Detergents
              </span>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Service Inclusions</h4>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {service.features.map((feat, index) => (
                <li key={index} className="flex items-start gap-2 text-slate-600 text-sm">
                  <Check className="w-4 h-4 text-brand-500 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
          <button
            id="modal-cancel-btn"
            onClick={onClose}
            className="w-full sm:w-1/3 py-3 px-4 text-center border border-slate-200 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors cursor-pointer text-sm"
          >
            Go Back
          </button>
          <button
            id="modal-book-btn"
            onClick={() => {
              onBook(service.id);
              onClose();
            }}
            className="w-full sm:w-2/3 py-3 px-4 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-brand-600/10 group cursor-pointer text-sm"
          >
            <Calendar className="w-4 h-4" />
            Book Service Now
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </div>
  );
}
