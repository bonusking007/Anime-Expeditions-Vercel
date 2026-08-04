# SEASHOP TrackStats

Version: **1.9.4**

## v1.9.4

- ล็อกตำแหน่งข้อมูล Unit ทุกการ์ดให้เริ่มจากแนวซ้ายเดียวกัน
- กำหนดความสูงแถวชื่อ, Rarity, Trait และรายละเอียดให้เท่ากัน
- ป้องกันชื่อสั้น/ยาวทำให้ข้อความเลื่อนไปอยู่กึ่งกลาง
- ปรับ Responsive โดยยังคงแนวข้อมูลตรงกันทุกขนาดหน้าจอ


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
anime_expeditions_tracker_v1.9.4.lua
```

## Vercel Root Directory

ZIP รุ่นนี้มีโครงสร้าง `seashop-trackstats-v1.9.4/seashop-trackstats` ดังนั้นเมื่ออัปโหลดขึ้น GitHub ตามโครงสร้างเดิม ให้ใช้:

```text
seashop-trackstats-v1.9.4/seashop-trackstats
```

ให้ตรวจ Breadcrumb บน GitHub อีกครั้งก่อนบันทึก เพราะถ้าอัปโหลดโฟลเดอร์ครอบซ้ำ ต้องใส่ทุกชั้นตามที่เห็นจริง

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
