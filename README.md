# Airbnb-lite

A marketplace/booking app built with React Native — my project for learning
React Native by building something real, styled after Airbnb: browse stays,
view them on a map, save favorites, and book a trip.

This is a **learning project**. I'm building it step by step rather than
generating it all at once, so the README (and commit history) doubles as a
log of what's actually done vs. planned.

## Status

🚧 Just getting started — project scaffolded, no features built yet.

## Planned stack

- **Expo + TypeScript**
- **Expo Router** — file-based navigation
- **Zustand** — global state (wishlist, bookings, filters)
- **react-native-maps** — map view of listings
- **Supabase** — auth + backend (once past mock data)

## Roadmap

- [ ] Project scaffold (Expo + TypeScript + navigation skeleton)
- [ ] Explore screen — static listing feed with mock data
- [ ] Listing detail screen
- [ ] Search & filters
- [ ] Map view
- [ ] Wishlist (save/unsave listings)
- [ ] Booking flow (dates, guests, price breakdown)
- [ ] Auth (Supabase)
- [ ] Trips screen (view past/upcoming bookings)
- [ ] Host mode (create/manage listings)
- [ ] Deploy a build (EAS) so it's installable, not just runnable from source

## Getting started

```bash
npm install
npx expo start
```

Scan the QR code with **Expo Go** on your phone (same wifi network as your
computer), or press `i` / `a` to open a simulator.

## Architecture

**Navigation** — [Expo Router](https://docs.expo.dev/router/introduction/),
file-based. Route structure (built up as features land):

```
app/
  _layout.tsx              Root stack — wraps tabs, listing, booking screens
  (tabs)/
    _layout.tsx              Bottom tab bar
    index.tsx                 Explore — search + filters + listing feed
    map.tsx                    Map view of listings
    wishlist.tsx                 Saved listings
    trips.tsx                     Booked trips
    profile.tsx                    Account / auth
  listing/[id].tsx            Listing detail screen
  booking/[id].tsx             Booking flow (dates, guests, price, confirm)
```

**State** — [Zustand](https://github.com/pmndrs/zustand) for global app
state (wishlist, bookings, search filters). Local component state (`useState`)
for anything screen-specific, like form inputs or which image is showing in a
gallery.

**Data layer** — starts as static mock data (`constants/mockData.ts`) so the
UI can be built and demoed without a backend. Later swapped for
[Supabase](https://supabase.com) (Postgres + auth + storage) behind a thin
client in `lib/supabase.ts`, so screens don't need to change much when the
backend gets wired in — they just call a data function instead of reading
the mock array.

**Types** — shared TypeScript types (`Listing`, `Booking`, `SearchFilters`)
live in `types/`, so the mock data and the eventual Supabase rows conform to
the same shape.

**Styling** — plain `StyleSheet.create`, no UI kit, so I actually practice
layout instead of leaning on prebuilt components.