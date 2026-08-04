# SEASHOP Tracker Config

ใช้ไฟล์ `anime_expeditions_tracker_v1.9.2.lua` เป็นไฟล์หลักสำหรับนำไป Obfuscate และอัปโหลดขึ้น Cloudflare Worker

## Loader สำหรับผู้ใช้งาน

```lua
getgenv().SEASHOP_CONFIG = {
    API_URL = "https://anime-expeditions-vercel.vercel.app/api/update",
    API_KEY = "seashop",

    SEND_INTERVAL = 15,
    MAX_RESULT_LOGS = 20,
    CARD_DESCRIPTION = "ฟาม",
    SEND_DATA = true,

    PLACE_INFO = {}
}

loadstring(game:HttpGet(
    "https://seashop-api.seashoploader.workers.dev/api/v1/luascripts/public/seashop-main/download"
))()
```

## ความหมายแต่ละค่า

- `API_URL` — Endpoint ของเว็บไซต์ที่รับข้อมูลจาก Tracker
- `API_KEY` — รหัสที่ต้องตรงกับ `TRACKER_API_KEY` ใน Vercel
- `SEND_INTERVAL` — จำนวนวินาทีระหว่างการส่งข้อมูลแต่ละครั้ง
- `MAX_RESULT_LOGS` — จำนวนประวัติจบด่านสูงสุดที่เก็บต่อผู้เล่น
- `CARD_DESCRIPTION` — ข้อความสั้น ๆ ที่แสดงบนการ์ดผู้เล่น
- `SEND_DATA` — เปิดหรือปิดการส่งข้อมูลอัตโนมัติ
- `PLACE_INFO` — ใช้ตั้งชื่อเกมหรือ Place เอง โดยปกติปล่อยเป็น `{}` ได้

## ตัวอย่าง PLACE_INFO

```lua
PLACE_INFO = {
    [123456789] = {
        Game = "Anime Expeditions [UPDATE 😈]",
        Place = "Story - Act 1"
    }
}
```
