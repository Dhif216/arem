# Google Analytics Setup Guide

## 🎯 Overview

This site now includes:
- **Cookie Consent Banner** (GDPR/Privacy compliant)
- **Google Analytics 4 (GA4)** tracking with consent mode
- **Privacy Policy** page (`/privacy`)
- Consent preferences stored in `localStorage`

---

## 📊 Setting Up Google Analytics

### Step 1: Create a GA4 Property

1. Go to [Google Analytics](https://analytics.google.com/)
2. Click **Admin** (bottom left)
3. Under **Property**, click **Create Property**
4. Enter your website details:
   - **Property name:** Sweet Chebbi
   - **Reporting time zone:** (GMT+1:00) Tunis
   - **Currency:** Tunisian Dinar (TND)
5. Click **Next** and complete the setup wizard
6. Select **Web** as the platform
7. Add your website URL: `https://sweetchebbi.com`
8. Copy your **Measurement ID** (format: `G-XXXXXXXXXX`)

### Step 2: Add Your Measurement ID

Open `src/components/CookieConsent.tsx` and replace the placeholder:

```typescript
// Line 56 - Replace this:
const GA_MEASUREMENT_ID = 'G-XXXXXXXXXX'; // TODO: Add your GA4 ID here

// With your actual ID:
const GA_MEASUREMENT_ID = 'G-ABC123DEF4'; // Example
```

### Step 3: Deploy

Once you've added your Measurement ID:

```bash
npm run build
git add -A
git commit -m "feat: add Google Analytics tracking ID"
git push origin main
```

---

## 🍪 How Cookie Consent Works

### User Flow

1. **First Visit:** Banner appears at bottom of screen
2. **User Clicks "Accept":**
   - Consent saved to `localStorage` as `cookie_consent: 'accepted'`
   - Google Analytics script loads
   - Tracking begins
3. **User Clicks "Decline":**
   - Consent saved as `cookie_consent: 'declined'`
   - No tracking scripts load
   - Banner disappears

### Consent Mode (Privacy-First)

The implementation uses **Google Consent Mode v2**:

- **Default state:** All tracking DENIED
- **After acceptance:** `analytics_storage: granted`
- **IP Anonymization:** Enabled by default
- **Cookie flags:** `SameSite=None;Secure`

---

## 📈 What Gets Tracked

When users accept cookies, GA4 tracks:

- **Page views** (all routes via React Router)
- **Session duration**
- **User demographics** (age, gender, location - anonymized)
- **Traffic sources** (how users find your site)
- **Device/browser information**
- **Events** (can be customized later)

### Adding Custom Events (Optional)

You can track specific actions like "WhatsApp Order Clicked":

```typescript
// In any component
if (window.gtag) {
  window.gtag('event', 'whatsapp_order', {
    product_name: 'Baklawa',
    price: 28.00
  });
}
```

---

## 🔒 Privacy & Compliance

### GDPR Compliance

✅ **Explicit Consent:** Users must actively accept cookies  
✅ **Opt-out Option:** Decline button available  
✅ **Privacy Policy:** Full disclosure at `/privacy`  
✅ **Data Control:** Users can clear consent via browser localStorage  

### For Tunisia (INPDP)

The site complies with Tunisia's **Instance Nationale de Protection des Données Personnelles** by:
- Requiring explicit consent before tracking
- Providing clear privacy information
- Allowing users to opt-out

---

## 🧪 Testing

### Test Cookie Banner

1. Open site in incognito/private mode
2. Banner should appear at bottom
3. Click "Accept" → banner disappears, GA loads
4. Open DevTools → Application → Local Storage → verify `cookie_consent: 'accepted'`

### Test Analytics

1. After accepting cookies, browse the site
2. Go to GA4 → Reports → Realtime
3. You should see your session appear within ~30 seconds

### Reset Consent (for testing)

Open browser console and run:
```javascript
localStorage.removeItem('cookie_consent');
location.reload();
```

---

## 📁 Files Modified

- `src/components/CookieConsent.tsx` - Main consent banner
- `src/components/CookieConsent.css` - Banner styling
- `src/pages/Privacy.tsx` - Privacy policy page
- `src/App.tsx` - Route for `/privacy` + CookieConsent component
- `src/components/Footer.tsx` - Privacy policy link
- `public/locales/fr/translation.json` - French translations
- `public/locales/tn/translation.json` - Arabic translations

---

## 🚀 Next Steps (Optional Enhancements)

1. **Google Tag Manager:** For easier event tracking without code changes
2. **Enhanced E-commerce:** Track product views, add-to-cart events
3. **Conversion Goals:** Set up goals for WhatsApp clicks, form submissions
4. **Heat Maps:** Add tools like Hotjar for visual user behavior
5. **A/B Testing:** Test different CTAs, layouts

---

## 📞 Support

For questions about analytics setup, contact your developer or refer to:
- [Google Analytics Help](https://support.google.com/analytics)
- [GA4 Setup Guide](https://support.google.com/analytics/answer/9304153)
