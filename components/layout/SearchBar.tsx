'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search, X } from 'lucide-react';
import { PRODUCTS } from '@/lib/data';
import { Product } from '@/types';
import { formatPrice } from '@/lib/utils';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchBar({ isOpen, onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      const filteredProducts = PRODUCTS.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.name.toLowerCase().includes(query.toLowerCase()) ||
        product.style.name.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filteredProducts.slice(0, 6));
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleProductClick = (productId: string) => {
    onClose();
    setQuery('');
    router.push(`/products/${productId}`);
  };

  const handleViewAll = () => {
    onClose();
    router.push(`/catalog?search=${encodeURIComponent(query)}`);
    setQuery('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Search Input */}
        <div className="flex items-center p-6 border-b border-gray-200">
          <Search className="w-5 h-5 text-gray-400 mr-3" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Търсете букети, цветове, стилове..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-lg outline-none placeholder-gray-400"
          />
          <button
            onClick={onClose}
            className="ml-3 p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search Results */}
        <div className="max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-6 text-center">
              <div className="animate-spin w-6 h-6 border-2 border-rose-600 border-t-transparent rounded-full mx-auto"></div>
              <p className="text-gray-500 mt-2">Търсене...</p>
            </div>
          ) : results.length > 0 ? (
            <>
              <div className="p-4">
                <h3 className="text-sm font-medium text-gray-500 mb-3">
                  Намерени {results.length} резултата
                </h3>
                <div className="space-y-3">
                  {results.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg transition-colors text-left"
                    >
                      <div className="w-12 h-12 relative overflow-hidden rounded-lg bg-gray-100 flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 truncate">
                          {product.name}
                        </h4>
                        <p className="text-sm text-gray-500 truncate">
                          {product.category.name} • {product.specifications.roseCount} рози
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <div className="font-bold text-gray-900">
                          {formatPrice(product.finalPrice)}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              
              {query && (
                <div className="border-t border-gray-200 p-4">
                  <button
                    onClick={handleViewAll}
                    className="w-full text-center py-2 text-rose-600 hover:text-rose-700 font-medium transition-colors"
                  >
                    Виж всички резултати за "{query}"
                  </button>
                </div>
              )}
            </>
          ) : query ? (
            <div className="p-6 text-center">
              <p className="text-gray-500">Няма намерени резултати за "{query}"</p>
              <p className="text-sm text-gray-400 mt-1">
                Опитайте с различни ключови думи
              </p>
            </div>
          ) : (
            <div className="p-6 text-center">
              <p className="text-gray-500">Започнете да пишете за търсене</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}