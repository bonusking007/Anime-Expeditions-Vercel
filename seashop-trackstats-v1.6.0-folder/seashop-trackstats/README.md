# SEASHOP TrackStats

Version: 1.6.0

## What's new
- Hero section text updated to SEASHOP branding
- Feature text rewritten to be less similar to the reference site
- Player avatars on cards are smaller, closer to the Rollinshop card proportions
- Added **cardDescription** support so each Roblox tracker can push a custom line like `Gems x100,000`
- Inventory key/display/item icon mapping is preserved

## Vercel setup
- Upload all files in this project root to GitHub (do not upload the zip itself)
- Root Directory: leave empty if these files are at repository root
- Framework Preset: Other
- Build Command: leave empty
- Output Directory: leave empty
- Install Command: leave empty

## Tracker custom card text
Inside `anime_expeditions_tracker.lua`:
- set `local CARD_DESCRIPTION = "Gems x100,000"`

or before loading the tracker in your executor:
- `_G.SEASHOP_CARD_DESCRIPTION = "Villain Mode 1D"`

The text will show on the player card in the dashboard.
