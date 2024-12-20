const params = new URLSearchParams(window.location.search);
let currentLevel = parseInt(params.get("level")) || 1;
const maxLevel = 19;

let currentQuestion = 1; // ตัวแปรคำถามปัจจุบัน

// ฟังก์ชันตรวจสอบคำตอบ
function checkAnswer(button, isCorrect, gifSrc, wrongText = "", afterGifPic = "", recapVideoSrc = "") {
    disableAllButtons(); // ปิดใช้งานปุ่มในคำถามปัจจุบัน

    if (isCorrect) {
        button.classList.add("correct");
        showAnswerGIF(gifSrc);

        setTimeout(() => {
            if (afterGifPic) showImage(afterGifPic); 
            setTimeout(() => {
                hideAnswerGIF();

                // เล่นวิดีโอรีแคป ถ้ามี
                if (recapVideoSrc) {
                    playRecapVideo(recapVideoSrc, () => nextQuestion());
                } else {
                    nextQuestion();
                }
            }, 0);
        }, 2000); // เล่น GIF 2 วินาที
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

        // ตั้งค่าให้รูปเริ่มต้นแสดงทันทีเมื่อโหลดคำถามใหม่
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
        completeLevel(currentLevel); // เรียกเมื่อทำคำถามครบทุกข้อ
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


// **************
// สำหรับพาร์ทเล่นเกม รูปแบบ 2 (ตอบแล้ว รีแคปวิดีโอแสดงการสอนแบบละเอียด แล้วไปยังคำถามถัดไป)
function playRecapVideo(videoSrc, callback) {
    // อ้างอิง HTML องค์ประกอบ
    const videoContainer = document.getElementById("fullscreen-video-container");
    const fullscreenVideo = document.getElementById("fullscreen-video");
    const nextButton = document.getElementById("next-button");

    let hasShownNextButton = false; // ตัวแปรสำหรับตรวจสอบว่าปุ่มถูกแสดงแล้วหรือยัง

    // ซ่อนปุ่ม "ไปยังส่วนถัดไป" ตอนเริ่มต้น
    nextButton.classList.add("hidden");

    // แสดง Fullscreen Video Overlay
    videoContainer.classList.remove("hidden");
    fullscreenVideo.src = videoSrc; // ตั้งค่าแหล่งวิดีโอ
    fullscreenVideo.autoplay = true;

    // เริ่มเล่นวิดีโอ
    fullscreenVideo
        .play()
        .then(() => {
            console.log("Video is playing...");
        })
        .catch((error) => {
            console.error("Failed to play video:", error);
        });

    // ตรวจจับเมื่อวิดีโอจบรอบแรก
    fullscreenVideo.onended = () => {
        if (!hasShownNextButton) {
            console.log("Video ended for the first time.");
            nextButton.classList.remove("hidden"); // แสดงปุ่ม "ไปยังส่วนถัดไป"
            hasShownNextButton = true; // อัพเดตสถานะว่าปุ่มถูกแสดงแล้ว
        }
        // หลังจบรอบแรก ให้เล่นวิดีโอต่อ
        fullscreenVideo.play();
    };

    // ฟังก์ชันสำหรับการกดปุ่ม "ไปยังส่วนถัดไป"
    window.goToNextStep = () => {
        console.log("Next button clicked.");
        fullscreenVideo.pause();
        fullscreenVideo.src = ""; // ล้างค่า src หลังเล่นเสร็จ
        videoContainer.classList.add("hidden"); // ซ่อนวิดีโอ
        if (callback) callback(); // เรียก callback ถ้ามี
    };
}

