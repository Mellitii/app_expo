interface CalculationParams {
  width: number;
  height: number;
  hasChambranle: boolean;
  hasFacade: boolean;
  slideType: 'scala' | 'metabox';
  slideCount: number;
  transport: number;
  discount: number;
}

export function calculateDressingPrice({
  width,
  height,
  hasChambranle,
  hasFacade,
  slideType,
  slideCount,
  transport,
  discount
}: CalculationParams): number {
  // Constants
  const T = hasFacade ? 450 : 360;
  const slidePrice = slideType === 'scala' ? 100 : 30;
  
  // Calculate price based on formula
  let price = 0;
  let area = 0;
  
  if (hasChambranle) {
    // With chambranle
    area = (width + 0.1) * (height + 0.1);
    price = ((((area) * T + (slidePrice * slideCount)) - discount) * 1.19 + ((area * 30) + transport) * 1.19);
  } else {
    // Without chambranle
    area = width * height;
    price = (((((area) * T + (slidePrice * slideCount)) - discount) * 1.19) + ((area * 30) + transport) * 1.19);
  }
  
  return price;
}

export function calculateArea(width: number, height: number, hasChambranle: boolean): number {
  if (hasChambranle) {
    return (width + 0.1) * (height + 0.1);
  } else {
    return width * height;
  }
}

export function calculateDiscount(
  area: number, 
  hasFacade: boolean, 
  slideType: 'scala' | 'metabox', 
  slideCount: number, 
  discountPercentage: number
): number {
  const T = hasFacade ? 450 : 360;
  const slidePrice = slideType === 'scala' ? 100 : 30;
  
  const basePrice = area * T + (slidePrice * slideCount);
  return basePrice * (discountPercentage / 100);
}

export const transportOptions = [
  { label: 'Transport Tunis', value: 127.5 },
  { label: 'Transport Capbon', value: 292.5 },
  { label: 'Transport Sousse', value: 420 },
  { label: 'Transport Djerba', value: 1005 },
];

export const slideTypeOptions = [
  { label: 'Scala', value: 'scala' },
  { label: 'Metabox', value: 'metabox' },
];