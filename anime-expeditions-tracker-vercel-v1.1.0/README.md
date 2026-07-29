# Anime Expeditions Inventory Tracker

**Version:** `1.1.0`  
**Updated:** `30 July 2026`

เว็บ Vercel สำหรับรับข้อมูล `Replica.Data.ItemData` จาก Luau และแสดงผู้เล่นกับ Inventory แบบเรียลไทม์

## Changelog

### v1.1.0

- ออกแบบหน้า Dashboard ใหม่เป็นธีม Cyber สีฟ้าเข้ม
- เพิ่มการ์ดโปรไฟล์ผู้เล่นแบบเต็มตัว
- เพิ่มรูป Roblox Avatar อัตโนมัติผ่าน `/api/avatars`
- เปลี่ยนข้อมูลใต้ตัวละครเป็นปุ่ม **View Inventory**
- เพิ่มหน้าต่าง Inventory แบบตาราง ค้นหาและเรียงลำดับได้
- เพิ่มแถบ Overview, Recent Sync และ Tracker System
- เพิ่ม Version บนหน้าเว็บและ README
- ปรับ Responsive สำหรับมือถือและแท็บเล็ต

### v1.0.0

- ระบบรับ `ItemData` จาก Luau
- รองรับหลาย Roblox User ID
- Online/Offline อัตโนมัติ
- ใช้ Upstash Redis สำหรับเก็บข้อมูล

## ฟีเจอร์

- ผู้เล่นที่รัน Luau จะแสดงเป็นการ์ดบนหน้า Dashboard
- แสดง Roblox Avatar, Display Name, Username และ User ID
- กด **View Inventory** เพื่อดูไอเทมทั้งหมด
- ค้นหาผู้เล่น, User ID หรือชื่อไอเทม
- เรียง Inventory ตามจำนวนหรือชื่อ
- หน้าเว็บดึงข้อมูลใหม่ทุก 5 วินาที
- Luau ส่งข้อมูลทุก 15 วินาที
- Online เมื่อผู้เล่นส่งข้อมูลภายใน 45 วินาที
- API key ป้องกันบุคคลอื่นส่งข้อมูลปลอม

## Deploy บน Vercel

1. อัปโหลดไฟล์ทั้งหมดในโปรเจกต์ขึ้น GitHub
2. ใน Vercel ตั้ง Framework Preset เป็น **Other**
3. ถ้าไฟล์อยู่ในโฟลเดอร์ ให้ตั้ง Root Directory เป็นชื่อโฟลเดอร์นั้น
4. ติดตั้ง **Upstash Redis** จาก Storage / Marketplace
5. ตรวจ Environment Variables:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
6. เพิ่ม `TRACKER_API_KEY` เป็นข้อความสุ่มยาว ๆ
7. Redeploy
8. แก้ใน `anime_expeditions_tracker.lua`:

```lua
local API_URL = "https://ชื่อโปรเจกต์.vercel.app/api/update"
local API_KEY = "ค่าเดียวกับ TRACKER_API_KEY"
```

9. รัน Luau ใน Anime Expeditions

## URL ตรวจระบบ

- Dashboard: `https://ชื่อโปรเจกต์.vercel.app`
- API health: `https://ชื่อโปรเจกต์.vercel.app/api/health`
- API players: `https://ชื่อโปรเจกต์.vercel.app/api/players`
- API avatars: `https://ชื่อโปรเจกต์.vercel.app/api/avatars?userIds=1`

## ไฟล์ที่เปลี่ยนใน v1.1.0

- `index.html`
- `assets/styles.css`
- `assets/app.js`
- `api/avatars.js` (ไฟล์ใหม่)
- `package.json`
- `README.md`

## ความปลอดภัย

อย่าอัปโหลด Redis token, `.env.local`, API key หรือ Discord webhook ลง GitHub และควร Reset webhook ที่เคยเปิดเผยแล้ว
