# Google OAuth Setup Guide for Opus Clip

## Overview
This guide explains how to configure Google OAuth with Supabase for your Vercel-deployed Opus Clip application.

## The Error: "Access blocked: This app's request is invalid"
This error occurs when:
1. The redirect URI in Google Cloud Console doesn't match the redirect URI being used
2. The redirect URI in Supabase settings doesn't match your deployment URL
3. OAuth credentials are misconfigured or revoked

## Step 1: Get Your Vercel Production URL

Your app is deployed at: `https://antigravity-production.vercel.app` (or your actual domain)

The OAuth redirect URI should be: `https://antigravity-production.vercel.app/auth/callback`

## Step 2: Configure Google Cloud Console

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project (or create a new one)
3. Navigate to **Credentials** (left sidebar)
4. Find your OAuth 2.0 Client ID (or create one if missing)
5. Click to edit the credential
6. In **Authorized redirect URIs**, add:
   - `https://odsosihkztlsasntirho.supabase.co/auth/v1/callback` (Supabase)
   - `https://antigravity-production.vercel.app/auth/callback` (Your app)

## Step 3: Configure Supabase OAuth Settings

1. Go to [Supabase Dashboard](https://app.supabase.com/)
2. Select your project: `odsosihkztlsasntirho`
3. Navigate to **Authentication** → **Providers**
4. Find **Google** provider and click to configure
5. Add your **Google Client ID** and **Client Secret** from Google Cloud Console
6. Make sure Supabase shows the redirect URI as:
   - `https://odsosihkztlsasntirho.supabase.co/auth/v1/callback`

## Step 4: Verify Redirect URI Configuration

After Google OAuth flow:
- Google redirects to: `https://odsosihkztlsasntirho.supabase.co/auth/v1/callback`
- Supabase processes the callback and sets the user session
- Your app's AuthCallback component detects the session
- User is redirected to `https://antigravity-production.vercel.app/auth/callback`

## Implementation Details

### OAuth Flow:
1. User clicks "Continue with Google" button
2. App calls: `supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: '${window.location.origin}/auth/callback' } })`
3. User is redirected to Google login
4. After login, Google redirects to Supabase callback URL
5. Supabase creates session and redirects to `/auth/callback`
6. AuthCallback component processes the session
7. User is authenticated and logged in

### Environment Variables Used:
- Supabase URL: `https://odsosihkztlsasntirho.supabase.co`
- Supabase Anon Key: (already configured in code)

## Testing OAuth Locally

For local testing with `localhost:5173`:

1. Add to Google Cloud Console Authorized redirect URIs:
   - `http://localhost:5173/auth/callback`

2. Update AuthModal.jsx temporarily for local testing:
   ```javascript
   redirectTo: process.env.NODE_ENV === 'development' 
     ? 'http://localhost:5173/auth/callback'
     : `${window.location.origin}/auth/callback`
   ```

## Troubleshooting

### Issue: "Access blocked: This app's request is invalid"
**Solution:** Verify that `https://odsosihkztlsasntirho.supabase.co/auth/v1/callback` is in Google Cloud Console's redirect URIs.

### Issue: Redirect loop after login
**Solution:** Check that AuthCallback.jsx is properly displaying and waiting for session. View browser console for debug logs.

### Issue: Session not persisting after redirect
**Solution:** Ensure Supabase auth listener is active in App.jsx. Check that `supabase.auth.onAuthStateChange` is running.

### Issue: "undefined provider" error
**Solution:** Verify Google provider is enabled in Supabase Authentication settings.

## Files Modified for OAuth Support

- `src/components/AuthModal.jsx` - Updated redirect URI format
- `src/components/AuthCallback.jsx` - New component to handle OAuth callback
- `src/App.jsx` - Added auth-callback view and import

## Important URLs to Remember

| Environment | URL |
|------------|-----|
| Supabase Project | https://odsosihkztlsasntirho.supabase.co |
| Supabase Callback | https://odsosihkztlsasntirho.supabase.co/auth/v1/callback |
| Production App | https://antigravity-production.vercel.app |
| Production Callback | https://antigravity-production.vercel.app/auth/callback |
| Local Dev | http://localhost:5173 |
| Local Callback | http://localhost:5173/auth/callback |

## Next Steps

1. ✅ Update AuthModal.jsx redirect URI (Done)
2. ✅ Create AuthCallback.jsx component (Done)
3. ✅ Add auth-callback view to App.jsx (Done)
4. ⏭️ Configure Google Client ID and Secret in Supabase
5. ⏭️ Add `https://antigravity-production.vercel.app/auth/callback` to Google Cloud Console
6. ⏭️ Test OAuth flow on production
7. ⏭️ Monitor browser console for debug logs during testing

## Support

If you encounter issues:
1. Check browser console for debug logs (marked with "[v0]")
2. Verify all redirect URIs are correctly configured
3. Clear browser cookies and cache before testing
4. Check that Supabase Google provider is enabled
5. Ensure Google OAuth credentials are not revoked or expired
