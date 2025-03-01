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
        // alert(`ยินดีด้วย! คุณผ่าน Level ${level} แล้ว`);
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

document.addEventListener("DOMContentLoaded", function () {
    const totalLevels = 4;
    const totalTasksPerLevel = [5, 4, 4, 5]; // 🔥 จำนวน Task ของแต่ละ Level
    const totalTasks = totalTasksPerLevel.reduce((sum, num) => sum + num, 0); // ✅ คำนวณ Task ทั้งหมด

    function unlockLevel(levelNumber) {
        const nextLevel = levelNumber + 1;
        if (nextLevel <= totalLevels) {
            sessionStorage.setItem(`level${nextLevel}_unlocked`, "true");
            console.log(`🎉 Level ${nextLevel} unlocked!`);
        }
    }

    function updateLevelStates() {
        for (let i = 1; i <= totalLevels; i++) {
            const levelButton = document.getElementById(`level${i}-button`);
            const levelUnlocked = i === 1 || sessionStorage.getItem(`level${i}_unlocked`) === "true";

            if (levelButton) {
                levelButton.classList.toggle("locked", !levelUnlocked);
                levelButton.classList.toggle("unlocked", levelUnlocked);
                console.log(levelUnlocked ? `✅ Level ${i}: UNLOCKED` : `🔒 Level ${i}: LOCKED`);
            }
        }
    }

    function updateTaskStates() {
        let totalCompletedTasks = 0;

        totalTasksPerLevel.forEach((tasksCount, levelIndex) => {
            const levelNumber = levelIndex + 1;
            let completedTasks = parseInt(sessionStorage.getItem(`completedTasks_level${levelNumber}`)) || 0;
            totalCompletedTasks += completedTasks;

            for (let i = 1; i <= tasksCount; i++) {
                const taskButton = document.getElementById(`task${i}-level${levelNumber}`);
                const taskCompleted = sessionStorage.getItem(`task${i}-level${levelNumber}`) === "true";

                if (taskButton) {
                    if (taskCompleted) {
                        taskButton.classList.add("completed-task");
                    }

                    if (!taskButton.dataset.listenerAdded) {
                        taskButton.dataset.listenerAdded = "true"; // ✅ ป้องกันการเพิ่ม Event ซ้ำ

                        taskButton.addEventListener('click', function () {
                            if (!this.classList.contains("completed-task")) {
                                setTimeout(() => {
                                    this.classList.add("completed-task");
                                    completedTasks++;
                                    totalCompletedTasks++;

                                    sessionStorage.setItem(`task${i}-level${levelNumber}`, "true");
                                    sessionStorage.setItem(`completedTasks_level${levelNumber}`, completedTasks.toString());
                                    sessionStorage.setItem("totalCompletedTasks", totalCompletedTasks.toString());

                                    console.log(`✅ Task ${completedTasks}/${tasksCount} completed in Level ${levelNumber}`);
                                    console.log(`📊 Total Completed Tasks: ${totalCompletedTasks}/${totalTasks}`);

                                    updateTaskStatusUI(levelNumber, completedTasks, tasksCount);
                                    updateTotalTaskStatusUI(totalCompletedTasks, totalTasks);

                                    if (completedTasks === tasksCount) {
                                        sessionStorage.setItem(`level${levelNumber}_passed`, "true");
                                        unlockLevel(levelNumber); // ✅ ปลดล็อก Level ถัดไป
                                    }

                                    // ✅ เปลี่ยนสีเมื่อ Task2 ใน Level1 ทำเสร็จ
                                    if (taskButton.id === 'task2-level1') {
                                        var element = document.getElementById('blood');
                                        if (element) {
                                            element.classList.remove('blinkRed');
                                            element.classList.add('blinkGreen');
                                            console.log('Changed to green!');
                                        }
                                    }

                                    // ✅ ตรวจสอบว่า Task ทั้งหมดทำครบหรือยัง
                                    if (totalCompletedTasks === totalTasks) {
                                        console.log("🏆 ALL LEVELS AND TASKS COMPLETED!");

                                        // ✅ แสดง Swal.fire() เมื่อทำ Task ทั้งหมดสำเร็จ
                                        Swal.fire({
                                            title: "🎉 ยินดีด้วย",
                                            text: "คุณได้เรียนการปฐมพยาบาลขั้นพื้นฐานแล้ว!",
                                            icon: "success",
                                            confirmButtonText: "ทำแบบทดสอบหลังเรียน",
                                            allowOutsideClick: false,
                                            allowEscapeKey: false,
                                            showCloseButton: true,
                                            closeButtonAriaLabel: "ปิด",
                                            backdrop: 'rgba(0, 0, 0, 0.5)',
                                            heightAuto: false,
                                            customClass: {
                                                popup: 'swal-bounce',
                                                container: 'no-auto-container',
                                                closeButton: 'custom-close-button' // ✅ ใช้ CSS ปรับขนาดปุ่ม ❌
                                            },
                                            showClass: {
                                                popup: 'animate__animated animate__bounceIn'
                                            },
                                            hideClass: {
                                                popup: 'animate__animated animate__bounceOut'
                                            }
                                        }).then((result) => {
                                            if (result.isConfirmed) {
                                                window.location.href = "/postTest.html";
                                            }
                                        });
                                    }
                                }, 10000);
                            }
                        });

                        console.log(`🎯 Click event added to: task${i}-level${levelNumber}`);
                    }
                }
            }
        });

        // ✅ แสดง Task ที่ทำสำเร็จทั้งหมดเมื่อโหลดหน้า
        console.log(`🔄 Initial Load: Total Completed Tasks: ${totalCompletedTasks}/${totalTasks}`);
        updateTotalTaskStatusUI(totalCompletedTasks, totalTasks);
    }

    function updateTaskStatusUI(levelNumber, completedTasks, tasksCount) {
        const taskStatusDiv = document.getElementById(`task-status-level${levelNumber}`);
        if (taskStatusDiv) {
            taskStatusDiv.innerHTML = `✅ Level ${levelNumber}: Task ${completedTasks}/${tasksCount} completed`;
        }
    }

    function updateTotalTaskStatusUI(completed, total) {
        const totalTaskStatusDiv = document.getElementById("total-task-status");
        if (totalTaskStatusDiv) {
            totalTaskStatusDiv.innerHTML = `📊 Total Completed Tasks: ${completed}/${total}`;
        }
    }

    function loadTaskStatusFromStorage() {
        let totalCompletedTasks = 0;

        totalTasksPerLevel.forEach((tasksCount, levelIndex) => {
            const levelNumber = levelIndex + 1;
            let completedTasks = parseInt(sessionStorage.getItem(`completedTasks_level${levelNumber}`)) || 0;
            totalCompletedTasks += completedTasks;
            updateTaskStatusUI(levelNumber, completedTasks, tasksCount);
        });

        updateTotalTaskStatusUI(totalCompletedTasks, totalTasks);
    }

    updateLevelStates();
    updateTaskStates();
    loadTaskStatusFromStorage();
});
