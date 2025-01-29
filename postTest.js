class PostTestManager {
    constructor() {
        this.questions = [
            {
                image: "picture/questionIMG/ex01.png",
                question: "การช่วยเหลือผู้ป่วยหมดสติ ควรทำอย่างไร?",
                options: [
                    { text: "ให้ผู้ป่วยนอนหงายแล้วตบที่หน้า", isCorrect: false },
                    { text: "เรียกรถพยาบาลและตรวจการหายใจ", isCorrect: true },
                    { text: "ให้ดื่มน้ำเพื่อช่วยฟื้นตัว", isCorrect: false },
                    { text: "ใช้พัดลมเป่าที่หน้าเพื่อให้ตื่น", isCorrect: false }
                ]
            },
            {
                image: "picture/questionIMG/.png",
                question: "ข้อใดเป็นหลักการปฐมพยาบาลที่ถูกต้อง?",
                options: [
                    { text: "ห้ามเคลื่อนย้ายผู้บาดเจ็บที่คอหรือกระดูกสันหลัง", isCorrect: true },
                    { text: "ถ้ามีเลือดออกให้ใช้มือเปล่ากดแผล", isCorrect: false },
                    { text: "ใช้แอลกอฮอล์ล้างแผลลึก", isCorrect: false },
                    { text: "ถ้าเจ็บหน้าอกให้บังคับให้นอนราบ", isCorrect: false }
                ]
            },
            // add คำถามเพิ่ม
        ];
        this.currentQuestion = 0;
        this.score = 0;
        this.timer = null;
        this.timeLeft = 60;
    }

    startTimer() {
        this.timeLeft = 60;
        const timerElement = document.getElementById("timer");
        timerElement.textContent = `เวลาที่เหลือ: ${this.timeLeft} วินาที`;

        this.timer = setInterval(() => {
            this.timeLeft--;
            timerElement.textContent = `เวลาที่เหลือ: ${this.timeLeft} วินาที`;
            
            if (this.timeLeft <= 0) {
                clearInterval(this.timer);
                this.nextQuestion();
            }
        }, 1000);
    }

    stopTimer() {
        clearInterval(this.timer);
    }

    renderContainer(content) {
        document.body.innerHTML = `
            <div class="posttest-fullpage">
                <div class="timer" id="timer">เวลาที่เหลือ: 60 วินาที</div>
                ${content}
            </div>
        `;
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
        console.log("Rendering question..."); // ตรวจสอบว่า function รันจริงไหม
    
        const question = this.questions[this.currentQuestion];
        this.renderContainer(`
            <div class="posttest-content">
                <div class="timer" id="timer">
                    <div class="timer-icon-container">
                        <img src="picture/PostTest/clock.png" class="timer-icon" alt="Clock">
                    </div>
                    <div class="timer-text">เวลาที่เหลือ: 60 วินาที</div>
                </div>
                <h2>คำถามที่ ${this.currentQuestion + 1}/${this.questions.length}</h2>
                <div class="question">
                    ${question.image ? `<div class="question-image"><img src="${question.image}" alt="Question Image"></div>` : ''}
                    <h3>${question.question}</h3>
                    <div class="options">
                        ${question.options.map(option => `
                            <a class="option-button" onclick="postTestManager.validateAnswer(${option.isCorrect})">${option.text}</a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `);
    
        // ตรวจสอบว่าภาพถูกโหลดหรือไม่ ถ้าไม่โหลด ให้โหลดใหม่
        setTimeout(() => {
            const timerImage = document.querySelector(".timer-icon");
            if (timerImage && !timerImage.complete) {
                timerImage.src = "../picture/PostTest/clock.png";
                console.log("Reloaded timer icon.");
            }
        }, 100);
    
        console.log("Rendered question with timer.");
        this.startTimer();
    }
    
    

    validateAnswer(isCorrect) {
        if (isCorrect) this.score++;
        this.currentQuestion++;
        this.currentQuestion < this.questions.length ? this.showQuestion() : this.showResults();
        this.stopTimer();
        this.nextQuestion();
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
        localStorage.setItem('posttestScore', this.score + '/' + this.questions.length); // เก็บคะแนน Post-Test แบบเต็ม
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
