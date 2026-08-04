# SEASHOP TrackStats

Version: **1.9.2**

## v1.9.2

- เพิ่มรูป Unit ชุด Legendary, Epic และ Rare
- ปรับตัวอ่าน UnitData ให้รองรับข้อมูลที่ถูกห่อใน Data / Value / State เพื่อแก้กรณีรัน Tracker แล้ว Unit ไม่ขึ้น
- เพิ่มรูป `Water Princess` และ `Nen Hunter` จากภาพรวมที่ผู้ใช้ส่ง
- ปรับ View Inventory ให้การ์ดขนาดสมดุล 4 คอลัมน์บนจอใหญ่ และไม่แสดง Internal Key
- ปรับ View Units ให้หน้าตาเข้าธีมเดียวกัน พร้อมกรอบสีตาม Rarity
- เพิ่มแผงสรุป Total Units, Secret, Exclusive, Mythic, Legendary, Epic, Rare และ Shiny
- ใส่ไอคอน View Units จาก Asset ID `93889631653195` ทั้งปุ่มและหัวหน้าต่าง
- ลดอาการกระตุกด้วยการแบ่งแสดง Inventory/Units เป็นชุด, ปุ่ม Load more, Debounce Search และไม่สร้าง DOM ใหม่ทุก 5 วินาทีโดยไม่จำเป็น
- เพิ่ม `content-visibility`, Lazy Loading และ Async Image Decoding
- เวลาในหน้าเว็บใช้ `th-TH` และ `Asia/Bangkok` (UTC+7)
- ในโปรเจกต์มี Tracker เพียงไฟล์เดียว

## Tracker หลัก

ใช้ไฟล์นี้สำหรับนำไป Obfuscate:

```text
anime_expeditions_tracker_v1.9.2.lua
```

## Vercel Root Directory

หลังแตก ZIP และอัปโหลดขึ้น GitHub ด้วยวิธีเดิมของผู้ใช้ โดยชื่อเวอร์ชันซ้อน 2 ชั้น ให้ใช้:

```text
seashop-trackstats-v1.9.2/seashop-trackstats-v1.9.2/seashop-trackstats-v1.9.2/seashop-trackstats
```

โครงสร้างนี้เกิดจากการแตก ZIP ลงในโฟลเดอร์ชื่อเดียวกับไฟล์ ZIP ก่อนอัปโหลดขึ้น GitHub

ให้ยึด Breadcrumb ที่เห็นจริงใน GitHub เป็นหลัก และใส่ทุกชั้นตามที่แสดง

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
