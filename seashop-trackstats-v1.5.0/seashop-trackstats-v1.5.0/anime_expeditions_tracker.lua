local HttpService = game:GetService("HttpService")
local Players = game:GetService("Players")
local ReplicatedStorage = game:GetService("ReplicatedStorage")

local API_URL = "https://anime-expeditions-vercel.vercel.app/api/update"
local API_KEY = "seashop"
local SEND_INTERVAL = 15

local _request = request or http_request or (http and http.request) or (syn and syn.request) or (fluxus and fluxus.request)
if not _request then warn("REQUEST NOT SUPPORTED") return end

local FALLBACK = {
  KenpachiEVOitem = { display = "8th's Sword", assetId = 98131647273476 },
  ExpeditionStatAnvil = { display = "Anvil", assetId = 87373295347365 },
  ExpeditionMaterial3 = { display = "Aqua Shard", assetId = 134586230895171 },
  BattlepassEXP = { display = "Battlepass EXP", assetId = 114328894217766 },
  BeginnerTicket = { display = "Beginner's Ticket", assetId = 92708131788468 },
  AOEColorBlack = { display = "Black Unit Indicator Color", assetId = 86214153130821 },
  AOEColorBlue = { display = "Blue Unit Indicator Color", assetId = 86214153130821 },
  FoodItem6 = { display = "Bunny Candy", assetId = 114002509716577 },
  BurningFruit = { display = "Burning Fruit", assetId = 123556219241960 },
  AOEColorCobalt = { display = "Cobalt Unit Indicator Color", assetId = 86214153130821 },
  CosmicMagic = { display = "Cosmic Magic", assetId = 121833778269255 },
  AOEColorCrimson = { display = "Crimson Unit Indicator Color", assetId = 86214153130821 },
  CrimsonVial = { display = "Crimson Vial", assetId = 94381461409309 },
  CrowRelic = { display = "Crow Relic", assetId = 76923936793147 },
  ItachiEVOItem = { display = "Crow's Ring", assetId = 87203191785095 },
  Crown = { display = "Crown", assetId = 137524761353956 },
  FoodItem1 = { display = "Cursed Boba", assetId = 86406261866497 },
  ZerefEVOItem = { display = "Cursed Book", assetId = 82295494861028 },
  ExpeditionMaterial1 = { display = "Cursed Timber", assetId = 136417792145357 },
  FoodItem4 = { display = "Delicious Pie", assetId = 112080191044214 },
  DevHatGifter = { display = "Developer Hat Gifter", assetId = 87919600502988 },
  ElixirOfLife = { display = "Elixir of Life", assetId = 125147427945388 },
  EquipmentLock = { display = "Equipment Lock", assetId = 98479956634965 },
  EquipmentReroll = { display = "Equipment Reroll", assetId = 81367008512026 },
  EquipmentScrap = { display = "Equipment Scrap", assetId = 138259000495300 },
  EventCoin = { display = "Event Coin", assetId = 122283537900027 },
  ExpeditionCoin = { display = "Expedition Coin", assetId = 133127153759220 },
  FoodItem3 = { display = "Frown Fruit", assetId = 131512075092964 },
  ExpeditionFuel = { display = "Fuel Cell", assetId = 104121621042535 },
  Gem = { display = "Gem", assetId = 127345120309392 },
  ExpeditionGeode = { display = "Geode", assetId = 138904987734280 },
  GiantHammer = { display = "Giant Hammer", assetId = 121596631364316 },
  Gold = { display = "Gold", assetId = 135239612382433 },
  AOEColorGreen = { display = "Green Unit Indicator Color", assetId = 86214153130821 },
  HollowedVisor = { display = "Hollowed Visor", assetId = 117343950081695 },
  HinataEVOItem = { display = "Holy Pendant", assetId = 86605157198890 },
  GrimmjowEVOItem = { display = "Jaw Skull", assetId = 109276412279273 },
  JokerCard = { display = "Joker of the Nonsensical Pirates", assetId = 137441898503450 },
  LeaderboardCapsule = { display = "Leaderboard Capsule", assetId = 94800308177665 },
  LuckPotion = { display = "Luck Potion", assetId = 77171016111697 },
  ExpeditionMaterial2 = { display = "Lush Dirt", assetId = 92084519126759 },
  JudarEVOItem = { display = "Magical Amulet", assetId = 71145581264662 },
  FoodItem5 = { display = "Mana Flask", assetId = 94316038056476 },
  AOEColorOrange = { display = "Orange Unit Indicator Color", assetId = 86214153130821 },
  ExpeditionPayloadEXP = { display = "Payload EXP", assetId = 124721389072864 },
  AOEColorPink = { display = "Pink Unit Indicator Color", assetId = 86214153130821 },
  PlayerEXP = { display = "Player EXP", assetId = 117500362262257 },
  PuppetHeart = { display = "Puppet Heart", assetId = 84111339695232 },
  AOEColorPurple = { display = "Purple Unit Indicator Color", assetId = 86214153130821 },
  RaidToken = { display = "Raid Token", assetId = 136240850940008 },
  AOEColorRainbow = { display = "Rainbow Unit Indicator Color", assetId = 86214153130821 },
  RandomItem = { display = "Random Item", assetId = 71123287869055 },
  FoodItem2 = { display = "Red Flower", assetId = 132509394462607 },
  AOEColorRed = { display = "Red Unit Indicator Color", assetId = 86214153130821 },
  ExpeditionRepair = { display = "Repair Hammer", assetId = 80027541580589 },
  ResearchPoint = { display = "Research Point", assetId = 121721703265529 },
  Salmon = { display = "Salmon", assetId = 79569140573560 },
  SpiritCityTotem = { display = "Spirit City Totem", assetId = 104984239057202 },
  SpiritCityToken = { display = "Spirit Token", assetId = 114823475742161 },
  SpriteBlue = { display = "Sprite (Blue)", assetId = 126917557220272 },
  SpriteGreen = { display = "Sprite (Green)", assetId = 124445225421161 },
  SpriteGrey = { display = "Sprite (Grey)", assetId = 72115941471722 },
  SpritePink = { display = "Sprite (Pink)", assetId = 80102116113968 },
  SpritePurple = { display = "Sprite (Purple)", assetId = 86386797861874 },
  SpriteRainbow = { display = "Sprite (Rainbow)", assetId = 90878706773915 },
  SpriteRed = { display = "Sprite (Red)", assetId = 112690032318535 },
  SpriteYellow = { display = "Sprite (Yellow)", assetId = 92252032301356 },
  StatLock = { display = "Stat Lock", assetId = 140365526846292 },
  StatReroll = { display = "Stat Reroll", assetId = 136060410683336 },
  StudentID = { display = "Student ID", assetId = 125687910025203 },
  SuperLuckPotion = { display = "Super Luck Potion", assetId = 133531148635869 },
  ExpeditionTome = { display = "Tome", assetId = 126371997272787 },
  TraitReroll = { display = "Trait Crystal", assetId = 112860527247753 },
  UnitEXP = { display = "Unit EXP", assetId = 118877874477600 },
  Bundle = { display = "Unknown Bundle", assetId = 91508523300786 },
  VillainBattlepassEXP = { display = "Villain Battlepass EXP", assetId = 87293290668489 },
  VillainChest = { display = "Villain Chest", assetId = 107628615140722 },
  VillainCurrency = { display = "Villain Coins", assetId = 125718058013287 },
  AOEColorWhite = { display = "White Unit Indicator Color", assetId = 86214153130821 },
  AOEColorYellow = { display = "Yellow Unit Indicator Color", assetId = 86214153130821 },
  Yen = { display = "Yen", assetId = 131430939615770 },
}

local Env = getgenv and getgenv() or _G
if Env.SEASHOP_TRACKER_STOP then Env.SEASHOP_TRACKER_STOP() end

local Running = true
local Player = Players.LocalPlayer
local SessionId = HttpService:GenerateGUID(false)
Env.SEASHOP_TRACKER_STOP = function() Running = false end

local function findItemInfo(root, internalName, visited)
  if type(root) ~= "table" then return nil end
  visited = visited or {}
  if visited[root] then return nil end
  visited[root] = true
  if type(root[internalName]) == "table" then return root[internalName] end
  for key, value in pairs(root) do
    if type(value) == "table" then
      local identifiers = { key, value.Id, value.ID, value.Key, value.ItemId, value.ItemID, value.InternalName }
      for _, identifier in ipairs(identifiers) do
        if tostring(identifier) == internalName then return value end
      end
      local found = findItemInfo(value, internalName, visited)
      if found then return found end
    end
  end
  return nil
end

local function getDisplayName(itemsInfo, internalName)
  local itemInfo = itemsInfo and findItemInfo(itemsInfo, internalName)
  if type(itemInfo) == "table" then
    for _, field in ipairs({ "DisplayName", "FormattedName", "ItemName", "Name", "Title" }) do
      local value = itemInfo[field]
      if type(value) == "string" and value ~= "" then
        return value
      end
    end
  end
  local fallback = FALLBACK[internalName]
  return fallback and fallback.display or internalName
end

local function buildItems()
  local Nodes = require(ReplicatedStorage:WaitForChild("Nodes", 20))
  local Replica = Nodes.GET_PLAYER_REPLICA:InvokeSelf()
  local itemData = Replica and Replica.Data and Replica.Data.ItemData
  if type(itemData) ~= "table" then return nil end

  local success, itemsInfo = pcall(function()
    return require(ReplicatedStorage:WaitForChild("Shared"):WaitForChild("Information"):WaitForChild("Items"))
  end)
  if not success then itemsInfo = nil end

  local results = {}
  for internalName, data in pairs(itemData) do
    local amount = type(data) == "table" and data.Amount or data
    if amount ~= nil then
      internalName = tostring(internalName)
      local fallback = FALLBACK[internalName]
      table.insert(results, {
        key = internalName,
        displayName = getDisplayName(itemsInfo, internalName),
        amount = amount,
        assetId = fallback and fallback.assetId or nil,
      })
    end
  end
  table.sort(results, function(a,b) return tostring(a.displayName):lower() < tostring(b.displayName):lower() end)
  return results
end

local function sendInventory()
  local items = buildItems()
  if not items then warn("ITEM DATA NOT FOUND") return end
  local payload = {
    username = Player.Name,
    displayName = Player.DisplayName,
    userId = Player.UserId,
    items = items,
    placeId = game.PlaceId,
    jobId = game.JobId,
    session = SessionId,
    ts = os.time(),
  }

  local ok, response = pcall(function()
    return _request({
      Url = API_URL,
      Method = "POST",
      Headers = { ["Content-Type"] = "application/json", ["X-API-Key"] = API_KEY },
      Body = HttpService:JSONEncode(payload),
      Timeout = 15,
    })
  end)

  if not ok then warn("TRACKER REQUEST ERROR:", response) return end
  local statusCode = response.StatusCode or response.Status
  if statusCode == 200 then
    print("SEASHOP TRACKSTATS UPDATED")
  else
    warn("TRACKER FAILED:", statusCode, response.Body)
  end
end

sendInventory()
task.spawn(function()
  while Running and Player.Parent do
    task.wait(SEND_INTERVAL)
    if Running and Player.Parent then sendInventory() end
  end
end)
