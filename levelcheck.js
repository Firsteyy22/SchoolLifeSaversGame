// document.addEventListener("DOMContentLoaded", function () {
//     const totalLevels = 4;

//     for (let i = 1; i <= totalLevels; i++) {
//         const levelButton = document.getElementById(`level${i}-button`);
//         const levelCompleted = sessionStorage.getItem(`level${i}`) === "true";
//         const levelUnlocked = i === 1 || sessionStorage.getItem(`level${i}_unlocked`) === "true";

//         if (levelUnlocked) {
//             // ด่านปลดล็อกแล้ว
//             levelButton.classList.remove("locked");
//             levelButton.removeAttribute("onclick");
//         } else {
//             // ด่านยังไม่ปลดล็อก
//             levelButton.classList.add("locked");
//             levelButton.setAttribute("onclick", `handleLockedLevel(${i - 1}); return false;`);
//         }
//     }

//     // ฟังก์ชันจัดการการคลิกเมื่อด่านยังไม่ปลดล็อก
//     window.handleLockedLevel = function (previousLevel) {
//         alert(`คุณต้องผ่าน Level ${previousLevel} ก่อน!`);
//     };
// });

document.addEventListener("DOMContentLoaded", function() {
    const totalLevels = 4;
    const totalTasksPerLevel = [5, 4, 4, 4]; // Total tasks for each level
    const totalTasks = totalTasksPerLevel.reduce((sum, num) => sum + num, 0); // Sum of all tasks across levels

    function unlockLevel(levelNumber) {
        const nextLevel = levelNumber + 1;
        if (nextLevel <= totalLevels) {
            const nextLevelButton = document.getElementById(`level${nextLevel}-button`);
            const nextTasksContainer = document.getElementById(`tasks-level${nextLevel}`);
            if (nextLevelButton && nextTasksContainer) {
                nextLevelButton.classList.remove("locked");
                nextTasksContainer.style.display = 'block'; // Show tasks for the next level
                sessionStorage.setItem(`level${nextLevel}_unlocked`, 'true');
            }
        }
    }

    let totalCompletedTasks = 0;

    totalTasksPerLevel.forEach((tasksCount, levelIndex) => {
        let completedTasks = 0;
        const levelNumber = levelIndex + 1;
        for (let i = 1; i <= tasksCount; i++) {
            const taskButton = document.getElementById(`task${i}-level${levelNumber}`);
            if (taskButton) {
                taskButton.onclick = function() {
                    if (!this.classList.contains('completed-task')) {
                        this.classList.add('completed-task');
                        completedTasks++;
                        totalCompletedTasks++;
                        if (completedTasks === tasksCount) {
                            unlockLevel(levelNumber);
                            if (levelNumber < totalLevels) {
                                alert(`Congratulations! You have unlocked Level ${levelNumber + 1}`);

                                console.log(`ผ่าน Level ${levelNumber + 1}`); // Correctly format and localize console log
                            }
                        }
                        if (totalCompletedTasks === totalTasks) {
                            alert(`Congratulations! You have finished all tasks!`);
                        }
                    }
                };
            }
        }
    });

    for (let i = 1; i <= totalLevels; i++) {
        const levelButton = document.getElementById(`level${i}-button`);
        const levelUnlocked = i === 1 || sessionStorage.getItem(`level${i}_unlocked`) === "true";
        if (levelUnlocked) {
            levelButton.classList.remove("locked");
            if (i > 1) {
                const tasksContainer = document.getElementById(`tasks-level${i}`);
                if (tasksContainer) {
                    tasksContainer.style.display = 'block';
                }
            }
        }
    }
});