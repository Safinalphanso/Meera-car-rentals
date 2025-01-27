// UpgradeModal.tsx
import { Dispatch, SetStateAction } from 'react';
import { Check, X } from 'lucide-react';

interface Benefit {
  name: string;
  price: number;
  image: string;
  benefits: string[];
}

interface Booking {
  carName: string;
  image: string;
  price: number;
  [key: string]: any;
}

interface UpgradeModalProps {
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
  upgradeOptions: Benefit[];
  booking: Booking;
  setBooking: Dispatch<SetStateAction<Booking>>;
  setShowUpgradeBar: Dispatch<SetStateAction<boolean>>;
}

const UpgradeModal = ({
  showModal,
  setShowModal,
  upgradeOptions,
  booking,
  setBooking,
  setShowUpgradeBar,
}: UpgradeModalProps) => {
  const handleUpgrade = (upgrade: Benefit) => {
    setBooking({
      ...booking,
      carName: upgrade.name,
      image: upgrade.image,
      price: upgrade.price,
    });
    setShowModal(false);
    setShowUpgradeBar(false);
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-xl bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-800">Upgrade Your Car</h3>
          <button onClick={() => setShowModal(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="grid gap-4">
          {upgradeOptions.map((upgrade, index) => (
            <div 
              key={index}
              className="flex items-center justify-between rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-lg bg-gray-50 p-2">
                  <img 
                    src={upgrade.image} 
                    alt={upgrade.name}
                    className="h-full w-full object-contain" 
                  />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{upgrade.name}</h4>
                  <p className="text-sm text-gray-600">
                    Additional ₹{upgrade.price - booking.price}
                  </p>
                  <ul className="mt-1">
                    {upgrade.benefits.map((benefit, i) => (
                      <li key={i} className="flex items-center gap-1 text-sm text-gray-600">
                        <Check className="h-3 w-3 text-green-500" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <button
                className="rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
                onClick={() => handleUpgrade(upgrade)}
              >
                Select
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpgradeModal;