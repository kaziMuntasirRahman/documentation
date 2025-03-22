# Deploying Express Server to Vercel

This guide explains how to deploy your Express.js server on Vercel.

### Prerequisites

- You should have an Express.js server set up.
- You should have a Vercel account. [Sign up here](https://vercel.com/signup).

### 5 Steps for Deployment

#### 1. Install Vercel CLI

To deploy your project, first install the Vercel CLI globally:

```bash
npm install -g vercel
```

Verify the installation by checking the version:

```bash
vercel --version
```

#### 2. Create `vercel.json`

In your project root, create a `vercel.json` file to configure Vercel:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "./index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/",
      "methods": ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    }
  ]
}
```

This file tells Vercel how to build and route your server.

#### 3. Deploy to Vercel

Run the following command to deploy your project:

```bash
vercel
```

Or, to deploy directly to production:

```bash
vercel --prod
```

#### 4. Set Environment Variables

To ensure your environment variables are accessible, go to:

**Vercel Dashboard** > **Project** > **Settings** > **Environment Variables**

Add your environment variables (e.g., `DB_USER`, `DB_PASS`).

#### 5. Verify Deployment

After deployment, you’ll receive a URL. Visit it to verify your server is live.
