// **************
// ฟังก์ชันจบ Level
function completeLevel(level) {
    sessionStorage.setItem(`level${level}`, "true"); // บันทึกการผ่านด่าน
    console.log(`Level ${level} completed. Stored in sessionStorage: level${level} = true`);

    // ตรวจสอบการปลดล็อก Room
    if (level === 5) {
        sessionStorage.setItem("room2_unlocked", "true");
        console.log("Unlocked Room 2: room2_unlocked = true");
    } else if (level === 9) {
        sessionStorage.setItem("room3_unlocked", "true");
        console.log("Unlocked Room 3: room3_unlocked = true");
    } else if (level === 13) {
        sessionStorage.setItem("room4_unlocked", "true");
        console.log("Unlocked Room 4: room4_unlocked = true");
    }

    // เปลี่ยนเส้นทางกลับไปที่ Room ที่เกี่ยวข้อง
    if (level >= 1 && level <= 5) {
        alert(`ยินดีด้วย! คุณผ่าน Level ${level} แล้ว`);
        console.log(`Redirecting to /Room/html/room1.html`);
        window.location.href = "/Room/html/room1.html";

    } else if (level >= 6 && level <= 9) {
        alert(`ยินดีด้วย! คุณผ่าน Level ${level} แล้ว`);
        console.log(`Redirecting to /Room/html/room2.html`);
        window.location.href = "/Room/html/room2.html";

    } else if (level >= 10 && level <= 13) {
        alert(`ยินดีด้วย! คุณผ่าน Level ${level} แล้ว`);
        console.log(`Redirecting to /Room/html/room3.html`);
        window.location.href = "/Room/html/room3.html";

    } else if (level >= 14 && level <= 18) {
        alert(`ยินดีด้วย! คุณผ่าน Level ${level} แล้ว`);
        console.log(`Redirecting to /Room/html/room4.html`);
        window.location.href = "/Room/html/room4.html";
        
    } else {
        console.error("Invalid level range");
    }
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
