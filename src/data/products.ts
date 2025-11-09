// Define the type for a Product
export interface Product {
  id: number;
  slug: string;
  category: 'honeyed' | 'dry' | 'seasonal' | 'other'; 
  price: number;
  image: string; // Can be a local filename OR a URL
  nameKey: string;
  descriptionKey: string;
}

// Mock Product Data (New List of 20 Focused Products)
export const MOCK_PRODUCTS: Product[] = [
  { id: 1, slug: 'makroudh', category: 'honeyed', price: 28.00, image: 'https://masmoudi.tn/cdn/shop/products/makroudh-asmar-3_675acffb-ef0b-4479-a188-46bdcf5167d5_grande.png?v=1682589587', nameKey: 'product_makroudh_name', descriptionKey: 'product_makroudh_desc' },
  { id: 2, slug: 'zlabia', category: 'honeyed', price: 15.00, image: 'https://i.ytimg.com/vi/suZWc_vzt-U/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AHUBoAC4AOKAgwIABABGHIgVyggMA8=&rs=AOn4CLBAMJ890QrX0tWPm9Bl7sEy-XCCsg', nameKey: 'product_zlabia_name', descriptionKey: 'product_zlabia_desc' },
  { id: 3, slug: 'samsa', category: 'honeyed', price: 38.00, image: 'https://cuisine.nessma.tv/uploads/1/2018-10/d7d3ee4537dfe74ce57a5b8516b9140d.jpg', nameKey: 'product_samsa_name', descriptionKey: 'product_samsa_desc' },
  { id: 4, slug: 'ghraiba', category: 'dry', price: 25.00, image: 'https://i.pinimg.com/736x/4e/df/f4/4edff47733114ca2883826dd405c6058.jpg', nameKey: 'product_ghraiba_name', descriptionKey: 'product_ghraiba_desc' },
  { id: 5, slug: 'borek-hlou', category: 'honeyed', price: 35.00, image: 'https://i.ytimg.com/vi/20r-vpvqZx0/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDykKqprqaX4LlZ4WIW33GBOFd-qg', nameKey: 'product_borek_hlou_name', descriptionKey: 'product_borek_hlou_desc' },
  { id: 6, slug: 'kaab-ghazal', category: 'dry', price: 40.00, image: 'https://t4.ftcdn.net/jpg/03/24/84/19/360_F_324841928_1H9eXap1AoO8NGH3mkIvoqv7BTJVtXBl.jpg', nameKey: 'product_kaab_ghazal_name', descriptionKey: 'product_kaab_ghazal_desc' },
  { id: 7, slug: 'ftayer-bel-3assel', category: 'honeyed', price: 8.00, image: 'https://www.bennasafi.com/media/large/1637598441_trezs..1..jpg', nameKey: 'product_ftayer_3assel_name', descriptionKey: 'product_ftayer_3assel_desc' },
  { id: 8, slug: 'kaak-anber', category: 'dry', price: 32.00, image: 'https://i.ytimg.com/vi/c_pHYTi8kOw/maxresdefault.jpg', nameKey: 'product_kaak_anber_name', descriptionKey: 'product_kaak_anber_desc' },
  { id: 9, slug: 'bastila-hlowa', category: 'dry', price: 45.00, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcncph67sRzGZ77BGgce5hMZgeFPRO-cHV9Q2kGI5yW80rx946sq7AlX_EIBqit00f6FI&usqp=CAU', nameKey: 'product_bastila_hlowa_name', descriptionKey: 'product_bastila_hlowa_desc' },
  { id: 10, slug: 'makhbadh', category: 'dry', price: 30.00, image: 'https://www.propertyfinder.ae/blog/wp-content/uploads/2024/02/5-1.jpg', nameKey: 'product_makhbadh_name', descriptionKey: 'product_makhbadh_desc' },
  { id: 11, slug: 'samsa-dattes', category: 'honeyed', price: 34.00, image: 'https://i.ytimg.com/vi/sW5Jep7Obss/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLD8a7J-Bhpod8cgTUKB9s-NqE6Z_w', nameKey: 'product_samsa_dattes_name', descriptionKey: 'product_samsa_dattes_desc' },
  { id: 12, slug: 'zlabia-amandes', category: 'honeyed', price: 20.00, image: 'https://s.raseef22.net/storage/attachments/1083/MAIN_Ramadan-sweets_617892.jpg/r/800/MAIN_Ramadan-sweets_617892.jpg', nameKey: 'product_zlabia_amandes_name', descriptionKey: 'product_zlabia_amandes_desc' },
  { id: 13, slug: 'ftira-bel-3assel', category: 'honeyed', price: 10.00, image: 'https://images.arla.com/recordid/AB6ED6FF-2D00-48A6-ABCAF9BFB456B4DD/feteer-meshaltet.jpg', nameKey: 'product_ftira_3assel_name', descriptionKey: 'product_ftira_3assel_desc' },
  { id: 14, slug: 'hlou-semid', category: 'honeyed', price: 18.00, image: 'https://www.thaqfny.com/wp-content/uploads/2022/04/%D9%83%D8%B1%D8%A7%D8%AA-%D8%B3%D9%85%D9%8A%D8%AF-%D8%AD%D9%84%D9%89-%D8%A7%D9%84%D8%B3%D9%85%D9%8A%D8%AF-%D8%A8%D8%A7%D9%84%D8%B9%D8%B3%D9%84.jpg', nameKey: 'product_hlou_semid_name', descriptionKey: 'product_hlou_semid_desc' },
  { id: 15, slug: 'borek-amandes', category: 'dry', price: 38.00, image: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg-Z6VMCubAjg7-HLVY-oIuAqx8oBUt36rNrTUAOGwMDO9xXvIR_x_KEH7AfrCb9wcqwPWsqfL2LXJpi-RZ8mL-_Gg3K_DmyNJKiLxER10nfCu3oVavOsiqKDzCIrSm_j0a_qIvHdMFt3VODDx0jm87Mv51NOG4YEby0VjYt0VtjBmR8zCAxrLb7_evxJo/s1920/briwt%20loz%20facebook.jpg', nameKey: 'product_borek_amandes_name', descriptionKey: 'product_borek_amandes_desc' },
  { id: 16, slug: 'kaab-ghazal-amandes', category: 'dry', price: 42.00, image: 'https://i.ytimg.com/vi/sQ08xsRR50I/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCvN7MgXGED8hsPalrBF-4KQGnPFw', nameKey: 'product_kaab_ghazal_amandes_name', descriptionKey: 'product_kaab_ghazal_amandes_desc' },
  { id: 17, slug: 'ghraiba-semid', category: 'dry', price: 22.00, image: 'https://i.ytimg.com/vi/YRALFylR_MQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLCVKVfXIFssuNnv1WuK6We28hBYFA', nameKey: 'product_ghraiba_semid_name', descriptionKey: 'product_ghraiba_semid_desc' },
  { id: 18, slug: 'ftira-hlou', category: 'honeyed', price: 12.00, image: 'https://cnn-arabic-images.cnn.io/cloudinary/image/upload/w_1920,c_scale,q_auto/cnnarabic/2025/03/19/images/292759.jpg', nameKey: 'product_ftira_hlou_name', descriptionKey: 'product_ftira_hlou_desc' },
  { id: 19, slug: 'makroudh-3assel', category: 'honeyed', price: 30.00, image: 'https://i.ytimg.com/vi/XnASG7janyw/maxresdefault.jpg', nameKey: 'product_makroudh_3assel_name', descriptionKey: 'product_makroudh_3assel_desc' },
  { id: 20, slug: 'kaak-zohra', category: 'dry', price: 28.00, image: 'https://i.ytimg.com/vi/3EQm9BzgJ7s/maxresdefault.jpg', nameKey: 'product_kaak_zohra_name', descriptionKey: 'product_kaak_zohra_desc' },
];
