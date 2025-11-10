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

### 3. **Data Persistence**
- All product changes are saved to browser localStorage
- Changes persist across browser sessions
- Initial load uses default products from `products.ts`
- Once modified, admin changes take priority

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

- Login credentials are hardcoded (username: RouaDhif, password: Roua4488)
- Authentication token stored in localStorage
- No backend - all data stored in browser
- For production use, consider implementing:
  - Backend API for product management
  - Database storage (MongoDB, PostgreSQL, etc.)
  - Proper authentication (JWT, OAuth)
  - File upload for images

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
