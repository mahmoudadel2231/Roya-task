export type PRODUCT_TYPE = {
  id: number;
  title: string;
  description: string;
  image: string;
  price: number;
  tags: string[];
};

export type SORT_ORDER = 'none' | 'asc' | 'desc';

export const NEXT_SORT = (s: SORT_ORDER): SORT_ORDER =>
  s === 'none' ? 'asc' : s === 'asc' ? 'desc' : 'none';
