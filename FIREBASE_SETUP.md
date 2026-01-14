# Firebase Authentication Setup Guide

This guide will help you set up Firebase authentication for Project INTEGRITY.

## Prerequisites

- A Google account
- Node.js installed on your machine
- This project cloned locally

## Step 1: Create a Firebase Project

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Click "Add project" or "Create a project"
3. Enter your project name (e.g., "Project INTEGRITY")
4. (Optional) Enable Google Analytics
5. Click "Create project" and wait for setup to complete

## Step 2: Register Your Web App

1. In the Firebase Console, click on the **web icon (</>)** to add a web app
2. Register your app with a nickname (e.g., "INTEGRITY Web App")
3. **Do NOT** check "Firebase Hosting" (unless you want to use it)
4. Click "Register app"
5. You'll see your Firebase configuration object - **keep this page open!**

## Step 3: Get Your Firebase Configuration

Copy the configuration values from the Firebase Console. They look like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## Step 4: Enable Authentication Methods

1. In Firebase Console, go to **Build** > **Authentication**
2. Click "Get started" if this is your first time
3. Go to the **Sign-in method** tab
4. Enable the following providers:

### Email/Password Authentication
1. Click on "Email/Password"
2. Toggle "Enable"
3. Click "Save"

### Google OAuth Authentication
1. Click on "Google"
2. Toggle "Enable"
3. Enter a support email (your email)
4. Click "Save"

## Step 5: Configure Your Project

1. Copy `.env.local` (if it doesn't exist, create it in the root directory)
2. Replace the placeholder values with your Firebase configuration:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project-id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project-id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789012
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
```

**IMPORTANT:** Make sure to replace ALL the values!

## Step 6: Add Authorized Domains (for Google OAuth)

For Google OAuth to work:

1. In Firebase Console, go to **Authentication** > **Settings** > **Authorized domains**
2. Add your domains:
   - `localhost` (should already be there)
   - Your production domain when you deploy (e.g., `your-app.vercel.app`)

## Step 7: Install Dependencies

If you haven't already, install Firebase:

```bash
npm install firebase firebase-admin
```

## Step 8: Test Your Setup

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `http://localhost:3000/register`
3. Try registering with an email and password
4. Try signing in with Google
5. Check the Firebase Console > Authentication > Users to see if your user was created

## Common Issues & Solutions

### Issue: "Firebase: Error (auth/configuration-not-found)"
**Solution:** Check that all environment variables are set correctly in `.env.local`

### Issue: "Firebase: Error (auth/invalid-api-key)"
**Solution:** Verify your API key is correct. Make sure there are no extra spaces or quotes.

### Issue: Google Sign-in popup blocked
**Solution:**
1. Allow popups in your browser
2. Make sure your domain is in Authorized domains (Firebase Console)

### Issue: Email verification not sending
**Solution:**
1. Check spam folder
2. In Firebase Console, go to Authentication > Templates > Email address verification
3. Customize the template if needed

## Security Best Practices

1. **Never commit** your `.env.local` file to Git (it's already in .gitignore)
2. Use different Firebase projects for development and production
3. Set up Firebase Security Rules for your database/storage
4. Regularly review users in Firebase Console > Authentication
5. Enable Firebase App Check for additional security (recommended for production)

## Firebase Console Links (Quick Access)

After setup, bookmark these for quick access:
- **Users:** https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication/users
- **Settings:** https://console.firebase.google.com/project/YOUR_PROJECT_ID/settings/general
- **Authentication:** https://console.firebase.google.com/project/YOUR_PROJECT_ID/authentication

## Features Implemented

✅ Email/Password Registration with automatic email verification
✅ Email/Password Login
✅ Google OAuth Sign-in
✅ Password Reset via Email
✅ Email Verification
✅ Protected Routes (authenticated users only)
✅ Session Management with HTTP-only cookies
✅ Automatic redirect after authentication

## Next Steps

Once authentication is working:
1. Consider adding more OAuth providers (GitHub, Microsoft, etc.)
2. Set up Firebase Firestore for storing user data
3. Implement role-based access control (RBAC)
4. Add multi-factor authentication (MFA)
5. Set up Firebase Analytics for tracking

## Need Help?

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
- [Next.js + Firebase Guide](https://firebase.google.com/docs/auth/web/start)

---

**Note:** This implementation uses Firebase v9+ (modular SDK) which is the recommended approach for tree-shaking and better performance.
