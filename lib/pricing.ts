import { PricingRule } from '@/types';

export const PRICING_RULES: PricingRule[] = [
  {
    minPrice: 0,
    maxPrice: 10,
    suggestedFinalMin: 18,
    suggestedFinalMax: 25
  },
  {
    minPrice: 11,
    maxPrice: 18,
    suggestedFinalMin: 25,
    suggestedFinalMax: 35
  },
  {
    minPrice: 19,
    maxPrice: 30,
    suggestedFinalMin: 35,
    suggestedFinalMax: 50
  }
];

export function calculateSuggestedPrice(purchasePrice: number): { min: number; max: number } {
  const rule = PRICING_RULES.find(
    rule => purchasePrice >= rule.minPrice && purchasePrice <= rule.maxPrice
  );
  
  if (rule) {
    return {
      min: rule.suggestedFinalMin,
      max: rule.suggestedFinalMax
    };
  }
  
  // Fallback for prices outside defined rules
  return {
    min: Math.round(purchasePrice * 1.8),
    max: Math.round(purchasePrice * 2.5)
  };
}

export function calculateMargin(purchasePrice: number, finalPrice: number): number {
  return finalPrice - purchasePrice;
}

export function calculateMarginPercentage(purchasePrice: number, finalPrice: number): number {
  return ((finalPrice - purchasePrice) / purchasePrice) * 100;
}