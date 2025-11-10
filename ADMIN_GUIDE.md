# Admin Dashboard Guide

## 🔐 Access Information

**Admin Login URL:** `https://sweetchebbi.com/admin/login`

**Credentials:**
- **Username:** `RouaDhif`
- **Password:** `Roua4488`

---

## 📊 Features

### 1. **Authentication**
- Secure login with username and password
- Session persistence using localStorage
- Protected routes - dashboard only accessible when logged in
- Logout functionality

### 2. **Product Management (CRUD)**

#### ➕ Add New Product
1. Click "➕ Ajouter un produit" button
2. Fill in the form:
   - **Nom (Français)** - Product name in French
   - **Nom (Arabe)** - Product name in Arabic (right-to-left)
   - **Description (Français)** - Description in French
   - **Description (Arabe)** - Description in Arabic
   - **Prix (TND)** - Price in Tunisian Dinars
   - **Catégorie** - Select category (makroud, baklava, zlabia, kaak, autres)
   - **URL de l'image** - Image URL (can be local `/media/...` or external URL)
   - **Produit vedette** - Check to feature on homepage
3. Click "➕ Ajouter" to save

#### ✏️ Edit Product
1. Click the ✏️ (edit) button next to any product
2. Modify the fields as needed
3. Click "💾 Mettre à jour" to save changes

#### 🗑️ Delete Product
1. Click the 🗑️ (delete) button next to any product
2. Confirm deletion in the popup
3. Product will be removed immediately

### 3. **Data Persistence (Firebase)**
- All product changes are saved in Firebase **Firestore** (cloud database)
- Images are stored in Firebase **Storage**
- Real-time updates: public `Produits` and homepage featured section update automatically
- Local fallback: if Firestore fails, the app can fall back to bundled mock data

#### Environment Variables (.env)
Create a `.env` (never commit) based on `.env.example` and fill the `VITE_FIREBASE_*` values.

Key points:
- `VITE_FIREBASE_API_KEY` is now rotated; restrict by HTTP referrer (sweetchebbi.com + localhost) in Google Cloud Console
- Ensure `VITE_FIREBASE_STORAGE_BUCKET` ends with `.appspot.com` (NOT `firebasestorage.app`)
- Rebuild or restart dev after changes (Vite loads env at startup)

#### Common Error: `net::ERR_NAME_NOT_RESOLVED`
Cause: Wrong `VITE_FIREBASE_STORAGE_BUCKET` value.
Fix: Set it to `PROJECT_ID.appspot.com` then rebuild.

#### Upcoming Security Upgrade
- Current login is still hardcoded (temporary)
- Planned: Replace with Firebase Authentication (email/password) and update Firestore security rules to restrict writes to the admin account only.

---

## 🎨 Dashboard Overview

### Header
- Shows dashboard title with icon
- Displays logged-in username
- Logout button to end session

### Product Count
- Shows total number of products
- Updates automatically when products are added/deleted

### Product Table
- **Image** - Product thumbnail
- **Nom** - Name in both languages
- **Catégorie** - Product category with badge
- **Prix** - Price in TND
- **Vedette** - Star icon (⭐) for featured products
- **Actions** - Edit and Delete buttons

---

## 💡 Tips

1. **Image URLs:**
   - Use local images: `/media/products/yourimage.jpg`
   - Or external URLs: `https://example.com/image.jpg`
   - Preview appears after entering URL

2. **Bilingual Content:**
   - Always fill both French and Arabic fields
   - Arabic text automatically displays right-to-left

3. **Featured Products:**
   - Check "Produit vedette" to show on homepage
   - Limit featured products for better presentation

4. **Categories:**
   - Keep products organized by type
   - Use "autres" for special/seasonal items

5. **Price Format:**
   - Use decimals for precision (e.g., 12.50)
   - Automatically displays as "X.XX TND"

---

## 🔒 Security Notes

- Firebase now provides centralized persistence (Firestore & Storage)
- Hardcoded credentials remain (temporary) – replace with Firebase Auth soon
- API key restricted by HTTP referrers (configure in Google Cloud Console)
- Next steps:
   - Implement Firebase Auth (email/password admin)
   - Tighten Firestore security rules (allow read for all, write only for authenticated admin)
   - Disable unused Google APIs for reduced attack surface
   - Optionally enable AppCheck to reduce abuse

---

## 🚀 Accessing the Dashboard

1. Go to `https://sweetchebbi.com/admin/login`
2. Enter credentials
3. Click "Se connecter"
4. Start managing products!

---

## 📱 Mobile Responsive

The dashboard is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

---

## ⚠️ Important

- **Data is stored locally** - clearing browser data will reset products to defaults
- **No multi-user support** - single admin account only
- **No data backup** - consider exporting/importing for backup if needed

---

Built with ❤️ for Sweet Chebbi
