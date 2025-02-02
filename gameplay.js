// gameplay.js ตอบแค่หนึ่งคำตอบ

const urlParams = new URLSearchParams(window.location.search);
let level = parseInt(urlParams.get("level")) || 1;
let currentQ = 1; // ตัวแปรคำถามปัจจุบัน

// ฟังก์ชันตรวจสอบคำตอบ
function validateAnswer(button, isCorrect, gifSrc, wrongText = "", afterGifPic = "", recapVideoSrc = "") {
    deactivateAllButtons(); // ปิดใช้งานปุ่มในคำถามปัจจุบัน

    if (isCorrect) {
        button.classList.add("correct");
        displayAnswerGIF(gifSrc);

        setTimeout(() => {
            if (afterGifPic) displayImage(afterGifPic); 
            setTimeout(() => {
                hideAnswerGIF();

                // เล่นวิดีโอรีแคป ถ้ามี
                if (recapVideoSrc) {
                    playRecapVideo(recapVideoSrc, nextQ);
                } else {
                    nextQ();
                }
            }, 0);
        }, 4000); 
    } else {
        button.classList.add("incorrect");
        displayAnswerGIF(gifSrc);

        setTimeout(() => {
            if (afterGifPic) displayImage(afterGifPic); 
            setTimeout(() => {
                hideAnswerGIF();
                showWrongAnswerPage(wrongText, afterGifPic, wrongText, resetQ);
            }, 0);
        }, 3500);
    }
}

function resetQ() {
    const currentQElement = document.getElementById(`question${currentQ}`);
    if (currentQElement) {
        currentQElement.classList.remove('hidden');

        const gifContainer = document.getElementById(`gif-container-q${currentQ}`);
        if (gifContainer) {
            const defaultSrc = gifContainer.getAttribute("data-default-src");
            if (defaultSrc) {
                gifContainer.src = defaultSrc;
            }
            gifContainer.style.display = "block";
        }

        activateAllButtons();
    }
}

function hideAnswerGIF() {
    const gifContainer = document.getElementById(`gif-container-q${currentQ}`);
    if (gifContainer) {
        gifContainer.style.display = "none"; // ซ่อนภาพ
    }
}

function displayAnswerGIF(gifSrc) {
    const gifContainer = document.getElementById(`gif-container-q${currentQ}`);
    gifContainer.style.display = "block";
    gifContainer.style.width = "auto"; // ปรับขนาดอัตโนมัติ
    gifContainer.style.height = "100%"; // จำกัดความสูงไม่เกิน container
    gifContainer.src = gifSrc;
}

function displayImage(imageSrc) {
    const gifContainer = document.getElementById(`gif-container-q${currentQ}`);
    gifContainer.style.display = "block";
    gifContainer.style.width = "auto"; // ปรับขนาดอัตโนมัติ
    gifContainer.style.height = "100%"; // จำกัดความสูงไม่เกิน container
    gifContainer.src = imageSrc;
}

// ปิดการใช้งานปุ่มเฉพาะในคำถามปัจจุบัน
function deactivateAllButtons() {
    const currentQElement = document.getElementById(`question${currentQ}`);
    if (currentQElement) {
        currentQElement.querySelectorAll(".button").forEach(btn => {
            btn.disabled = true; // ปิดใช้งานปุ่ม
            btn.style.pointerEvents = "none"; // ปิดการคลิก
            btn.style.cursor = "not-allowed"; // เปลี่ยน cursor แสดงสถานะ disabled
        });
    }
}

// เปิดใช้งานปุ่มเฉพาะในคำถามปัจจุบัน
function activateAllButtons() {
    const currentQElement = document.getElementById(`question${currentQ}`);
    if (currentQElement) {
        currentQElement.querySelectorAll(".button").forEach(btn => {
            btn.disabled = false; // เปิดใช้งานปุ่ม
            btn.style.pointerEvents = "auto"; // เปิดการคลิก
            btn.style.cursor = "pointer"; // เปลี่ยน cursor กลับเป็นปกติ
        });
    }
}

// เปลี่ยนคำถามถัดไป
function nextQ() {
    const currentQElement = document.getElementById(`question${currentQ}`);
    if (currentQElement) {
        currentQElement.classList.add("hidden");

        // ซ่อน GIF ของคำถามก่อนหน้า
        const gifContainer = document.getElementById(`gif-container-q${currentQ}`);
        if (gifContainer) {
            gifContainer.style.display = "none";
        }
    }

    const totalQs = document.querySelectorAll('.question').length;

    if (currentQ === totalQs) {
        // ถึงคำถามสุดท้ายแล้ว
        showSingleAnswerCompletionScreen(); // แสดง Completion Screen
    } else {
        currentQ++;
        const nextQElement = document.getElementById(`question${currentQ}`);
        if (nextQElement) {
            nextQElement.classList.remove("hidden");

            // ตั้งค่าให้รูปเริ่มต้นแสดงทันทีเมื่อโหลดคำถามใหม่
            const gifContainer = document.getElementById(`gif-container-q${currentQ}`);
            if (gifContainer) {
                const defaultSrc = gifContainer.getAttribute("data-default-src");
                if (defaultSrc) {
                    gifContainer.src = defaultSrc; // ตั้ง src เป็นรูปเริ่มต้น
                }
                gifContainer.style.display = "block"; // แสดงภาพทันที
            }

            activateAllButtons(); // เปิดใช้งานปุ่มใหม่
        }
    }
}

// ฟังก์ชันแสดงหน้าผิด
function showWrongAnswerPage(_message, imageUrl, text, callback) {
    const wrongAnswerContainer = document.getElementById('wrong-answer');
    const wrongImage = document.getElementById('wrong-image');
    const wrongText = document.getElementById('wrong-text');

    wrongAnswerContainer.classList.remove('hidden');
    wrongImage.src = imageUrl;
    wrongText.textContent = text;

    document.querySelectorAll('.question').forEach(q => q.classList.add('hidden'));

    const reloadButton = wrongAnswerContainer.querySelector('.button');
    reloadButton.addEventListener('click', () => {
        wrongAnswerContainer.classList.add('hidden');
        callback();
    });
}

// ฟังก์ชันเริ่มเกมใหม่
function reloadGame() {
    // ซ่อนหน้าคำตอบผิด
    document.getElementById("wrong-answer").classList.add("hidden");

    // แสดงคำถามปัจจุบันอีกครั้ง
    const currentQElement = document.getElementById(`question${currentQ}`);
    if (currentQElement) {
        currentQElement.classList.remove("hidden");

        // ตรวจสอบและตั้งค่าภาพกลับเป็นค่าเริ่มต้น
        const gifContainer = document.getElementById(`gif-container-q${currentQ}`);
        if (gifContainer) {
            const defaultSrc = gifContainer.getAttribute("data-default-src");
            if (defaultSrc) {
                gifContainer.src = defaultSrc; // ตั้งค่า src เป็นรูปเริ่มต้น
            }
            gifContainer.style.display = "block"; // แสดงภาพอีกครั้ง
        }

        activateAllButtons(); // เปิดใช้งานปุ่มใหม่
    }
}

function playRecapVideo(videoSrc, callback) {
    const videoContainer = document.getElementById("fullscreen-video-container");
    const fullscreenVideo = document.getElementById("fullscreen-video");
    const nextBtn = document.getElementById("next-button");

    let hasShownNextBtn = false; // ตัวแปรสำหรับตรวจสอบว่าปุ่มถูกแสดงแล้วหรือยัง

    // ซ่อนปุ่ม "ไปยังส่วนถัดไป" ตอนเริ่มต้น
    nextBtn.classList.add("hidden");

    // แสดง Fullscreen Video Overlay
    videoContainer.classList.remove("hidden");
    fullscreenVideo.src = videoSrc; // ตั้งค่าแหล่งวิดีโอ
    fullscreenVideo.currentTime = 0; // รีเซ็ตเวลาเริ่มต้นของวิดีโอ
    fullscreenVideo.loop = true; // ตั้งค่าให้เล่นซ้ำ
    fullscreenVideo.load(); // โหลดวิดีโอใหม่
    fullscreenVideo.autoplay = true;

    fullscreenVideo.onended = () => {
        if (!hasShownNextBtn) {
            nextBtn.classList.remove("hidden"); // แสดงปุ่ม "ไปยังส่วนถัดไป"
            hasShownNextBtn = true; // อัพเดตสถานะว่าปุ่มถูกแสดงแล้ว
        }
    };

    // ตรวจสอบการเล่นวิดีโอในแต่ละรอบ
    fullscreenVideo.addEventListener('timeupdate', function () {
        // ถ้าวิดีโอเล่นถึงเวลาสุดท้ายในครั้งแรก
        if (fullscreenVideo.currentTime >= fullscreenVideo.duration - 0.5 && !hasShownNextBtn) {
            fullscreenVideo.pause(); // หยุดวิดีโอชั่วคราว
            nextBtn.classList.remove("hidden"); // แสดงปุ่ม "ไปยังส่วนถัดไป"
            hasShownNextBtn = true; // อัพเดตสถานะว่าปุ่มถูกแสดงแล้ว
            fullscreenVideo.play(); // เล่นต่อเพื่อให้ loop ได้ตามปกติ
        }
    });

    nextBtn.onclick = () => {
        videoContainer.classList.add("hidden");
        fullscreenVideo.pause();
        fullscreenVideo.currentTime = 0; // รีเซ็ตวิดีโอเมื่อปิด
        fullscreenVideo.src = ""; // ล้างค่า src หลังเล่นเสร็จ
        nextBtn.classList.add("hidden");
        if (callback) callback();
    };
}

function showSingleAnswerCompletionScreen() {
    document.getElementById("question-container").classList.add("hidden");
    document.getElementById("completion-screen").classList.remove("hidden");
}

function confirmCompletion(level) {
    completeLevel(level);
}
