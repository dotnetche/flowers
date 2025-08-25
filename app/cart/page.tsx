'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/utils';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();

  if (cart.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Количката е празна</h1>
            <p className="text-gray-600 mb-8">Добавете продукти, за да продължите с поръчката.</p>
            <Link href="/catalog">
              <Button size="lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Към каталога
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Количка</h1>
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              {cart.itemCount} {cart.itemCount === 1 ? 'продукт' : 'продукта'} в количката
            </p>
            <Button variant="outline" size="sm" onClick={clearCart}>
              <Trash2 className="w-4 h-4 mr-2" />
              Изчисти количката
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.items.map((item) => (
              <div key={item.product.id} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-center space-x-4">
                  <div className="w-20 h-20 relative overflow-hidden rounded-lg bg-gray-50">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <Link 
                      href={`/products/${item.product.id}`}
                      className="font-semibold text-gray-900 hover:text-rose-600 transition-colors"
                    >
                      {item.product.name}
                    </Link>
                    <p className="text-sm text-gray-600 mt-1">
                      {item.product.category.name} • {item.product.style.name}
                    </p>
                    <div className="flex items-center space-x-2 mt-2">
                      {item.product.colors.map((color) => (
                        <div
                          key={color.id}
                          className="w-4 h-4 rounded-full border border-gray-200"
                          style={{ backgroundColor: color.hex }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-2 text-gray-600 hover:text-gray-900"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-4 py-2 font-medium">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-2 text-gray-600 hover:text-gray-900"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        {formatPrice(item.product.finalPrice * item.quantity)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {formatPrice(item.product.finalPrice)} x {item.quantity}
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCart(item.product.id)}
                      className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Обобщение на поръчката</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Междинна сума:</span>
                  <span className="font-medium">{formatPrice(cart.total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Доставка:</span>
                  <span className="font-medium">
                    {cart.total >= 50 ? 'Безплатна' : formatPrice(5)}
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between">
                    <span className="text-lg font-semibold text-gray-900">Общо:</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(cart.total + (cart.total >= 50 ? 0 : 5))}
                    </span>
                  </div>
                </div>
              </div>

              {cart.total < 50 && (
                <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 mb-6">
                  <p className="text-sm text-rose-800">
                    Добавете още {formatPrice(50 - cart.total)} за безплатна доставка!
                  </p>
                </div>
              )}

              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  Продължи към плащане
                </Button>
                <Link href="/catalog">
                  <Button variant="outline" className="w-full">
                    Продължи пазаруването
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}