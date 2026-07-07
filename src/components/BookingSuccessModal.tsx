import React from 'react';
import { X, CheckCircle2, Phone, Calendar, Mail } from 'lucide-react';

interface BookingSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingData: {
    name: string;
    email: string;
    phone: string;
    serviceType: string;
    preferredDate: string;
    message: string;
  };
  estimatedPrice?: number;
}

export default function BookingSuccessModal({ isOpen, onClose, bookingData, estimatedPrice }: BookingSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div id="booking-success-modal" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        id="success-backdrop"
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Container */}
      <div
        id="success-container"
        className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 animate-in fade-in zoom-in-95 duration-200 z-10 p-6 md:p-8 text-center"
      >
        <button
          id="success-close-btn"
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 hover:bg-slate-50 rounded-full transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center">
          {/* Animated checkmark container */}
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center text-green-500 mb-6 border border-green-100 animate-bounce">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h3 className="font-display font-bold text-2xl text-slate-800 mb-2">Booking Requested!</h3>
          <p className="text-slate-500 text-sm mb-6 leading-relaxed">
            Thank you, <strong className="text-slate-800">{bookingData.name}</strong>! Your inquiry with Skylight Laundry Cleaning Services has been received successfully.
          </p>

          {/* Quick Details Box */}
          <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-left space-y-3 text-xs text-slate-600 mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-600 shrink-0" />
              <span>
                <strong>Service Requested:</strong> {bookingData.serviceType.toUpperCase()}
              </span>
            </div>
            {bookingData.preferredDate && (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-600 shrink-0" />
                <span>
                  <strong>Preferred Date:</strong> {new Date(bookingData.preferredDate).toLocaleDateString(undefined, { dateStyle: 'long' })}
                </span>
              </div>
            )}
            {estimatedPrice && estimatedPrice > 0 ? (
              <div className="flex items-center gap-2">
                <span className="font-bold text-brand-600 shrink-0 text-center">KSh</span>
                <span>
                  <strong>Estimated Total:</strong> KSh {estimatedPrice.toLocaleString()}
                </span>
              </div>
            ) : null}
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-brand-600 shrink-0" />
              <span>
                <strong>Confirmation Sent:</strong> {bookingData.email}
              </span>
            </div>
          </div>

          {/* Next steps */}
          <div className="text-xs text-slate-400 space-y-1 mb-6">
            <p>● A friendly booking coordinator will call you back within <strong>1 hour</strong>.</p>
            <p>● Booking reference: <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-bold">SL-{Math.floor(100000 + Math.random() * 900000)}</span></p>
          </div>

          {/* Action buttons */}
          <div className="w-full space-y-2">
            <button
              id="success-done-btn"
              onClick={onClose}
              className="w-full py-3 bg-brand-600 hover:bg-brand-700 active:bg-brand-800 text-white font-semibold rounded-xl transition-all shadow-lg hover:shadow-brand-600/15 cursor-pointer text-sm"
            >
              Back to Website
            </button>
            <a
              href="https://wa.me/254748425965?text=Hello%20Skylight%20Laundry%20Cleaning%20Services,%20I%20just%20submitted%20a%20booking%20estimate!"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 border border-slate-200 text-slate-700 font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors text-sm"
            >
              <Phone className="w-4 h-4 text-emerald-500" />
              Connect via WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
