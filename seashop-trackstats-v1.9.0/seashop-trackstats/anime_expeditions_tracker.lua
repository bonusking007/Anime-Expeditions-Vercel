local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local MarketplaceService = game:GetService("MarketplaceService")

local TRACKER_VERSION = "1.9.0"

local API_URL = "https://anime-expeditions-vercel.vercel.app/api/update"
local API_KEY = "seashop"
local SEND_INTERVAL = 15
local MAX_RESULT_LOGS = 20
local CARD_DESCRIPTION = ""
local SEND_DATA = true

-- ตั้งชื่อเกมหรือ Place เองเฉพาะกรณีที่ไม่ต้องการใช้ระบบตรวจจับอัตโนมัติ
local PLACE_INFO = {}

local _request =
    request
    or http_request
    or (http and http.request)
    or (syn and syn.request)
    or (fluxus and fluxus.request)

if not _request then
    warn("Executor นี้ไม่รองรับ request/http_request")
    return
end

local Env = getgenv and getgenv() or _G
local Config = type(Env.SEASHOP_CONFIG) == "table" and Env.SEASHOP_CONFIG or {}
Env.SEASHOP_CONFIG = Config

local function getConfigValue(Key, LegacyKey, DefaultValue)
    local Value = Config[Key]

    if Value == nil and LegacyKey then
        Value = Env[LegacyKey]
    end

    if Value == nil then
        return DefaultValue
    end

    return Value
end

API_URL = tostring(getConfigValue("API_URL", "SEASHOP_API_URL", API_URL))
API_KEY = tostring(getConfigValue("API_KEY", "SEASHOP_API_KEY", API_KEY))
SEND_INTERVAL = math.clamp(
    math.floor(tonumber(getConfigValue("SEND_INTERVAL", "SEASHOP_SEND_INTERVAL", SEND_INTERVAL)) or SEND_INTERVAL),
    1,
    3600
)
MAX_RESULT_LOGS = math.clamp(
    math.floor(tonumber(getConfigValue("MAX_RESULT_LOGS", "SEASHOP_MAX_RESULT_LOGS", MAX_RESULT_LOGS)) or MAX_RESULT_LOGS),
    1,
    100
)
CARD_DESCRIPTION = tostring(
    getConfigValue("CARD_DESCRIPTION", "SEASHOP_CARD_DESCRIPTION", CARD_DESCRIPTION)
):sub(1, 120)

local ConfigSendData = getConfigValue("SEND_DATA", "SEASHOP_SEND_DATA", SEND_DATA)
SEND_DATA = type(ConfigSendData) == "boolean" and ConfigSendData or SEND_DATA

local ConfigPlaceInfo = getConfigValue("PLACE_INFO", "SEASHOP_PLACE_INFO", PLACE_INFO)
PLACE_INFO = type(ConfigPlaceInfo) == "table" and ConfigPlaceInfo or PLACE_INFO

Config.API_URL = API_URL
Config.API_KEY = API_KEY
Config.SEND_INTERVAL = SEND_INTERVAL
Config.MAX_RESULT_LOGS = MAX_RESULT_LOGS
Config.CARD_DESCRIPTION = CARD_DESCRIPTION
Config.SEND_DATA = SEND_DATA
Config.PLACE_INFO = PLACE_INFO

if Env.SEASHOP_TRACKER_STOP then
    Env.SEASHOP_TRACKER_STOP()
elseif Env.ANIME_EXPEDITIONS_TRACKER_STOP then
    Env.ANIME_EXPEDITIONS_TRACKER_STOP()
end

local Running = true
local Player = Players.LocalPlayer
local PlayerGui = Player:WaitForChild("PlayerGui")
local Session = HttpService:GenerateGUID(false)
local ResultLogs = {}
local LastResultSignature
local LastResultAt = 0
local CachedGameName
local CachedPlaceName
local TrackerWindow

Env.SEASHOP_TRACKER_STOP = function()
    Running = false
    SEND_DATA = false
    Config.SEND_DATA = false

    if TrackerWindow then
        pcall(function()
            TrackerWindow:Destroy()
        end)
    end
end

Env.ANIME_EXPEDITIONS_TRACKER_STOP = Env.SEASHOP_TRACKER_STOP

local DisplayFields = {
    "DisplayName",
    "FormattedName",
    "ItemName",
    "Name",
    "Title"
}

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
local Information
local UnitsInfo
local ItemsInfo
local ItemNameIndex
local DisplayNameCache = {}
local Fusion
local GameResults

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

    if not Information then
        local Success, Result = pcall(function()
            return require(
                ReplicatedStorage
                    :WaitForChild("Shared", 20)
                    :WaitForChild("Information", 20)
            )
        end)

        if Success and type(Result) == "table" then
            Information = Result
            UnitsInfo = Result.Units
            ItemsInfo = Result.Items
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
        end
    end

    if ItemsInfo and not ItemNameIndex then
        ItemNameIndex = buildItemNameIndex(ItemsInfo)
    end

    if not Fusion or not GameResults then
        pcall(function()
            local FusionPackage = ReplicatedStorage:WaitForChild("FusionPackage", 5)
            Fusion = require(FusionPackage:WaitForChild("Fusion", 5))
            GameResults = require(
                FusionPackage
                    :WaitForChild("Components", 5)
                    :WaitForChild("Prompts", 5)
                    :WaitForChild("GameResults", 5)
            )
        end)
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

local function getInventory(Replica)
    Replica = Replica or getReplica()
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

local function getUnitDisplayName(Asset)
    Asset = tostring(Asset or "Unknown")
    loadModules()

    if Information and type(Information.GetAssetDisplayName) == "function" then
        local Success, Result = pcall(function()
            return Information:GetAssetDisplayName(Asset)
        end)

        if Success and type(Result) == "string" and Result ~= "" then
            return Result
        end
    end

    local Info = UnitsInfo and UnitsInfo[Asset]
    if type(Info) == "table" then
        return tostring(Info.DisplayName or Info.Name or Info.Asset or Asset)
    end

    return Asset
end

local function getUnitRarity(Asset)
    Asset = tostring(Asset or "Unknown")
    loadModules()

    if Information and type(Information.GetAssetRarity) == "function" then
        local Success, Result = pcall(function()
            return Information:GetAssetRarity(Asset)
        end)

        if Success and type(Result) == "string" and Result ~= "" then
            return Result
        end
    end

    local Info = UnitsInfo and UnitsInfo[Asset]
    return type(Info) == "table" and tostring(Info.Rarity or "Rare") or "Unknown"
end

local function getUnits(Replica)
    Replica = Replica or getReplica()
    local UnitData = Replica and Replica.Data and Replica.Data.UnitData

    if type(UnitData) ~= "table" then
        return {}
    end

    local Units = {}

    for UnitID, Data in pairs(UnitData) do
        if type(Data) == "table" then
            local Asset = tostring(Data.Asset or "Unknown")
            local Info = UnitsInfo and UnitsInfo[Asset]

            table.insert(Units, {
                id = tostring(UnitID),
                asset = Asset,
                name = getUnitDisplayName(Asset),
                rarity = getUnitRarity(Asset),
                level = tonumber(Data.Level) or 1,
                trait = tostring(Data.Trait or "None"),
                shiny = Data.Shiny == true,
                equipped = Data.Equipped == true,
                locked = Data.Locked == true,
                favorited = Data.Favorited == true,
                element = type(Info) == "table" and tostring(Info.Element or "") or "",
                archetype = type(Info) == "table" and tostring(Info.Archetype or "") or ""
            })
        end
    end

    table.sort(Units, function(A, B)
        if A.rarity == B.rarity then
            if A.name == B.name then
                return A.level > B.level
            end
            return A.name < B.name
        end
        return A.rarity < B.rarity
    end)

    return Units
end

local function detectGameName()
    if CachedGameName then
        return CachedGameName
    end

    local Success, Response = pcall(function()
        return _request({
            Url = "https://games.roblox.com/v1/games?universeIds=" .. tostring(game.GameId),
            Method = "GET",
            Headers = {
                ["Content-Type"] = "application/json"
            },
            Timeout = 15
        })
    end)

    if Success then
        local StatusCode = Response.StatusCode or Response.Status

        if StatusCode == 200 and Response.Body then
            local DecodeSuccess, Data = pcall(function()
                return HttpService:JSONDecode(Response.Body)
            end)

            local GameData = DecodeSuccess
                and Data
                and Data.data
                and Data.data[1]

            if GameData and type(GameData.name) == "string" and GameData.name ~= "" then
                CachedGameName = GameData.name
            end
        end
    end

    return CachedGameName or "Roblox Game"
end

local function detectPlaceName()
    if CachedPlaceName then
        return CachedPlaceName
    end

    local Success, Info = pcall(function()
        return MarketplaceService:GetProductInfoAsync(
            game.PlaceId,
            Enum.InfoType.Asset
        )
    end)

    if Success and Info and type(Info.Name) == "string" and Info.Name ~= "" then
        CachedPlaceName = Info.Name
    end

    return CachedPlaceName or ("Place " .. tostring(game.PlaceId))
end

local function resolvePlaceInfo()
    local Override = PLACE_INFO[game.PlaceId]
    local GameName = detectGameName()
    local PlaceName = detectPlaceName()

    if type(Override) == "table" then
        GameName = Override.Game or GameName
        PlaceName = Override.Place or PlaceName
    end

    return GameName, PlaceName
end

local function peek(value)
    if Fusion and Fusion.peek then
        local Success, Result = pcall(Fusion.peek, value)
        if Success then
            return Result
        end
    end

    return value
end

local function cleanText(text)
    return tostring(text or "")
        :gsub("<.->", "")
        :gsub("\n", " ")
        :gsub("%s+", " ")
        :gsub("^%s+", "")
        :gsub("%s+$", "")
end

local function getAmount(text)
    text = cleanText(text):gsub(",", "")

    return tonumber(text:match("^([%d]+)[xX]$"))
        or tonumber(text:match("^[xX]([%d]+)$"))
end


local function getPlayerProgress()
    local Label

    pcall(function()
        local BottomHUD = PlayerGui:FindFirstChild("BottomHUD")
        local Second = BottomHUD and BottomHUD:GetChildren()[2]
        Label = Second
            and Second:FindFirstChild("Frame")
            and Second.Frame:FindFirstChild("Frame")
            and Second.Frame.Frame:FindFirstChild("Frame")
            and Second.Frame.Frame.Frame:FindFirstChild("TextLabel")
    end)

    if not Label then
        local BottomHUD = PlayerGui:FindFirstChild("BottomHUD")
        if BottomHUD then
            for _, Object in ipairs(BottomHUD:GetDescendants()) do
                if Object:IsA("TextLabel") and cleanText(Object.Text):match("^Lvl%s*%d+") then
                    Label = Object
                    break
                end
            end
        end
    end

    local Text = cleanText(Label and Label.Text or "")
    local Level = tonumber(Text:match("Lvl%s*(%d+)")) or 0
    local CurrentXP, RequiredXP = Text:match("%(([%d,]+)/([%d,]+)%s*XP%)")

    return {
        level = Level,
        currentXp = tonumber((CurrentXP or "0"):gsub(",", "")) or 0,
        requiredXp = tonumber((RequiredXP or "0"):gsub(",", "")) or 0,
        text = Text
    }
end

local function getWaveProgress()
    local Label

    pcall(function()
        local TopGameHUD = PlayerGui:FindFirstChild("TopGameHUD")
        local Root = TopGameHUD and TopGameHUD:FindFirstChild("Frame")
        local Fourth = Root and Root:GetChildren()[4]
        Label = Fourth
            and Fourth:FindFirstChild("Frame")
            and Fourth.Frame:FindFirstChild("Frame")
            and Fourth.Frame.Frame:FindFirstChild("Frame")
            and Fourth.Frame.Frame.Frame:FindFirstChild("Frame")
            and Fourth.Frame.Frame.Frame.Frame:FindFirstChild("Frame")
            and Fourth.Frame.Frame.Frame.Frame.Frame:FindFirstChild("TextLabel")
            and Fourth.Frame.Frame.Frame.Frame.Frame.TextLabel:FindFirstChild("TextLabel")
    end)

    if not Label then
        local TopGameHUD = PlayerGui:FindFirstChild("TopGameHUD")
        if TopGameHUD then
            for _, Object in ipairs(TopGameHUD:GetDescendants()) do
                if Object:IsA("TextLabel") and cleanText(Object.Text):match("^%d+%s*/%s*%d+$") then
                    Label = Object
                    break
                end
            end
        end
    end

    local Text = cleanText(Label and Label.Text or "")
    local Current, Maximum = Text:match("(%d+)%s*/%s*(%d+)")
    return tonumber(Current) or 0, tonumber(Maximum) or 0
end

local function isIgnoredText(text)
    local lower = text:lower()
    return lower == ""
        or lower == "gained rewards"
        or lower == "game stats"
        or lower == "victory"
        or lower == "defeat"
        or lower == "clear time"
        or lower == "total yen"
        or lower == "total kills"
        or lower == "total damage"
end

local function countAmountLabels(root)
    local count = 0
    for _, object in ipairs(root:GetDescendants()) do
        if object:IsA("TextLabel") and getAmount(object.Text) then
            count += 1
        end
    end
    return count
end

local function findRewardsRoot()
    local gainedRewardsLabel

    for _, object in ipairs(PlayerGui:GetDescendants()) do
        if object:IsA("TextLabel")
            and object.Visible
            and cleanText(object.Text):lower() == "gained rewards" then
            gainedRewardsLabel = object
            break
        end
    end

    if not gainedRewardsLabel then
        return nil
    end

    local current = gainedRewardsLabel.Parent
    for _ = 1, 10 do
        if not current or current == PlayerGui then
            break
        end

        if countAmountLabels(current) > 0 then
            return current
        end

        current = current.Parent
    end

    return nil
end

local function findRewardCard(amountLabel, rewardsRoot)
    local current = amountLabel.Parent
    local fallback = current

    for _ = 1, 7 do
        if not current or current == rewardsRoot then
            break
        end

        local textCount = 0
        local hasImage = false

        for _, object in ipairs(current:GetDescendants()) do
            if object:IsA("TextLabel") then
                textCount += 1
            elseif object:IsA("ImageLabel") and object.Image ~= "" then
                hasImage = true
            end
        end

        if hasImage and textCount >= 2 then
            return current
        end

        fallback = current
        current = current.Parent
    end

    return fallback
end

local function getRewardName(card, amountLabel)
    local bestName
    local bestScore = -math.huge

    for _, object in ipairs(card:GetDescendants()) do
        if object:IsA("TextLabel") and object ~= amountLabel then
            local text = cleanText(object.Text)
            if not getAmount(text)
                and not isIgnoredText(text)
                and text:match("[%a]") then
                local score = #text
                if object.Visible then
                    score += 50
                end
                score += object.AbsolutePosition.Y / 100

                if score > bestScore then
                    bestScore = score
                    bestName = text
                end
            end
        end
    end

    return bestName
end

local function getRewardsFromUI()
    local root = findRewardsRoot()
    if not root then
        return {}
    end

    local rewardMap = {}

    for _, object in ipairs(root:GetDescendants()) do
        if object:IsA("TextLabel") then
            local amount = getAmount(object.Text)
            if amount then
                local card = findRewardCard(object, root)
                local name = getRewardName(card, object)
                if name then
                    local existing = rewardMap[name]
                    if not existing or amount > existing.amount then
                        rewardMap[name] = { name = name, amount = amount }
                    end
                end
            end
        end
    end

    local rewards = {}
    for _, reward in pairs(rewardMap) do
        table.insert(rewards, reward)
    end

    table.sort(rewards, function(a, b)
        return a.name:lower() < b.name:lower()
    end)

    return rewards
end

local function findStageName()
    local bestText
    local bestLength = 0

    for _, object in ipairs(PlayerGui:GetDescendants()) do
        if object:IsA("TextLabel") and object.Visible then
            local text = cleanText(object.Text)
            if text:match("[Aa]ct%s*%d+")
                or text:match("[Ff]loor%s*%d+")
                or text:match("[Ww]ave%s*%d+") then
                if #text > bestLength and text:lower() ~= "next stage" then
                    bestLength = #text
                    bestText = text
                end
            end
        end
    end

    return bestText
end

local function formatTime(value)
    value = peek(value)

    if type(value) == "string" then
        return value
    end

    local seconds = tonumber(value) or 0
    if seconds > 100000 then
        seconds /= 1000
    end

    seconds = math.floor(seconds)
    local hours = math.floor(seconds / 3600)
    local minutes = math.floor((seconds % 3600) / 60)
    local remainingSeconds = seconds % 60
    return string.format("%02d:%02d:%02d", hours, minutes, remainingSeconds)
end

local function readResultField(resultState, field)
    local resultData = peek(resultState)
    if type(resultData) ~= "table" then
        return nil
    end
    return peek(resultData[field])
end

local function addResultLog(entry)
    table.insert(ResultLogs, 1, entry)
    while #ResultLogs > MAX_RESULT_LOGS do
        table.remove(ResultLogs)
    end
end

local function captureResult(resultState)
    local rewards = {}
    for _ = 1, 12 do
        rewards = getRewardsFromUI()
        if #rewards > 0 then
            break
        end
        task.wait(0.25)
    end

    local victory = readResultField(resultState, "Victory") == true
    local totalTime =
        readResultField(resultState, "TotalTime")
        or readResultField(resultState, "Time")
        or readResultField(resultState, "Duration")
        or 0

    local stageName =
        findStageName()
        or readResultField(resultState, "MapName")
        or readResultField(resultState, "StageName")
        or "Game Result"

    local durationText = formatTime(totalTime)
    local signatureParts = { tostring(victory), tostring(stageName), tostring(durationText) }
    for _, reward in ipairs(rewards) do
        table.insert(signatureParts, reward.name .. ":" .. tostring(reward.amount))
    end
    local signature = table.concat(signatureParts, "|")

    if signature == LastResultSignature and os.clock() - LastResultAt < 20 then
        return
    end

    LastResultSignature = signature
    LastResultAt = os.clock()

    local _, currentPlace = resolvePlaceInfo()
    local CurrentWave, MaxWave = getWaveProgress()
    CurrentWave = tonumber(readResultField(resultState, "Wave") or readResultField(resultState, "CurrentWave")) or CurrentWave
    MaxWave = tonumber(readResultField(resultState, "MaxWave") or readResultField(resultState, "TotalWaves")) or MaxWave

    addResultLog({
        result = victory and "Victory" or "Defeat",
        stageName = tostring(stageName),
        clearTime = durationText,
        description = currentPlace and ("Location: " .. tostring(currentPlace)) or "",
        mapLabel = tostring(stageName),
        location = currentPlace or "",
        wave = CurrentWave,
        maxWave = MaxWave,
        rewards = rewards,
        finishedAt = os.time(),
    })

    task.spawn(sendSnapshot)
end

local function attachResultHook()
    if not hookfunction or not GameResults then
        return
    end

    if Env.SEASHOP_RESULT_HOOKED then
        return
    end

    local oldGameResults
    local function hookedGameResults(scope, properties, ...)
        if type(properties) == "table" and properties.ResultData then
            local resultState = properties.ResultData
            task.delay(1, function()
                if Running then
                    captureResult(resultState)
                end
            end)
        end

        return oldGameResults(scope, properties, ...)
    end

    oldGameResults = hookfunction(
        GameResults,
        newcclosure and newcclosure(hookedGameResults) or hookedGameResults
    )

    Env.SEASHOP_RESULT_HOOKED = true
    print("SEASHOP: ระบบบันทึกผลจบด่านพร้อมใช้งาน")
end

function sendSnapshot(force)
    if not SEND_DATA and not force then
        return false
    end

    local Replica = getReplica()
    local Inventory, ItemDisplayNames = getInventory(Replica)

    if not Inventory then
        warn("ไม่พบข้อมูล ItemData")
        return false
    end

    local Units = getUnits(Replica)
    local PlayerProgress = getPlayerProgress()
    local CurrentWave, MaxWave = getWaveProgress()
    local GameName, PlaceName = resolvePlaceInfo()

    local Payload = {
        username = Player.Name,
        displayName = Player.DisplayName,
        userId = Player.UserId,
        inventory = Inventory,
        itemDisplayNames = ItemDisplayNames,
        units = Units,
        playerProgress = PlayerProgress,
        currentWave = CurrentWave,
        maxWave = MaxWave,
        placeId = game.PlaceId,
        gameName = GameName,
        placeName = PlaceName,
        jobId = game.JobId,
        session = Session,
        cardDescription = CARD_DESCRIPTION,
        resultLogs = ResultLogs,
        trackerSettings = {
            sendInterval = SEND_INTERVAL,
            maxResultLogs = MAX_RESULT_LOGS,
            sendEnabled = SEND_DATA
        },
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
        warn("ส่งข้อมูลไม่สำเร็จ:", Response)
        return false
    end

    local StatusCode = Response.StatusCode or Response.Status
    if StatusCode == 200 then
        print("SEASHOP: อัปเดตข้อมูลขึ้นเว็บแล้ว")
        return true
    end

    warn("SEASHOP: เว็บตอบกลับผิดพลาด:", StatusCode, Response.Body)
    return false
end

local function requestText(url)
    local Success, Response = pcall(function()
        return _request({
            Url = url,
            Method = "GET",
            Headers = {
                ["Cache-Control"] = "no-cache"
            },
            Timeout = 20
        })
    end)

    if not Success then
        return nil, tostring(Response)
    end

    local StatusCode = Response.StatusCode or Response.Status
    if StatusCode ~= 200 then
        return nil, "HTTP " .. tostring(StatusCode)
    end

    return Response.Body
end

local function loadRemote(url)
    local Source, ErrorMessage = requestText(url)
    if not Source then
        error(ErrorMessage)
    end

    local Chunk, CompileError = loadstring(Source)
    if not Chunk then
        error(CompileError)
    end

    return Chunk()
end

local function buildTrackerUI()
    local Success, ErrorMessage = pcall(function()
        local Fluent = loadRemote("https://github.com/dawid-scripts/Fluent/releases/latest/download/main.lua")
        local SaveManager = loadRemote("https://raw.githubusercontent.com/dawid-scripts/Fluent/master/Addons/SaveManager.lua")
        local InterfaceManager = loadRemote("https://raw.githubusercontent.com/dawid-scripts/Fluent/master/Addons/InterfaceManager.lua")

        local Window = Fluent:CreateWindow({
            Title = "SEASHOP TrackStats",
            SubTitle = "v" .. TRACKER_VERSION,
            TabWidth = 160,
            Size = UDim2.fromOffset(580, 460),
            Acrylic = false,
            Theme = "Dark",
            MinimizeKey = Enum.KeyCode.LeftControl
        })

        TrackerWindow = Window

        local Tabs = {
            Main = Window:AddTab({ Title = "ตัวติดตาม", Icon = "radio" }),
            Settings = Window:AddTab({ Title = "ตั้งค่า", Icon = "settings" })
        }

        local Options = Fluent.Options
        local GameName, PlaceName = resolvePlaceInfo()

        Tabs.Main:AddParagraph({
            Title = "สถานที่ปัจจุบัน",
            Content = tostring(GameName) .. "\n" .. tostring(PlaceName) .. " | " .. tostring(game.PlaceId)
        })

        local SendToggle = Tabs.Main:AddToggle("SendData", {
            Title = "ส่งข้อมูล",
            Description = "เปิดหรือหยุดส่งข้อมูลผู้เล่น ไอเทม ยูนิต และผลจบด่านขึ้นเว็บ",
            Default = SEND_DATA
        })

        SendToggle:OnChanged(function()
            SEND_DATA = Options.SendData.Value == true
            Config.SEND_DATA = SEND_DATA
            Env.SEASHOP_SEND_DATA = SEND_DATA

            task.spawn(function()
                sendSnapshot(true)
            end)

            Fluent:Notify({
                Title = "SEASHOP TrackStats",
                Content = SEND_DATA and "เปิดการส่งข้อมูลแล้ว" or "หยุดส่งข้อมูลแล้ว",
                Duration = 4
            })
        end)

        local IntervalInput = Tabs.Main:AddInput("SendInterval", {
            Title = "ช่วงเวลาส่งข้อมูล",
            Description = "จำนวนวินาทีต่อการส่งข้อมูลอัตโนมัติหนึ่งครั้ง",
            Default = tostring(SEND_INTERVAL),
            Placeholder = "15",
            Numeric = true,
            Finished = true,
            Callback = function(Value)
                local Number = tonumber(Value)
                if not Number then
                    return
                end

                SEND_INTERVAL = math.clamp(math.floor(Number), 1, 3600)
                Config.SEND_INTERVAL = SEND_INTERVAL
                Env.SEASHOP_SEND_INTERVAL = SEND_INTERVAL
            end
        })

        IntervalInput:OnChanged(function()
            local Number = tonumber(IntervalInput.Value)
            if Number then
                SEND_INTERVAL = math.clamp(math.floor(Number), 1, 3600)
                Config.SEND_INTERVAL = SEND_INTERVAL
                Env.SEASHOP_SEND_INTERVAL = SEND_INTERVAL
            end
        end)

        local LogsInput = Tabs.Main:AddInput("MaxResultLogs", {
            Title = "จำนวนประวัติจบด่านสูงสุด",
            Description = "จำนวนผลจบด่านสูงสุดที่เก็บไว้ต่อบัญชี",
            Default = tostring(MAX_RESULT_LOGS),
            Placeholder = "20",
            Numeric = true,
            Finished = true,
            Callback = function(Value)
                local Number = tonumber(Value)
                if not Number then
                    return
                end

                MAX_RESULT_LOGS = math.clamp(math.floor(Number), 1, 100)
                Config.MAX_RESULT_LOGS = MAX_RESULT_LOGS
                Env.SEASHOP_MAX_RESULT_LOGS = MAX_RESULT_LOGS

                while #ResultLogs > MAX_RESULT_LOGS do
                    table.remove(ResultLogs)
                end
            end
        })

        LogsInput:OnChanged(function()
            local Number = tonumber(LogsInput.Value)
            if Number then
                MAX_RESULT_LOGS = math.clamp(math.floor(Number), 1, 100)
                Config.MAX_RESULT_LOGS = MAX_RESULT_LOGS
                Env.SEASHOP_MAX_RESULT_LOGS = MAX_RESULT_LOGS

                while #ResultLogs > MAX_RESULT_LOGS do
                    table.remove(ResultLogs)
                end
            end
        end)

        local DescriptionInput = Tabs.Main:AddInput("CardDescription", {
            Title = "คำอธิบายการ์ด",
            Description = "ข้อความที่แสดงบนการ์ดผู้เล่นในหน้าเว็บ",
            Default = CARD_DESCRIPTION,
            Placeholder = "เช่น ฟาร์มเนื้อเรื่อง",
            Numeric = false,
            Finished = true,
            Callback = function(Value)
                CARD_DESCRIPTION = tostring(Value or ""):sub(1, 120)
                Config.CARD_DESCRIPTION = CARD_DESCRIPTION
                Env.SEASHOP_CARD_DESCRIPTION = CARD_DESCRIPTION

                if SEND_DATA then
                    task.spawn(sendSnapshot)
                end
            end
        })

        DescriptionInput:OnChanged(function()
            CARD_DESCRIPTION = tostring(DescriptionInput.Value or ""):sub(1, 120)
            Config.CARD_DESCRIPTION = CARD_DESCRIPTION
            Env.SEASHOP_CARD_DESCRIPTION = CARD_DESCRIPTION
        end)

        Tabs.Main:AddButton({
            Title = "ส่งข้อมูลตอนนี้",
            Description = "ส่งข้อมูลหนึ่งครั้งทันที แม้ปิดการส่งอัตโนมัติอยู่",
            Callback = function()
                task.spawn(function()
                    local Sent = sendSnapshot(true)
                    Fluent:Notify({
                        Title = "SEASHOP TrackStats",
                        Content = Sent and "ส่งข้อมูลสำเร็จ" or "ส่งข้อมูลไม่สำเร็จ",
                        Duration = 4
                    })
                end)
            end
        })

        SaveManager:SetLibrary(Fluent)
        InterfaceManager:SetLibrary(Fluent)
        SaveManager:IgnoreThemeSettings()
        SaveManager:SetIgnoreIndexes({})
        InterfaceManager:SetFolder("SEASHOP")
        SaveManager:SetFolder("SEASHOP/TrackStats")
        InterfaceManager:BuildInterfaceSection(Tabs.Settings)
        SaveManager:BuildConfigSection(Tabs.Settings)

        Window:SelectTab(1)
        SaveManager:LoadAutoloadConfig()

        Fluent:Notify({
            Title = "SEASHOP TrackStats",
            Content = SEND_DATA and "โหลดตัวติดตามแล้ว และกำลังส่งข้อมูล" or "โหลดตัวติดตามแล้ว แต่หยุดส่งข้อมูลอยู่",
            Duration = 6
        })
    end)

    if not Success then
        warn("เปิด Fluent UI ไม่สำเร็จ:", ErrorMessage)
    end
end

loadModules()
attachResultHook()
buildTrackerUI()

if SEND_DATA then
    task.spawn(sendSnapshot)
end

task.spawn(function()
    local Elapsed = 0

    while Running and Player.Parent do
        task.wait(1)
        Elapsed += 1

        if Elapsed >= SEND_INTERVAL then
            Elapsed = 0

            if SEND_DATA and Running and Player.Parent then
                sendSnapshot()
            end
        end
    end
end)
