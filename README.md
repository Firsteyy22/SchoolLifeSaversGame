# SchoolLifeSaversGame

Update code to Github (open terminal in VSCode)
============
1) git add .
2) git commit -m "Update code changes"
3) git push origin main

Update code from friend
= git pull origin main
============

ถ้า pull ไม่ได้ = git pull --rebase origin main

Process Update
============
firsteyy22 (09/11/24): add font to CSS + add page setting + add page credit + start game + ใส่ basic button ไปด้วย
firsteyy22 (21/11/24): change default button (เหลือแก้สี + ตัวปุ่มมันอยู่ตรงกลางทุกหน้าต้องปรับตรงนี้ด้วย)

firsteyy22 (04/12/24): 
- ปรับหน้า menu (index.html) + ใส่ logo
- เปลี่ยนชื่อ credit.html -> aboutus.html
- ปรับตำแหน่ง button หน้า startGame.html + aboutus.html + setting.html

firsteyy22 (06/12/24): 
- เพิ่มไฟล์ level_01.html/level_02.html/level_03.html/gameplay.js/levelcheck.js
- สร้างหน้า gameplay ได้ ปุ่มเรียบร้อย เล่นแบบ step by step ได้
- *ปัญหาที่เจอ เก็บค่าไม่ตรง (เล่นด่าน 2 แต่บอกว่า ผ่านด่าน 1) + ลองล็อกด่าน 3 แต่เล่นครบ 2 ด่านก่อนหน้าแล้ว ก็ยังล็อกอยู่*

firsteyy22 (17/12/24): 
- flow map level แต่ละด่าน เริ่มที่ level 1 ด่านอื่น ๆ จะล็อกไว้ ถ้าเล่นด่านก่อน ๆ ผ่าน จะทำให้ด่านต่อไปก็จะปลดล็อก
- เมื่อกด refresh สถานะด่านที่เล่นไปก็จะยังอยู่
- แต่ถ้า กดปิดบราวเซอร์ เกมจะทำการรีเซ็ตใหม่หมด

firsteyy22 (18-19/12/24)
- จัดการส่วนตอบคำถาม เมื่อกดตอบคำถามจะมีการเล่น GIF + สีปุ่มที่ตอบไปแสดงสีว่าถูกหรือผิด แล้วจึงเข้าสู่ส่วนถัดไป
- ตอบถูก = ไปคำถามถัดไป / ตอบผิด = ให้เริ่มใหม่
- flow = (press ans / GIF & button result / if true => next qustion, if false => pic + retry button
- รวบไฟล์ ด่านเกมแต่ละด่าน ไว้ในโฟลเดอร์ level
- เพิ่มไฟล์ map.html => แมพของนิค เอาโค้ดมาวางไว้เฉยๆ ใช้เสร็จก็ลบไฟล์นี้ทิ้ง

firsteyy22 (20/12/24): ทำพาร์ทเล่นเกม อีกรูปแบบ (ตอบคำถามแล้ว จะมี VDO สอดไส้ ก่อนไปส่วนถัดไป)

firsteyy22 (23/12/24): ใส่ pic ใน text box คำตอบ + เพิ่มเนื้อหาใน aboutus.html

firsteyy22 (26/12/24): ใส่ BGM และ sfx หน้า setting.html

firsteyy22 (29/12/24): ปรับ UI หน้า seeting.html

Arthurz & firsteyy22 (02/01/25): ใส่ isometric map