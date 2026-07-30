local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local API_URL = "https://anime-expeditions-vercel.vercel.app/api/update"
local API_KEY = "seashop"
local SEND_INTERVAL = 15

-- Custom text shown on the player card in the web dashboard.
-- Example: "Gems x100,000" or "Villain 1D"
local CARD_DESCRIPTION = nil

-- Map display names shown on the web dashboard.
-- Add more place IDs here whenever the game uses lobby / stage / world sub-places.
local PLACE_INFO = {
    -- Example:
    -- [1234567890] = { Game = "Anime Expeditions", Place = "Lobby" },
    -- [1234567891] = { Game = "Anime Expeditions", Place = "Main Game" }
}

local _request =
    request
    or http_request
    or (http and http.request)
    or (syn and syn.request)
    or (fluxus and fluxus.request)

if not _request then
    warn("REQUEST NOT SUPPORTED")
    return
end

local Env = getgenv and getgenv() or _G
CARD_DESCRIPTION = tostring(CARD_DESCRIPTION or Env.SEASHOP_CARD_DESCRIPTION or "")
PLACE_INFO = type(Env.SEASHOP_PLACE_INFO) == "table" and Env.SEASHOP_PLACE_INFO or PLACE_INFO

if Env.SEASHOP_TRACKER_STOP then
    Env.SEASHOP_TRACKER_STOP()
elseif Env.ANIME_EXPEDITIONS_TRACKER_STOP then
    Env.ANIME_EXPEDITIONS_TRACKER_STOP()
end

local Running = true
local Player = Players.LocalPlayer
local Session = HttpService:GenerateGUID(false)

Env.SEASHOP_TRACKER_STOP = function()
    Running = false
end

Env.ANIME_EXPEDITIONS_TRACKER_STOP = Env.SEASHOP_TRACKER_STOP

local DisplayFields = {
    "DisplayName",
    "FormattedName",
    "ItemName",
    "Name",
    "Title"
}

-- Used only if Shared.Information.Items cannot resolve the key.
local DisplayNameFallbacks = {
    ["KenpachiEVOitem"] = "8th's Sword",
    ["ExpeditionStatAnvil"] = "Anvil",
    ["ExpeditionMaterial3"] = "Aqua Shard",
    ["BattlepassEXP"] = "Battlepass EXP",
    ["BeginnerTicket"] = "Beginner's Ticket",
    ["AOEColorBlack"] = "Black Unit Indicator Color",
    ["AOEColorBlue"] = "Blue Unit Indicator Color",
    ["FoodItem6"] = "Bunny Candy",
    ["BurningFruit"] = "Burning Fruit",
    ["AOEColorCobalt"] = "Cobalt Unit Indicator Color",
    ["CosmicMagic"] = "Cosmic Magic",
    ["AOEColorCrimson"] = "Crimson Unit Indicator Color",
    ["CrimsonVial"] = "Crimson Vial",
    ["CrowRelic"] = "Crow Relic",
    ["ItachiEVOItem"] = "Crow's Ring",
    ["Crown"] = "Crown",
    ["FoodItem1"] = "Cursed Boba",
    ["ZerefEVOItem"] = "Cursed Book",
    ["ExpeditionMaterial1"] = "Cursed Timber",
    ["FoodItem4"] = "Delicious Pie",
    ["DevHatGifter"] = "Developer Hat Gifter",
    ["ElixirOfLife"] = "Elixir of Life",
    ["EquipmentLock"] = "Equipment Lock",
    ["EquipmentReroll"] = "Equipment Reroll",
    ["EquipmentScrap"] = "Equipment Scrap",
    ["EventCoin"] = "Event Coin",
    ["ExpeditionCoin"] = "Expedition Coin",
    ["FoodItem3"] = "Frown Fruit",
    ["ExpeditionFuel"] = "Fuel Cell",
    ["Gem"] = "Gem",
    ["ExpeditionGeode"] = "Geode",
    ["GiantHammer"] = "Giant Hammer",
    ["Gold"] = "Gold",
    ["AOEColorGreen"] = "Green Unit Indicator Color",
    ["HollowedVisor"] = "Hollowed Visor",
    ["HinataEVOItem"] = "Holy Pendant",
    ["GrimmjowEVOItem"] = "Jaw Skull",
    ["JokerCard"] = "Joker of the Nonsensical Pirates",
    ["LeaderboardCapsule"] = "Leaderboard Capsule",
    ["LuckPotion"] = "Luck Potion",
    ["ExpeditionMaterial2"] = "Lush Dirt",
    ["JudarEVOItem"] = "Magical Amulet",
    ["FoodItem5"] = "Mana Flask",
    ["AOEColorOrange"] = "Orange Unit Indicator Color",
    ["ExpeditionPayloadEXP"] = "Payload EXP",
    ["AOEColorPink"] = "Pink Unit Indicator Color",
    ["PlayerEXP"] = "Player EXP",
    ["PuppetHeart"] = "Puppet Heart",
    ["AOEColorPurple"] = "Purple Unit Indicator Color",
    ["RaidToken"] = "Raid Token",
    ["AOEColorRainbow"] = "Rainbow Unit Indicator Color",
    ["RandomItem"] = "Random Item",
    ["FoodItem2"] = "Red Flower",
    ["AOEColorRed"] = "Red Unit Indicator Color",
    ["ExpeditionRepair"] = "Repair Hammer",
    ["ResearchPoint"] = "Research Point",
    ["Salmon"] = "Salmon",
    ["SpiritCityTotem"] = "Spirit City Totem",
    ["SpiritCityToken"] = "Spirit Token",
    ["SpriteBlue"] = "Sprite (Blue)",
    ["SpriteGreen"] = "Sprite (Green)",
    ["SpriteGrey"] = "Sprite (Grey)",
    ["SpritePink"] = "Sprite (Pink)",
    ["SpritePurple"] = "Sprite (Purple)",
    ["SpriteRainbow"] = "Sprite (Rainbow)",
    ["SpriteRed"] = "Sprite (Red)",
    ["SpriteYellow"] = "Sprite (Yellow)",
    ["StatLock"] = "Stat Lock",
    ["StatReroll"] = "Stat Reroll",
    ["StudentID"] = "Student ID",
    ["SuperLuckPotion"] = "Super Luck Potion",
    ["ExpeditionTome"] = "Tome",
    ["TraitReroll"] = "Trait Crystal",
    ["UnitEXP"] = "Unit EXP",
    ["Bundle"] = "Unknown Bundle",
    ["VillainBattlepassEXP"] = "Villain Battlepass EXP",
    ["VillainChest"] = "Villain Chest",
    ["VillainCurrency"] = "Villain Coins",
    ["AOEColorWhite"] = "White Unit Indicator Color",
    ["AOEColorYellow"] = "Yellow Unit Indicator Color",
    ["Yen"] = "Yen",
}

local Nodes
local ItemsInfo
local ItemNameIndex
local DisplayNameCache = {}

local function readDisplayName(Info)
    if type(Info) ~= "table" then
        return nil
    end

    for _, Field in ipairs(DisplayFields) do
        local Value = Info[Field]

        if type(Value) == "string" and Value:match("%S") then
            return Value
        end
    end

    return nil
end

local function buildItemNameIndex(Root)
    local Index = {}
    local Visited = {}

    local function scan(Value, TableKey)
        if type(Value) ~= "table" or Visited[Value] then
            return
        end

        Visited[Value] = true

        local DisplayName = readDisplayName(Value)
        local Identifiers = {
            TableKey,
            Value.Id,
            Value.ID,
            Value.Key,
            Value.ItemId,
            Value.ItemID,
            Value.InternalName
        }

        if DisplayName then
            for _, Identifier in ipairs(Identifiers) do
                if Identifier ~= nil then
                    Index[tostring(Identifier)] = DisplayName
                end
            end
        end

        for Key, Child in pairs(Value) do
            if type(Child) == "table" then
                scan(Child, Key)
            end
        end
    end

    scan(Root, nil)
    return Index
end

local function loadModules()
    if not Nodes then
        local Success, Result = pcall(function()
            return require(ReplicatedStorage:WaitForChild("Nodes", 20))
        end)

        if Success then
            Nodes = Result
        end
    end

    if not ItemsInfo then
        local Success, Result = pcall(function()
            return require(
                ReplicatedStorage
                    :WaitForChild("Shared", 20)
                    :WaitForChild("Information", 20)
                    :WaitForChild("Items", 20)
            )
        end)

        if Success and type(Result) == "table" then
            ItemsInfo = Result
            ItemNameIndex = buildItemNameIndex(Result)
        end
    end
end

local function findItemInfo(Root, InternalName, Visited)
    if type(Root) ~= "table" then
        return nil
    end

    Visited = Visited or {}

    if Visited[Root] then
        return nil
    end

    Visited[Root] = true

    if type(Root[InternalName]) == "table" then
        return Root[InternalName]
    end

    for Key, Value in pairs(Root) do
        if type(Value) == "table" then
            local Identifiers = {
                Key,
                Value.Id,
                Value.ID,
                Value.Key,
                Value.ItemId,
                Value.ItemID,
                Value.InternalName
            }

            for _, Identifier in ipairs(Identifiers) do
                if Identifier ~= nil and tostring(Identifier) == InternalName then
                    return Value
                end
            end

            local Found = findItemInfo(Value, InternalName, Visited)

            if Found then
                return Found
            end
        end
    end

    return nil
end

local function getDisplayName(InternalName)
    InternalName = tostring(InternalName)

    if DisplayNameCache[InternalName] then
        return DisplayNameCache[InternalName]
    end

    loadModules()

    local DisplayName = ItemNameIndex and ItemNameIndex[InternalName]

    if not DisplayName and ItemsInfo then
        local Info = findItemInfo(ItemsInfo, InternalName)
        DisplayName = readDisplayName(Info)

        if DisplayName then
            ItemNameIndex = ItemNameIndex or {}
            ItemNameIndex[InternalName] = DisplayName
        end
    end

    DisplayName = DisplayName or DisplayNameFallbacks[InternalName]

    if DisplayName then
        DisplayNameCache[InternalName] = DisplayName
        return DisplayName
    end

    -- Do not cache unresolved keys, so a later module load can resolve them.
    return InternalName
end

local function getReplica()
    loadModules()

    if not Nodes or not Nodes.GET_PLAYER_REPLICA then
        return nil
    end

    local Success, Replica = pcall(function()
        return Nodes.GET_PLAYER_REPLICA:InvokeSelf()
    end)

    return Success and Replica or nil
end

local function getInventory()
    local Replica = getReplica()
    local ItemData = Replica and Replica.Data and Replica.Data.ItemData

    if type(ItemData) ~= "table" then
        return nil
    end

    local Inventory = {}
    local ItemDisplayNames = {}

    for InternalName, Data in pairs(ItemData) do
        local Amount = type(Data) == "table" and Data.Amount or Data

        if type(Amount) == "number" and Amount >= 0 then
            local Key = tostring(InternalName)
            Inventory[Key] = Amount
            ItemDisplayNames[Key] = getDisplayName(Key)
        end
    end

    return Inventory, ItemDisplayNames
end

local function resolvePlaceInfo()
    local info = PLACE_INFO[game.PlaceId]

    if info then
        return info.Game or "Anime Expeditions", info.Place or nil
    end

    local fallbackPlace = tostring(game.PlaceId)
    return "Anime Expeditions", fallbackPlace
end

local function sendSnapshot()
    local Inventory, ItemDisplayNames = getInventory()

    if not Inventory then
        warn("ITEM DATA NOT FOUND")
        return false
    end

    local GameName, PlaceName = resolvePlaceInfo()

    local Payload = {
        username = Player.Name,
        displayName = Player.DisplayName,
        userId = Player.UserId,
        inventory = Inventory,
        itemDisplayNames = ItemDisplayNames,
        placeId = game.PlaceId,
        gameName = GameName,
        placeName = PlaceName,
        jobId = game.JobId,
        session = Session,
        cardDescription = CARD_DESCRIPTION,
        ts = os.time()
    }

    local Success, Response = pcall(function()
        return _request({
            Url = API_URL,
            Method = "POST",
            Headers = {
                ["Content-Type"] = "application/json",
                ["X-API-Key"] = API_KEY
            },
            Body = HttpService:JSONEncode(Payload),
            Timeout = 15
        })
    end)

    if not Success then
        warn("TRACKER REQUEST ERROR:", Response)
        return false
    end

    local StatusCode = Response.StatusCode or Response.Status

    if StatusCode == 200 then
        print("SEASHOP TRACKSTATS UPDATED")
        return true
    end

    warn("TRACKER FAILED:", StatusCode, Response.Body)
    return false
end

sendSnapshot()

task.spawn(function()
    while Running and Player.Parent do
        task.wait(SEND_INTERVAL)

        if Running and Player.Parent then
            sendSnapshot()
        end
    end
end)
