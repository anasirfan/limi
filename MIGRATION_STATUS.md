# API Migration Status

## ✅ Completed Files

The following files have been successfully migrated to use the centralized API configuration:

### Redux Slices
- ✅ `src/app/redux/slices/userSlice.js` - All API calls updated
- ✅ `src/app/redux/slices/favoritesSlice.js` - All API calls updated

### Services
- ✅ `src/app/services/trackingService.js` - Tracking API updated

### Portal Components
- ✅ `src/app/portal/components/PortalLogin.jsx` - Forgot password APIs updated
- ✅ `src/app/portal/components/CustomerDashboard.jsx` - Profile API updated
- ✅ `src/app/portal/components/dashboard/SavedConfigurations.jsx` - Configuration APIs updated
- ✅ `src/app/portal/components/dashboard/AccountSettings.jsx` - All profile/settings APIs updated

### Pages
- ✅ `src/app/limiai/page.js` - Investor details API updated
- ✅ `src/app/limiai/sections-light.js` - Investor details API updated
- ✅ `src/app/customer/[id]/page.js` - Customer and slideshow APIs updated
- ✅ `src/app/contact-us/page.js` - Contact API updated

### Dashboard Components (Partial)
- ✅ `src/app/dashboard/components/CustomerDashboard.jsx` - Import added (URLs need manual update)

---

## ⚠️ Files That Still Need Migration

The following files contain hardcoded API URLs and need to be updated manually:

### High Priority - Dashboard Components

#### `src/app/dashboard/components/CustomerDashboard.jsx` (14 API calls)
Replace these URLs:
```javascript
// Find and replace:
"https://dev.api1.limitless-lighting.co.uk/admin/configurator/system"
→ buildApi1Url('/admin/configurator/system')

"https://dev.api1.limitless-lighting.co.uk/client/user/community/subscriptions"
→ buildApi1Url('/client/user/community/subscriptions')

"https://dev.api1.limitless-lighting.co.uk/client/user/contact-messages"
→ buildApi1Url('/client/user/contact-messages')

"https://dev.api1.limitless-lighting.co.uk/client/user/distributor/contact"
→ buildApi1Url('/client/user/distributor/contact')

"https://api.limitless-lighting.co.uk/client/get_user_capture"
→ buildApiUrl('/client/get_user_capture')

"https://api.limitless-lighting.co.uk/client/get_customer_details/"
→ buildApiUrl('/client/get_customer_details/')

"https://api.limitless-lighting.co.uk/client/customer_capture/${deleteConfirmation._id}"
→ buildApiUrl(`/client/customer_capture/${deleteConfirmation._id}`)
```

#### `src/app/dashboard/components/PendantSystemManager/index.jsx` (7 API calls)
Replace these URLs:
```javascript
"https://dev.api1.limitless-lighting.co.uk/admin/configurator/system"
→ buildApi1Url('/admin/configurator/system')

"https://dev.api1.limitless-lighting.co.uk/admin/configurator/mount"
→ buildApi1Url('/admin/configurator/mount')

"https://dev.api1.limitless-lighting.co.uk/admin/configurator/scene"
→ buildApi1Url('/admin/configurator/scene')
```

#### `src/app/dashboard/components/SlideManagement.jsx` (3 API calls)
```javascript
`https://dev.api1.limitless-lighting.co.uk/admin/slide/customers/${profileId}/slideshows`
→ buildApi1Url(`/admin/slide/customers/${profileId}/slideshows`)

"https://dev.api1.limitless-lighting.co.uk/admin/slide/slideshows"
→ buildApi1Url('/admin/slide/slideshows')
```

#### `src/app/dashboard/components/SlideManagement/EditModal.jsx` (1 API call)
```javascript
'https://dev.api1.limitless-lighting.co.uk/admin/slide/upload-media'
→ buildApi1Url('/admin/slide/upload-media')
```

#### `src/app/dashboard/components/SlideManagement/DuplicateSlideModal.jsx` (2 API calls)
```javascript
'https://api.limitless-lighting.co.uk/client/get_customer_details/'
→ buildApiUrl('/client/get_customer_details/')

`https://dev.api1.limitless-lighting.co.uk/admin/slide/customers/${customerId}/slideshows`
→ buildApi1Url(`/admin/slide/customers/${customerId}/slideshows`)
```

#### `src/app/dashboard/components/SlideManagement/AddCustomerModal.jsx` (1 API call)
```javascript
'https://api.limitless-lighting.co.uk/client/customer_capture'
→ buildApiUrl('/client/customer_capture')
```

#### `src/app/dashboard/components/SlideInsights.jsx` (1 API call)
```javascript
`https://dev.api1.limitless-lighting.co.uk/client/user/slide_shows/analytics?customerId=${customerId}`
→ buildApi1Url(`/client/user/slide_shows/analytics?customerId=${customerId}`)
```

#### `src/app/dashboard/components/InvestorDetails.jsx` (1 API call)
```javascript
"https://dev.api1.limitless-lighting.co.uk/admin/dashboard/investor_details"
→ buildApi1Url(API_CONFIG.ENDPOINTS.INVESTOR_DETAILS)
```

---

## 📝 Migration Steps for Remaining Files

For each file listed above:

1. **Add the import at the top:**
   ```javascript
   import { buildApi1Url, buildApiUrl, API_CONFIG } from '../../config/api.config';
   // Adjust the path based on file location
   ```

2. **Replace hardcoded URLs:**
   - Use `buildApiUrl()` for `api.limitless-lighting.co.uk`
   - Use `buildApi1Url()` for `api1.limitless-lighting.co.uk`
   - Use predefined endpoints from `API_CONFIG.ENDPOINTS` when available

3. **Test the changes:**
   - Verify the API calls work correctly
   - Check console for any errors

---

## 🔍 Find Remaining URLs

Run this command to find all remaining hardcoded URLs:

```bash
node scripts/find-api-calls.js
```

Or use grep:

```bash
# Windows PowerShell
Get-ChildItem -Path src -Recurse -Include *.js,*.jsx | Select-String "https://dev.api|https://api.limitless"

# Linux/Mac
grep -r "https://dev.api\|https://api.limitless" src/
```

---

## 📊 Progress Summary

- **Total Files Identified:** ~29 files
- **Files Migrated:** 12 files ✅
- **Files Remaining:** ~17 files ⚠️
- **Progress:** ~41% complete

---

## 🎯 Next Steps

1. Update the remaining dashboard components (highest priority)
2. Test all API calls in development environment
3. Switch to production environment and test again
4. Remove this file once migration is complete

---

## 💡 Quick Reference

**Switch to Production:**
```javascript
// Edit: src/app/config/api.config.js
const ENVIRONMENT = 'production';

// OR create .env.local:
NEXT_PUBLIC_API_ENVIRONMENT=production
```

**Then restart your dev server!**
