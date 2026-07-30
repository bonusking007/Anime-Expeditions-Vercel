local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local API_URL = "https://anime-expeditions-vercel.vercel.app/api/update"
local API_KEY = "seashop"
local SEND_INTERVAL = 15

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

local DisplayNameFallbacks = {
    FoodItem6 = "Bunny Candy",
    CrowRelic = "Crow Relic",
    ItachiEVOItem = "Crow's Ring",
    FoodItem1 = "Cursed Boba",
    ZerefEVOItem = "Cursed Book",
    ExpeditionMaterial1 = "Cursed Timber",
    FoodItem4 = "Delicious Pie",
    EquipmentLock = "Equipment Lock",
    EquipmentReroll = "Equipment Reroll",
    EquipmentScrap = "Equipment Scrap",
    ExpeditionCoin = "Expedition Coin",
    ExpeditionFuel = "Fuel Cell",
    GrimmjowEVOItem = "Jaw Skull",
    ExpeditionMaterial2 = "Lush Dirt",
    JudarEVOItem = "Magical Amulet",
    RaidToken = "Raid Token",
    SpiritCityTotem = "Spirit City Totem",
    SpiritCityToken = "Spirit Token",
    SpriteBlue = "Sprite (Blue)",
    SpriteGreen = "Sprite (Green)",
    SpriteGrey = "Sprite (Grey)",
    SpritePink = "Sprite (Pink)",
    SpritePurple = "Sprite (Purple)",
    SpriteRainbow = "Sprite (Rainbow)",
    SpriteRed = "Sprite (Red)",
    SpriteYellow = "Sprite (Yellow)",
    StatLock = "Stat Lock",
    StatReroll = "Stat Reroll",
    TraitReroll = "Trait Crystal",
    VillainCurrency = "Villain Coins"
}

local Nodes
local ItemsInfo
local DisplayNameCache = {}

local function loadModules()
    if not Nodes then
        local Success, Result = pcall(function()
            local Module = ReplicatedStorage:WaitForChild("Nodes", 20)
            return Module and require(Module)
        end)

        if Success then
            Nodes = Result
        end
    end

    if not ItemsInfo then
        local Success, Result = pcall(function()
            local Shared = ReplicatedStorage:WaitForChild("Shared", 20)
            local Information = Shared and Shared:WaitForChild("Information", 20)
            local Module = Information and Information:WaitForChild("Items", 20)
            return Module and require(Module)
        end)

        if Success and type(Result) == "table" then
            ItemsInfo = Result
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

    local DisplayName
    local Info = ItemsInfo and findItemInfo(ItemsInfo, InternalName)

    if Info then
        for _, Field in ipairs(DisplayFields) do
            local Value = Info[Field]

            if type(Value) == "string" and Value:match("%S") then
                DisplayName = Value
                break
            end
        end
    end

    DisplayName = DisplayName or DisplayNameFallbacks[InternalName] or InternalName
    DisplayNameCache[InternalName] = DisplayName

    return DisplayName
end

local function getReplica()
    loadModules()

    if not Nodes or not Nodes.GET_PLAYER_REPLICA then
        return nil
    end

    local Success, Replica = pcall(function()
        return Nodes.GET_PLAYER_REPLICA:InvokeSelf()
    end)

    if Success then
        return Replica
    end

    return nil
end

local function getInventory()
    local Replica = getReplica()
    local ItemData = Replica and Replica.Data and Replica.Data.ItemData

    if type(ItemData) ~= "table" then
        return nil, nil
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

local function sendSnapshot()
    local Inventory, ItemDisplayNames = getInventory()

    if not Inventory then
        warn("ITEM DATA NOT FOUND")
        return false
    end

    local Payload = {
        username = Player.Name,
        displayName = Player.DisplayName,
        userId = Player.UserId,
        inventory = Inventory,
        itemDisplayNames = ItemDisplayNames,
        placeId = game.PlaceId,
        jobId = game.JobId,
        session = Session,
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
