# SEASHOP Anime Expeditions Tracker

Version: 1.2.1  
Updated: 30 July 2026

## Changelog

### 1.2.1

- Fixed Vercel `404: NOT_FOUND` caused by the `public/` folder being treated as the static output directory
- Moved `sea-shop-logo.png` from `public/` to `assets/`
- Updated all logo paths to `/assets/sea-shop-logo.png`
- Removed the `public/` folder so Vercel serves the root `index.html` correctly

### 1.2.0

- Rebranded UI from Anime Expeditions Dashboard to SEASHOP
- Added new landing page with hero section and Enter Dashboard button
- Replaced old logo with SEASHOP logo
- Updated UI to a brighter blue cyber theme
- Removed top tabs for Players and System
- Increased font sizes across the dashboard for better readability
- Simplified Overview card by removing the old "Total Item Amount" label strip
- Added footer text:
  - © 2026 SEASHOP | All Systems Operational
  - Not affiliated with Roblox Corporation. All trademarks are property of their respective owners.
- Kept player inventory modal flow using View Inventory button

## Files to upload

Upload the contents of this folder to your GitHub repository or replace the files in your existing Vercel project root.

Required structure:

- `index.html`
- `assets/`
- `api/`
- `lib/`
- `package.json`
- `vercel.json`
- `VERSION`
- `anime_expeditions_tracker.lua`

## Notes

- Vercel Root Directory must be the exact GitHub folder containing this `index.html`.
- Do not set Output Directory. Leave it blank.
- Framework Preset should be `Other`.
- Environment variables still required:
  - `UPSTASH_REDIS_REST_URL`
  - `UPSTASH_REDIS_REST_TOKEN`
  - `TRACKER_API_KEY`
