// **************
// ฟังก์ชันจบ Level
// กำหนดค่าคงที่สำหรับระบุ level ในแต่ละห้อง
const ROOM_LEVELS = {
    ROOM1: { min: 1, max: 5 },
    ROOM2: { min: 6, max: 9 },
    ROOM3: { min: 10, max: 13 },
    ROOM4: { min: 14, max: 18 }
};

// กำหนดค่าคงที่สำหรับการปลดล็อคห้อง
const UNLOCK_LEVELS = {
    ROOM2: 5,
    ROOM3: 9,
    ROOM4: 13
};

function completeLevel(level) {
    console.log("Received level value:", level, typeof level); // เพิ่มบรรทัดนี้
    
    // ตรวจสอบความถูกต้องของ level
    if (!level || isNaN(level)) {
        console.error("Invalid level value:", level);
        return;
    }

    // แปลง level เป็นตัวเลข
    level = parseInt(level);
    
    try {
        // บันทึกการผ่านด่าน
        sessionStorage.setItem(`level${level}`, "true");
        console.log(`Level ${level} completed. Stored in sessionStorage: level${level} = true`);

        // ตรวจสอบและปลดล็อคห้อง
        if (level === UNLOCK_LEVELS.ROOM2) {
            sessionStorage.setItem("room2_unlocked", "true");
            console.log("Unlocked Room 2");
        } else if (level === UNLOCK_LEVELS.ROOM3) {
            sessionStorage.setItem("room3_unlocked", "true");
            console.log("Unlocked Room 3");
        } else if (level === UNLOCK_LEVELS.ROOM4) {
            sessionStorage.setItem("room4_unlocked", "true");
            console.log("Unlocked Room 4");
        }

        // นำทางไปยังห้องที่เหมาะสม
        let targetRoom;
        if (level >= ROOM_LEVELS.ROOM1.min && level <= ROOM_LEVELS.ROOM1.max) {
            targetRoom = "room1";
        } else if (level >= ROOM_LEVELS.ROOM2.min && level <= ROOM_LEVELS.ROOM2.max) {
            targetRoom = "room2";
        } else if (level >= ROOM_LEVELS.ROOM3.min && level <= ROOM_LEVELS.ROOM3.max) {
            targetRoom = "room3";
        } else if (level >= ROOM_LEVELS.ROOM4.min && level <= ROOM_LEVELS.ROOM4.max) {
            targetRoom = "room4";
        } else {
            throw new Error("Invalid level range");
        }

        // แสดงข้อความและนำทางไปยังห้อง
        alert(`ยินดีด้วย! คุณผ่าน Level ${level} แล้ว`);
        window.location.href = `/Room/html/${targetRoom}.html`;

    } catch (error) {
        console.error("Error in completeLevel:", error);
        alert("เกิดข้อผิดพลาดในการบันทึกความคืบหน้า กรุณาลองใหม่อีกครั้ง");
    }
}

// เพิ่มฟังก์ชันสำหรับตรวจสอบสถานะของด่าน
function isLevelCompleted(level) {
    return sessionStorage.getItem(`level${level}`) === "true";
}

// เพิ่มฟังก์ชันสำหรับตรวจสอบการปลดล็อคห้อง
function isRoomUnlocked(roomNumber) {
    if (roomNumber === 1) return true; // ห้อง 1 ปลดล็อคเสมอ
    return sessionStorage.getItem(`room${roomNumber}_unlocked`) === "true";
}











// // document.addEventListener("DOMContentLoaded", function () {
// //     const totalLevels = 4;

// //     for (let i = 1; i <= totalLevels; i++) {
// //         const levelButton = document.getElementById(`level${i}-button`);
// //         const levelCompleted = sessionStorage.getItem(`level${i}`) === "true";
// //         const levelUnlocked = i === 1 || sessionStorage.getItem(`level${i}_unlocked`) === "true";

// //         if (levelUnlocked) {
// //             // ด่านปลดล็อกแล้ว
// //             levelButton.classList.remove("locked");
// //             levelButton.removeAttribute("onclick");
// //         } else {
// //             // ด่านยังไม่ปลดล็อก
// //             levelButton.classList.add("locked");
// //             levelButton.setAttribute("onclick", `handleLockedLevel(${i - 1}); return false;`);
// //         }
// //     }

// //     // ฟังก์ชันจัดการการคลิกเมื่อด่านยังไม่ปลดล็อก
// //     window.handleLockedLevel = function (previousLevel) {
// //         alert(`คุณต้องผ่าน Level ${previousLevel} ก่อน!`);
// //     };
// // });

// document.addEventListener("DOMContentLoaded", function() {
//     const totalLevels = 4;
//     const totalTasksPerLevel = [5, 4, 4, 4]; // Total tasks for each level
//     const totalTasks = totalTasksPerLevel.reduce((sum, num) => sum + num, 0); // Sum of all tasks across levels

//     function unlockLevel(levelNumber) {
//         const nextLevel = levelNumber + 1;
//         if (nextLevel <= totalLevels) {
//             const nextLevelButton = document.getElementById(`level${nextLevel}-button`);
//             const nextTasksContainer = document.getElementById(`tasks-level${nextLevel}`);
//             if (nextLevelButton && nextTasksContainer) {
//                 nextLevelButton.classList.remove("locked");
//                 nextTasksContainer.style.display = 'block'; // Show tasks for the next level
//                 sessionStorage.setItem(`level${nextLevel}_unlocked`, 'true');
//             }
//         }
//     }

//     let totalCompletedTasks = 0;

//     totalTasksPerLevel.forEach((tasksCount, levelIndex) => {
//         let completedTasks = 0;
//         const levelNumber = levelIndex + 1;
//         for (let i = 1; i <= tasksCount; i++) {
//             const taskButton = document.getElementById(`task${i}-level${levelNumber}`);
//             if (taskButton) {
//                 taskButton.onclick = function() {
//                     if (!this.classList.contains('completed-task')) {
//                         this.classList.add('completed-task');
//                         completedTasks++;
//                         totalCompletedTasks++;
//                         if (completedTasks === tasksCount) {
//                             unlockLevel(levelNumber);
//                             if (levelNumber < totalLevels) {
//                                 alert(`Congratulations! You have unlocked Level ${levelNumber + 1}`);

//                                 console.log(`ผ่าน Level ${levelNumber + 1}`); // Correctly format and localize console log
//                             }
//                         }
//                         if (totalCompletedTasks === totalTasks) {
//                             alert(`Congratulations! You have finished all tasks!`);
//                         }
//                     }
//                 };
//             }
//         }
//     });

//     for (let i = 1; i <= totalLevels; i++) {
//         const levelButton = document.getElementById(`level${i}-button`);
//         const levelUnlocked = i === 1 || sessionStorage.getItem(`level${i}_unlocked`) === "true";
//         if (levelUnlocked) {
//             levelButton.classList.remove("locked");
//             if (i > 1) {
//                 const tasksContainer = document.getElementById(`tasks-level${i}`);
//                 if (tasksContainer) {
//                     tasksContainer.style.display = 'block';
//                 }
//             }
//         }
//     }
// });
