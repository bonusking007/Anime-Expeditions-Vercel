# SEASHOP TrackStats

Version: **1.9.1**

## v1.9.1

- แก้ Tracker error `tonumber base out of range` ตอนอ่าน Level/XP
- ป้องกันฟังก์ชันอ่าน Level, Wave และ Unit ทำให้การส่งข้อมูลทั้งรอบหยุด
- ปรับระบบอ่าน `UnitData` ให้รองรับค่าที่เป็น State/Wrapper และชื่อฟิลด์หลายรูปแบบ
- ปรับ Player Card ให้ Level, Gems, Trait Rerolls และ Gold เรียงสมดุลแบบ 2 × 2
- ปรับ View Inventory ให้ไอคอนและตัวเลขขนาดพอดี พร้อมการ์ด 3 คอลัมน์บน Desktop
- ปรับ View Units ใหม่ให้การ์ดกระชับ แสดง Level, Rarity, Shiny และ Trait ตามสีระดับ
- เพิ่มไอคอน View Units Asset ID `93889631653195`
- ในโปรเจกต์มี Tracker เพียงไฟล์เดียว
- เพิ่ม `CONFIG_EXAMPLE.lua` และ `CONFIG_GUIDE.md`

## Tracker หลัก

ใช้ไฟล์นี้สำหรับนำไป Obfuscate:

```text
anime_expeditions_tracker_v1.9.1.lua
```

## Vercel Root Directory

```text
seashop-trackstats-v1.9.1/seashop-trackstats
```

## Environment Variables

```text
TRACKER_API_KEY=seashop
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

หรือใช้ชื่อตัวแปร Redis แบบเดิม:

```text
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

ดูตัวอย่าง Loader และ Config ได้ที่ `CONFIG_GUIDE.md` และ `CONFIG_EXAMPLE.lua`
