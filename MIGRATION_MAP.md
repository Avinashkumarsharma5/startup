# Sanskaraa migration map

## Current implementation

| Area | Supabase integration | Remaining limits |
|---|---|---|
| Authentication/profile | Supabase Auth signup, email/password login, logout, reset, OAuth, auth listener; `profiles` is canonical and signup role is fixed to CUSTOMER. | Existing Firebase users are not imported. Google OAuth needs provider configuration in the Supabase dashboard. |
| Vendor onboarding | `vendor_applications`, private `vendor-documents`/`vendor-portfolio` buckets, signed document URLs, protected review RPC and approved `vendor_profiles`. Approval distinguishes Pandit from other vendors. | New migrations 009/010 must be applied before those latest triggers/catalog changes exist in the hosted project. |
| Bookings | Customer bookings use one `bookings` table and controlled transition RPC. Admin assigns only approved VENDOR/PANDIT profiles through an admin-only RPC. Provider dashboard reads assigned bookings, transitions assigned work and starts/stops location sharing. | Vendor availability/search are not complete. Some legacy booking forms send non-canonical booking details through `notes`. |
| Live location | Provider uses `watchPosition` only after explicitly starting sharing for an active assigned booking; customer subscribes to that booking's authorized Realtime location. Ended bookings stop sharing. | Browser geolocation requires HTTPS and user permission. |
| Notifications/leads | Notifications use recipient-scoped Postgres reads and Realtime; booking/application triggers create events. Leads use the Supabase table and protected operations access. | Contact-page support tickets remain local-only; no support schema was added. |
| Services | Existing UI catalog remains as a static fallback. `services` table and active-public/admin-write RLS are in migrations. | Service catalog has not been fully seeded or switched to database-first queries across all discovery pages. |
| Shop/products/orders | Wedding shop and Puja Kits single-item/cart orders call `create_order`; it validates catalog UUID, authoritative price and stock and writes order/items. Migration 010 seeds the visible catalogs. Package pujas remain bookings. | Puja single-item stock is initialized to zero because the old UI has no authoritative stock values; set actual inventory before accepting those orders. Event rentals still need a rental catalog/checkout mapping. No payment collection is implemented. |
| Reviews | `reviews` schema, rating constraints, unique booking constraint and completed-booking/customer insert authorization. | No complete review submission UI is present. |
| Admin dashboard | Supabase aggregate RPC and recent leads/vendors/bookings queries; operational counts include users, vendors, pandits, bookings, orders, products, applications, leads, reviews and unread notifications. | Database changes must be pushed. Dashboard does not implement payment statistics. |
| Firebase | Firebase npm dependency, helper, config/rules files and app imports removed. Google sign-in uses Supabase OAuth. | Historical migration notes may refer to Firebase; no Firebase runtime use is intended. |

## Migration history

Migrations `20260930000100`–`20260930000800` were reported already pushed by the project owner. Migrations `20260930000900`–`20260930001100` were added in this work and must be pushed with `npx supabase db push`; never use `db reset` on the project.

## Manual setup

Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` in local/deployment environments. The first SUPER_ADMIN bootstrap can be run only after migration 009 is applied; create an ordinary Auth user first, then invoke `select public.bootstrap_first_super_admin('AUTH-USER-UUID'::uuid);` in Supabase SQL Editor.
