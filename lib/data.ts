import { Product, ProductCategory, Color, Style } from '@/types';

export const CATEGORIES: ProductCategory[] = [
  {
    id: '1',
    name: 'Букети от рози',
    slug: 'bouquets',
    description: 'Елегантни букети от изкуствени рози за всеки повод',
    image: '/Букет за всеки повод❤️.jpg'
  },
  {
    id: '2',
    name: 'Специални поводи',
    slug: 'special-occasions',
    description: 'Уникални аранжировки за абитуриенти и празници',
    image: '/Нов модел за абитуриенти.jpg'
  },
  {
    id: '3',
    name: 'Тематични букети',
    slug: 'themed-bouquets',
    description: 'Персонализирани букети с надписи и декорации',
    image: '/Букет с 21 розови рози надпис с цифра и hallo kitty🩷.jpg'
  }
];

export const COLORS: Color[] = [
  { id: '1', name: 'Червено', hex: '#DC2626' },
  { id: '2', name: 'Розово', hex: '#EC4899' },
  { id: '3', name: 'Бяло', hex: '#FFFFFF' },
  { id: '4', name: 'Праскова', hex: '#FBBF24' },
  { id: '5', name: 'Лилаво', hex: '#8B5CF6' }
];

export const STYLES: Style[] = [
  {
    id: '1',
    name: 'Класически',
    description: 'Традиционни букети с елегантен вид'
  },
  {
    id: '2',
    name: 'Модерен',
    description: 'Съвременни аранжировки с уникален дизайн'
  },
  {
    id: '3',
    name: 'Романтичен',
    description: 'Нежни букети за специални моменти'
  },
  {
    id: '4',
    name: 'Празничен',
    description: 'Тематични букети за празници и събития'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Букет с 9 прасковени рози',
    description: 'Нежен букет от 9 изкуствени прасковени рози, идеален за романтични моменти и специални поводи.',
    images: ['/Букет с 9 прасковени рози🍑🤍.jpg'],
    category: CATEGORIES[0],
    colors: [COLORS[3], COLORS[2]],
    style: STYLES[2],
    purchasePrice: 8.50,
    finalPrice: 22.00,
    margin: 13.50,
    inStock: true,
    featured: true,
    specifications: {
      roseCount: 9,
      size: 'Среден (25-30 см)',
      materials: ['Изкуствени рози', 'Декоративна хартия', 'Панделка']
    }
  },
  {
    id: '2',
    name: 'Букет с 21 розови рози и Hello Kitty',
    description: 'Уникален букет от 21 розови рози с персонализиран надпис и Hello Kitty декорация.',
    images: ['/Букет с 21 розови рози надпис с цифра и hallo kitty🩷.jpg'],
    category: CATEGORIES[2],
    colors: [COLORS[1]],
    style: STYLES[3],
    purchasePrice: 15.00,
    finalPrice: 32.00,
    margin: 17.00,
    inStock: true,
    featured: true,
    specifications: {
      roseCount: 21,
      size: 'Голям (35-40 см)',
      materials: ['Изкуствени рози', 'Hello Kitty фигурка', 'Персонализиран надпис', 'Луксозна опаковка']
    }
  },
  {
    id: '3',
    name: 'Абитуриентски букет',
    description: 'Специално създаден букет за абитуриенти с елегантен дизайн и празнична декорация.',
    images: ['/Нов модел за абитуриенти.jpg'],
    category: CATEGORIES[1],
    colors: [COLORS[0], COLORS[2]],
    style: STYLES[3],
    purchasePrice: 12.00,
    finalPrice: 28.00,
    margin: 16.00,
    inStock: true,
    featured: false,
    specifications: {
      roseCount: 15,
      size: 'Голям (30-35 см)',
      materials: ['Изкуствени рози', 'Празнична декорация', 'Златиста панделка']
    }
  },
  {
    id: '4',
    name: 'Букет за всеки повод',
    description: 'Универсален букет от червени рози, подходящ за всякакви празници и специални моменти.',
    images: ['/Букет за всеки повод❤️.jpg'],
    category: CATEGORIES[0],
    colors: [COLORS[0]],
    style: STYLES[0],
    purchasePrice: 10.00,
    finalPrice: 24.00,
    margin: 14.00,
    inStock: true,
    featured: true,
    specifications: {
      roseCount: 12,
      size: 'Среден (25-30 см)',
      materials: ['Изкуствени червени рози', 'Елегантна опаковка', 'Сатенена панделка']
    }
  }
];