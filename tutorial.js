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
        "picture/tutorialIMG/11.png"
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