'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { PRODUCTS } from '@/lib/data';
import { formatPrice } from '@/lib/utils';
import { useCart } from '@/hooks/useCart';
import { ShoppingBag, Heart, Share2, Truck, Shield, RotateCcw } from 'lucide-react';

export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const product = PRODUCTS.find(p => p.id === params.id);

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Продуктът не е намерен</h1>
            <p className="text-gray-600">Моля, проверете URL адреса или се върнете към каталога.</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-2xl bg-gray-50">
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.featured && (
                <div className="absolute top-4 left-4 bg-rose-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Препоръчано
                </div>
              )}
            </div>
            
            {product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`aspect-square relative overflow-hidden rounded-lg ${
                      selectedImageIndex === index ? 'ring-2 ring-rose-500' : ''
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-sm text-rose-600 font-medium">{product.category.name}</span>
                <span className="text-gray-300">•</span>
                <span className="text-sm text-gray-600">{product.style.name}</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              <p className="text-gray-600 text-lg leading-relaxed">{product.description}</p>
            </div>

            {/* Colors */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Цветове</h3>
              <div className="flex items-center space-x-3">
                {product.colors.map((color) => (
                  <div key={color.id} className="flex items-center space-x-2">
                    <div
                      className="w-6 h-6 rounded-full border-2 border-gray-200"
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    />
                    <span className="text-sm text-gray-600">{color.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3">Спецификации</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Брой рози:</span>
                  <span className="font-medium">{product.specifications.roseCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Размер:</span>
                  <span className="font-medium">{product.specifications.size}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Материали:</span>
                  <span className="font-medium">{product.specifications.materials.join(', ')}</span>
                </div>
              </div>
            </div>

            {/* Price */}
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="text-3xl font-bold text-gray-900">
                    {formatPrice(product.finalPrice)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Печалба: {formatPrice(product.margin)}
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                  product.inStock 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'В наличност' : 'Няма в наличност'}
                </div>
              </div>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-900"
                  >
                    +
                  </button>
                </div>
                
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1"
                  size="lg"
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Добави в количката
                </Button>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 mb-8">
                <Button variant="outline" size="sm" className="flex-1">
                  <Heart className="w-4 h-4 mr-2" />
                  Запази
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Share2 className="w-4 h-4 mr-2" />
                  Сподели
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="border-t border-gray-200 pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Truck className="w-5 h-5 text-rose-600" />
                  <div>
                    <div className="font-medium text-sm">Безплатна доставка</div>
                    <div className="text-xs text-gray-500">над 50 лв</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="w-5 h-5 text-rose-600" />
                  <div>
                    <div className="font-medium text-sm">Гаранция</div>
                    <div className="text-xs text-gray-500">12 месеца</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <RotateCcw className="w-5 h-5 text-rose-600" />
                  <div>
                    <div className="font-medium text-sm">Връщане</div>
                    <div className="text-xs text-gray-500">14 дни</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}