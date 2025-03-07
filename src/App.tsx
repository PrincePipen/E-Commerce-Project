import React, { useState } from 'react';
import { ShoppingBag, Search } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { products } from './data/products';
import { CartItem, Product } from './types';

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(prevItems =>
      quantity === 0
        ? prevItems.filter(item => item.id !== id)
        : prevItems.map(item =>
            item.id === id ? { ...item, quantity } : item
          )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const cartItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-amber-600">Pipen's E-Commerce</h1>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-amber-600 hover:text-amber-700"
            >
              <ShoppingBag size={24} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={20} />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full sm:w-auto px-4 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </main>

      {/* Cart Sidebar */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
          <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-amber-600">Your Cart</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>
            <Cart
              items={cartItems}
              onUpdateQuantity={updateQuantity}
              onRemoveItem={removeItem}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
