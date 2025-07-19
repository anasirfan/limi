# 🚀 LIMI Investor Portal - Umami Analytics Setup Guide

## 📊 Overview
This guide explains how to set up and use Umami analytics for tracking investor engagement on the LIMI Investor Portal with comprehensive event tracking and bot detection.

## 🔧 Implementation Details

### 1. Umami Script Integration
The Umami tracking script has been added to your Next.js layout:

```html
<script 
  defer 
  src="https://cloud.umami.is/script.js" 
  data-website-id="d1ff84bb-5098-45e2-b135-568ef7264eff"
></script>
```

**Location**: `src/app/layout.js`

### 2. Bot Detection & Human Verification
- **Mouse Movement Detection**: Requires mouse movement to verify human visitors
- **Fallback Timer**: 3-second fallback to prevent blocking legitimate users
- **Event Filtering**: Only human-verified sessions trigger analytics events

### 3. Tracked Events

#### Core Page Events
- `investor_page_view` - Page visits (human-verified only)
- `session_end` - When user leaves the page

#### Resource Download Events
- `resource_resourceA_click` - 📄 Investor 1-Pager downloads
- `resource_resourceB_click` - 📊 Pitch Deck Excerpt views
- `resource_resourceC_click` - 🎙️ Podcast plays
- `resource_resourceD_click` - 🔍 Limi 360 Deep-Dive access

#### Engagement Events
- `cta_book_call_click` - Call booking button clicks
- `website_visit_click` - LIMI website visits from header button

#### Session Duration Events
- `session_5s` - Users who stay 5+ seconds
- `session_30s` - Users who stay 30+ seconds
- `session_60s` - Users who stay 1+ minutes
- `session_120s` - Users who stay 2+ minutes
- `session_300s` - Users who stay 5+ minutes

### 4. Event Properties
Each event includes contextual data:

```javascript
// Example: Resource click event
window.umami.track('resource_resourceA_click', {
  investor_slug: 'sequoia-capital',
  resource_id: 'resourceA',
  resource_title: '📄 Investor 1-Pager',
  resource_url: 'https://www.limilighting.com/assets/Limi_OnePager.pdf?ref=sequoia-capital'
});
```

## 🎯 Umami Dashboard Setup

### Step 1: Access Your Dashboard
1. Visit [https://cloud.umami.is](https://cloud.umami.is)
2. Log in with your credentials
3. Select your LIMI website (ID: `d1ff84bb-5098-45e2-b135-568ef7264eff`)

### Step 2: View Basic Analytics
- **Overview Tab**: Total page views, unique visitors, session duration
- **Pages Tab**: Most visited investor pages
- **Referrers Tab**: Traffic sources

### Step 3: Create Custom Event Charts
1. Go to **Events** tab
2. Click **"Create Custom Event"**
3. Set up charts for key events:

#### Resource Engagement Chart
- **Event Name**: `resource_*_click` (use wildcard)
- **Chart Type**: Bar chart
- **Group By**: Event name
- **Title**: "Resource Downloads"

#### Session Duration Funnel
- **Event Names**: `session_5s`, `session_30s`, `session_60s`, `session_120s`, `session_300s`
- **Chart Type**: Funnel
- **Title**: "Session Duration Funnel"

#### Top Investors by Engagement
- **Event Name**: `investor_page_view`
- **Group By**: `investor_slug` property
- **Chart Type**: Bar chart
- **Title**: "Top Performing Investor Pages"

### Step 4: Set Up Filters
Create saved filters for different analyses:

#### Individual Investor Analysis
- **Filter**: `investor_slug` = `specific-investor-name`
- **Use Case**: Deep dive into specific investor engagement

#### Resource Performance
- **Filter**: Event name contains `resource_`
- **Use Case**: Compare resource download rates

#### High-Intent Visitors
- **Filter**: Events include `cta_book_call_click`
- **Use Case**: Identify investors ready to book calls

## 📈 Key Metrics to Monitor

### 1. Conversion Funnel
```
Page View → 30s+ Session → Resource Click → Call Booking
```

### 2. Resource Performance
- **1-Pager**: Quick overview seekers
- **Pitch Deck**: Detailed evaluators  
- **Podcast**: Story-focused investors
- **360 Deep-Dive**: Technical evaluators

### 3. Engagement Quality
- **Session Duration**: Longer = higher interest
- **Multiple Resource Access**: Cross-referencing investors
- **Return Visits**: Sustained interest

## 🔗 API Integration

### Using Umami API for Custom Dashboards
```javascript
const UMAMI_API_URL = 'https://cloud.umami.is/api';
const WEBSITE_ID = 'd1ff84bb-5098-45e2-b135-568ef7264eff';
const API_KEY = 'api_08gPcyjfrwopTUEG9H11K4rQ3Zi8KevG';

// Fetch website stats
const response = await fetch(`${UMAMI_API_URL}/websites/${WEBSITE_ID}/stats`, {
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json'
  }
});
```

### Available API Endpoints
- `/websites/{id}/stats` - Basic website statistics
- `/websites/{id}/events` - Event data
- `/websites/{id}/pageviews` - Page view data
- `/websites/{id}/metrics` - Custom metrics

## 🚫 Bot Detection Features

### Mouse Movement Verification
```javascript
const handleMouseMove = () => {
  verifyHuman();
  document.removeEventListener('mousemove', handleMouseMove);
};
```

### Benefits
- **Cleaner Data**: Eliminates bot traffic
- **Accurate Metrics**: Only human interactions counted
- **Cost Efficiency**: Reduces unnecessary API calls

## 📊 Dashboard Component

The `UmamiAnalytics.jsx` component in your marketing dashboard provides:
- **Real-time Metrics**: Key performance indicators
- **Top Performers**: Best-engaging investor pages
- **Resource Breakdown**: Download/view statistics
- **Session Analysis**: Duration and engagement depth

## 🔄 Dynamic URL Handling

### Investor-Specific URLs
All resource links include `?ref=<INVESTOR_ID>` for tracking:
```
https://www.limilighting.com/assets/Limi_OnePager.pdf?ref=sequoia-capital
```

### Benefits
- **Attribution**: Know which investor accessed what
- **Personalization**: Tailor follow-up based on interests
- **ROI Tracking**: Measure resource effectiveness per investor

## 🎯 Next Steps

### 1. Monitor Initial Data
- Check dashboard after 24-48 hours
- Verify events are firing correctly
- Adjust tracking if needed

### 2. Create Alerts
Set up Umami alerts for:
- High-value investor visits
- Multiple resource downloads
- Call booking events

### 3. Optimize Based on Data
- A/B test resource descriptions
- Adjust content based on engagement
- Personalize follow-up outreach

## 🔍 Troubleshooting

### Events Not Showing
1. Check browser console for errors
2. Verify Umami script is loaded
3. Confirm website ID is correct
4. Test with mouse movement (bot detection)

### API Issues
1. Verify API key permissions
2. Check rate limits
3. Confirm endpoint URLs
4. Review CORS settings

## 📞 Support
For technical issues:
1. Check Umami documentation: [https://umami.is/docs](https://umami.is/docs)
2. Review browser console logs
3. Test in incognito mode
4. Contact Umami support if needed

---

**🎉 Your LIMI Investor Portal now has comprehensive, bot-resistant analytics tracking every interaction and providing actionable insights for investor engagement optimization!**
