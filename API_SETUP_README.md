# 🚀 Centralized API Configuration Setup

## What's New?

Your project now has a **centralized API configuration system** that allows you to switch between development and production environments instantly!

## 📁 New Files Created

```
limi/
├── src/app/
│   ├── config/
│   │   └── api.config.js          ← Main configuration file
│   └── utils/
│       └── api.js                 ← Helper functions for API calls
├── scripts/
│   └── find-api-calls.js          ← Script to find remaining hardcoded URLs
├── .env.local.example             ← Environment variable template
├── API_MIGRATION_GUIDE.md         ← Detailed migration guide
├── API_QUICK_REFERENCE.md         ← Quick reference cheat sheet
└── API_SETUP_README.md            ← This file
```

## ⚡ Quick Start (2 Steps)

### Step 1: Choose Your Environment

**Option A - Direct Config (Simplest):**
```javascript
// Edit: src/app/config/api.config.js
const ENVIRONMENT = 'production'; // Change to 'dev' or 'production'
```

**Option B - Environment Variable (Recommended):**
```bash
# Create .env.local file
echo NEXT_PUBLIC_API_ENVIRONMENT=production > .env.local
```

### Step 2: Restart Your Dev Server
```bash
# Press Ctrl+C to stop
npm run dev
```

**That's it!** All your API calls will now use the correct environment.

---

## 🎯 Current Status

### ✅ Already Migrated
- `userSlice.js` - Login, signup, profile management
- `favoritesSlice.js` - Wishlist functionality
- `trackingService.js` - Analytics tracking

### 📝 Need Migration
Run this command to see which files still need updating:
```bash
node scripts/find-api-calls.js
```

---

## 💡 How to Use in Your Code

### Before (Old Way) ❌
```javascript
const response = await fetch('https://dev.api.limitless-lighting.co.uk/client/verify_otp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email, password })
});
```

### After (New Way) ✅
```javascript
import { api } from '@/app/utils/api';

const response = await api.post('/client/verify_otp', { email, password });
```

**Benefits:**
- ✅ Automatically uses correct environment
- ✅ Handles authentication tokens
- ✅ Cleaner, shorter code
- ✅ Built-in error handling

---

## 📚 Documentation

| File | Purpose |
|------|---------|
| **API_QUICK_REFERENCE.md** | Quick copy-paste examples |
| **API_MIGRATION_GUIDE.md** | Detailed migration instructions |
| **scripts/find-api-calls.js** | Find files that need updating |

---

## 🔧 Common Tasks

### Switch to Production
```bash
# Edit .env.local
NEXT_PUBLIC_API_ENVIRONMENT=production

# Restart server
npm run dev
```

### Switch to Development
```bash
# Edit .env.local
NEXT_PUBLIC_API_ENVIRONMENT=dev

# Restart server
npm run dev
```

### Find Files to Migrate
```bash
node scripts/find-api-calls.js
```

### Add New Endpoint
```javascript
// Edit: src/app/config/api.config.js
ENDPOINTS: {
  // ... existing
  MY_NEW_ENDPOINT: '/api/my-endpoint',
}

// Use it:
import { api, API_CONFIG } from '@/app/utils/api';
const data = await api.get(API_CONFIG.ENDPOINTS.MY_NEW_ENDPOINT);
```

---

## 🌍 Environment URLs

| Environment | Main API | API1 | Tracking |
|------------|----------|------|----------|
| **Development** | dev.api.limitless-lighting.co.uk | dev.api1.limitless-lighting.co.uk | api.limitless-lighting.co.uk |
| **Production** | api.limitless-lighting.co.uk | api1.limitless-lighting.co.uk | api.limitless-lighting.co.uk |

---

## ❓ FAQ

**Q: Do I need to update all files at once?**  
A: No! The system is backward compatible. Update files gradually as you work on them.

**Q: Will this break existing code?**  
A: No! Already migrated files work with the new system. Unmigrated files continue using their hardcoded URLs.

**Q: How do I know which environment I'm using?**  
A: Check the console or use:
```javascript
import { API_CONFIG } from '@/app/config/api.config';
console.log('Environment:', API_CONFIG.ENVIRONMENT);
```

**Q: Can I override URLs for specific cases?**  
A: Yes! You can still use custom URLs when needed:
```javascript
const response = await fetch('https://custom-api.com/endpoint', options);
```

---

## 🆘 Need Help?

1. **Quick examples** → See `API_QUICK_REFERENCE.md`
2. **Detailed guide** → See `API_MIGRATION_GUIDE.md`
3. **Find unmigrated files** → Run `node scripts/find-api-calls.js`

---

## 🎉 Benefits

✅ **One-click environment switching** - Change one value, update all APIs  
✅ **No more find & replace** - Never manually update URLs again  
✅ **Cleaner code** - Shorter, more readable API calls  
✅ **Type safety** - Predefined endpoints reduce typos  
✅ **Better DX** - Easier to maintain and debug  

---

**Ready to migrate?** Start with `API_QUICK_REFERENCE.md` for quick examples! 🚀
