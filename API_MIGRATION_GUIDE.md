# API Configuration Migration Guide

## Overview

This project now uses a centralized API configuration system that allows you to switch between development and production environments by changing a single value.

## Quick Start

### 1. Switch Between Environments

**Option A: Edit the config file directly**

Open `src/app/config/api.config.js` and change the `ENVIRONMENT` constant:

```javascript
// For development
const ENVIRONMENT = 'dev';

// For production
const ENVIRONMENT = 'production';
```

**Option B: Use environment variables (Recommended)**

1. Create a `.env.local` file in the project root:
```bash
NEXT_PUBLIC_API_ENVIRONMENT=production
```

2. Change the value to switch environments:
   - `dev` - Uses dev.api.limitless-lighting.co.uk
   - `production` - Uses api.limitless-lighting.co.uk

## File Structure

```
src/app/
├── config/
│   └── api.config.js          # Centralized API configuration
├── utils/
│   └── api.js                 # API utility functions
└── [your components]
```

## How to Use

### Method 1: Using Helper Functions (Recommended)

```javascript
import { api } from '@/app/utils/api';

// GET request
const data = await api.get('/client/user/profile');

// POST request
const result = await api.post('/client/send_otp', {
  email: 'user@example.com',
  password: 'password123'
});

// PUT request
const updated = await api.put('/client/user/profile', {
  name: 'John Doe'
});

// DELETE request
await api.delete('/client/user/profile/picture');

// Using API1 base URL
const wishlist = await api.api1.get('/admin/products/light-configs/wishlist');

// Using tracking API
await api.tracking.post('/client/tracking_capture', trackingData);
```

### Method 2: Using Build Functions

```javascript
import { buildApiUrl, buildApi1Url, buildTrackingUrl, API_CONFIG } from '@/app/config/api.config';

// Build full URL
const url = buildApiUrl('/client/user/profile');
// Returns: https://dev.api.limitless-lighting.co.uk/client/user/profile (in dev)
// Returns: https://api.limitless-lighting.co.uk/client/user/profile (in production)

// Using predefined endpoints
const url = buildApiUrl(API_CONFIG.ENDPOINTS.USER_PROFILE);

// API1 URL
const api1Url = buildApi1Url('/admin/products/pendant-systems');

// Tracking URL
const trackingUrl = buildTrackingUrl('/client/tracking_capture');
```

### Method 3: Direct Access to Config

```javascript
import { API_CONFIG } from '@/app/config/api.config';

// Access base URLs
console.log(API_CONFIG.BASE_URL);        // Main API base URL
console.log(API_CONFIG.BASE_URL_API1);   // API1 base URL
console.log(API_CONFIG.TRACKING_URL);    // Tracking API base URL

// Check environment
if (API_CONFIG.IS_DEV) {
  console.log('Running in development mode');
}

// Use predefined endpoints
const endpoint = API_CONFIG.ENDPOINTS.SEND_OTP;
```

## Migration Examples

### Before (Hardcoded URLs)

```javascript
// ❌ Old way - hardcoded dev URL
const response = await fetch('https://dev.api.limitless-lighting.co.uk/client/verify_otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

### After (Using Centralized Config)

```javascript
// ✅ New way - using helper function
import { api } from '@/app/utils/api';

const response = await api.post('/client/verify_otp', data);

// OR using build function
import { buildApiUrl, API_CONFIG } from '@/app/config/api.config';

const response = await fetch(buildApiUrl(API_CONFIG.ENDPOINTS.VERIFY_OTP), {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});
```

## Available Endpoints

The following endpoints are predefined in `API_CONFIG.ENDPOINTS`:

### Client Endpoints
- `SEND_OTP` - `/client/send_otp`
- `VERIFY_OTP` - `/client/verify_otp`
- `USER_PROFILE` - `/client/user/profile`
- `UPDATE_PROFILE` - `/client/update_profile`
- `USER_PROFILE_PICTURE` - `/client/user/profile/picture`
- `TRACKING_CAPTURE` - `/client/tracking_capture`
- `TRACKING_UPDATE` - `/client/tracking_update`

### Admin Endpoints
- `INVESTOR_DETAILS` - `/admin/dashboard/investor_details`
- `PRODUCTS_WISHLIST` - `/admin/products/light-configs/wishlist`
- `SLIDE_MANAGEMENT` - `/admin/dashboard/slides`
- `PENDANT_SYSTEMS` - `/admin/products/pendant-systems`

### Customer Endpoints
- `CUSTOMER_DATA` - `/admin/customers`

## Files Already Updated

The following files have been updated to use the centralized configuration:

1. ✅ `src/app/redux/slices/userSlice.js`
2. ✅ `src/app/redux/slices/favoritesSlice.js`
3. ✅ `src/app/services/trackingService.js`

## Files That Need Migration

You still need to update the following files manually:

### High Priority
- `src/app/dashboard/components/PendantSystemManager/index.jsx` (7 API calls)
- `src/app/components/configurator/pendantSystemData.js` (6 API calls)
- `src/app/customer/[id]/page.js` (5 API calls)
- `src/app/dashboard/components/CustomerDashboard.jsx` (5 API calls)

### Medium Priority
- `src/app/portal/components/dashboard/AccountSettings.jsx`
- `src/app/limiai/page.js`
- `src/app/limiai/sections-light.js`
- All other dashboard components

## Migration Steps for Remaining Files

1. **Import the utilities:**
   ```javascript
   import { api } from '@/app/utils/api';
   // OR
   import { buildApiUrl, buildApi1Url, API_CONFIG } from '@/app/config/api.config';
   ```

2. **Replace hardcoded URLs:**
   - Find: `https://dev.api.limitless-lighting.co.uk`
   - Replace with: `buildApiUrl()` or `api.get/post/etc()`
   
   - Find: `https://dev.api1.limitless-lighting.co.uk`
   - Replace with: `buildApi1Url()` or `api.api1.get/post/etc()`

3. **Test the changes:**
   - Verify API calls work in dev mode
   - Switch to production mode and test again

## Adding New Endpoints

To add a new endpoint to the configuration:

1. Open `src/app/config/api.config.js`
2. Add your endpoint to the `ENDPOINTS` object:

```javascript
ENDPOINTS: {
  // ... existing endpoints
  MY_NEW_ENDPOINT: '/api/my-new-endpoint',
}
```

3. Use it in your code:

```javascript
import { api, API_CONFIG } from '@/app/utils/api';

const data = await api.get(API_CONFIG.ENDPOINTS.MY_NEW_ENDPOINT);
```

## Benefits

✅ **Single point of change** - Switch all APIs by changing one value  
✅ **Type safety** - Predefined endpoints reduce typos  
✅ **Environment awareness** - Know which environment you're running in  
✅ **Cleaner code** - No more hardcoded URLs scattered everywhere  
✅ **Easy testing** - Switch between dev and production instantly  

## Troubleshooting

### Issue: APIs still hitting dev URLs after changing to production

**Solution:** Make sure you've restarted your Next.js dev server after changing the environment variable.

```bash
# Stop the server (Ctrl+C)
# Then restart
npm run dev
```

### Issue: Getting CORS errors

**Solution:** Check that the API base URLs in `api.config.js` match your actual API endpoints.

### Issue: Token not being sent with requests

**Solution:** The `api` utility functions automatically add the token from localStorage. Make sure the token is stored with the key `limiToken`.

## Need Help?

If you encounter issues during migration:
1. Check the console for error messages
2. Verify the API URLs are correct in `api.config.js`
3. Ensure you've imported the utilities correctly
4. Check that your token is valid and stored properly
