# SEASHOP TrackStats

**Version:** 1.3.0  
**Updated:** 30 July 2026

## Changelog

### 1.3.0
- Added Roblox thumbnail images for the supplied Anime Expeditions items.
- Removed duplicate item entries and added aliases for raw in-game keys such as `StatReroll`, `TraitReroll`, `ExpeditionCoin`, `SpiritCityToken`, and `VillainCurrency`.
- Replaced player-card **Total Amount** with **Total Gems**.
- Replaced the Overview total with combined **Total Gems** from all tracked players.
- Replaced the inventory modal **Total Amount** with **Total Gems**.
- Added the Roblox inventory bag image to every **View Inventory** button.
- Added `api/item-icons.js` to resolve Roblox Asset IDs through the Roblox thumbnail service.
- Removed the large account/item summary strip above the search bar.
- Updated the included Luau tracker for `seashop-trackstats.vercel.app` with API key `seashop`.

### 1.2.2
- Moved the static website into `public/` for Vercel Other-framework deployments.

## Upload as a new version

1. Delete the old version folder from GitHub.
2. Extract `seashop-trackstats-v1.3.0.zip`.
3. Upload the extracted folder named `seashop-trackstats-v1.3.0` to the repository root.
4. The folder must directly contain `public`, `api`, `lib`, `vercel.json`, and this README. Do not place another `seashop-trackstats-v1.3.0` folder inside it.

## Vercel settings

- **Framework Preset:** Other
- **Root Directory:** `seashop-trackstats-v1.3.0`
- **Build Command:** blank / Override disabled
- **Output Directory:** `public`
- **Install Command:** blank / Override disabled

After saving the Root Directory, create a new commit or redeploy the newest commit.

## Environment variables

```text
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
TRACKER_API_KEY=seashop
```

## Luau tracker

The included `anime_expeditions_tracker.lua` is already configured for:

```text
https://seashop-trackstats.vercel.app/api/update
```

The tracker key is `seashop`, which must match `TRACKER_API_KEY` in Vercel.
