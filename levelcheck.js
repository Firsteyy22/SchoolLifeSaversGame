document.addEventListener("DOMContentLoaded", function () {
    const level3Button = document.getElementById("level3-button");

    // ตรวจสอบสถานะการปลดล็อกด่าน
    const isLevel1Completed = localStorage.getItem("level1") === "true";
    const isLevel2Completed = localStorage.getItem("level2") === "true";

    // ปลดล็อก Level 3 ถ้าเล่นผ่านด่าน 1 และ 2 แล้ว
    if (isLevel1Completed && isLevel2Completed) {
        level3Button.classList.remove("locked");
        level3Button.removeAttribute("onclick");
    } else {
        // ล็อก Level 3 พร้อมข้อความแจ้งเตือน
        level3Button.setAttribute("onclick", "alert('คุณต้องผ่าน Level 1 และ Level 2 ก่อน!'); return false;");
    }
});
