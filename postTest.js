class PostTestManager {
    constructor() {
        this.allquestions = [
            {
                image: "picture/PostTest/q1.png",
                question: "การปฐมพยาบาล คืออะไร?",
                options: [
                    { text: "การป้องกันการเกิดอันตราย", isCorrect: false },
                    { text: "การรักษาโดยแพทย์", isCorrect: false },
                    { text: "การช่วยเหลือผู้เจ็บป่วยเบื้องต้น", isCorrect: true },
                    { text: "การรักษาต่อเนื่องหลังพบแพทย์", isCorrect: false }
                ],
                chapter: {
                    number: 0,
                    title: "ความรู้เบื้องต้นเกี่ยวกับการปฐมพยาบาล",
                    level: 0
                }
            },
            {
                image: "picture/PostTest/q2.png",
                question: "ถ้าเกิดอาการฟกช้ำ จะต้องทำอย่างไร?",
                options: [
                    { text: "ควรประคบเย็นก่อน", isCorrect: true },
                    { text: "ควรประคบร้อนก่อน", isCorrect: false },
                    { text: "ไม่ควรทำอะไร ปล่อยทิ้งไว้", isCorrect: false },
                    { text: "ควรประคบร้อนสลับเย็นไปมา", isCorrect: false }
                ],
                chapter: {
                    number: 1,
                    title: "ฟกช้ำ",
                    level: 3
                }
            },
            {
                image: "picture/PostTest/q3.png",
                question: "เรียกรถพยาบาล ต้องติดต่อสายด่วนอะไร?",
                options: [
                    { text: "1150", isCorrect: false},
                    { text: "1669", isCorrect: true},
                    { text: "1234", isCorrect: false},
                    { text: "1193", isCorrect: false}
                ],
                chapter: {
                    number: 3,
                    title: "ตะขาบกัด",
                    level: 11
                }
            },
            {
                image: "picture/PostTest/q4.png",
                question: "ควรเช็ดแอลกอฮอล์ลงบนแผลตรง ๆ หรือไม่?",
                options: [
                    { text: "ควร เพราะแอลกอฮอล์ทำความสะอาดแผลได้ดีที่สุด", isCorrect: false },
                    { text: "ควร เพราะแอลกอฮอล์ทำให้แผลหายเร็วขึ้น", isCorrect: false },
                    { text: "ไม่ควร เพราะจะทำให้แสบแผลมาก", isCorrect: true },
                    { text: "ไม่ควร เพราะแอลกอฮอล์ทำให้แผลอักแสบมากขึ้น", isCorrect: false }
                ],
                chapter: {
                    number: 1,
                    title: "แผลถลอก",
                    level: 1
                }
            },
            {
                image: "picture/PostTest/q5.png",
                question: "การห้ามเลือดควรทำอย่างไร?",
                options: [
                    { text: "ใช้ผ้าสะอาดกดบริเวณแผล", isCorrect: true},
                    { text: "ใช้มือกดแผลโดยตรง", isCorrect: false},
                    { text: "ใช้เชือกรัดเหนือหรือใต้แผล", isCorrect: false},
                    { text: "ล้างน้ำสะอาดจนกว่าเลือดจะหยุดไหล", isCorrect: false}
                ],
                chapter: {
                    number: 1,
                    title: "มีดบาด",
                    level: 2
                }
            },
            {
                image: "picture/PostTest/q6.png",
                question: "ข้อใดคือสิ่งที่ไม่ควรทำหากกระดูกหัก?",
                options: [
                    { text: "ขยับให้กระดูกเข้าที่", isCorrect: true},
                    { text: "ลดการเคลื่อนไหวให้ได้มากที่สุด", isCorrect: false},
                    { text: "ยึดส่วนที่กระดูกหักไว้กับไม้หรือหนังสือที่มีความหนา", isCorrect: false},
                    { text: "รอความช่วยเหลือจากแพทย์หรือผู้เชี่ยวชาญ", isCorrect: false}
                ],
                chapter: {
                    number: 1,
                    title: "กระดูกหัก",
                    level: 4
                }
            },
            {
                image: "picture/PostTest/q7.png",
                question: "แผลไฟไหม้ น้ำร้อนลวกมีกี่ระดับ?",
                options: [
                    { text: "2 ระดับ", isCorrect: false},
                    { text: "3 ระดับ", isCorrect: true},
                    { text: "4 ระดับ", isCorrect: false},
                    { text: "5 ระดับ", isCorrect: false}
                ],
                chapter: {
                    number: 1,
                    title: "ไฟไหม้ น้ำร้อนลวก",
                    level: 5
                }
            },
            {
                image: "picture/PostTest/q8.png",
                question: "ระดับของแผลไฟไหม้ น้ำร้อนลวก <br>ควรใช้อะไรในการจำแนกระดับ?",
                options: [
                    { text: "ความร้อนของน้ำ/ไฟ", isCorrect: false },
                    { text: "ความกว้างของแผล", isCorrect: false },
                    { text: "ชั้นผิวหนังที่ถูกทำลาย", isCorrect: true },
                    { text: "สีของแผล", isCorrect: false }
                ],
                chapter: {
                    number: 1,
                    title: "ไฟไหม้ น้ำร้อนลวก",
                    level: 5
                }
            },
            {
                image: "picture/PostTest/q9.png",
                question: "ข้อใดถูกต้องเกี่ยวกับสารเคมี?",
                options: [
                    { text: "สารเคมีต้องมาจากห้องแลปเท่านั้น", isCorrect: false },
                    { text: "สารเคมีอยู่ในชีวิตประจำวัน เช่น น้ำยาล้างห้องน้ำ", isCorrect: true },
                    { text: "โอกาสในการสัมผัสสารเคมีนั้นเกิดขึ้นได้น้อย", isCorrect: false },
                    { text: "สารเคมีเป็นของเหลวเท่านั้น", isCorrect: false }
                ],
                chapter: {
                    number: 2,
                    title: "สัมผัสสารเคมี",
                    level: 6
                }
            },
            {
                image: "picture/PostTest/q10.png",
                question: "ข้อใดคือสิ่งแรกที่ควรทำเมื่อถูกสารเคมีเข้าตา?",
                options: [
                    { text: "ขยี้ตาด้วยมือ", isCorrect: false },
                    { text: "หลับตา และไม่ลืมตาจนกว่าจะพบแพทย์", isCorrect: false },
                    { text: "พบแพทย์ทันที", isCorrect: false },
                    { text: "ล้างด้วยน้ำสะอาด", isCorrect: true }
                ],
                chapter: {
                    number: 2,
                    title: "สารเคมีเข้าตา",
                    level: 7
                }
            },
            {
                image: "picture/PostTest/q11.png",
                question: "เมื่อสูดดมสารเคมีควรทำอย่างไร?",
                options: [
                    { text: "ออกมาในที่อากาศถ่ายเทให้เร็วที่สุด", isCorrect: true },
                    { text: "กลั้นหายใจ", isCorrect: false },
                    { text: "เปิดพัดลมไล่สารเคมี", isCorrect: false },
                    { text: "หาสิ่งของใกล้ตัวอุดจมูก", isCorrect: false }
                ],
                chapter: {
                    number: 2,
                    title: "สูดดมสารเคมี",
                    level: 8
                }
            },
            {
                image: "picture/PostTest/q12.png",
                question: "ไม่ควรทำอย่างไรหากกินยาผิดชนิด?",
                options: [
                    { text: "สังเกตอาการของตัวเอง", isCorrect: false },
                    { text: "งดน้ำ", isCorrect: false },
                    { text: "งดอาหาร", isCorrect: false },
                    { text: "กินยาอื่นเพื่อยับยั้งยาที่กินผิด", isCorrect: true }
                ],
                chapter: {
                    number: 2,
                    title: "กินยาผิด/กินสารเคมี",
                    level: 9
                }
            },
            {
                image: "picture/PostTest/q13.png",
                question: "ข้อใดคือสิ่งที่ควรทำก่อนพบแพทย์เมื่อถูกงูกัด?",
                options: [
                    { text: "ขยับส่วนที่ถูกกัดให้น้อยที่สุด", isCorrect: true },
                    { text: "ใช้เชือกรัดเหนือบริเวณที่ถูกกัด", isCorrect: false },
                    { text: "ใช้ปากดูดพิษออก", isCorrect: false },
                    { text: "กดแผลเพื่อไล่พิษออก", isCorrect: false }
                ],
                chapter: {
                    number: 3,
                    title: "งูกัด",
                    level: 12
                }
            },
            {
                image: "picture/PostTest/q14.png",
                question: "เมื่อถูกผึ้งต่อย หลังนำเหล็กในออก <br>ควรบีบรอบแผลหรือไม่ เพราะเหตุใด?",
                options: [
                    { text: "ควร เพราะทำให้หายเจ็บแผล", isCorrect: false },
                    { text: "ไม่ควร เพราะจะทำให้แผลบวม", isCorrect: false },
                    { text: "ควร เพราะเป็นการไล่พิษออก", isCorrect: true },
                    { text: "ไม่ควร เพราะจะทำให้พิษแล่นไปสู่ส่วนอื่น", isCorrect: false }
                ],
                chapter: {
                    number: 3,
                    title: "ผึ้งต่อย",
                    level: 10
                }
            },
            {
                image: "picture/PostTest/q15.png",
                question: "ข้อใดถูกต้องเกี่ยวกับการประคบ?",
                options: [
                    { text: "ประคบเย็น ลดอาการบวม", isCorrect: true },
                    { text: "ประคบร้อน ลดอาการบวม", isCorrect: false },
                    { text: "ประคบเย็น ลดอาการช้ำ", isCorrect: false },
                    { text: "ประคบเย็นและประคบร้อนมีผลเหมือนกัน", isCorrect: false }
                ],
                chapter: {
                    number: 1,
                    title: "ฟกช้ำ",
                    level: 3
                }
            },
            {
                image: "picture/PostTest/q16.png",
                question: "เมื่อเลือดกำเดาไหลและได้บีบปลายจมูก <br>ควรหายใจทางใด?",
                options: [
                    { text: "ไม่ควรหายใจ", isCorrect: false},
                    { text: "ทางจมูกและปาก", isCorrect: false},
                    { text: "ทางจมูก", isCorrect: false},
                    { text: "ทางปาก", isCorrect: true}
                ],
                chapter: {
                    number: 4,
                    title: "เลือดกำเดาไหล",
                    level: 14
                }
            },            
            {
                image: "picture/PostTest/q17.png",
                question: "สามารถนวดบริเวณที่เกิดอาการเคล็ดหรือแพลง <br>ได้หรือไม่ เพราะอะไร?",
                options: [
                    { text: "ได้ เพราะการนวดทำให้หายปวด", isCorrect: false },
                    { text: "ไม่ได้ เพราะจะทำให้บวมมากขึ้น", isCorrect: true },
                    { text: "ได้ เพราะทำให้หายจากอาการเคล็ด/แพลงได้", isCorrect: false },
                    { text: "ไม่ได้ เพราะการนวดอาจทำให้กระดูกหัก", isCorrect: false }
                ],
                chapter: {
                    number: 4,
                    title: "เคล็ด/แพลง",
                    level: 15
                }
            },
            {
                image: "picture/PostTest/q18.png",
                question: "หากมีฝุ่นผงติดอยู่ที่ตา สามารถใช้อะไรเขี่ยออกได้?",
                options: [
                    { text: "นิ้วมือ", isCorrect: false },
                    { text: "ไม้จิ้มฟัน", isCorrect: false },
                    { text: "ก้านสำลี", isCorrect: true },
                    { text: "ปลายเล็บ", isCorrect: false }
                ],
                chapter: {
                    number: 4,
                    title: "ฝุ่นเข้าตา",
                    level: 16
                }
            },
            {
                image: "picture/PostTest/q19.png",
                question: "ตะคริว เกิดจากอะไร?",
                options: [
                    { text: "กล้ามเนื้อยืด", isCorrect: false },
                    { text: "อยู่ในท่าเดิมเป็นเวลานาน", isCorrect: false },
                    { text: "ไม่ได้ขยับกล้ามเนื้อ", isCorrect: false },
                    { text: "กล้ามเนื้อหดเกร็ง", isCorrect: true }
                ],
                chapter: {
                    number: 4,
                    title: "ตะคริว",
                    level: 17
                }
            },
            {
                image: "picture/PostTest/q20.png",
                question: "ไม่ควรทำอย่างไรเมื่อเจอคนเป็นลม?",
                options: [
                    { text: "ยืนมุงใกล้ ๆ เผื่อช่วยเหลือได้", isCorrect: true },
                    { text: "ขอความช่วยเหลือจากผู้อื่น", isCorrect: false },
                    { text: "สังเกตการหายใจและชีพจร", isCorrect: false },
                    { text: "คลายเสื้อผ้าเพื่อให้หายใจสะดวก", isCorrect: false }
                ],
                chapter: {
                    number: 4,
                    title: "เป็นลม",
                    level: 18
                }
            },
            {
                image: "picture/PostTest/q21.png",
                question: "การให้ความช่วยเหลือคนเป็นลม หลังจากให้นอนราบแล้วต้องหนุนส่วนใดให้สูงขึ้น?",
                options: [
                    { text: "หัว", isCorrect: false },
                    { text: "ขา", isCorrect: true },
                    { text: "ท้อง", isCorrect: false },
                    { text: "อก", isCorrect: false }
                ],
                chapter: {
                    number: 4,
                    title: "เป็นลม",
                    level: 18
                }
            },
            {
                image: "picture/PostTest/q22.png",
                question: "สิ่งใดทำความสะอาดแผลได้ดีที่สุด?",
                options: [
                    { text: "แอลกอฮอล์", isCorrect: false},
                    { text: "เบตาดีน", isCorrect: false},
                    { text: "น้ำสะอาด", isCorrect: true},
                    { text: "น้ำส้มสายชู", isCorrect: false}
                ]
            },
            {
                image: "picture/PostTest/q23.png",
                question: "หากจะทำการปฐมพยาบาลต้องคำนึงถึงสิ่งใด?",
                options: [
                    { text: "อาการของผู้เจ็บป่วย", isCorrect: false},
                    { text: "ความรู้ ความสามารถในการปฐมพยาบาล", isCorrect: false},
                    { text: "ความปลอดภัยของผู้เจ็บป่วยและผู้ปฐมพยาบาล", isCorrect: false},
                    { text: "ถูกทุกข้อ", isCorrect: true}
                ],
                chapter: {
                    number: 0,
                    title: "ความรู้เบื้องต้นเกี่ยวกับการปฐมพยาบาล",
                    level: 0
                }
            },
            {
                image: "picture/PostTest/q24.png",
                question: "ปฐมพยาบาลเพื่ออะไร?",
                options: [
                    { text: "เพื่อป้องกันการพิการ หรือบาดเจ็บรุนแรง", isCorrect: true },
                    { text: "เพื่อรักษาให้หายจากเจ็บป่วย", isCorrect: false },
                    { text: "เพื่อป้องกันการเกิดอันตราย", isCorrect: false },
                    { text: "เพื่อความสบายใจ", isCorrect: false }
                ]
                ,
                chapter: {
                    number: 0,
                    title: "ความรู้เบื้องต้นเกี่ยวกับการปฐมพยาบาล",
                    level: 0
                }
            },
            {
                image: "picture/PostTest/q25.png",
                question: "หากเจอผู้เจ็บป่วยแต่ไม่มีความรู้ในการปฐมพยาบาล <br>ไม่ควรทำอะไร?",
                options: [
                    { text: "ไม่ยืนมุง", isCorrect: false },
                    { text: "โทรสายด่วนเพื่อแจ้งเหตุ", isCorrect: false },
                    { text: "ขอความช่วยเหลือจากผู้อื่น", isCorrect: false },
                    { text: "ให้ความช่วยเหลือเท่าที่ทำได้", isCorrect: true }
                ]
                ,
                chapter: {
                    number: 0,
                    title: "ความรู้เบื้องต้นเกี่ยวกับการปฐมพยาบาล",
                    level: 0
                }
            }
        ];
        this.questions = this.getRandomQuestions(20); // สุ่มคำถาม
        this.currentQuestion = 0;
        this.score = 0;
        this.timer = null;
        this.timeLeft = 60;

        this.incorrectQuestions = [];
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
            ? `คะแนน POST-TEST ก่อนหน้านี้ของคุณ: ${previousPostTestScore} คะแนน`
            : `คะแนน PRE-TEST ของคุณ: ${previousPreTestScore} คะแนน`;
    
        this.createOverlay(`
            <div class="dialog-content">
                <h2>แบบทดสอบหลังเรียน (POST-TEST)</h2>
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
        
        // ถ้าตอบผิด ให้เก็บข้อมูลคำถามปัจจุบันไว้
        if (!isCorrect && this.questions[this.currentQuestion].chapter) {
            this.incorrectQuestions.push(this.questions[this.currentQuestion]);
        }
        
        if (isCorrect) this.score++;
    
        this.currentQuestion++;
        this.showQuestion(); // ไปคำถามถัดไป
    }

    nextQuestion() {
        // ถ้าหมดเวลา ถือว่าตอบผิด
        if (this.timeLeft <= 0 && this.questions[this.currentQuestion].chapter) {
            this.incorrectQuestions.push(this.questions[this.currentQuestion]);
        }
        
        this.currentQuestion++;
        this.showQuestion();
    }

    startPostTest() {
        document.querySelector('.posttest-overlay').remove();
        this.showQuestion();
    }

    showResults() {
        let message = '';
        let color = '';
        
        if (this.score >= 10) {
            message = 'ยอดเยี่ยมมาก! คุณเป็นผู้เชี่ยวชาญตัวจริง';
            color = '#4CAF50';
        } else {
            message = 'ไม่เป็นไร มาลองทำใหม่อีกครั้งนะ';
            color = '#F44336';
        }
        
        let reviewSection = '';
        if (this.incorrectQuestions.length > 0) {
            reviewSection = `
                <div class="review-box">
                    <h3>เรื่องที่ต้องทบทวน</h3>
                    <div class="review-list">
                        ${this.incorrectQuestions.map((q, index) => `
                            <div class="review-item">
                                <strong>คำถามที่ ${index + 1}:</strong> ${q.question} <br>
                                <em>บทที่ ${q.chapter.number}: ${q.chapter.title} (Level ${q.chapter.level})</em>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }
        
        // ส่วนที่เหลือของโค้ดเดิม...
        
        // Keep the CSS styles
        const styles = `
            <style>
                .results-container {
                    display: flex;
                    gap: 20px;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 20px;
                }
                
                .main-content {
                    flex: 1;
                    min-width: 300px;
                    padding: 20px;
                    background: white;
                    border-radius: 10px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;
                    text-align: center;
                }
                
                .review-box {
                    width: 300px;
                    background: white;
                    border-radius: 10px;
                    padding: 20px;
                    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                }
                
                .review-box h3 {
                    margin-top: 0;
                    padding-bottom: 10px;
                    border-bottom: 2px solid #f0f0f0;
                    color: #333;
                }
                
                .review-list {
                    max-height: 400px;
                    overflow-y: auto;
                    padding-right: 10px;
                }
                
                .review-list::-webkit-scrollbar {
                    width: 6px;
                }
                
                .review-list::-webkit-scrollbar-track {
                    background: #f1f1f1;
                    border-radius: 3px;
                }
                
                .review-list::-webkit-scrollbar-thumb {
                    background: #e74c3c;
                    border-radius: 3px;
                }
                
                .review-item {
                    padding: 12px;
                    margin: 8px 0;
                    background: #f8f9fa;
                    border-radius: 8px;
                    font-size: 14px;
                    line-height: 1.4;
                }
                
                .level-text {
                    color: #666;
                    font-size: 13px;
                }
            </style>
        `;
    
        this.renderContainer(`
            ${styles}
            <div class="results-container">
                <div class="main-content">
                    <h2>ผลการทดสอบหลังเรียน</h2>
                    <h3>คะแนนของคุณ: ${this.score}/${this.questions.length} คะแนน</h3>
                    <h3 style="color: ${color};">${message}</h3>
                    <a class="start-button" onclick="postTestManager.finishPostTest()">
                        เสร็จสิ้น
                    </a>
                </div>
                ${reviewSection}
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
