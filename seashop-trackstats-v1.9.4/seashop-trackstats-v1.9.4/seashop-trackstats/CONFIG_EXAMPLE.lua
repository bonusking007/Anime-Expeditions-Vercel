-- SEASHOP TrackStats - ตัวอย่าง Config
-- แก้ค่าต่าง ๆ ก่อนเรียก Loader ด้านล่าง

getgenv().SEASHOP_CONFIG = {
    -- API ของเว็บไซต์ Vercel
    API_URL = "https://anime-expeditions-vercel.vercel.app/api/update",

    -- ต้องตรงกับ TRACKER_API_KEY ที่ตั้งไว้ใน Vercel
    API_KEY = "seashop",

    -- ส่งข้อมูลทุกกี่วินาที (ขั้นต่ำ 1 วินาที)
    SEND_INTERVAL = 15,

    -- จำนวนประวัติจบด่านสูงสุดต่อผู้เล่น
    MAX_RESULT_LOGS = 20,

    -- ข้อความที่แสดงบนการ์ดผู้เล่น
    CARD_DESCRIPTION = "ฟาม",

    -- true = ส่งข้อมูล / false = หยุดส่งข้อมูล
    SEND_DATA = true,

    -- กำหนดชื่อเกมหรือชื่อ Place เอง เฉพาะกรณีที่ไม่ใช้ระบบตรวจจับอัตโนมัติ
    PLACE_INFO = {}
}

loadstring(game:HttpGet(
    "https://seashop-api.seashoploader.workers.dev/api/v1/luascripts/public/seashop-main/download"
))()
