document.addEventListener("DOMContentLoaded", function () {
    const totalLevels = 19; 

    for (let i = 1; i <= totalLevels; i++) {
        const levelButton = document.getElementById(`level${i}-button`);
        const levelCompleted = sessionStorage.getItem(`level${i}`) === "true";
        const levelUnlocked = i === 1 || sessionStorage.getItem(`level${i}_unlocked`) === "true";

        if (levelUnlocked) {
            levelButton.classList.remove("locked");
            levelButton.removeAttribute("onclick");
        } else {
            levelButton.classList.add("locked");
            levelButton.setAttribute("onclick", `alert('คุณต้องผ่าน Level ${i - 1} ก่อน!'); return false;`);
        }
    }
});
