'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/Button';
import { PRODUCTS, CATEGORIES, COLORS, STYLES } from '@/lib/data';
import { FilterOptions } from '@/types';
import { Filter, Grid, List } from 'lucide-react';

export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    colors: [],
    styles: [],
    priceRange: [0, 100],
    inStockOnly: false
  });

  const filteredProducts = PRODUCTS.filter(product => {
    if (filters.categories.length > 0 && !filters.categories.includes(product.category.id)) {
      return false;
    }
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

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const toggleArrayFilter = (key: 'categories' | 'colors' | 'styles', value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter(item => item !== value)
        : [...prev[key], value]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Каталог продукти</h1>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <p className="text-gray-600">
              Намерени {filteredProducts.length} от {PRODUCTS.length} продукта
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
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Категории</h4>
                <div className="space-y-2">
                  {CATEGORIES.map(category => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category.id)}
                        onChange={() => toggleArrayFilter('categories', category.id)}
                        className="rounded border-gray-300 text-rose-600 focus:ring-rose-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

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