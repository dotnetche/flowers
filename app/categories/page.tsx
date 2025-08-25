'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CATEGORIES } from '@/lib/data';
import { ArrowRight, Package } from 'lucide-react';

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Категории продукти
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Разгледайте нашите специално подбрани категории за всеки повод и стил
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="aspect-[4/3] relative">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-bold mb-2 group-hover:text-rose-300 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-200 text-sm mb-4 line-clamp-2">
                  {category.description}
                </p>
                <div className="flex items-center text-rose-300 font-medium group-hover:text-white transition-colors">
                  <Package className="w-4 h-4 mr-2" />
                  <span>Разгледай продуктите</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Info */}
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Не намирате това, което търсите?
          </h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Свържете се с нас за персонализирани букети и специални поръчки. 
            Ние създаваме уникални аранжировки според вашите предпочитания.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-rose-600 text-white font-medium rounded-lg hover:bg-rose-700 transition-colors"
            >
              Свържете се с нас
            </Link>
            <Link
              href="/catalog"
              className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Виж всички продукти
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}