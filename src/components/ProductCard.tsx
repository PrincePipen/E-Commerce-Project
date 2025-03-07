import React from 'react';
import { Product } from '../types';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] group flex flex-col h-full">
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute top-2 right-2 bg-amber-500 text-white px-2 py-1 rounded-full text-sm">
          {product.category}
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 flex-grow">{product.description}</p>
        <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:justify-between">
          <span className="text-2xl font-bold text-amber-600 whitespace-nowrap">
            ₱{product.price.toLocaleString('en-PH', { minimumFractionDigits: 2 })}
          </span>
          <button
            onClick={() => onAddToCart(product)}
            className="w-full sm:w-auto bg-amber-500 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 hover:bg-amber-600 transition-colors duration-300"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};