const params = new URLSearchParams(window.location.search);
let currentLevel = parseInt(params.get("level")) || 1; 
let currentQuestion = 1; 

function checkAnswer(isCorrect) {
    if (isCorrect) {
        document.getElementById(`question${currentQuestion}`).classList.add("hidden");
        currentQuestion++;
        const nextQuestion = document.getElementById(`question${currentQuestion}`);
        
        if (nextQuestion) {
            nextQuestion.classList.remove("hidden");
        } else {
            alert(`คุณผ่านด่าน ${currentLevel}!`);
            completeLevel(currentLevel);
        }
    } else {
        alert("ตอบผิด ลองอีกครั้ง!");
    }
}

function completeLevel(level) {
    sessionStorage.setItem(`level${level}`, "true"); // บันทึกว่าผ่านด่านแล้ว
    const nextLevel = level + 1;

    if (nextLevel <= 3) { // ปลดล็อกด่านถัดไป
        sessionStorage.setItem(`level${nextLevel}_unlocked`, "true");
    }

    alert(`ยินดีด้วย! คุณผ่าน Level ${level} แล้ว`);
    window.location.href = "startGame.html"; // กลับไปที่แผนที่
}
