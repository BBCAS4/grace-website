# GRACE Integrated Health Website

A modern healthcare website for GRACE (Geriatric Residential Aged Care Evaluations) built with Next.js, TypeScript, and Tailwind CSS.

## Features

- Responsive design optimized for all devices
- Modern UI with smooth animations
- Contact forms for referrals and inquiries with email integration via Resend
- Professional healthcare branding
- SEO optimized with proper metadata

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Create a `.env.local` file with your environment variables:
```env
RESEND_API_KEY=your_resend_api_key_here
NODE_ENV=development
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

- `app/` - Next.js app directory with pages and API routes
- `components/` - Reusable UI components and forms
- `lib/` - Utility functions
- `public/` - Static assets

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS framework
- **Resend** - Email API for contact forms
- **Lucide React** - Icon library

## Deployment

### Azure App Service (Current Production)

The site is deployed to Azure App Service with the following configuration:

**Startup Command:**
```bash
npm install && npm run build && npm start
```

**Required Environment Variables:**
- `RESEND_API_KEY` - Your Resend API key
- `NODE_ENV=production`

**Deployment Steps:**
1. Ensure all changes are committed
2. Right-click on the app in VS Code Azure extension
3. Click "Deploy to Web App"
4. Wait for deployment to complete (~10-15 minutes for fresh deploy)

See `AZURE_DEPLOYMENT.md` and `RESEND_SETUP.md` for detailed instructions.
