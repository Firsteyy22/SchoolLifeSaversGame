let currentLevel = 1; // กำหนดเริ่มต้นที่ Level 1
let currentQuestion = 1; // เริ่มต้นที่คำถามแรก

function checkAnswer(isCorrect) {
    if (isCorrect) {
        // ถ้าตอบถูก ให้แสดงคำถามถัดไป
        document.getElementById(`question${currentQuestion}`).classList.add("hidden");
        currentQuestion++;
        const nextQuestion = document.getElementById(`question${currentQuestion}`);
        if (nextQuestion) {
            nextQuestion.classList.remove("hidden");
        } else {
            // ถ้าผ่านด่านแล้ว ให้บันทึกสถานะและไปที่หน้า startGame.html
            alert(`คุณผ่านด่าน ${currentLevel}!`);
            completeLevel("level" + currentLevel);  // บันทึกสถานะการผ่านด่านที่ถูกต้อง
        }
    } else {
        // ถ้าตอบผิด ให้แสดงหน้าคำตอบผิด
        document.getElementById(`question${currentQuestion}`).classList.add("hidden");
        document.getElementById("wrong-answer").classList.remove("hidden");
    }
}

function reloadGame() {
    // โหลดเกมใหม่
    location.reload();
}

function completeLevel(level) {
    // บันทึกสถานะการผ่านด่าน
    localStorage.setItem(level, "true");

    // แจ้งผู้เล่นว่าผ่านด่านแล้ว
    alert(`ยินดีด้วย! คุณผ่าน ${level} แล้ว`);

    // กลับไปที่หน้า startGame.html
    window.location.href = "startGame.html";
}
