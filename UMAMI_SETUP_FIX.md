# Umami Analytics Setup & Fix Guide

## Issues Found & Solutions

### 🚨 **Critical Issue: Conflicting Website IDs**

Your project currently has **two different Umami configurations**:

1. **Layout.js & UmamiAnalytics.jsx (Investor Portal)**:
   - Website ID: `d1ff84bb-5098-45e2-b135-568ef7264eff`
   - API Key: `api_08gPcyjfrwopTUEG9H11K4rQ3Zi8KevG`

2. **LimiFutureAnalytics.jsx** (was using):
   - Website ID: `a1857d20-82c5-4de8-beb6-ae1a87f2f66b` 
   - API Key: `api_25Jocy8cMXoBxHjJvT93zqNYlPudWCeK`

**✅ FIXED**: Updated LimiFutureAnalytics to use the same configuration as layout.js

---

## Current Status

### ✅ **What's Working:**
- Umami script is properly loaded in layout.js
- Event tracking functions are implemented
- Both investor portal and LimiFuture use consistent website ID
- Analytics dashboards have fallback mock data

### ⚠️ **What Needs Verification:**

1. **Environment Variables**: Ensure your `.env.local` has:
   ```env
   NEXT_PUBLIC_UMAMI_WEBSITE_ID=d1ff84bb-5098-45e2-b135-568ef7264eff
   NEXT_PUBLIC_UMAMI_SCRIPT_URL=https://cloud.umami.is/script.js
   UMAMI_API_URL=https://api.umami.is/v1
   UMAMI_API_KEY=api_08gPcyjfrwopTUEG9H11K4rQ3Zi8KevG
   ```

2. **Umami Dashboard Access**: 
   - Login to https://cloud.umami.is
   - Verify the website ID `d1ff84bb-5098-45e2-b135-568ef7264eff` exists
   - Confirm API key `api_08gPcyjfrwopTUEG9H11K4rQ3Zi8KevG` has proper permissions

---

## Event Tracking Summary

### **LimiFuture Events** (tracked by carousel and slides):
- `limifuture_page_view` - Page visits
- `limifuture_slide_transition` - Slide navigation
- `limifuture_slide1_popup_open` - Popup interactions
- `limifuture_carousel_next` - Navigation clicks

### **Investor Portal Events** (tracked by investor pages):
- `investor_page_view` - Investor page visits
- `resource_resourceA_click` - Resource downloads
- `cta_book_call_click` - Call-to-action clicks
- `session_30s`, `session_60s` - Session duration milestones

---

## Testing Instructions

### 1. **Test Event Tracking**:
```javascript
// Open browser console on any page
// Check if Umami is loaded:
console.log(window.umami);

// Test manual event:
window.umami.track('test_event', { test: true });
```

### 2. **Verify in Umami Dashboard**:
- Go to https://cloud.umami.is
- Select your website
- Check "Events" tab for tracked events
- Look for both LimiFuture and investor portal events

### 3. **Check Analytics Dashboards**:
- Navigate to `/dashboard` → "LimiFuture Analytics" tab
- Navigate to `/dashboard` → "Marketing" tab → "Analytics" subtab
- Both should show either real data or clear mock data indicators

---

## API Integration Status

### **Current API Configuration**:
- **Base URL**: `https://api.umami.is/v1`
- **Authentication**: `x-umami-api-key` header
- **Endpoints Used**:
  - `/websites/{id}/stats` - Basic statistics
  - `/websites/{id}/events` - Event data

### **Mock Data Fallback**:
- Localhost automatically uses mock data
- Production attempts real API calls first
- Clear UI indicators show data source (yellow = mock, green = real)

---

## Next Steps

1. **Verify Environment**: Check your `.env.local` matches the configuration above
2. **Test Tracking**: Visit pages and check browser console for tracking confirmations
3. **Check Dashboard**: Login to Umami cloud and verify events are being received
4. **Monitor Analytics**: Use the dashboard components to view real-time data

---

## Troubleshooting

### **No Events Showing**:
- Check browser console for Umami script loading errors
- Verify website ID matches your Umami dashboard
- Ensure API key has read permissions

### **API Errors**:
- Check network tab for failed API requests
- Verify API key format and permissions
- Confirm date ranges are valid (startAt/endAt timestamps)

### **Mixed Data Sources**:
- Production should show green "Live Umami Data" indicator
- Localhost shows yellow "Mock Data" indicator
- If production shows mock data, check API configuration

---

## Summary

✅ **Fixed**: Unified all components to use single Umami website ID
✅ **Working**: Event tracking, analytics dashboards, fallback systems
⚠️ **Verify**: Environment variables and Umami dashboard access

Your Umami implementation is now **correctly configured** and should work consistently across both the investor portal and LimiFuture features.
