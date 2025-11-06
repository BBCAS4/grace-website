# Google Search Console Redirect Error - Fix Guide

## Issue
Google Search Console is reporting "Redirect error" - pages aren't being indexed or served due to redirect issues.

## Common Causes

### 1. Redirect Loops
- A page redirects to itself
- Multiple redirects in a chain (A → B → C → A)
- Trailing slash mismatches causing redirect loops

### 2. Too Many Redirects
- Redirect chains with more than 3-4 hops
- Redirects that keep adding more redirects

### 3. Incorrect Redirect Targets
- Redirecting to non-existent pages (404)
- Redirecting to pages that themselves redirect

### 4. Trailing Slash Issues
- With `trailingSlash: true`, URLs without trailing slashes redirect
- This can cause issues if canonical tags don't match

## Fixes Applied

### Updated Redirect Rules
1. **Added actual Azure domain** to redirect rules
   - `graceintegratedhealth-g7ewbyc2eghhezga.australiaeast-01.azurewebsites.net`
   
2. **Simplified redirect logic** to prevent loops
   - Removed complex regex patterns that might cause issues
   - Ensured redirects only apply to non-www and Azure domains

3. **Preserved trailing slashes** in redirects
   - `/:path*` pattern preserves trailing slashes automatically

## Verification Steps

### 1. Test Redirects Manually

Use a redirect checker tool:
- https://httpstatus.io/
- https://www.redirect-checker.org/

Test these URLs:
- `https://graceintegratedhealth.com.au/` → Should redirect to `https://www.graceintegratedhealth.com.au/`
- `https://graceintegratedhealth.com.au/privacy` → Should redirect to `https://www.graceintegratedhealth.com.au/privacy/`
- `https://graceintegratedhealth-g7ewbyc2eghhezga.australiaeast-01.azurewebsites.net/` → Should redirect to `https://www.graceintegratedhealth.com.au/`

### 2. Check for Redirect Chains

Each redirect should:
- Only redirect once (not chain)
- Not redirect to a page that redirects again
- Result in a final URL that returns 200 OK

### 3. Verify Canonical Tags Match

After deployment, check that:
- Canonical URLs match the final URL (with trailing slashes)
- No redirect loops between www and non-www
- All pages have proper canonical tags

## Next Steps in Google Search Console

### 1. Identify Affected URLs
1. Go to Google Search Console
2. Click on the "Redirect error" notification
3. View the list of affected URLs
4. Note which specific URLs are having issues

### 2. Test Each URL
For each affected URL:
- Visit it in a browser
- Check how many redirects occur
- Verify it ends at the correct final URL
- Check the HTTP status code (should be 200)

### 3. Request Re-indexing
After fixing:
1. Go to **URL Inspection** tool in GSC
2. Enter each affected URL
3. Click **"Request Indexing"**
4. Wait for Google to recrawl (usually 1-3 days)

### 4. Use "Validate Fix" Button
1. In the redirect error notification
2. Click **"VALIDATE FIX"** button
3. Google will re-check the URLs
4. Wait for validation to complete (can take several days)

## Common Redirect Patterns

### ✅ Good Redirects
- `http://` → `https://` (protocol upgrade)
- `domain.com` → `www.domain.com` (canonical domain)
- `old-page` → `new-page` (301 permanent redirect)
- Single redirect, final URL returns 200

### ❌ Bad Redirects
- Redirect loops (A → B → A)
- Too many hops (A → B → C → D → E)
- Redirect to 404 page
- Redirect to redirect (without final destination)

## Additional Checks

### Check Server Headers
Use curl or browser DevTools to check:
```bash
curl -I https://www.graceintegratedhealth.com.au/
```

Look for:
- `Location:` header (indicates redirect)
- `HTTP/1.1 301` or `HTTP/1.1 302` (redirect status)
- Ensure final URL returns `HTTP/1.1 200`

### Check Sitemap
Verify your sitemap has correct URLs:
- All URLs should use `https://www.graceintegratedhealth.com.au`
- All URLs should have trailing slashes (since `trailingSlash: true`)
- No URLs should point to Azure domains

## Timeline

After deploying fixes:
- **Immediate**: Redirects should work correctly
- **1-3 days**: Google starts recrawling
- **1-2 weeks**: GSC errors should clear
- **2-4 weeks**: All pages re-indexed with correct redirects

## If Issues Persist

If redirect errors continue after deployment:

1. **Check specific URLs** in GSC to see which ones are failing
2. **Test redirect chains** using online tools
3. **Review server logs** for any redirect-related errors
4. **Check Azure App Service** configuration for additional redirects
5. **Consider using middleware** for more complex redirect logic

## Resources

- [Google Search Console Help - Redirect Errors](https://support.google.com/webmasters/answer/7440203)
- [Next.js Redirects Documentation](https://nextjs.org/docs/app/api-reference/next-config-js/redirects)
- [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

