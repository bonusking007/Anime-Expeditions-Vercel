# SEASHOP TrackStats

Version: 1.9.0

## v1.9.0
- Added **View Units** below View Inventory.
- Tracker reads `Replica.Data.UnitData` and sends unit name, asset, rarity, level, trait, shiny and status fields.
- Unit Vault shows rarity-themed cards, Trait icons/gradients, Level and Shiny only when applicable.
- Added the supplied Secret, Exclusive and Mythic unit artwork under `assets/units/`.
- Inventory uses larger item cards and no longer displays internal keys such as `Key: Gold`.
- Player cards now show Level/XP, Gems, Trait Rerolls and Gold.
- Player avatar is larger and the card displays only one detected Place/Game line.
- Overview now shows Total Online, Players, Online and Offline; Item Types was removed from Overview.
- Run Details now shows current Wave and Total Wins from saved logs.
- Result logs store the Wave reached when available.
- Existing result logs are merged on the server, so reopening the tracker does not immediately erase prior runs.
- Player records automatically expire after 7 days without tracker updates.
- Fluent tracker interface and user-facing notifications were translated to Thai.

## Vercel setup
Upload the single `seashop-trackstats` folder to the repository root.

- Root Directory: `seashop-trackstats`
- Framework Preset: Other
- Build Command: leave empty
- Output Directory: leave empty
- Install Command: leave empty

## Tracker config before loading an obfuscated file
```lua
getgenv().SEASHOP_CONFIG = {
    API_URL = "https://anime-expeditions-vercel.vercel.app/api/update",
    API_KEY = "seashop",
    SEND_INTERVAL = 15,
    MAX_RESULT_LOGS = 20,
    CARD_DESCRIPTION = "",
    SEND_DATA = true,
    PLACE_INFO = {}
}

loadstring(game:HttpGet("RAW_LINK_TO_OBFUSCATED_TRACKER"))()
```

Use `anime_expeditions_tracker_v1.9.0.lua` as the source file before obfuscation.
