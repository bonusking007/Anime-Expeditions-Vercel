# SEASHOP TrackStats

Version: 1.5.2  
Updated: 30 July 2026

## Changelog
- Fixed repeated Vercel 404 by pinning `outputDirectory` to `public` in `vercel.json`
- Added explicit `/` and `/dashboard` rewrites to `public/index.html`
- Changed to a permanent Root Directory name so future updates do not break Vercel
- Kept all 27 project files and the complete item key/display/asset registry
- Redis supports `UPSTASH_REDIS_REST_*`, `KV_REST_API_*`, and `REDIS_REST_*`

## Vercel Settings
- Root Directory: `seashop-trackstats`
- Framework Preset: `Other`
- Build Command: leave empty
- Output Directory: `public`
- Install Command: leave empty

`vercel.json` also forces `outputDirectory` to `public`, so the dashboard setting cannot accidentally point to an empty folder.

## Environment Variables
- `TRACKER_API_KEY=seashop`
- One supported Redis pair:
  - `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`
  - or `KV_REST_API_URL` + `KV_REST_API_TOKEN`
  - or `REDIS_REST_URL` + `REDIS_REST_TOKEN`

## Tracker URL
The included tracker currently posts to:

`https://anime-expeditions-vercel.vercel.app/api/update`
