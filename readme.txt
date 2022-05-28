Requirement:
    - Node.js (v16.14)
    - Golang (1.8)
    - MySQL

Memories Backend (API)
    1. สร้าง database ชื่อ db_memories
    2. เข้าไปที่โฟลเดอร์ memories-backend
    3. ใส่ข้อมูลการ connect database ที่ไฟล์ .env (ตัวแปรที่ขึ้นต้นด้วย DB_) 
        ***ถ้าไม่เจอไฟล์ .env ให้ทำการ copy ไฟล์ .env.example แล้วเปลี่ยนชื่อเป็น .env
    4. เปิด cmd หรือ gitbash ขึ้นมาแล้ววรันคำสั่ง go run main.go (หาก connect db ได้ ระบบจะทำการสร้าง table ให้โดยอัตโนมัติ)
    5. เมื่อรันผ่านแล้วสามารถเช็ค api ได้ที่ http://localhost:8000/api/v1/healthcheck

Memories frontend
    1. เข้าไปที่โฟลเดอร์ memories-frontend
    2. เปิด cmd หรือ gitbash ขึ้นมาแล้วรันคำสั่ง npm install
    3. รันคำสั่ง npm start
    4. เมื่อรันผ่านแล้วสามารถเข้าระบบได้ที่ http://localhost:3000