# Email Setup Instructions

The contact forms on the GRACE website now send emails to **NP@GRACEIntegratedHealth.com.au** using Resend.

## Setup Steps

1. **Sign up for Resend** (free tier available)
   - Go to https://resend.com
   - Create an account

2. **Get your API key**
   - Go to https://resend.com/api-keys
   - Create a new API key
   - Copy the key (it starts with `re_`)

3. **Add the API key to your project**
   - Create a `.env.local` file in the root of your project
   - Add: `RESEND_API_KEY=re_your_actual_api_key_here`
   - The `.env.local` file is already in `.gitignore` so it won't be committed

4. **Verify your domain (REQUIRED)**
   - In Resend dashboard, go to Domains
   - Add your domain: **graceintegratedhealth.com.au**
   - Follow the DNS setup instructions (add the provided DNS records)
   - Wait for verification (usually a few minutes to a few hours)
   - **Important**: Emails will NOT send until the domain is verified

5. **Current Configuration**
   - **From**: GRACE Website <noreply@graceintegratedhealth.com.au>
   - **To**: NP@GRACEIntegratedHealth.com.au
   - **Status**: Requires domain verification in Resend

6. **Restart your dev server**
   ```bash
   npm run dev
   ```

## Testing

- Fill out either contact form on the website
- Check the terminal for logs
- Check your email at NP@GRACEIntegratedHealth.com.au

## Without API Key

If you haven't set up the API key yet, the forms will still work but emails won't be sent. Form submissions will be logged to the console for debugging.

## Email Features

- All form submissions are sent to: **NP@GRACEIntegratedHealth.com.au**
- Reply-to is set to the submitter's email for easy responses
- Timestamps are in Australian Eastern time
- Loading states and error handling are built-in

