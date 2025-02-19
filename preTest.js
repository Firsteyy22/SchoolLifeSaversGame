class PretestManager {
    constructor() {
        this.questions = [
            {
                image: "picture/PreTest/q1.png",
                question: "การปฐมพยาบาล คืออะไร?",
                options: [
                    { text: "การป้องกันการเกิดอันตราย", isCorrect: false},
                    { text: "การรักษาโดยแพทย์", isCorrect: false},
                    { text: "การช่วยเหลือผู้เจ็บป่วยเบื้องต้น", isCorrect: true},
                    { text: "การรักษาต่อเนื่องหลังพบแพทย์", isCorrect: false}
                ]
            },
            {
                image: "picture/PreTest/q2.png",
                question: "ถ้าเกิดอาการฟกช้ำ จะต้องทำอย่างไร?",
                options: [
                    { text: "ควรประคบเย็นก่อน", isCorrect: true},
                    { text: "ควรประคบร้อนก่อน", isCorrect: false},
                    { text: "ไม่ควรทำอะไร ปล่อยทิ้งไว้", isCorrect: false},
                    { text: "ควรประคบร้อนสลับเย็นไปมา", isCorrect: false}
                ]
            },
            {
                image: "picture/PreTest/q3.png",
                question: "สิ่งใดทำความสะอาดแผลได้ดีที่สุด?",
                options: [
                    { text: "แอลกอฮอล์", isCorrect: false},
                    { text: "เบตาดีน", isCorrect: false},
                    { text: "น้ำสะอาด", isCorrect: true},
                    { text: "น้ำส้มสายชู", isCorrect: false}
                ]
            },
            {
                image: "picture/PreTest/q4.png",
                question: "แผลไฟไหม้ น้ำร้อนลวกมีกี่ระดับ?",
                options: [
                    { text: "2 ระดับ", isCorrect: false},
                    { text: "3 ระดับ", isCorrect: true},
                    { text: "4 ระดับ", isCorrect: false},
                    { text: "5 ระดับ", isCorrect: false}
                ]
            },
            {
                image: "picture/PreTest/q5.png",
                question: "เรียกรถพยาบาล ต้องติดต่อสายด่วนอะไร?",
                options: [
                    { text: "1150", isCorrect: false},
                    { text: "1669", isCorrect: true},
                    { text: "1234", isCorrect: false},
                    { text: "1193", isCorrect: false}
                ]
            },
            {
                image: "picture/PreTest/q6.png",
                question: "การห้ามเลือดควรทำอย่างไร?",
                options: [
                    { text: "ใช้ผ้าสะอาดกดบริเวณแผล", isCorrect: true},
                    { text: "ใช้มือกดแผลโดยตรง", isCorrect: false},
                    { text: "ใช้เชือกรัดเหนือหรือใต้แผล", isCorrect: false},
                    { text: "ล้างน้ำสะอาดจนกว่าเลือดจะหยุดไหล", isCorrect: false}
                ]
            },
            {
                image: "picture/PreTest/q7.png",
                question: "ข้อใดคือสิ่งที่ควรทำก่อนพบแพทย์เมื่อถูกงูกัด?",
                options: [
                    { text: "ใช้เชือกรัดเหนือบริเวณที่ถูกกัด", isCorrect: false},
                    { text: "ใช้ปากดูดพิษออก", isCorrect: false},
                    { text: "ขยับส่วนที่ถูกกัดให้น้อยที่สุด", isCorrect: true},
                    { text: "กดแผลเพื่อไล่พิษออก", isCorrect: false}
                ]
            },
            {
                image: "picture/PreTest/q8.png",
                question: "เมื่อเลือดกำเดาไหลและบีบปลายจมูก ควรหายใจทางใด?",
                options: [
                    { text: "ไม่ควรหายใจ", isCorrect: false},
                    { text: "ทางจมูกและปาก", isCorrect: false},
                    { text: "ทางจมูก", isCorrect: false},
                    { text: "ทางปาก", isCorrect: true}
                ]
            },
            {
                image: "picture/PreTest/q9.png",
                question: "ข้อใดคือสิ่งที่ไม่ควรทำหากกระดูกหัก?",
                options: [
                    { text: "ขยับให้กระดูกเข้าที่", isCorrect: true},
                    { text: "ลดการเคลื่อนไหวให้ได้มากที่สุด", isCorrect: false},
                    { text: "ยึดส่วนที่กระดูกหักไว้กับไม้หรือหนังสือที่มีความหนา", isCorrect: false},
                    { text: "รอความช่วยเหลือจากแพทย์หรือผู้เชี่ยวชาญ", isCorrect: false}
                ]
            },
            {
                image: "picture/PreTest/q10.png",
                question: "หากจะทำการปฐมพยาบาลต้องคำนึงถึงสิ่งใด?",
                options: [
                    { text: "อาการของผู้เจ็บป่วย", isCorrect: false},
                    { text: "ความรู้ ความสามารถในการปฐมพยาบาล", isCorrect: false},
                    { text: "ความปลอดภัยของผู้เจ็บป่วยและผู้ปฐมพยาบาล", isCorrect: false},
                    { text: "ถูกทุกข้อ", isCorrect: true}
                ]
            }
        ];
        this.currentQuestion = 0;
        this.score = 0;
    }

    showInitialDialog() {
        const overlay = document.createElement('div');
        overlay.className = 'pretest-overlay';
        overlay.innerHTML = `
            <div class="dialog-content">
                <h2>แบบทดสอบก่อนเรียน (PRE-TEST)</h2>
                <h3>กรุณาทำแบบทดสอบเพื่อประเมินความรู้เบื้องต้น</h3>
                <a class="start-button" onclick="pretestManager.startPretest()">เริ่มทำแบบทดสอบ</a>
            </div>
        `;
        document.body.appendChild(overlay);
    }

    showQuestion() {
        const container = document.createElement('div');
        container.className = 'pretest-fullpage';
        
        const question = this.questions[this.currentQuestion];
        
        container.innerHTML = `
            <div class="pretest-content">
                <h2>คำถามที่ ${this.currentQuestion + 1}/${this.questions.length}</h2>
                <div class="question">
                    ${question.image ? `
                        <div class="question-image">
                            <img src="${question.image}" alt="Question Image">
                        </div>
                    ` : ''}                
                    <h2>${question.question}</h2>
                    <div class="options">
                        ${question.options.map((option, index) => `
                            <a class="option-button" onclick="pretestManager.validateAnswer(${option.isCorrect})">
                                ${option.text}
                            </a>
                        `).join('')}
                    </div>
                </div>
            </div>
        `;
        
        document.body.innerHTML = '';
        document.body.appendChild(container);
    }

    validateAnswer(isCorrect) {
        if (isCorrect) {
            this.score++;
        }
        
        this.currentQuestion++;
        
        if (this.currentQuestion < this.questions.length) {
            this.showQuestion();
        } else {
            this.showResults();
        }
    }

    startPretest() {
        document.querySelector('.pretest-overlay').remove();
        this.showQuestion();
    }

    showResults() {
        const container = document.createElement('div');
        container.className = 'pretest-fullpage';
        container.innerHTML = `
            <div class="pretest-content">
                <h2>ผลการทดสอบ</h2>
                <h3>คะแนนของคุณ: ${this.score}/${this.questions.length} คะแนน</h3>
                <a class="start-button" onclick="pretestManager.finishPretest()">
                    เสร็จสิ้น
                </a>
            </div>
        `;
        
        document.body.innerHTML = '';
        document.body.appendChild(container);
    }

    finishPretest() {
        localStorage.setItem('pretestCompleted', 'true');
        localStorage.setItem('pretestScore', this.score);
        localStorage.setItem('isFirstVisit', 'true');
        window.location.href = 'startGame.html';
    }

    hasCompletedPretest() {
        return localStorage.getItem('pretestCompleted') === 'true';
    }
}

// Export class สำหรับใช้งานใน HTML
window.PretestManager = PretestManager;