// gameplay ตอบหลาย choices

let currentQuestionId = null;

function initQuestions(questions) {
    questions.forEach(question => {
        handleQuestion(question);
    });
}

function handleQuestion(question) {
    const questionElement = document.getElementById(question.id);
    const submitButton = questionElement.querySelector('.button-submit-answer');
    let selectedAnswers = new Set();

    submitButton.classList.add('hidden');

    questionElement.querySelectorAll('.button-choices').forEach(button => {
        button.addEventListener('click', () => {
            if (question.multiAnswer) {
                toggleAnswerSelection(button, selectedAnswers, submitButton);
            } else {
                handleSingleAnswer(button, selectedAnswers, submitButton);
            }
        });
    });

    submitButton.addEventListener('click', () => {
        revealSelectedAnswerColors(question, selectedAnswers);
    });
}

function toggleAnswerSelection(button, selectedAnswers, submitButton) {
    const index = parseInt(button.getAttribute('data-answer'), 10);

    if (selectedAnswers.has(index)) {
        selectedAnswers.delete(index);
        button.classList.remove('selected');
        
        // เมื่อยกเลิกการเลือก ให้ลบสถานะสีด้วย
        button.classList.remove('correct', 'incorrect');
    } else {
        selectedAnswers.add(index);
        button.classList.add('selected');
    }

    submitButton.classList.toggle('hidden', selectedAnswers.size === 0);
}

function handleSingleAnswer(button, selectedAnswers, submitButton) {
    const index = parseInt(button.getAttribute('data-answer'), 10);
    
    selectedAnswers.clear();
    selectedAnswers.add(index);
    
    document.querySelectorAll('.button-choices').forEach(btn => {
        btn.classList.remove('selected', 'correct', 'incorrect');
    });
    button.classList.add('selected');
    
    submitButton.classList.remove('hidden');
}

function revealSelectedAnswerColors(question, selectedAnswers) {
    currentQuestionId = question.id;
    const questionElement = document.getElementById(question.id);

    selectedAnswers.forEach(selectedIndex => {
        const button = questionElement.querySelector(`.button-choices[data-answer="${selectedIndex}"]`);
        if (question.correctAnswers.includes(selectedIndex)) {
            button.classList.add('correct');
        } else {
            button.classList.add('incorrect');
        }
    });

    const isCorrect =
        question.correctAnswers.every(ans => selectedAnswers.has(ans)) &&
        selectedAnswers.size === question.correctAnswers.length;

    setTimeout(() => {
        if (isCorrect) {
            const gifContainer = questionElement.querySelector('.image-container img');
            if (gifContainer) {
                const originalSrc = gifContainer.src;
                gifContainer.src = '../picture/correctANS/correct.gif';
                gifContainer.style.display = "block";

                setTimeout(() => {
                    gifContainer.src = originalSrc;
                    showFullscreenVideo(question.recapVideoSrc, () => {
                        const nextQuestionId = getNextQuestionId(question.id);
                        if (nextQuestionId) {
                            transitionToNextQuestion(nextQuestionId);
                        } else {
                            showCompletionScreen();
                        }
                    });
                }, 2000);
            } else {
                const nextQuestionId = getNextQuestionId(question.id);
                if (nextQuestionId) {
                    transitionToNextQuestion(nextQuestionId);
                } else {
                    showCompletionScreen();
                }
            }
        } else {
            const gifContainer = questionElement.querySelector('.image-container img');
            if (gifContainer) {
                const originalSrc = gifContainer.src;
                gifContainer.src = '../picture/wrongANS/wrong.gif';
                gifContainer.style.display = "block";

                gifContainer.style.maxWidth = "400px"; 
                gifContainer.style.height = "auto";

                setTimeout(() => {
                    gifContainer.src = originalSrc;
                    showWrongAnswerPage(
                        'คุณตอบผิด!',
                        '../picture/wrongANS/wrong.png',
                        'ลองดูคำตอบให้ดี!',
                        () => resetCurrentQuestion(currentQuestionId)
                    );
                }, 2000);
            }
        }
    }, 1000);
}

function showAnswerGIF(gifSrc, callback) {
    // เลือก img ภายในข้อคำถามปัจจุบันเท่านั้น
    const currentQuestion = document.getElementById(currentQuestionId);
    const gifContainer = currentQuestion.querySelector('.image-container img');

    if (gifContainer) {
        // เก็บ src เดิมไว้
        const originalSrc = gifContainer.src;
        
        gifContainer.src = gifSrc;
        gifContainer.style.display = "block";

        gifContainer.addEventListener('load', () => {
            setTimeout(() => {
                // คืนค่า src กลับไปเป็นรูปคำถามเดิม
                gifContainer.src = originalSrc;
                if (callback) callback();
            }, 2000);
        });
    } else {
        console.error("GIF container or image element not found.");
        if (callback) callback();
    }
}

function showFullscreenVideo(videoSrc, callback) {
    const container = document.getElementById('fullscreen-video-container');
    const video = document.getElementById('fullscreen-video');
    const nextButton = document.getElementById('next-button');
    let hasShownNextButton = false;

    // ซ่อนปุ่ม "Next" ตอนเริ่มต้น
    nextButton.classList.add('hidden');

    // แสดง video container
    container.classList.remove('hidden');
    video.src = videoSrc; // ตั้งค่า video source ใหม่
    video.currentTime = 0; // รีเซ็ตเวลาเริ่มต้นของวิดีโอ
    video.loop = true; // ตั้งค่าให้เล่นซ้ำ
    video.load(); // โหลด video ใหม่
    video.autoplay = true; // เริ่มเล่นอัตโนมัติ

    // เมื่อวิดีโอเล่นจบแล้ว
    video.onended = () => {
        if (!hasShownNextButton) {
            nextButton.classList.remove('hidden'); // แสดงปุ่ม "Next"
            hasShownNextButton = true;
        }
    };

    // ตรวจสอบเมื่อวิดีโอเล่นถึงเวลาสุดท้าย
    video.addEventListener('timeupdate', function () {
        if (video.currentTime >= video.duration - 0.5 && !hasShownNextButton) {
            video.pause(); // หยุดชั่วคราว
            nextButton.classList.remove('hidden'); // แสดงปุ่ม "Next"
            hasShownNextButton = true;
            video.play(); // เล่นต่อ
        }
    });

    // เมื่อคลิกปุ่ม "Next"
    nextButton.addEventListener('click', () => {
        container.classList.add('hidden'); // ซ่อน video container
        video.pause(); // หยุดวิดีโอ
        video.currentTime = 0; // รีเซ็ตเวลา
        video.src = ''; // ล้าง source ของวิดีโอ
        nextButton.classList.add('hidden'); // ซ่อนปุ่ม "Next"
        if (callback) callback(); // เรียก callback ไปยังขั้นตอนถัดไป
    });
}


let isTransitioning = false;

function transitionToNextQuestion(nextQuestionId) {
    if (isTransitioning) {
        console.warn("transitionToNextQuestion ถูกเรียกซ้ำ");
        return;
    }

    isTransitioning = true;
    console.log(`กำลังเปลี่ยนจากคำถาม ${currentQuestionId} ไปยังคำถาม ${nextQuestionId}`);

    if (!nextQuestionId) {
        console.log("ไม่มีคำถามถัดไป แสดง completion screen...");
        showCompletionScreen();
        isTransitioning = false;
        return;
    }

    document.querySelectorAll('.question').forEach(q => q.classList.add('hidden'));

    const nextQuestion = document.getElementById(nextQuestionId);
    if (nextQuestion) {
        console.log(`กำลังแสดงคำถาม ${nextQuestionId}`);
        nextQuestion.classList.remove('hidden');
        currentQuestionId = nextQuestionId;
    } else {
        console.error("ไม่พบคำถามใน DOM:", nextQuestionId);
    }

    isTransitioning = false;
}

function showQuestion(questionId) {
    resetImageSrc();
    document.querySelectorAll('.question').forEach(q => q.classList.add('hidden'));
    const questionElement = document.getElementById(questionId);
    if (questionElement) {
        questionElement.classList.remove('hidden');
        currentQuestionId = questionId;
    }
}

function showWrongAnswerPage(_message, imageUrl, text, callback) {
    const wrongAnswerContainer = document.getElementById('wrong-answer');
    const wrongImage = document.getElementById('wrong-image');
    const wrongText = document.getElementById('wrong-text');

    wrongAnswerContainer.classList.remove('hidden');
    wrongImage.src = imageUrl;
    wrongText.textContent = text;

    document.querySelectorAll('.question').forEach(q => q.classList.add('hidden'));

    // รอให้ผู้ใช้คลิกปุ่มเพื่อดำเนินการต่อ
    const reloadButton = wrongAnswerContainer.querySelector('.button');
    reloadButton.addEventListener('click', () => {
        wrongAnswerContainer.classList.add('hidden');
        if (callback) callback();
    });
}

function resetCurrentQuestion(questionId) {
    resetImageSrc();
    const wrongAnswerContainer = document.getElementById('wrong-answer');
    wrongAnswerContainer.classList.add('hidden');
    
    document.querySelectorAll('.question').forEach(q => q.classList.add('hidden'));
    
    const questionElement = document.getElementById(questionId);
    if (questionElement) {
        questionElement.classList.remove('hidden');
        resetSelectedAnswers(questionElement);
    }
}

function resetSelectedAnswers(questionElement) {
    const buttons = questionElement.querySelectorAll('.button-choices');
    const submitButton = questionElement.querySelector('.button-submit-answer');
    
    buttons.forEach(button => {
        // เก็บสถานะสีไว้ แต่ลบการ selected
        button.classList.remove();
    });
    
    if (submitButton) {
        submitButton.classList.add('hidden');
    }
    
    return new Set();
}

function getNextQuestionId(currentQuestionId) {
    const questionElements = Array.from(document.querySelectorAll('.question'));
    const currentIndex = questionElements.findIndex(q => q.id === currentQuestionId);

    console.log("currentQuestionId:", currentQuestionId, "currentIndex:", currentIndex);

    if (currentIndex !== -1 && currentIndex === questionElements.length - 1) {
        console.log("ไม่มีคำถามถัดไป (สุดท้าย)");
        return null;
    }

    const nextQuestionId = questionElements[currentIndex + 1]?.id || null;
    console.log("nextQuestionId:", nextQuestionId);
    return nextQuestionId;
}

function resetImageSrc() {
    document.querySelectorAll('img[data-default-src]').forEach(img => {
        img.src = img.getAttribute('data-default-src');
    });
}

function goToNextStep() {
    const currentQuestion = document.querySelector('.question:not(.hidden)');
    const nextQuestion = currentQuestion.nextElementSibling;

    if (nextQuestion && nextQuestion.classList.contains('question')) {
        currentQuestion.classList.add('hidden');
        nextQuestion.classList.remove('hidden');
    } else {
        console.log("No next question found.");
    }

    const videoContainer = document.getElementById('fullscreen-video-container');
    const video = document.getElementById('fullscreen-video');
    const nextButton = document.getElementById('next-button');

    video.pause();
    video.src = "";
    videoContainer.classList.add('hidden');
    nextButton.classList.add('hidden');
}

function showCompletionScreen() {
    // Hide all questions first
    document.querySelectorAll('.question').forEach(q => q.classList.add('hidden'));
    
    // Show completion screen
    const completionScreen = document.getElementById("completion-screen");
    if (completionScreen) {
        completionScreen.classList.remove("hidden");
        console.log("Completion screen shown successfully");
    } else {
        console.error("Completion screen element not found");
    }
}

function confirmCompletion(level) {
    console.log("เรียก confirmCompletion สำหรับ level:", level);
    completeLevel(level);
}