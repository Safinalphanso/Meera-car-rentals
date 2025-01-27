import React from 'react';
import Image from 'next/image';
import { Clock, Users, CheckCircle2, ArrowRight } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl w-full max-w-2xl transform transition-all duration-300 scale-100 opacity-100 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="absolute right-4 top-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

interface ConfirmRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  image: string;
  price: number;
  duration: string;
  passengers: number;
  distance: string;
  inclusions: string[];
  handleProceedToBook: () => void;
}

export const ConfirmRideModal: React.FC<ConfirmRideModalProps> = ({ 
  isOpen, 
  onClose, 
  name, 
  image, 
  price, 
  duration, 
  passengers, 
  distance, 
  inclusions,
  handleProceedToBook 
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="overflow-hidden rounded-2xl">
      {/* Header with gradient */}
      <div className="bg-gradient-to-r from-black to-black p-6 text-white">
        <h2 className="text-2xl font-bold">Confirm Your Ride</h2>
        <p className="text-red-100 mt-1">Review your selection details</p>
      </div>

      <div className="p-6">
        {/* Car Details Section */}
        <div className="flex items-center gap-6 pb-6 border-b">
          <div className="relative h-32 w-32 bg-gray-50 rounded-lg p-2">
            <Image
              src={image}
              alt={name}
              fill
              className="object-contain"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900">{name}</h3>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1.5">
                <Users className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">{passengers} Seats</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-5 w-5 text-gray-500" />
                <span className="text-gray-600">{duration}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="py-6 space-y-4 border-b">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Duration</p>
              <p className="text-lg font-semibold mt-1">{duration}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Distance</p>
              <p className="text-lg font-semibold mt-1">{distance} Kms</p>
            </div>
          </div>
        </div>

        {/* Inclusions */}
        <div className="py-6 border-b">
          <h4 className="font-semibold text-gray-900 mb-4">Package Inclusions</h4>
          <div className="grid grid-cols-2 gap-3">
            {inclusions.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <span className="text-gray-600">{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer with Price and CTA */}
        <div className="pt-6 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Amount</p>
            <p className="text-3xl font-bold text-gray-900">₹{price.toLocaleString()}</p>
          </div>
          <button 
            onClick={handleProceedToBook}
            className="flex items-center gap-2 bg-red-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-red-600 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-0.5"
          >
            Proceed to Book
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </Modal>
);

export default Modal;