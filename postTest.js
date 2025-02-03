class PostTestManager {
    constructor() {
        this.allquestions = [
            {
                image: "picture/PostTest/.png",
                question: "1?",
                options: [
                    { text: "X", isCorrect: true },
                    { text: "XX", isCorrect: false },
                    { text: "XXX", isCorrect: false },
                    { text: "XXXX", isCorrect: false }
                ]
            },
            {
                image: "picture/PostTest/.png",
                question: "2?",
                options: [
                    { text: "X", isCorrect: false },
                    { text: "XX", isCorrect: false },
                    { text: "XXX", isCorrect: true },
                    { text: "XXXX", isCorrect: false }
                ]
            },
            {
                image: "picture/PostTest/.png",
                question: "3?",
                options: [
                    { text: "X", isCorrect: true },
                    { text: "XX", isCorrect: false },
                    { text: "XXX", isCorrect: false },
                    { text: "XXXX", isCorrect: false }
                ]
            },
            {
                image: "picture/PostTest/.png",
                question: "4?",
                options: [
                    { text: "X", isCorrect: false },
                    { text: "XX", isCorrect: false },
                    { text: "XXX", isCorrect: false },
                    { text: "XXXX", isCorrect: true }
                ]
            },
            {
                image: "picture/PostTest/.png",
                question: "5?",
                options: [
                    { text: "X", isCorrect: false },
                    { text: "XX", isCorrect: true },
                    { text: "XXX", isCorrect: false },
                    { text: "XXXX", isCorrect: false }
                ]
            },
            // {
            //     image: "picture/PostTest/.png",
            //     question: "การช่วยเหลือผู้ป่วยหมดสติ ควรทำอย่างไร?",
            //     options: [
            //         { text: "ให้ผู้ป่วยนอนหงายแล้วตบที่หน้า", isCorrect: false },
            //         { text: "เรียกรถพยาบาลและตรวจการหายใจ", isCorrect: true },
            //         { text: "ให้ดื่มน้ำเพื่อช่วยฟื้นตัว", isCorrect: false },
            //         { text: "ใช้พัดลมเป่าที่หน้าเพื่อให้ตื่น", isCorrect: false }
            //     ]
            // },
            // {
            //     image: "picture/PostTest/.png",
            //     question: "ข้อใดเป็นหลักการปฐมพยาบาลที่ถูกต้อง?",
            //     options: [
            //         { text: "ห้ามเคลื่อนย้ายผู้บาดเจ็บที่คอหรือกระดูกสันหลัง", isCorrect: true },
            //         { text: "ถ้ามีเลือดออกให้ใช้มือเปล่ากดแผล", isCorrect: false },
            //         { text: "ใช้แอลกอฮอล์ล้างแผลลึก", isCorrect: false },
            //         { text: "ถ้าเจ็บหน้าอกให้บังคับให้นอนราบ", isCorrect: false }
            //     ]
            // },
            // {
            //     image: "picture/PostTest/.png",
            //     question: "XXXX?",
            //     options: [
            //         { text: "X", isCorrect: true },
            //         { text: "XX", isCorrect: false },
            //         { text: "XXX", isCorrect: false },
            //         { text: "XXXX", isCorrect: false }
            //     ]
            // },
            // add คำถามเพิ่ม
        ];
        this.questions = this.getRandomQuestions(20); // สุ่มคำถาม
        this.currentQuestion = 0;
        this.score = 0;
        this.timer = null;
        this.timeLeft = 60;
    }

    getRandomQuestions(count) {
        let shuffled = [...this.allquestions].sort(() => 0.5 - Math.random()); // สุ่มลำดับคำถาม
        return shuffled.slice(0, count).map(q => ({
            ...q,
            options: q.options.sort(() => 0.5 - Math.random()) // สุ่มตัวเลือก
        }));
    }
    
    startTimer() {
        this.stopTimer();
        this.timeLeft = 60;
        const timerElement = document.getElementById("timer");

        if (!timerElement) {
            console.error("Element with id 'timer' not found.");
            return;
        }

        timerElement.textContent = `เวลาที่เหลือ: ${this.timeLeft} วินาที`;

        this.timer = setInterval(() => {
            this.timeLeft--;
            timerElement.textContent = `เวลาที่เหลือ: ${this.timeLeft} วินาที`;

            if (this.timeLeft <= 0) {
                this.stopTimer();
                this.nextQuestion();
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }


    // renderContainer(content) {
    //     document.body.innerHTML = `
    //         <div class="posttest-fullpage">
    //             <div class="timer" id="timer">เวลาที่เหลือ: 60 วินาที</div>
    //             ${content}
    //         </div>
    //     `;
    // }
    renderContainer(content) {
        const container = document.getElementById("content-container");
        
        if (!container) {
            const newContainer = document.createElement('div');
            newContainer.id = "content-container";
            newContainer.className = "posttest-fullpage";
            document.body.appendChild(newContainer);
        }

        document.getElementById("content-container").innerHTML = content;
    }

    createOverlay(content) {
        const overlay = document.createElement('div');
        overlay.className = 'posttest-overlay';
        overlay.innerHTML = content;
        document.body.appendChild(overlay);
    }

    renderContainer(content) {
        const container = document.createElement('div');
        container.className = 'posttest-fullpage';
        container.innerHTML = content;
        document.body.innerHTML = '';
        document.body.appendChild(container);
    }

    showInitialDialog() {
        const previousPostTestScore = localStorage.getItem('posttestScore'); // เช็คคะแนน Post-Test
        const previousPreTestScore = localStorage.getItem('pretestScore') || 'ยังไม่มีคะแนน'; // เช็คคะแนน Pre-Test
    
        // ถ้ามี Post-Test ให้แสดง Post-Test, ถ้าไม่มีให้แสดง Pre-Test
        const scoreMessage = previousPostTestScore 
            ? `คะแนน Post-Test ก่อนหน้านี้ของคุณ: ${previousPostTestScore} คะแนน`
            : `คะแนน Pre-Test ของคุณ: ${previousPreTestScore} คะแนน`;
    
        this.createOverlay(`
            <div class="dialog-content">
                <h2>แบบทดสอบหลังเรียน (Post-Test)</h2>
                <h3>มาลองดูกันว่า เธอจะเจ๋งแค่ไหน !!</h3>
                <h3 style="color: rgb(0, 72, 254);">${scoreMessage}</h3>
                <a class="start-button" onclick="postTestManager.startPostTest()">เริ่มทำแบบทดสอบ</a>
            </div>
        `);
    }  

    showQuestion() {
        if (this.currentQuestion >= this.questions.length) {
            return this.showResults();
        }

        const question = this.questions[this.currentQuestion];

        this.renderContainer(`
            <div class="posttest-content">
                <h2>คำถามที่ ${this.currentQuestion + 1}/${this.questions.length}</h2>
                <div class="question">
                    ${question.image ? `<div class="question-image"><img src="${question.image}" alt="Question Image"></div>` : ''}
                    <h2>${question.question}</h2>
                    <div class="options">
                        ${question.options.map(option => 
                            `<a class="option-button" onclick="postTestManager.validateAnswer(${option.isCorrect})">${option.text}</a>`
                        ).join('')}
                    </div>
                </div>
            </div>

            <div class="timer" id="timer">
                // <div class="timer-icon-container">
                //     <img src="picture/PostTest/clock.png" class="timer-icon" alt="Clock">
                // </div>
                <div class="timer-text">เวลาที่เหลือ: 60 วินาที</div>
            </div>
        `);

        this.startTimer();
    }
    
    validateAnswer(isCorrect) {
        this.stopTimer(); // หยุดจับเวลาเมื่อเลือกคำตอบ
        if (isCorrect) this.score++;

        this.currentQuestion++;
        this.showQuestion(); // ไปคำถามถัดไป
    }

    nextQuestion() {
        this.currentQuestion++;
        this.showQuestion();
    }

    startPostTest() {
        document.querySelector('.posttest-overlay').remove();
        this.showQuestion();
    }

    showResults() {
        this.renderContainer(`
            <div class="posttest-content">
                <h2>ผลการทดสอบหลังเรียน</h2>
                <h3>คะแนนของคุณ: ${this.score}/${this.questions.length} คะแนน</h3>
                <a class="start-button" onclick="postTestManager.finishPostTest()">เสร็จสิ้น</a>
            </div>
        `);
    }

    finishPostTest() {
        localStorage.setItem('posttestCompleted', 'true');
        localStorage.setItem('posttestScore', this.score + '/' + this.questions.length);
        window.location.href = 'startGame.html';
    }
}

function closeOverlay() {
    document.querySelector('.posttest-overlay').remove();
}

function redirectToPostTest() {
    window.location.href = 'postTest.html';
}

window.PostTestManager = PostTestManager;
const postTestManager = new PostTestManager();
