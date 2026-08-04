# SEASHOP TrackStats

Version: **1.9.3**

## v1.9.3

- ลบช่องรูปว่างด้านซ้ายของหัวหน้า Player Unit Vault ให้หน้าตาเหมือน View Inventory
- ขยาย Avatar บนการ์ด Dashboard เล็กน้อยและซูมเข้าหาตัวละคร
- จัดข้อมูลในการ์ด Unit ให้ชิดซ้ายและอยู่แนวเดียวกันทุกใบ
- กำหนดพื้นที่ Name, Level, Rarity, Shiny, Trait และรายละเอียดให้เท่ากัน ลดปัญหาการ์ดเอียง
- เพิ่มขนาดข้อความ Rarity, Trait และข้อมูล Unit ให้มองเห็นง่ายขึ้นโดยยังคงสัดส่วนเดิม
- ใส่ Emoji ในกรอบ Total Units, Secret, Exclusive, Mythic, Legendary, Epic, Rare และ Shiny
- เปลี่ยนกล่อง Shiny เป็นธีมสีขาว
- เปลี่ยนปุ่ม View Units เป็นธีมสีฟ้าเดียวกับ View Inventory
- จัดไอคอน Asset ID `93889631653195` ไว้หน้าข้อความ View Units ในกรอบแบบเดียวกับ View Inventory
- ใช้เวลาไทย `th-TH / Asia/Bangkok` ตามเดิม
- ในโปรเจกต์มี Tracker เพียงไฟล์เดียว

## Tracker หลัก

ใช้ไฟล์นี้สำหรับนำไป Obfuscate:

```text
anime_expeditions_tracker_v1.9.3.lua
```

## Vercel Root Directory

หลังแตก ZIP และอัปโหลดด้วยวิธีเดิมที่ทำให้ชื่อเวอร์ชันซ้อน 2 ชั้น ให้ใช้:

```text
seashop-trackstats-v1.9.3/seashop-trackstats-v1.9.3/seashop-trackstats
```

ให้ยึด Breadcrumb ที่เห็นจริงบน GitHub เป็นหลัก และใส่ทุกชั้นตามที่แสดง

## Environment Variables

```text
TRACKER_API_KEY=seashop
UPSTASH_REDIS_REST_URL=...
UPSTASH_REDIS_REST_TOKEN=...
```

หรือใช้ชื่อเดิม:

```text
KV_REST_API_URL=...
KV_REST_API_TOKEN=...
```

ดู Config และ Loader ได้ใน `CONFIG_GUIDE.md` กับ `CONFIG_EXAMPLE.lua`
