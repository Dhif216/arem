// Define the type for a Product
export interface Product {
  id: number;
  slug: string; // Used for links (e.g., /products/baklawa)
  category: 'honeyed' | 'dry' | 'seasonal';
  price: number;
  image: string; // Path to image
  // Keys for translation lookup
  nameKey: string;
  descriptionKey: string;
}

// Mock Product Data
export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'baklawa',
    category: 'honeyed',
    price: 35.00, // Price per KG, for example
    image: 'baklawa.jpg',
    nameKey: 'product_baklawa_name',
    descriptionKey: 'product_baklawa_desc',
  },
  {
    id: 2,
    slug: 'makroudh',
    category: 'honeyed',
    price: 28.00,
    image: 'makroudh.jpg',
    nameKey: 'product_makroudh_name',
    descriptionKey: 'product_makroudh_desc',
  },
  {
    id: 3,
    slug: 'kaak-warka',
    category: 'dry',
    price: 40.00,
    image: 'kaak_warka.jpg',
    nameKey: 'product_kaak_warka_name',
    descriptionKey: 'product_kaak_warka_desc',
  },
  {
    id: 4,
    slug: 'ghraiba',
    category: 'dry',
    price: 25.00,
    image: 'ghraiba.jpg',
    nameKey: 'product_ghraiba_name',
    descriptionKey: 'product_ghraiba_desc',
  },
  {
    id: 5,
    slug: 'samsa',
    category: 'honeyed',
    price: 38.00,
    image: 'samsa.jpg',
    nameKey: 'product_samsa_name',
    descriptionKey: 'product_samsa_desc',
  },
  // Add more products here
];