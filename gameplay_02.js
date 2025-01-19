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
            // เลือก img ภายในข้อคำถามปัจจุบันเท่านั้น
            const gifContainer = questionElement.querySelector('.image-container img');
            if (gifContainer) {
                // เก็บ src เดิมไว้
                const originalSrc = gifContainer.src;
                
                gifContainer.src = '../picture/correctANS/correct.gif';
                gifContainer.style.display = "block";
                
                setTimeout(() => {
                    // คืนค่า src กลับไปเป็นรูปคำถามเดิม
                    gifContainer.src = originalSrc;
                    showFullscreenVideo(question.recapVideoSrc, () => {
                        const nextQuestionId = getNextQuestionId(question.id);
                        if (nextQuestionId) {
                            transitionToNextQuestion(nextQuestionId);
                        }
                    });
                }, 2000);
            }
        } else {
            showWrongAnswerPage(
                'คุณตอบผิด!',
                '../picture/wrongANS/wrong.png',
                'ลองดูคำตอบให้ดี!',
                () => resetCurrentQuestion(currentQuestionId)
            );
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

    container.classList.remove('hidden');
    video.src = videoSrc;
    video.play();

    // Clear any existing event listeners
    video.removeEventListener('ended', null);
    nextButton.removeEventListener('click', null);

    video.addEventListener('ended', () => {
        if (!hasShownNextButton) {
            nextButton.classList.remove('hidden');
            hasShownNextButton = true;
        }
        video.play();
    });

    nextButton.addEventListener('click', () => {
        video.pause();
        video.src = "";
        container.classList.add('hidden');
        nextButton.classList.add('hidden');
        hasShownNextButton = false;
        if (callback) callback();
    });
}

function transitionToNextQuestion(nextQuestionId) {
    if (nextQuestionId === null) {
        console.log("ไม่มีคำถามถัดไป แสดง completion screen...");
        showCompletionScreen();
        return;
    }

    // ซ่อนคำถามทั้งหมด
    document.querySelectorAll('.question').forEach(q => q.classList.add('hidden'));

    // แสดงคำถามถัดไป
    const nextQuestion = document.getElementById(nextQuestionId);
    if (nextQuestion) {
        console.log("แสดงคำถามถัดไป:", nextQuestionId);
        nextQuestion.classList.remove('hidden');
        currentQuestionId = nextQuestionId;
    }
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

    // ตรวจสอบถ้าเป็นคำถามสุดท้าย
    if (currentIndex !== -1 && currentIndex === questionElements.length - 1) {
        return null;
    }

    return questionElements[currentIndex + 1]?.id || null;
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
    console.log("เรียก showCompletionScreen");
    const completionScreen = document.getElementById("completion-screen");
    if (completionScreen) {
        console.log("พบ #completion-screen ใน DOM");
        completionScreen.classList.remove("hidden");
    } else {
        console.error("ไม่พบ #completion-screen ใน DOM");
    }
}

function confirmCompletion(level) {
    console.log("เรียก confirmCompletion สำหรับ level:", level);
    completeLevel(level);
}

