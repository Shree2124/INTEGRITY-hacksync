# Super Admin Setup Guide

This guide explains how to use the super admin feature in Project INTEGRITY.

## 🔐 Admin Credentials

The super admin credentials are hardcoded in the environment variables for security.

### Current Credentials

**Email:** `admin@integrity.gov.in`
**Password:** `Admin@2024!Secure`

**⚠️ IMPORTANT:** Change these credentials before deploying to production!

## 🚀 How to Access Admin Dashboard

### Step 1: Go to Login Page
Navigate to: `http://localhost:3000/login`

### Step 2: Enter Admin Credentials
- **Email:** admin@integrity.gov.in
- **Password:** Admin@2024!Secure

### Step 3: You'll be redirected to Admin Dashboard
After successful login, you'll be redirected to: `/admin`

## 🎯 Admin Features

The admin dashboard provides:

### Dashboard Overview
- **Total Users** - Number of registered users
- **Total Reports** - All audit reports submitted
- **Pending Reviews** - Reports awaiting admin review
- **High Risk Reports** - Flagged high-risk issues

### Recent Reports
- View all recent audit submissions
- Filter by status (Pending, Review, Resolved, Rejected)
- See risk levels (High, Medium, Low)
- Quick access to report details

### Quick Actions
- **View Analytics** - Comprehensive platform statistics
- **Manage Users** - User roles and permissions
- **System Settings** - Configure platform settings

## 🔧 Technical Implementation

### How It Works

1. **Environment Variables** (`.env.local`):
```bash
NEXT_PUBLIC_ADMIN_EMAIL=admin@integrity.gov.in
NEXT_PUBLIC_ADMIN_PASSWORD=Admin@2024!Secure
```

2. **Authentication Check**:
   - When user logs in, credentials are checked against env variables first
   - If match → Create admin session (no Firebase authentication)
   - If no match → Normal Firebase authentication

3. **Admin Session Storage**:
   - Admin sessions are stored in `localStorage` as `admin_session`
   - Persists across page refreshes
   - Cleared on logout

4. **Role-Based Access**:
   - User type updated to include `'Admin'` role
   - Admin layout checks for `user.role === 'Admin'`
   - Non-admin users redirected to regular dashboard

### File Structure

```
src/
├── app/
│   ├── (admin)/              # Admin routes
│   │   ├── layout.tsx        # Admin layout (protects routes)
│   │   └── admin/
│   │       └── page.tsx      # Admin dashboard
├── lib/firebase/
│   └── auth.ts               # Admin auth functions
├── contexts/
│   └── AuthContext.tsx       # Updated with admin support
└── types/
    └── types.ts              # User type with Admin role
```

## 🛡️ Security Features

### Current Implementation
✅ Credentials stored in environment variables
✅ Admin session separate from Firebase
✅ Role-based route protection
✅ Admin-only accessible routes
✅ Session persistence across refreshes

### Production Recommendations
⚠️ **DO NOT** use hardcoded credentials in production
⚠️ **DO NOT** expose admin credentials in client-side env variables

For production, consider:
1. **Server-side admin authentication**
2. **Database-stored admin credentials (hashed)**
3. **JWT tokens for admin sessions**
4. **Multi-factor authentication**
5. **IP whitelisting**
6. **Audit logs for admin actions**

## 🔄 Testing Admin Flow

### Test 1: Admin Login
```bash
1. Go to /login
2. Enter: admin@integrity.gov.in / Admin@2024!Secure
3. ✅ Should redirect to /admin dashboard
```

### Test 2: Admin Session Persistence
```bash
1. Login as admin
2. Refresh page
3. ✅ Should remain on admin dashboard
4. ✅ Session should persist
```

### Test 3: Admin Logout
```bash
1. Login as admin
2. Click logout button
3. ✅ Should redirect to home
4. Try accessing /admin
5. ✅ Should redirect to /login
```

### Test 4: Non-Admin Cannot Access
```bash
1. Login as regular user
2. Try to visit /admin
3. ✅ Should redirect to /dashboard
```

### Test 5: Protected Admin Routes
```bash
1. Logout (or incognito mode)
2. Try to visit /admin
3. ✅ Should redirect to /login
```

## 🎨 Customizing Admin Credentials

### Option 1: Environment Variables (Current)
Edit `.env.local`:
```bash
NEXT_PUBLIC_ADMIN_EMAIL=youradmin@example.com
NEXT_PUBLIC_ADMIN_PASSWORD=YourSecurePassword123!
```

### Option 2: Multiple Admins
For multiple admins, modify `src/lib/firebase/auth.ts`:

```typescript
const adminCredentials = [
  { email: 'admin1@example.com', password: 'pass1' },
  { email: 'admin2@example.com', password: 'pass2' },
];

export const isAdminCredentials = (email: string, password: string): boolean => {
  return adminCredentials.some(
    admin => admin.email === email && admin.password === password
  );
};
```

## 📊 Admin Dashboard Features (Coming Soon)

Future enhancements:
- [ ] User management (ban, promote, demote)
- [ ] Report moderation (approve, reject, flag)
- [ ] Analytics and charts
- [ ] System configuration
- [ ] Email notifications management
- [ ] Audit logs viewer
- [ ] Content moderation tools
- [ ] Database backups

## 🚨 Troubleshooting

### Issue: Can't login with admin credentials
**Solution:**
1. Check `.env.local` has correct credentials
2. Restart dev server: `pnpm dev`
3. Hard refresh browser (Ctrl+Shift+R)

### Issue: Redirected to /dashboard instead of /admin
**Solution:**
1. Make sure you're using exact admin credentials
2. Check browser console for errors
3. Verify localStorage has `admin_session` key

### Issue: Admin session lost after refresh
**Solution:**
1. Check browser localStorage isn't being cleared
2. Verify admin session persistence code in AuthContext

### Issue: Regular users can access /admin
**Solution:**
1. Check admin layout protection code
2. Verify user.role is set correctly
3. Clear browser cache and test again

## 📝 Summary

Your super admin system is now fully functional with:

✅ Hardcoded admin credentials in env variables
✅ Separate authentication flow for admin
✅ Admin-only dashboard at `/admin`
✅ Role-based access control
✅ Session persistence
✅ Protected admin routes

**Admin Login:** admin@integrity.gov.in / Admin@2024!Secure
**Admin Dashboard:** http://localhost:3000/admin

---

**Note:** This is a basic implementation suitable for development and testing. For production, implement proper server-side authentication with encrypted credentials, JWT tokens, and comprehensive security measures.