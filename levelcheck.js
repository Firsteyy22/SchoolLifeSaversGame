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

