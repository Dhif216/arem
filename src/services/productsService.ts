import { db, storage } from '../firebase';
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export type Category = 'honeyed' | 'dry' | 'seasonal' | 'other';

export interface FirestoreProduct {
  id?: string; // Firestore doc id
  slug: string;
  category: Category;
  price: number;
  image: string; // URL
  name_fr: string;
  name_tn: string;
  desc_fr: string;
  desc_tn: string;
  featured?: boolean;
  active: boolean; // soft delete flag
  createdAt?: any;
  updatedAt?: any;
}

const PRODUCTS_COL = collection(db, 'products');

// Helpers
export const slugify = (str: string) =>
  str
    .toString()
    .toLowerCase()
    .normalize('NFD').replace(/\p{Diacritic}/gu, '')
    .replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

// CRUD operations
export const createProduct = async (p: Omit<FirestoreProduct, 'id' | 'active'>) => {
  const docRef = await addDoc(PRODUCTS_COL, {
    ...p,
    active: true,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
};

export const updateProductById = async (id: string, p: Partial<FirestoreProduct>) => {
  const d = doc(db, 'products', id);
  await updateDoc(d, { ...p, updatedAt: serverTimestamp() });
};

export const deleteProductById = async (id: string) => {
  const d = doc(db, 'products', id);
  await deleteDoc(d);
};

export const softDeleteProductById = async (id: string) => {
  const d = doc(db, 'products', id);
  await updateDoc(d, { active: false, updatedAt: serverTimestamp() });
};

export const getActiveProducts = async (): Promise<FirestoreProduct[]> => {
  const q = query(PRODUCTS_COL, where('active', '==', true));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
};

export const getAllProducts = async (): Promise<FirestoreProduct[]> => {
  const snap = await getDocs(PRODUCTS_COL);
  return snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
};

export const subscribeActiveProducts = (
  cb: (products: FirestoreProduct[]) => void
) => {
  const q = query(PRODUCTS_COL, where('active', '==', true), orderBy('createdAt', 'desc'));
  return onSnapshot(q,
    (snap) => {
      const items = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
      cb(items as FirestoreProduct[]);
    },
    (error) => {
      console.error('Firestore subscription error:', error);
      cb([]);
    }
  );
};

export const subscribeAllProducts = (
  cb: (products: FirestoreProduct[]) => void
) => {
  const q = query(PRODUCTS_COL, orderBy('createdAt', 'desc'));
  return onSnapshot(q, 
    (snap) => {
      const items = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
      cb(items as FirestoreProduct[]);
    },
    (error) => {
      console.error('Firestore subscription error:', error);
      // Call callback with empty array on error so UI can handle it
      cb([]);
    }
  );
};

export const getProductBySlug = async (slug: string): Promise<FirestoreProduct | null> => {
  const all = await getActiveProducts();
  return all.find(p => p.slug === slug) || null;
};

// Image upload to Firebase Storage
export const uploadProductImage = async (file: File): Promise<string> => {
  // Validate file type
  const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml', 'image/bmp'];
  if (!validTypes.includes(file.type) && !file.type.startsWith('image/')) {
    throw new Error('Type de fichier non supporté. Utilisez JPG, PNG, GIF, WEBP ou SVG.');
  }
  
  // Sanitize filename
  const safeName = file.name.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const timestamp = Date.now();
  const random = Math.random().toString(36).slice(2, 8);
  const path = `products/${timestamp}-${random}-${safeName}`;
  const storageRef = ref(storage, path);
  
  try {
    console.log('Uploading to Storage:', path, 'Type:', file.type, 'Size:', file.size);
    const snapshot = await uploadBytes(storageRef, file, {
      contentType: file.type || 'image/jpeg',
      customMetadata: {
        originalName: file.name,
        uploadedAt: new Date().toISOString(),
      },
    });
    console.log('Upload complete, getting download URL...');
    const url = await getDownloadURL(snapshot.ref);
    console.log('Download URL:', url);
    return url;
  } catch (err) {
    console.error('Storage upload error:', err);
    if (err instanceof Error) {
      throw new Error(`Échec du téléversement: ${err.message}`);
    }
    throw new Error('Échec du téléversement de l\'image');
  }
};
