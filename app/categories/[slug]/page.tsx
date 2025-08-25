'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { PRODUCTS, CATEGORIES, COLORS, STYLES } from '@/lib/data';
import { FilterOptions } from '@/types';
import { Filter, Grid, List, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    colors: [],
    styles: [],
    priceRange: [0, 100],
    inStockOnly: false
  });

  const category = CATEGORIES.find(cat => cat.slug === params.slug);
  
  if (!category) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Категорията не е намерена</h1>
            <p className="text-gray-600 mb-8">Моля, проверете URL адреса или се върнете към категориите.</p>
            <Link href="/categories">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Към категориите
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const categoryProducts = PRODUCTS.filter(product => product.category.id === category.id);

  const filteredProducts = categoryProducts.filter(product => {
    if (filters.colors.length > 0 && !product.colors.some(color => filters.colors.includes(color.id))) {
      return false;
    }
    if (filters.styles.length > 0 && !filters.styles.includes(product.style.id)) {
      return false;
    }
    if (product.finalPrice < filters.priceRange[0] || product.finalPrice > filters.priceRange[1]) {
      return false;
    }
    if (filters.inStockOnly && !product.inStock) {
      return false;
    }
    return true;
  });

  const toggleArrayFilter = (key: 'colors' | 'styles', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
          <Link href="/" className="hover:text-rose-600">Начало</Link>
          <span>/</span>
          <Link href="/categories" className="hover:text-rose-600">Категории</Link>
          <span>/</span>
          <span className="text-gray-900">{category.name}</span>
        </nav>

        {/* Category Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{category.name}</h1>
          <p className="text-lg text-gray-600 mb-6">{category.description}</p>
          
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-gray-600">
              Намерени {filteredProducts.length} от {categoryProducts.length} продукта
            </p>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden"
              >
                <Filter className="w-4 h-4 mr-2" />
                Филтри
              </Button>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-8">
          {/* Filters Sidebar */}
          <aside className={`w-64 space-y-6 ${showFilters ? 'block' : 'hidden'} sm:block`}>
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Филтри</h3>
              
              {/* Colors */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Цветове</h4>
                <div className="space-y-2">
                  {COLORS.map(color => (
                    <label key={color.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.colors.includes(color.id)}
                        onChange={() => toggleArrayFilter('colors', color.id)}
                        className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                      />
                      <div
                        className="ml-2 w-4 h-4 rounded-full border border-gray-200"
                        style={{ backgroundColor: color.hex }}
                      />
                      <span className="ml-2 text-sm text-gray-600">{color.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Styles */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Стилове</h4>
                <div className="space-y-2">
                  {STYLES.map(style => (
                    <label key={style.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.styles.includes(style.id)}
                        onChange={() => toggleArrayFilter('styles', style.id)}
                        className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{style.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* In Stock Only */}
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={filters.inStockOnly}
                    onChange={(e) => handleFilterChange('inStockOnly', e.target.checked)}
                    className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                  />
                  <span className="ml-2 text-sm text-gray-600">Само в наличност</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">Няма намерени продукти с избраните филтри.</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => setFilters({
                    categories: [],
                    colors: [],
                    styles: [],
                    priceRange: [0, 100],
                    inStockOnly: false
                  })}
                >
                  Изчисти филтрите
                </Button>
              </div>
            ) : (
              <div className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}>
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}