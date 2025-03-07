import React from 'react';
import { CartItem } from '../types';
import { Minus, Plus, Trash2 } from 'lucide-react';

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveItem: (id: number) => void;
}

export const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemoveItem }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow border border-amber-100">
          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{item.name}</h3>
            <p className="text-amber-600">₱{item.price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}</p>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <button
              onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
              className="p-1 hover:bg-amber-50 rounded text-amber-600"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center">{item.quantity}</span>
            <button
              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              className="p-1 hover:bg-amber-50 rounded text-amber-600"
            >
              <Plus size={16} />
            </button>
            <button
              onClick={() => onRemoveItem(item.id)}
              className="p-1 text-red-500 hover:bg-red-50 rounded ml-2"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      ))}
      <div className="border-t border-amber-200 pt-4">
        <div className="flex justify-between items-center mb-4">
          <span className="font-semibold">Total:</span>
          <span className="text-xl font-bold text-amber-600">
            ₱{total.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </span>
        </div>
        <button className="w-full bg-amber-500 text-white py-3 rounded-lg hover:bg-amber-600 transition-colors duration-300 font-semibold">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
