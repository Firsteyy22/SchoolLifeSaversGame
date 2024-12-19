const params = new URLSearchParams(window.location.search);
let currentLevel = parseInt(params.get("level")) || 1;
const maxLevel = 19;

let currentQuestion = 1; // ตัวแปรคำถามปัจจุบัน

// ฟังก์ชันตรวจสอบคำตอบ
function checkAnswer(button, isCorrect, gifSrc, wrongText = "", afterGifPic = "") {
    disableAllButtons(); // ปิดใช้งานปุ่มในคำถามปัจจุบัน

    if (isCorrect) {
        button.classList.add("correct");
        showAnswerGIF(gifSrc);

        setTimeout(() => {
            if (afterGifPic) showImage(afterGifPic); 
            setTimeout(() => {
                hideAnswerGIF();
                nextQuestion();
            }, 0);
        }, 2000);
    } else {
        button.classList.add("incorrect");
        showAnswerGIF(gifSrc);

        setTimeout(() => {
            if (afterGifPic) showImage(afterGifPic); 
            setTimeout(() => {
                hideAnswerGIF();
                showWrongPage(wrongText, afterGifPic);
            }, 0);
        }, 2000);
    }
}

function hideImage() {
    const gifContainer = document.getElementById(`gif-container-q${currentQuestion}`);
    if (gifContainer) {
        gifContainer.style.display = "none"; // ซ่อนภาพ
    }
}

function hideAnswerGIF() {
    const gifContainer = document.getElementById(`gif-container-q${currentQuestion}`);
    if (gifContainer) {
        gifContainer.style.display = "none"; // ซ่อนภาพ
    }
}

function showAnswerGIF(gifSrc) {
    const gifContainer = document.getElementById(`gif-container-q${currentQuestion}`);
    gifContainer.style.display = "block";
    gifContainer.style.width = "auto"; // ปรับขนาดอัตโนมัติ
    gifContainer.style.height = "100%"; // จำกัดความสูงไม่เกิน container
    gifContainer.src = gifSrc;
}

function showImage(imageSrc) {
    const gifContainer = document.getElementById(`gif-container-q${currentQuestion}`);
    gifContainer.style.display = "block";
    gifContainer.style.width = "auto"; // ปรับขนาดอัตโนมัติ
    gifContainer.style.height = "100%"; // จำกัดความสูงไม่เกิน container
    gifContainer.src = imageSrc;
}

// ปิดการใช้งานปุ่มเฉพาะในคำถามปัจจุบัน
function disableAllButtons() {
    const currentQuestionElement = document.getElementById(`question${currentQuestion}`);
    if (currentQuestionElement) {
        currentQuestionElement.querySelectorAll(".button").forEach(btn => {
            btn.disabled = true; // ปิดใช้งานปุ่ม
            btn.style.pointerEvents = "none"; // ปิดการคลิก
            btn.style.cursor = "not-allowed"; // เปลี่ยน cursor แสดงสถานะ disabled
        });
    }
}

// เปิดใช้งานปุ่มเฉพาะในคำถามปัจจุบัน
function enableAllButtons() {
    const currentQuestionElement = document.getElementById(`question${currentQuestion}`);
    if (currentQuestionElement) {
        currentQuestionElement.querySelectorAll(".button").forEach(btn => {
            btn.disabled = false; // เปิดใช้งานปุ่ม
            btn.style.pointerEvents = "auto"; // เปิดการคลิก
            btn.style.cursor = "pointer"; // เปลี่ยน cursor กลับเป็นปกติ
        });
    }
}

// เปลี่ยนคำถามถัดไป
function nextQuestion() {
    const currentQuestionElement = document.getElementById(`question${currentQuestion}`);
    if (currentQuestionElement) {
        currentQuestionElement.classList.add("hidden");

        // ซ่อน GIF ของคำถามก่อนหน้า
        const gifContainer = document.getElementById(`gif-container-q${currentQuestion}`);
        if (gifContainer) {
            gifContainer.style.display = "none";
        }
    }

    currentQuestion++;
    const nextQuestionElement = document.getElementById(`question${currentQuestion}`);
    if (nextQuestionElement) {
        nextQuestionElement.classList.remove("hidden");

        // ตั้งค่าให้รูปแสดงทันทีเมื่อโหลดคำถาม
        const gifContainer = document.getElementById(`gif-container-q${currentQuestion}`);
        if (gifContainer) {
            const defaultSrc = gifContainer.getAttribute("data-default-src");
            if (defaultSrc) {
                gifContainer.src = defaultSrc; // ตั้ง src เป็นรูปเริ่มต้น
            }
            gifContainer.style.display = "block"; // แสดงภาพทันที
        }

        enableAllButtons(); // เปิดใช้งานปุ่มใหม่
    } else {
        completeLevel(currentLevel); // เรียกเฉพาะเมื่อทำคำถามถูกครบเท่านั้น
    }
}

// ฟังก์ชันแสดงหน้าผิด
function showWrongPage(wrongText, imagePath) {
    // ซ่อนคำถามปัจจุบัน
    document.getElementById(`question${currentQuestion}`).classList.add("hidden");

    // แสดงหน้าคำตอบผิด
    document.getElementById("wrong-answer").classList.remove("hidden");
    document.getElementById("wrong-image").src = imagePath;
    document.getElementById("wrong-text").innerText = wrongText;
}

// ฟังก์ชันเริ่มเกมใหม่
function reloadGame() {
    // ซ่อนหน้าคำตอบผิด
    document.getElementById("wrong-answer").classList.add("hidden");

    // แสดงคำถามปัจจุบันอีกครั้ง
    const currentQuestionElement = document.getElementById(`question${currentQuestion}`);
    if (currentQuestionElement) {
        currentQuestionElement.classList.remove("hidden");

        // ตรวจสอบและตั้งค่าภาพกลับเป็นค่าเริ่มต้น
        const gifContainer = document.getElementById(`gif-container-q${currentQuestion}`);
        if (gifContainer) {
            const defaultSrc = gifContainer.getAttribute("data-default-src");
            if (defaultSrc) {
                gifContainer.src = defaultSrc; // ตั้งค่า src เป็นรูปเริ่มต้น
            }
            gifContainer.style.display = "block"; // แสดงภาพอีกครั้ง
        }

        enableAllButtons(); // เปิดใช้งานปุ่มใหม่
    }
}

// ฟังก์ชันจบ Level
function completeLevel(level) {
    sessionStorage.setItem(`level${level}`, "true"); // บันทึกการผ่านด่าน
    const nextLevel = level + 1;

    if (nextLevel <= maxLevel) {
        sessionStorage.setItem(`level${nextLevel}_unlocked`, "true"); // ปลดล็อกด่านถัดไป
    }

    alert(`ยินดีด้วย! คุณผ่าน Level ${level} แล้ว`);
    window.location.href = "../startGame.html"; // กลับไปที่หน้าหลัก
}
