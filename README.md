# SEASHOP TrackStats

Version: 1.5.3  
Updated: 30 July 2026

## Changelog
- Fixed recurring Vercel homepage 404 by removing the public output-directory dependency.
- Moved `index.html` and `assets/` to the repository root.
- Removed `outputDirectory` from `vercel.json`.
- Preserved all API, Redis, item display-name and asset-ID logic from v1.5.2.

## Upload layout
Upload the extracted files directly to the GitHub repository root so the first page shows:

- `index.html`
- `assets/`
- `api/`
- `lib/`
- `vercel.json`
- `package.json`
- `anime_expeditions_tracker.lua`

Do not upload an outer version folder.

## Vercel settings
- Root Directory: leave empty
- Framework Preset: Other
- Build Command: leave empty
- Output Directory: leave empty
- Install Command: leave empty

## Environment variables
- `TRACKER_API_KEY=seashop`
- `UPSTASH_REDIS_REST_URL` or `KV_REST_API_URL`
- `UPSTASH_REDIS_REST_TOKEN` or `KV_REST_API_TOKEN`
