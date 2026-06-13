export interface Shop {
  id: string | number;
  name: string;
  image: string;
  rating: number;
  reviewCount: number;
  distance: number | string;
  price: string;
  fastDelivery: boolean;
  delivery: string;
  services: string[];
  tag: string | null;
  lat?: number;
  lng?: number;
  address?: string;
}

export interface UseShopsResult {
  shops: Shop[];
  loading: boolean;
  error: string | null;
  usingMock: boolean;
}

export function useShops(filters?: unknown, sort?: string): UseShopsResult;
