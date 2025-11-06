# Google Search Console Indexing Issues - Fixes Applied

## Issues Identified

Based on your Google Search Console report, there were 4 indexing issues:

1. **Not found (404)** - 1 page
2. **Page with redirect** - 1 page  
3. **Crawled - currently not indexed** - 1 page
4. **Alternate page with proper canonical tag** - 0 pages (this was already improving)

## Fixes Applied

### 1. Fixed Canonical Tags
- **Problem**: Canonical tags were using relative paths (`/`, `/privacy`, `/terms`)
- **Fix**: Changed to absolute URLs with full domain
- **Files Updated**:
  - `app/layout.tsx` - Homepage canonical
  - `app/privacy/page.tsx` - Privacy page canonical
  - `app/terms/page.tsx` - Terms page canonical

### 2. Excluded Debug/Test Pages from Indexing
- **Problem**: `/debug` and `/test` pages were accessible but shouldn't be indexed
- **Fix**: 
  - Added `noindex` metadata to both pages
  - Added `Disallow: /debug/` and `Disallow: /test/` to `robots.txt`
- **Files Updated**:
  - `app/debug/page.tsx`
  - `app/test/page.tsx`
  - `public/robots.txt`

### 3. Fixed Sitemap Consistency
- **Problem**: Static `sitemap.xml` in `public/` didn't match dynamic `sitemap.ts` and used non-www domain
- **Fix**: 
  - Removed static `public/sitemap.xml` (Next.js generates it dynamically)
  - Updated `app/sitemap.ts` to use trailing slashes consistently
- **Files Updated**:
  - Deleted `public/sitemap.xml`
  - Updated `app/sitemap.ts`

## Next Steps in Google Search Console

### 1. Request Re-indexing
After deploying these changes:

1. Go to **Google Search Console** → **URL Inspection**
2. For each affected URL:
   - Enter the URL
   - Click **"Request Indexing"**
   - Wait for Google to recrawl

**URLs to check**:
- `https://www.graceintegratedhealth.com.au/`
- `https://www.graceintegratedhealth.com.au/privacy/`
- `https://www.graceintegratedhealth.com.au/terms/`

### 2. Monitor the Issues
- Go to **Indexing** → **Why pages aren't indexed**
- Monitor the counts - they should decrease over the next few days
- The "Alternate page with proper canonical tag" should stay at 0 (this is good)

### 3. Validate the Fixes
Wait 1-2 weeks for Google to recrawl, then check:

- ✅ **404 errors** should be resolved (if they were from debug/test pages)
- ✅ **Redirects** are expected - Azure domains redirecting to your custom domain is correct
- ✅ **Canonical tags** should now be properly recognized
- ✅ **Debug/Test pages** should be excluded from indexing

## About the Redirect Issue

The "Page with redirect" issue is **expected behavior**:
- Your `next.config.js` redirects Azure domains (`*.azurewebsites.net`) to your custom domain
- This is correct SEO practice - you want all traffic on your custom domain
- Google will eventually understand this and only index the canonical domain

## About "Crawled - currently not indexed"

This can happen for various reasons:
- Google crawled the page but hasn't indexed it yet
- Low priority pages take time to index
- With the fixes applied, this should resolve over time

**Action**: Request re-indexing through URL Inspection tool after deployment.

## Deployment Checklist

Before deploying, ensure:
- [ ] All changes are committed
- [ ] Build succeeds: `npm run build`
- [ ] Test locally: `npm start` and verify pages load
- [ ] Deploy to Azure
- [ ] Verify sitemap is accessible: `https://www.graceintegratedhealth.com.au/sitemap.xml`
- [ ] Verify robots.txt: `https://www.graceintegratedhealth.com.au/robots.txt`
- [ ] Request re-indexing in Google Search Console

## Expected Timeline

- **Immediate**: Changes deployed and accessible
- **1-3 days**: Google starts recrawling
- **1-2 weeks**: Indexing issues should be resolved
- **2-4 weeks**: All issues cleared from Search Console

## Additional Notes

- The redirects from Azure domains are intentional and correct
- Canonical tags now use absolute URLs matching your sitemap
- Debug and test pages are now properly excluded
- All canonical URLs match your `trailingSlash: true` configuration

