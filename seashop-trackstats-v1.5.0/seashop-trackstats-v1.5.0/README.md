# SEASHOP TrackStats

Version: 1.5.0  
Updated: 30 July 2026

## Changelog
- Added full key -> display -> asset registry from user list
- Web now remembers display names and icons for all supplied items
- Tracker sends items as structured array with key, displayName, amount, assetId
- Inventory modal shows both display name and key
- Total Gems remains the main overview metric

## Vercel Settings
- Root Directory: `seashop-trackstats-v1.5.0`
- Framework Preset: `Other`
- Output Directory: `public`
- Build Command: leave empty
- Install Command: leave empty

## Environment Variables
- `TRACKER_API_KEY=seashop`
- `UPSTASH_REDIS_REST_URL=...`
- `UPSTASH_REDIS_REST_TOKEN=...`

## Tracker URL
The included Luau tracker uses:

`https://anime-expeditions-vercel.vercel.app/api/update`

Keep using that domain unless you change your Production domain in Vercel.
