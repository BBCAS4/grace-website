# Email Service Setup Guide

## Current Status
The email service has been updated to use Resend with better error handling.

## Setup Steps

### 1. Get Resend API Key
1. Go to [Resend.com](https://resend.com)
2. Sign up for a free account
3. Go to API Keys section
4. Create a new API key
5. Copy the API key (starts with `re_`)

### 2. Configure Environment Variables
Add to your Azure App Service environment variables:
- **Name**: `RESEND_API_KEY`
- **Value**: `re_your_actual_api_key_here`

### 3. Current Email Configuration
- **From**: `onboarding@resend.dev` (Resend's default verified domain)
- **To**: `NP@GRACEIntegratedHealth.com.au`
- **Service**: Resend (reliable email delivery)

### 4. Test the Service
1. Deploy the updated code
2. Submit a test form
3. Check Azure logs for email delivery status

## Troubleshooting

### If emails still don't work:
1. **Check Azure logs** for error messages
2. **Verify API key** is correctly set in environment variables
3. **Check Resend dashboard** for delivery status
4. **Contact Resend support** if needed

### Fallback Behavior
- If email fails, the form still submits successfully
- All submissions are logged in Azure for manual review
- Users get confirmation that their submission was received

## Next Steps
1. Set up Resend account and API key
2. Deploy updated code to Azure
3. Test email functionality
4. Monitor Azure logs for any issues
