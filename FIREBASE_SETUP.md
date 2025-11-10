# Firebase Configuration Required

## Missing App ID

Your `.env` file has a placeholder `App ID`. To fix the blank admin dashboard and enable image uploads:

### Steps to Get Real Firebase App ID:

1. Go to: https://console.firebase.google.com/project/tunisian-sweets-3d860/settings/general

2. Scroll down to "Your apps" section

3. Find your web app (or click "Add app" → Web if none exists)

4. Copy the **App ID** (format: `1:286297710207:web:XXXXXXXXXXXX`)

5. Update your local `.env` file:
   ```
   VITE_FIREBASE_APP_ID=1:286297710207:web:YOUR_REAL_APP_ID_HERE
   ```

6. **Restart the dev server** (Vite only reads env at startup):
   ```bash
   npm run dev
   ```

## Testing Locally

After updating `.env`, test:
- http://localhost:5174/admin/login → login with RouaDhif / Roua4488
- Dashboard should load product list
- Click "Ajouter un produit" → fill form → upload image from device
- Product should appear in dashboard AND on /products page

## Image Upload Supported Types

- JPG / JPEG
- PNG
- GIF
- WEBP
- SVG
- BMP

Max size: 5MB

## Troubleshooting

### Dashboard is blank
- Check browser console for errors (F12 → Console)
- Verify App ID is correct (not placeholder XXXX)
- Ensure Firebase Storage rules allow authenticated writes

### Image upload fails
- Check console for detailed error message
- Verify Storage bucket is `tunisian-sweets-3d860.appspot.com` (not firebasestorage.app)
- Ensure anonymous auth is enabled OR update Storage rules to allow writes

### Products don't sync to shop
- Both pages use Firestore real-time listeners
- Changes should appear within 1-2 seconds
- Check if products have `active: true` flag
