# SEASHOP Anime Expeditions Tracker

**Version:** 1.2.2  
**Updated:** 30 July 2026

## Changelog

### 1.2.2
- Fixed persistent Vercel `404: NOT_FOUND` for projects using the **Other** framework preset.
- Moved the static website into `public/`:
  - `public/index.html`
  - `public/assets/`
- Kept serverless functions in `api/` and shared server code in `lib/`.
- This layout works whether Vercel's Output Directory is blank or still set to `public`.

### 1.2.1
- Moved the SEASHOP logo into the website assets.
- Updated logo paths.

### 1.2.0
- Rebranded the dashboard to SEASHOP.
- Added landing page and blue cyber theme.
- Removed Players and System navigation tabs.
- Increased text size and added footer notices.

## Required Vercel settings

- **Framework Preset:** Other
- **Root Directory:** the exact GitHub folder containing this README and the `public`, `api`, and `lib` folders.
- **Build Command:** blank / Override disabled
- **Output Directory:** blank or `public`
- **Install Command:** blank / Override disabled

## Environment variables

- `UPSTASH_REDIS_REST_URL`
- `UPSTASH_REDIS_REST_TOKEN`
- `TRACKER_API_KEY`

After changing project settings, create a new deployment. Root/build setting changes do not affect an existing deployment.
