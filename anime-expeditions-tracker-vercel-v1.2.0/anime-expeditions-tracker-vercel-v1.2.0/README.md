# Anime Expeditions Inventory Tracker

**Version:** `1.2.0`  
**Updated:** `30 July 2026`

เว็บ Vercel สำหรับรับข้อมูล `Replica.Data.ItemData` จาก Luau และแสดงผู้เล่นกับ Inventory แบบเรียลไทม์

## Changelog

### v1.2.0

- เปลี่ยนแบรนด์หน้าเว็บทั้งหมดเป็น **SEASHOP**
- เพิ่มโลโก้ร้านจริงใน Header, Landing Page และ Favicon
- เปลี่ยนธีมหลักเป็นสีฟ้า Cyber ให้ตรงกับโลโก้
- เพิ่มหน้า Landing ก่อนเข้า Dashboard พร้อมปุ่ม **Enter Dashboard**
- เอาแท็บ Players และ System ด้านบนออก เหลือ Home กับ Dashboard
- เอาป้าย Total Item Amount ออกจาก Overview
- เพิ่มขนาดตัวอักษรส่วนสำคัญให้อ่านง่ายขึ้น
- เพิ่ม Footer: © 2026 SEASHOP | All Systems Operational
- เพิ่มข้อความไม่เกี่ยวข้องกับ Roblox Corporation


### v1.1.1

- แก้แพ็กเกจอัปโหลดให้เป็นโปรเจกต์เต็ม ไม่ใช่เฉพาะไฟล์อัปเดต
- ใส่ `api/health.js`, `api/players.js`, `api/update.js` และโฟลเดอร์ `lib` ให้ครบ
- เพิ่มคำแนะนำให้ตั้ง Root Directory ว่างเมื่ออัปโหลดไฟล์ไว้หน้าแรกของ Repository
- ป้องกัน Build Error จาก `api/avatars.js` ที่หา `../lib/http.js` ไม่เจอ

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

1. แตกไฟล์ ZIP แล้วอัปโหลด **ไฟล์ด้านในทั้งหมด** ไว้หน้าแรกของ Repository
2. ตรวจว่า `index.html`, `api`, `assets`, `lib`, `package.json` และ `vercel.json` อยู่ระดับเดียวกัน
3. ใน Vercel ตั้ง Framework Preset เป็น **Other**
4. ตั้ง Root Directory เป็นค่าว่าง ห้ามใส่ `./` เมื่อไฟล์อยู่หน้าแรกของ Repository
5. ติดตั้ง **Upstash Redis** จาก Storage / Marketplace
6. ตรวจ Environment Variables:
   - `UPSTASH_REDIS_REST_URL`
   - `UPSTASH_REDIS_REST_TOKEN`
7. เพิ่ม `TRACKER_API_KEY` เป็นข้อความสุ่มยาว ๆ
8. Redeploy
9. แก้ใน `anime_expeditions_tracker.lua`:

```lua
local API_URL = "https://ชื่อโปรเจกต์.vercel.app/api/update"
local API_KEY = "ค่าเดียวกับ TRACKER_API_KEY"
```

10. รัน Luau ใน Anime Expeditions

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
