# SEASHOP TrackStats

Version: 1.5.1  
Updated: 30 July 2026

## Changelog
- Restored the complete working v1.4.1 project structure (27 files)
- Fixed Redis environment compatibility: supports both `UPSTASH_REDIS_REST_*` and Vercel `KV_REST_API_*`
- Added the complete key / display name / asset ID registry supplied by the user
- Tracker now stores raw item keys and their display names together
- Inventory modal shows Display Name and `Key:` under each item
- Restored avatar and Roblox thumbnail API functions

## Vercel settings
- Root Directory: `seashop-trackstats-v1.5.1`
- Framework Preset: `Other`
- Output Directory: `public`
- Build Command: leave empty
- Install Command: leave empty

## Supported Redis variables
Either pair works:

```text
UPSTASH_REDIS_REST_URL
UPSTASH_REDIS_REST_TOKEN
```

or:

```text
KV_REST_API_URL
KV_REST_API_TOKEN
```

Also required:

```text
TRACKER_API_KEY=seashop
```

## Tracker URL
The included tracker uses:

```text
https://anime-expeditions-vercel.vercel.app/api/update
```
