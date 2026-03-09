# Labubu Love Shop - Firebase Setup

## Database Migration Complete! 🎉

Project ab **Firebase Realtime Database** use kar raha hai instead of Supabase.

## Firebase Configuration

Firebase config already set hai in `src/lib/firebase.ts`:
- Database URL: `https://king-b697f-default-rtdb.firebaseio.com`
- Project ID: `king-b697f`

## Initial Data Setup

Products ko Firebase mein seed karne ke liye:

```bash
# Development server start karo
npm run dev

# Browser console mein ye run karo:
import('./src/lib/seedData.ts')
```

Ya manually Firebase Console se data add karo.

## Database Structure

```
firebase-db/
├── products/
│   ├── {productId}/
│   │   ├── id
│   │   ├── slug
│   │   ├── name
│   │   ├── price
│   │   ├── short_description
│   │   ├── description
│   │   ├── image_url
│   │   └── is_active
├── orders/
│   ├── {orderId}/
│   │   ├── order_number
│   │   ├── user_id
│   │   ├── customer_name
│   │   ├── customer_phone
│   │   ├── customer_address
│   │   ├── customer_city
│   │   ├── customer_state
│   │   ├── customer_pincode
│   │   ├── items[]
│   │   ├── total_price
│   │   ├── status
│   │   └── created_at
├── profiles/
│   └── {userId}/
│       ├── email
│       ├── full_name
│       └── created_at
└── user_roles/
    └── {userId}/
        └── role (admin/user)
```

## Firebase Rules Setup

Firebase Console mein ye rules set karo:

```json
{
  "rules": {
    "products": {
      ".read": true,
      ".write": "auth != null"
    },
    "orders": {
      ".read": "auth != null",
      ".write": "auth != null"
    },
    "profiles": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": "$uid === auth.uid"
      }
    },
    "user_roles": {
      "$uid": {
        ".read": "$uid === auth.uid",
        ".write": false
      }
    }
  }
}
```

## Admin User Setup

Admin access dene ke liye Firebase Console se manually add karo:

```
user_roles/
  {userId}/
    role: "admin"
```

## Changes Made

1. ✅ Supabase removed
2. ✅ Firebase Realtime Database integrated
3. ✅ Firebase Authentication integrated
4. ✅ All pages updated (Login, Signup, Checkout, Orders, Admin)
5. ✅ Real-time updates working
6. ✅ Product management working
7. ✅ Order management working

## Run Project

```bash
npm install
npm run dev
```
