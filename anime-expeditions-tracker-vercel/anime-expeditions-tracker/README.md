# Anime Expeditions Inventory Tracker

เว็บ Vercel สำหรับรับข้อมูล `Replica.Data.ItemData` จาก Luau และแสดงจำนวนไอเทมแบบเรียลไทม์

## ฟีเจอร์

- รองรับหลาย Roblox User ID
- Online/Offline อัตโนมัติ เมื่อเกิน 45 วินาทีไม่ได้ส่งข้อมูล
- ค้นหาชื่อผู้เล่น, User ID และชื่อไอเทม
- เรียงไอเทมตามจำนวนหรือชื่อ
- หน้าเว็บดึงข้อมูลใหม่ทุก 5 วินาที
- Luau ส่งข้อมูลทุก 15 วินาที และหยุด loop เก่าเมื่อรันซ้ำ
- API key ป้องกันบุคคลอื่นส่งข้อมูลปลอม
- ไม่มี npm dependency จึง Deploy บน Vercel ได้ทันที

## Deploy บน Vercel

1. แตก ZIP แล้วอัปโหลดโฟลเดอร์ทั้งหมดขึ้น GitHub
2. เข้า Vercel และ Import Repository โดยเลือก Framework Preset เป็น **Other**
3. ในโปรเจกต์ Vercel ไปที่ **Storage / Marketplace** แล้วเพิ่ม **Upstash Redis**
4. ตรวจว่ามี Environment Variables:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
5. เพิ่ม Environment Variable `TRACKER_API_KEY` เป็นข้อความสุ่มยาว ๆ
6. Redeploy
7. เปิด `anime_expeditions_tracker.lua` แล้วแก้:

```lua
local API_URL = "https://ชื่อโปรเจกต์.vercel.app/api/update"
local API_KEY = "ค่าเดียวกับ TRACKER_API_KEY"
```

8. รัน Luau ใน Anime Expeditions

## URL สำหรับตรวจระบบ

- Dashboard: `https://ชื่อโปรเจกต์.vercel.app`
- API health: `https://ชื่อโปรเจกต์.vercel.app/api/health`
- API players: `https://ชื่อโปรเจกต์.vercel.app/api/players`

## Environment Variables สำหรับรันในเครื่อง

คัดลอก `.env.example` เป็น `.env.local` หรือกำหนดตัวแปรผ่าน shell ก่อนใช้ `vercel dev`

## ความปลอดภัย

อย่าอัปโหลด Redis token, `.env.local`, API key หรือ Discord webhook ลง GitHub และควร Reset Discord webhook ที่เคยเผยแพร่แล้ว
