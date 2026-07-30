local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local API_URL = "https://seashop-trackstats.vercel.app/api/update"
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

if getgenv().SEASHOP_TRACKER_STOP then
    getgenv().SEASHOP_TRACKER_STOP()
elseif getgenv().ANIME_EXPEDITIONS_TRACKER_STOP then
    getgenv().ANIME_EXPEDITIONS_TRACKER_STOP()
end

local Running = true
local Player = Players.LocalPlayer
local Session = HttpService:GenerateGUID(false)

getgenv().SEASHOP_TRACKER_STOP = function()
    Running = false
end

getgenv().ANIME_EXPEDITIONS_TRACKER_STOP = getgenv().SEASHOP_TRACKER_STOP

local function getReplica()
    local Success, Replica = pcall(function()
        local Nodes = require(ReplicatedStorage:WaitForChild("Nodes", 20))
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
        return nil
    end

    local Inventory = {}

    for ItemName, Data in pairs(ItemData) do
        local Amount = type(Data) == "table" and Data.Amount or Data

        if type(Amount) == "number" and Amount >= 0 then
            Inventory[tostring(ItemName)] = Amount
        end
    end

    return Inventory
end

local function sendSnapshot()
    local Inventory = getInventory()

    if not Inventory then
        warn("ITEM DATA NOT FOUND")
        return false
    end

    local Payload = {
        username = Player.Name,
        displayName = Player.DisplayName,
        userId = Player.UserId,
        inventory = Inventory,
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
