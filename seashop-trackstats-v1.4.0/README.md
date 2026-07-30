# SEASHOP TrackStats

**Version:** 1.4.0  
**Updated:** 30 July 2026

## Changelog

### 1.4.0
- The Luau tracker now reads item display names from `ReplicatedStorage.Shared.Information.Items`.
- Internal keys such as `FoodItem6`, `TraitReroll`, `ExpeditionMaterial1`, and `VillainCurrency` are shown on the website as their real display names.
- Added a cached recursive item-info resolver so display names are resolved once and reused without creating repeated connections or loops.
- Added fallback mappings for the known Anime Expeditions internal keys when the item-information module cannot be read.
- Added `itemDisplayNames` to tracker snapshots while keeping the original internal keys and amounts intact.
- Updated the website to use dynamic display names for inventory rows, search, icons, and Gem totals.
- Added compatibility aliases so older Redis snapshots also show friendly item names.
- Hidden internal item keys from the inventory modal.
- Changed the included tracker URL back to the currently working production domain: `anime-expeditions-vercel.vercel.app`.

### 1.3.0
- Added Roblox thumbnail images for the supplied Anime Expeditions items.
- Replaced total item amount summaries with total Gems.
- Added the Roblox inventory bag image to **View Inventory** buttons.

## Replace the old version

1. Delete the old version folder from the GitHub repository.
2. Extract `seashop-trackstats-v1.4.0.zip`.
3. Upload the extracted folder named `seashop-trackstats-v1.4.0` to the repository root.
4. Open that folder in GitHub and confirm it directly contains:

```text
public/
api/
lib/
vercel.json
package.json
README.md
anime_expeditions_tracker.lua
```

Do not upload another `seashop-trackstats-v1.4.0` folder inside it.

## Vercel settings

```text
Framework Preset: Other
Root Directory: seashop-trackstats-v1.4.0
Build Command: blank / Override disabled
Output Directory: public
Install Command: blank / Override disabled
```

After saving the new Root Directory, create a new GitHub commit or redeploy the newest commit.

## Environment variables

```text
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
TRACKER_API_KEY=seashop
```

## Luau tracker

The included `anime_expeditions_tracker.lua` is configured for:

```text
https://anime-expeditions-vercel.vercel.app/api/update
```

The API key is:

```text
seashop
```

The tracker sends the inventory every 15 seconds. It keeps the real internal key for storage and sends a separate display-name map for the website.
