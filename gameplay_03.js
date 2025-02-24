document.addEventListener('DOMContentLoaded', () => {
    const questions = document.querySelectorAll('.question'); // หาคำถามทั้งหมด
    let currentLevel = 1; // เก็บระดับปัจจุบัน

    questions.forEach((question, index) => {
        const sortableContainer = question.querySelector('.sortable-container');
        const submitButton = question.querySelector('.button-submit-answer');
        let currentOrder = [];

        if (!sortableContainer || !submitButton) return;

        sortableContainer.addEventListener('dragstart', (e) => {
            if (e.target.classList.contains('sortable-item')) {
                e.target.classList.add('dragging');
            }
        });

        sortableContainer.addEventListener('dragend', (e) => {
            if (e.target.classList.contains('sortable-item')) {
                e.target.classList.remove('dragging');
            }
        });

        sortableContainer.addEventListener('dragover', (e) => {
            e.preventDefault();
            const draggingItem = document.querySelector('.dragging');
            const afterElement = getDragAfterElement(sortableContainer, e.clientY);
            if (afterElement == null) {
                sortableContainer.appendChild(draggingItem);
            } else {
                sortableContainer.insertBefore(draggingItem, afterElement);
            }
            submitButton.classList.remove('hidden');
        });

        submitButton.addEventListener('click', () => {
            const items = Array.from(sortableContainer.children);
            currentOrder = items.map(item => parseInt(item.getAttribute('data-order'), 10));
            const correctOrder = Array.from({ length: items.length }, (_, i) => i + 1);

            highlightAnswers(items, JSON.stringify(currentOrder) === JSON.stringify(correctOrder));

            setTimeout(() => {
                const gifContainer = question.querySelector('.gif-container');
                if (!gifContainer) return;

                if (JSON.stringify(currentOrder) === JSON.stringify(correctOrder)) {
                    const recapVideoSrc = question.getAttribute('data-recap-video');
                    playGIF('../picture/correctANS/correct.gif', () => {
                        playRecapVideo(recapVideoSrc, () => {
                            const nextQuestion = question.nextElementSibling;
                            if (nextQuestion && nextQuestion.classList.contains('question')) {
                                question.classList.add('hidden');
                                nextQuestion.classList.remove('hidden');
                                currentLevel = index + 2; // อัปเดตระดับ
                            } else {
                                showSortingAnswerCompletionScreen();
                            }
                        });
                    }, gifContainer);
                } else {
                    playGIF('../picture/wrongANS/wrong.gif', () => {
                        showWrongAnswerPage('เรียงลำดับผิด', '../picture/wrongANS/wrong.png', 'ลองใหม่อีกครั้ง', () => {
                            resetCurrentQuestion(question);
                        });
                    }, gifContainer);
                }
            }, 3000);
        });

        // ฟังก์ชันที่ช่วยในการคำนวณตำแหน่งเพื่อดึงการลากมา
        function getDragAfterElement(container, y) {
            const draggableElements = [...container.querySelectorAll('.sortable-item:not(.dragging)')];
            return draggableElements.reduce((closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = y - box.top - box.height / 2;
                if (offset < 0 && offset > closest.offset) {
                    return { offset, element: child };
                } else {
                    return closest;
                }
            }, { offset: Number.NEGATIVE_INFINITY }).element;
        }

        // ฟังก์ชันที่จะไฮไลต์คำตอบ
        function highlightAnswers(items, isCorrect) {
            items.forEach(item => {
                if (isCorrect) {
                    item.classList.add('correct');
                } else {
                    item.classList.add('incorrect');
                }
            });
            setTimeout(() => {
                items.forEach(item => {
                    item.classList.remove('correct', 'incorrect');
                });
            }, 2000);
        }

        // ฟังก์ชันเล่น GIF
        function playGIF(gifPath, callback, gifElement) {
            if (!gifElement) {
                console.error('GIF element not found');
                return;
            }
            gifElement.src = gifPath;

            setTimeout(() => {
                const defaultSrc = gifElement.getAttribute('data-default-src');
                gifElement.src = defaultSrc;

                if (callback) callback();
            }, 3000);
        }

        // ฟังก์ชันเล่น Recap Video
        function playRecapVideo(videoSrc, callback) {
            const videoElement = document.getElementById('fullscreen-video');
            const videoContainer = document.getElementById('fullscreen-video-container');
            const nextButton = document.getElementById('next-button');
            let hasCompletedFirstPlay = false;

            if (!videoElement || !videoContainer || !nextButton) {
                console.error('Video element, container, or next button not found');
                return;
            }

            videoContainer.classList.remove('hidden');
            videoElement.src = videoSrc;
            videoElement.loop = false;
            nextButton.classList.add('hidden');

            videoElement.onloadedmetadata = () => {
                videoElement.play().catch(error => {
                    console.error('Error playing video:', error);
                });
            };

            videoElement.onended = () => {
                if (!hasCompletedFirstPlay) {
                    hasCompletedFirstPlay = true;
                    nextButton.classList.remove('hidden');
                    videoElement.loop = true;
                    videoElement.play();
                }
            };

            nextButton.onclick = () => {
                videoContainer.classList.add('hidden');
                videoElement.pause();
                videoElement.src = '';
                nextButton.classList.add('hidden');

                if (callback) callback();
            };
        }

        // ฟังก์ชันแสดงหน้าจอเสร็จสิ้น
        function showSortingAnswerCompletionScreen() {
            document.querySelectorAll('.question').forEach(q => q.classList.add('hidden'));
            const completionScreen = document.getElementById('completion-screen');
            if (completionScreen) {
                completionScreen.classList.remove('hidden');
            }
        }

        // ฟังก์ชันแสดงหน้าจอผิด
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
                if (callback) callback();
            });
        }

        // ฟังก์ชันรีเซ็ตคำถาม
        function resetCurrentQuestion(question) {
            if (question) {
                const gifElement = question.querySelector('.gif-container');
                if (gifElement) {
                    gifElement.src = gifElement.getAttribute('data-default-src');
                }
                document.querySelectorAll('.question').forEach(q => q.classList.add('hidden'));
                question.classList.remove('hidden');
            }
        }
    });
});

function confirmCompletion(level) {
    completeLevel(level);
}
