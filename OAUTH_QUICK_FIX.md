# Google OAuth - Quick Fix Checklist

## Your Vercel Production URL
`https://antigravity-production.vercel.app`

## Critical URLs to Configure

| Service | URL |
|---------|-----|
| **Your App OAuth Callback** | https://antigravity-production.vercel.app/auth/callback |
| **Supabase OAuth Callback** | https://odsosihkztlsasntirho.supabase.co/auth/v1/callback |

## Immediate Actions Required

### 1. Google Cloud Console Configuration
- [ ] Go to: https://console.cloud.google.com/
- [ ] Find your OAuth 2.0 Client ID in **Credentials**
- [ ] Click to edit the credential
- [ ] Add these **Authorized redirect URIs**:
  - [ ] `https://odsosihkztlsasntirho.supabase.co/auth/v1/callback`
  - [ ] `https://antigravity-production.vercel.app/auth/callback`
- [ ] Save changes
- [ ] Copy **Client ID** and **Client Secret**

### 2. Supabase Configuration
- [ ] Go to: https://app.supabase.com/
- [ ] Select project: **odsosihkztlsasntirho**
- [ ] Navigate to: **Authentication** → **Providers**
- [ ] Click **Google** to configure
- [ ] Paste **Client ID** from Google Cloud
- [ ] Paste **Client Secret** from Google Cloud
- [ ] Save configuration
- [ ] Verify the Redirect URI shows: `https://odsosihkztlsasntirho.supabase.co/auth/v1/callback`

### 3. Code Updates (Already Done!)
- [x] Updated OAuth redirect URI format in AuthModal.jsx
- [x] Created AuthCallback.jsx component
- [x] Added auth-callback view to App.jsx
- [x] Added debug logging for troubleshooting

## Testing the Fix

1. Go to: https://antigravity-production.vercel.app
2. Click "Sign In" button
3. Click "Continue with Google"
4. Sign in with your Google account
5. You should be redirected back to your app
6. Check browser console for debug logs (search for "[v0]")

## What Was Fixed in the Code

### Before (Broken):
```javascript
redirectTo: window.location.origin
// Result: Incomplete redirect URI
```

### After (Fixed):
```javascript
redirectTo: `${window.location.origin}/auth/callback`
// Result: Complete redirect URI with /auth/callback path
```

## Error Symptoms

| Error | Cause | Solution |
|-------|-------|----------|
| "Access blocked: This app's request is invalid" | Redirect URI mismatch | Add all URIs to Google Cloud Console |
| "undefined provider" | Google not enabled in Supabase | Enable Google OAuth in Supabase |
| Infinite redirect loop | AuthCallback not processing session | Clear cookies, check browser console |
| "Invalid client" | Wrong Client ID/Secret | Copy from Google Cloud again |

## If Still Not Working

1. Check browser **Console** (F12) for error messages starting with "[v0]"
2. Verify all three redirect URIs are configured:
   - In Google Cloud Console
   - In Supabase settings
   - In your code (already done)
3. Clear browser cookies and cache
4. Try in an incognito/private browser window
5. Check that Google OAuth app is not in "Testing" mode (if applicable)

## Support Resources

- Supabase OAuth Docs: https://supabase.com/docs/guides/auth/social-auth
- Google OAuth Setup: https://supabase.com/docs/guides/auth/social-auth/auth-google
- Vercel Deployment: Your app is at https://antigravity-production.vercel.app
