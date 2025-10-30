# API Configuration - Quick Reference

## 🚀 Switch Environments

### Option 1: Config File
Edit `src/app/config/api.config.js`:
```javascript
const ENVIRONMENT = 'production'; // or 'dev'
```

### Option 2: Environment Variable (Recommended)
Create `.env.local`:
```bash
NEXT_PUBLIC_API_ENVIRONMENT=production
```

---

## 📝 Usage Examples

### Simple API Calls

```javascript
import { api } from '@/app/utils/api';

// GET
const profile = await api.get('/client/user/profile');

// POST
const result = await api.post('/client/send_otp', { email, password });

// PUT
const updated = await api.put('/client/user/profile', { name: 'John' });

// PATCH
const patched = await api.patch('/client/update_profile', data);

// DELETE
await api.delete('/client/user/profile/picture');
```

### API1 Calls

```javascript
import { api } from '@/app/utils/api';

const wishlist = await api.api1.get('/admin/products/light-configs/wishlist');
const result = await api.api1.post('/admin/products/pendant-systems', data);
```

### Tracking Calls

```javascript
import { api } from '@/app/utils/api';

await api.tracking.post('/client/tracking_capture', trackingData);
```

### Build URLs Manually

```javascript
import { buildApiUrl, buildApi1Url, API_CONFIG } from '@/app/config/api.config';

// Build URL
const url = buildApiUrl('/client/user/profile');
const api1Url = buildApi1Url('/admin/products/wishlist');

// Use predefined endpoints
const url = buildApiUrl(API_CONFIG.ENDPOINTS.USER_PROFILE);

// Then use with fetch
const response = await fetch(url, { method: 'GET' });
```

---

## 🔑 Predefined Endpoints

```javascript
import { API_CONFIG } from '@/app/config/api.config';

// Client
API_CONFIG.ENDPOINTS.SEND_OTP
API_CONFIG.ENDPOINTS.VERIFY_OTP
API_CONFIG.ENDPOINTS.USER_PROFILE
API_CONFIG.ENDPOINTS.UPDATE_PROFILE
API_CONFIG.ENDPOINTS.USER_PROFILE_PICTURE
API_CONFIG.ENDPOINTS.TRACKING_CAPTURE

// Admin
API_CONFIG.ENDPOINTS.INVESTOR_DETAILS
API_CONFIG.ENDPOINTS.PRODUCTS_WISHLIST
API_CONFIG.ENDPOINTS.SLIDE_MANAGEMENT
API_CONFIG.ENDPOINTS.PENDANT_SYSTEMS
API_CONFIG.ENDPOINTS.CUSTOMER_DATA
```

---

## 🔄 Migration Pattern

### Before ❌
```javascript
const response = await fetch('https://dev.api.limitless-lighting.co.uk/client/verify_otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

### After ✅
```javascript
import { api } from '@/app/utils/api';

const response = await api.post('/client/verify_otp', data);
```

---

## 🌍 Environment Info

```javascript
import { API_CONFIG } from '@/app/config/api.config';

console.log(API_CONFIG.ENVIRONMENT);     // 'dev' or 'production'
console.log(API_CONFIG.IS_DEV);          // true/false
console.log(API_CONFIG.IS_PRODUCTION);   // true/false
console.log(API_CONFIG.BASE_URL);        // Current base URL
```

---

## 📍 Base URLs

| Environment | API Base | API1 Base |
|------------|----------|-----------|
| **dev** | `https://dev.api.limitless-lighting.co.uk` | `https://dev.api1.limitless-lighting.co.uk` |
| **production** | `https://api.limitless-lighting.co.uk` | `https://api1.limitless-lighting.co.uk` |

---

## ⚡ Pro Tips

1. **Always restart dev server** after changing environment variables
2. **Use `api` helper functions** for automatic token handling
3. **Add new endpoints** to `API_CONFIG.ENDPOINTS` for consistency
4. **Check environment** with `API_CONFIG.IS_DEV` for conditional logic
