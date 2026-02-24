# Fix Google OAuth "Access Blocked" Error - Step by Step

## Your Supabase Callback URL
```
https://odsosihkztlsasntirho.supabase.co/auth/v1/callback
```

Your Vercel Production URL (example):
```
https://antigravity-production.vercel.app
```

---

## Step 1: Google Cloud Console Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to **APIs & Services** → **Credentials**
4. Find your OAuth 2.0 Client ID (if you don't have one, create one)
5. Click on it to open details
6. Click **EDIT**
7. Under "Authorized redirect URIs", add BOTH:
   ```
   https://odsosihkztlsasntirho.supabase.co/auth/v1/callback
   https://antigravity-production.vercel.app/auth/callback
   ```
8. Click **SAVE**
9. Copy your **Client ID** and **Client Secret**

---

## Step 2: Supabase Configuration

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project (with ID: `odsosihkztlsasntirho`)
3. Go to **Authentication** → **Providers**
4. Click on **Google**
5. Toggle **Enabled** to ON
6. Paste your **Client ID** from Google
7. Paste your **Client Secret** from Google
8. Click **SAVE**

---

## Step 3: Verify Environment Variables

Make sure these are set in your Vercel project:
- `VITE_SUPABASE_URL` = `https://odsosihkztlsasntirho.supabase.co`
- `VITE_SUPABASE_ANON_KEY` = Your Supabase anonymous key

If missing:
1. Go to Vercel Project Settings
2. Go to **Environment Variables**
3. Add the variables above from your Supabase project settings

---

## Step 4: Test the OAuth Flow

1. Visit your Vercel app: `https://antigravity-production.vercel.app`
2. Click "Sign In" → "Login with Google"
3. You should be redirected to Google login
4. After logging in, you should be redirected back to your app
5. User should be logged in

---

## Common Issues & Solutions

### Issue: "Access blocked: This app's request is invalid"
**Solution:** 
- Verify the redirect URI in Google Cloud Console matches exactly (including `https://`)
- Make sure you clicked SAVE in Google Cloud Console
- Wait 5-10 minutes for changes to propagate

### Issue: "invalid_grant" or "Failed to fetch"
**Solution:**
- Check that Client ID and Client Secret are correctly pasted in Supabase
- Verify Supabase Google provider is set to Enabled

### Issue: Blank page after Google login
**Solution:**
- Check browser console for errors (F12 → Console tab)
- Verify `/auth/callback` route exists in your app (it does - we added it)
- Check that environment variables are set

---

## Code Changes Already Made

✅ Updated redirect URI to `/auth/callback` in AuthModal.jsx
✅ Created AuthCallback.jsx component to handle OAuth flow
✅ Added auth-callback view to App.jsx routing
✅ Added error logging for debugging

---

## Need Help?

If still having issues after completing all steps:
1. Check browser console (F12) for specific error messages
2. Share the error message from the console
3. Verify all URLs have `https://` (no http://)
4. Make sure there are no extra spaces in the URLs
