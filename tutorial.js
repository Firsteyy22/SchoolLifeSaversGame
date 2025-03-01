document.addEventListener("DOMContentLoaded", function () {
    const tutorialButton = document.getElementById("tutorialButton");

    if (localStorage.getItem("pretestCompleted") === "true") {
        tutorialButton.style.display = "block";
        
        // เช็คว่าเป็นการเข้าครั้งแรกหรือไม่
        if (localStorage.getItem("isFirstVisit") === "true") {
            localStorage.setItem("isFirstVisit", "false"); // ลบสถานะครั้งแรก
            setTimeout(() => {
                showTutorialOverlay();
            }, 500); // หน่วงเวลาเล็กน้อยเพื่อให้แน่ใจว่าโหลดทุกอย่างเรียบร้อย
        }
    }

    tutorialButton.addEventListener("click", function (event) {
        event.preventDefault();
        showTutorialOverlay();
    });
});

function showTutorialOverlay() {
    const overlay = document.createElement("div");
    overlay.className = "tutorial-overlay";
    overlay.innerHTML = `
        <div class="tutorial-box">
            <h1>วิธีการเล่น</h1>
            <h4>เรียนรู้รูปแบบการเล่นเกม</h4>
            <div class="tutorial-container">
                <img id="tutorialImage" src="picture/tutorialIMG/1.png" alt="Tutorial Image">
            </div>
            <div class="nav-buttons">
                <button id="prevButton">&#9668;</button>
                <button id="nextButton">&#9658;</button>
            </div>
            <a class="close-button" onclick="closeTutorialOverlay()">ปิด</a>
        </div>
    `;
    document.body.appendChild(overlay);
    setupTutorialNavigation();
}

function closeTutorialOverlay() {
    document.querySelector(".tutorial-overlay").remove();
}

function setupTutorialNavigation() {
    const images = [
        "picture/tutorialIMG/1.png",
        "picture/tutorialIMG/2.png",
        "picture/tutorialIMG/3.png",
        "picture/tutorialIMG/4.png",
        "picture/tutorialIMG/5.png",
        "picture/tutorialIMG/6.png",
        "picture/tutorialIMG/7.png",
        "picture/tutorialIMG/8.png",
        "picture/tutorialIMG/9.png",
        "picture/tutorialIMG/10.png",
        "picture/tutorialIMG/11.png",
        "picture/tutorialIMG/12.png",
    ];
    let currentIndex = 0;
    const tutorialImage = document.getElementById("tutorialImage");
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");

    prevButton.addEventListener("click", function () {
        if (currentIndex > 0) {
            currentIndex--;
            tutorialImage.src = images[currentIndex];
        }
    });

    nextButton.addEventListener("click", function () {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            tutorialImage.src = images[currentIndex];
        }
    });
}

//POP UP ในหน้าเล่น

// แบบที่ 2
document.addEventListener("DOMContentLoaded", function () {
    const guideButton = document.querySelector(".guide2"); // Check if the button exists

    if (guideButton) {
        // Function to show the popup
        function showGuidePopup() {
            Swal.fire({
                title: "วิธีการเล่น",
                html: `<h3>เลือกคำตอบที่ถูกต้องมากกว่า 1 คำตอบ</h3> 
                       <img id="tutorial-image" src="" 
                            style="display:none; width:100%; max-width: 500px; height:auto; margin-top: 15px;">`,
                confirmButtonText: "เข้าใจแล้ว",
                allowOutsideClick: false,
                allowEscapeKey: false,
                backdrop: true,
                heightAuto: false,
                customClass: {
                    popup: 'large-popup',  // Set custom popup class
                    container: 'no-auto-container'
                },
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                },
                didOpen: () => {
                    setTimeout(() => {
                        const img = document.getElementById('tutorial-image');
                        img.src = '/picture/tutorialIMG/gameplay2.png';
                        img.style.display = 'block';
                    }, 0); // Display image immediately
                }
            });
        }

        // Show popup automatically when the page loads (only if the button exists)
        showGuidePopup();

        // Allow the user to click the button to open the popup again
        guideButton.addEventListener("click", showGuidePopup);
    }
});


document.addEventListener("DOMContentLoaded", function () {
    const guideButton = document.querySelector(".guide3"); // Check if the button exists

    if (guideButton) {
        // Function to show the popup
        function showGuidePopup() {
            Swal.fire({
                title: "วิธีการเล่น",
                html: `<h2 style="font-size: 24px; margin-bottom: 10px;">เรียงคำตอบ ให้เป็นลำดับขั้นตอน</h2> 
                       <img id="tutorial-image" src="" 
                            style="display:none; width:100%; max-width: 500px; height:auto; margin-top: 15px;">`,
                confirmButtonText: "เข้าใจแล้ว",
                allowOutsideClick: false,
                allowEscapeKey: false,
                backdrop: true,
                heightAuto: false,
                customClass: {
                    popup: 'large-popup',  // Custom class to make the popup bigger
                    container: 'no-auto-container'
                },
                showClass: {
                    popup: 'animate__animated animate__bounceIn'
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut'
                },
                didOpen: () => {
                    setTimeout(() => {
                        const img = document.getElementById('tutorial-image');
                        img.src = '/picture/tutorialIMG/gameplay3.png';
                        img.style.display = 'block';
                    }, 0); // Display image immediately
                }
            });
        }

        // Show popup automatically when the page loads (only if the button exists)
        showGuidePopup();

        // Allow user to click the button to open the popup again
        guideButton.addEventListener("click", showGuidePopup);
    }
});
