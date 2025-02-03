document.addEventListener("DOMContentLoaded", () => {
    const prev = document.querySelector(".prev i");
    const next = document.querySelector(".next i");
    const confirmBtn = document.querySelector("#confirm");

    let cardOrder = ["level1-button", "level2-button", "level3-button", "level4-button"];
    const totalLevels = 4;
    const levelUrls = {
        "level1-button": "/Room/html/room1.html",
        "level2-button": "/Room/html/room2.html",
        "level3-button": "/Room/html/room3.html",
        "level4-button": "/Room/html/room4.html"
    };

    // 📌 กำหนด URL รูปภาพสำหรับแต่ละสถานะ
    const levelImages = {
        unlocked: {
            "level1-button": "/picture/roompng/Emergency1.png",
            "level2-button": "/picture/roompng/Emergency2.png",
            "level3-button": "/picture/roompng/Emergency3.png",
            "level4-button": "/picture/roompng/Emergency4.png"
        },
        locked: {
            "level2-button": "/picture/roompng/Emergency2-locked.png",
            "level3-button": "/picture/roompng/Emergency3-locked.png",
            "level4-button": "/picture/roompng/Emergency4-locked.png"
        }
    };

    function updateCardPositions() {
        document.querySelectorAll(".card").forEach(card => {
            card.classList.remove("position1", "position2", "position3", "position4", "selected");
        });

        cardOrder.forEach((id, index) => {
            let card = document.getElementById(id);
            if (card) {
                card.classList.add(`position${index + 1}`);
                if (index === 0) {
                    card.classList.add("selected");
                }
            }
        });
    }

    function moveCards(direction) {
        if (direction === "next") {
            cardOrder.push(cardOrder.shift());
        } else {
            cardOrder.unshift(cardOrder.pop());
        }
        updateCardPositions();
    }

    prev.addEventListener("click", () => moveCards("prev"));
    next.addEventListener("click", () => moveCards("next"));

    confirmBtn.addEventListener("click", () => {
        let selectedCard = document.querySelector(".card.selected");
        if (selectedCard) {
            let selectedId = selectedCard.id;
            let targetURL = levelUrls[selectedId];

            if (selectedCard.classList.contains("locked")) {
                Swal.fire({
                    title: "ห้องถูกล็อก!",
                    text: "คุณต้องปลดล็อกด่านนี้ก่อน!",
                    icon: "warning",
                    confirmButtonText: "เข้าใจแล้ว"
                });
            } else {
                Swal.fire({
                    title: "เข้าไปในห้องนี้?",
                    text: "คุณต้องการเข้าไปในด่านนี้ใช่หรือไม่?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "ใช่! ไปเลย",
                    cancelButtonText: "ไม่"
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.href = targetURL;
                    }
                });
            }
        } else {
            Swal.fire({
                title: "ยังไม่ได้เลือกด่าน",
                text: "กรุณาเลือกด่านก่อนกดปุ่มยืนยัน",
                icon: "error",
                confirmButtonText: "ตกลง"
            });
        }
    });

    function updateUnlockedLevels() {
        for (let i = 1; i <= totalLevels; i++) {
            let levelButton = document.getElementById(`level${i}-button`);
            let levelImage = levelButton.querySelector("img"); // ค้นหา tag รูปภาพภายใน card

            if (levelButton) {
                if (i === 1 || sessionStorage.getItem(`level${i}_unlocked`) === "true") {
                    levelButton.classList.remove("locked");
                    levelButton.classList.add("unlocked");
                    if (levelImage) {
                        levelImage.src = levelImages.unlocked[`level${i}-button`]; // อัปเดตรูปภาพเป็นด่านปลดล็อก
                    }
                } else {
                    levelButton.classList.add("locked");
                    if (levelImage) {
                        levelImage.src = levelImages.locked[`level${i}-button`]; // อัปเดตรูปภาพเป็นด่านที่ล็อก
                    }
                }
            }
        }
    }

    updateUnlockedLevels();
    updateCardPositions();
});
