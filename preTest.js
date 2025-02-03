class PretestManager {
    constructor() {
        this.questions = [
            {
                image: "picture/PreTest/q1.png",
                question: "การปฐมพยาบาล คืออะไร ?",
                options: [
                    {
                        text: "การทำกายภาพบำบัดเพื่อฟื้นฟูร่างกาย",
                        isCorrect: false
                    },
                    {
                        text: "การช่วยเหลือเบื้องต้นเมื่อเกิดอุบัติเหตุหรือเจ็บป่วยกะทันหัน",
                        isCorrect: true
                    },
                    {
                        text: "การใช้สมุนไพรรักษาอาการเจ็บป่วย",
                        isCorrect: false
                    },
                    {
                        text: "การดูแลสุขภาพประจำวันเพื่อป้องกันโรค",
                        isCorrect: false
                    }
                ]
            },
            {
                image: "picture/PreTest/q2.png",
                question: "ถ้าเกิดอาการฟกช้ำ จะต้องทำอะไร ?",
                options: [
                    {
                        text: "ควรประคบเย็นก่อน",
                        isCorrect: true
                    },
                    {
                        text: "ควรประคบร้อนก่อน",
                        isCorrect: false
                    },
                    {
                        text: "ไม่ควรทำอะไร ปล่อยทิ้งไว้",
                        isCorrect: false
                    },
                    {
                        text: "ควรประคบร้อนสลับเย็นไปมา",
                        isCorrect: false
                    }
                ]
            },
            {
                image: "picture/PreTest/q3.png",
                question: "เมื่อเกิดแผลถลอก ควรทำอย่างไรเป็นขั้นตอนแรก ?",
                options: [
                    {
                        text: "ทาเบตาดีนที่แผล",
                        isCorrect: false
                    },
                    {
                        text: "ทายาหม่องที่แผล",
                        isCorrect: false
                    },
                    {
                        text: "ล้างแผลด้วยน้ำเปล่า",
                        isCorrect: true
                    },
                    {
                        text: "ปล่อยทิ้งไว้ให้แห้ง",
                        isCorrect: false
                    }
                ]
            },
            {
                image: "picture/PreTest/q4.png",
                question: "เผลอดมสารเคมี ทำยังไงดี ?",
                options: [
                    {
                        text: "อยู่ที่เดิม แต่ใส่หน้ากากอนามัย",
                        isCorrect: false
                    },
                    {
                        text: "จุดประทัดไล่สารเคมี",
                        isCorrect: false
                    },
                    {
                        text: "นอน",
                        isCorrect: false
                    },
                    {
                        text: "รีบออกมาพื้นที่ที่อากาศถ่ายเท",
                        isCorrect: true
                    }
                ]
            },
            {
                image: "picture/PreTest/q5.png",
                question: "เรียกรถพยาบาล ต้องติดต่อสายด่วนอะไร ?",
                options: [
                    {
                        text: "1150",
                        isCorrect: false
                    },
                    {
                        text: "1669",
                        isCorrect: true
                    },
                    {
                        text: "1234",
                        isCorrect: false
                    },
                    {
                        text: "1193",
                        isCorrect: false
                    }
                ]
            },
            {
                image: "picture/PreTest/q6.png",
                question: "XXXX ?",
                options: [
                    {
                        text: "X",
                        isCorrect: false
                    },
                    {
                        text: "XX",
                        isCorrect: false
                    },
                    {
                        text: "XXX",
                        isCorrect: true
                    },
                    {
                        text: "XXXX",
                        isCorrect: false
                    }
                ]
            },
            {
                image: "picture/PreTest/q7.png",
                question: "XXXX ?",
                options: [
                    {
                        text: "X",
                        isCorrect: true
                    },
                    {
                        text: "XX",
                        isCorrect: false
                    },
                    {
                        text: "XXX",
                        isCorrect: false
                    },
                    {
                        text: "XXXX",
                        isCorrect: false
                    }
                ]
            },
            {
                image: "picture/PreTest/q8.png",
                question: "XXXX ?",
                options: [
                    {
                        text: "X",
                        isCorrect: false
                    },
                    {
                        text: "XX",
                        isCorrect: true
                    },
                    {
                        text: "XXX",
                        isCorrect: false
                    },
                    {
                        text: "XXXX",
                        isCorrect: false
                    }
                ]
            },
            {
                image: "picture/PreTest/q9.png",
                question: "XXXX ?",
                options: [
                    {
                        text: "X",
                        isCorrect: false
                    },
                    {
                        text: "XX",
                        isCorrect: false
                    },
                    {
                        text: "XXX",
                        isCorrect: false
                    },
                    {
                        text: "XXXX",
                        isCorrect: true
                    }
                ]
            },
            {
                image: "picture/PreTest/q10.png",
                question: "XXXX ?",
                options: [
                    {
                        text: "X",
                        isCorrect: true
                    },
                    {
                        text: "XX",
                        isCorrect: false
                    },
                    {
                        text: "XXX",
                        isCorrect: false
                    },
                    {
                        text: "XXXX",
                        isCorrect: false
                    }
                ]
            },
            // เพิ่มคำถามอื่นๆ ตามต้องการ
        ];
        this.currentQuestion = 0;
        this.score = 0;
    }

    showInitialDialog() {
        const overlay = document.createElement('div');
        overlay.className = 'pretest-overlay';
        overlay.innerHTML = `
            <div class="dialog-content">
                <h2>แบบทดสอบก่อนเรียน (Pre-Test)</h2>
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