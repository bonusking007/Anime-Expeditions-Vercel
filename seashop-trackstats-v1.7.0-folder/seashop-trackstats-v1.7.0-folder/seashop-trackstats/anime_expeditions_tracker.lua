local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local API_URL = "https://anime-expeditions-vercel.vercel.app/api/update"
local API_KEY = "seashop"
local SEND_INTERVAL = 15
local MAX_RESULT_LOGS = 20

-- Custom text shown on the player card in the web dashboard.
-- Example: "Gems x100,000" or "Villain 1D"
local CARD_DESCRIPTION = nil

-- Map display names shown on the web dashboard.
-- Add place IDs for the main game, lobby, portals, worlds, etc.
-- Example:
-- [1234567890] = { Game = "Anime Expeditions", Place = "Lobby" }
-- [1234567891] = { Game = "Anime Expeditions", Place = "Spirit City" }
local PLACE_INFO = {
    -- [1111111111] = { Game = "Anime Expeditions", Place = "Lobby" },
    -- [2222222222] = { Game = "Anime Expeditions", Place = "Main Game" },
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
API_URL = tostring(Env.SEASHOP_API_URL or API_URL)
API_KEY = tostring(Env.SEASHOP_API_KEY or API_KEY)
CARD_DESCRIPTION = tostring(CARD_DESCRIPTION or Env.SEASHOP_CARD_DESCRIPTION or "")
PLACE_INFO = type(Env.SEASHOP_PLACE_INFO) == "table" and Env.SEASHOP_PLACE_INFO or PLACE_INFO

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

    return "Anime Expeditions", tostring(game.PlaceId)
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
    addResultLog({
        result = victory and "Victory" or "Defeat",
        stageName = tostring(stageName),
        clearTime = durationText,
        description = currentPlace and ("Location: " .. tostring(currentPlace)) or "",
        mapLabel = tostring(stageName),
        location = currentPlace or "",
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
    print("SEASHOP RESULT LOGGER READY")
end

function sendSnapshot()
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
        resultLogs = ResultLogs,
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

loadModules()
attachResultHook()
sendSnapshot()

task.spawn(function()
    while Running and Player.Parent do
        task.wait(SEND_INTERVAL)
        if Running and Player.Parent then
            sendSnapshot()
        end
    end
end)
