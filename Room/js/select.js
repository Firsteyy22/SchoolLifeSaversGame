document.addEventListener("DOMContentLoaded", () => {
    const prev = document.querySelector(".prev i");
    const next = document.querySelector(".next i");
    const confirmBtn = document.querySelector("#confirm");
    const levelHeadText = document.querySelector(".level-head-text");

    let cardOrder = ["level1-button", "level2-button", "level3-button", "level4-button"];
    const totalLevels = 4;

   // 🗺️ URL สำหรับแต่ละด่าน
    const levelUrls = {
        "level1-button": "/Room/html/room1.html",
        "level2-button": "/Room/html/room2.html",
        "level3-button": "/Room/html/room3.html",
        "level4-button": "/Room/html/room4.html"
    };

    // 🏷️ ชื่อด่านแบบใช้ชื่อ const เดียวกันกับ levelUrls
    const levelNames = {
        "level1-button": "ด่านที่ 1: ห้องฉุกเฉิน 1",
        "level2-button": "ด่านที่ 2: ห้องฉุกเฉิน 2",
        "level3-button": "ด่านที่ 3: ห้องฉุกเฉิน 3",
        "level4-button": "ด่านที่ 4: ห้องฉุกเฉิน 4"
    };

    // 🖼️ URL รูปภาพสำหรับแต่ละสถานะ (locked, unlocked, pass)
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
        },
        pass: {
            "level1-button": "/picture/roompng/pass/Emergency1_pass.png",
            "level2-button": "/picture/roompng/pass/Emergency2_pass.png",
            "level3-button": "/picture/roompng/pass/Emergency3_pass.png",
            "level4-button": "/picture/roompng/pass/Emergency4_pass.png"
        }
    };
    // 🔄 อัปเดตชื่อด่านตามการ์ดตำแหน่งแรก
    function updateLevelName() {
        const selectedId = cardOrder[0]; // การ์ดแรกคือการ์ดที่เลือก
        levelHeadText.textContent = levelNames[selectedId] ?? "ไม่ทราบชื่อด่าน";
    }


    // 🔄 อัปเดตตำแหน่งการ์ดและชื่อด่าน
    function updateCardPositions() {
        document.querySelectorAll(".card").forEach(card => {
            card.classList.remove("position1", "position2", "position3", "position4", "selected");
        });

        cardOrder.forEach((id, index) => {
            const card = document.getElementById(id);
            if (card) {
                card.classList.add(`position${index + 1}`);
                if (index === 0) card.classList.add("selected"); // ตำแหน่งแรกคือการ์ดที่ถูกเลือก
            }
        });

        updateLevelName(); // ✅ อัปเดตชื่อด่านหลังจากจัดตำแหน่ง
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

    function removeSwalAutoClasses() {
        setTimeout(() => {
            document.body.classList.remove("swal2-shown", "swal2-height-auto");
            document.documentElement.classList.remove("swal2-shown", "swal2-height-auto");
        }, 10); // ลดเวลาเป็น 10ms เพื่อลดการกระพริบ
    }
    
    confirmBtn.addEventListener("click", () => {
        let selectedCard = document.querySelector(".card.selected");
    
        if (selectedCard) {
            let selectedId = selectedCard.id;
            let targetURL = levelUrls[selectedId];
    
            if (selectedCard.classList.contains("locked")) {
                Swal.fire({
                    title: "ห้องถูกล็อก!",
                    text: "คุณต้องปลดล็อกด่านก่อนหน้าก่อน",
                    icon: "warning",
                    confirmButtonText: "เข้าใจแล้ว",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    backdrop: false,
                    heightAuto: false,
                    didOpen: removeSwalAutoClasses,
                    customClass: {
                        popup: 'swal-bounce', // ใช้ class ที่กำหนดแอนิเมชัน
                        container: 'no-auto-container'
                    },
                    showClass: {
                        popup: 'animate__animated animate__bounceIn' // ✅ เอฟเฟกต์เด้งเข้า
                    },
                    hideClass: {
                        popup: 'animate__animated animate__bounceOut' // ✅ เอฟเฟกต์จางลงและเลื่อนลง
                    }
                });
            } else {
                Swal.fire({
                    title: "เข้าไปในห้องนี้?",
                    text: "คุณต้องการเข้าไปในห้องนี้ใช่หรือไม่?",
                    icon: "question",
                    showCancelButton: true,
                    confirmButtonText: "ใช่",
                    cancelButtonText: "ไม่",
                    allowOutsideClick: false,
                    allowEscapeKey: false,
                    backdrop: false,
                    heightAuto: false,
                    didOpen: removeSwalAutoClasses,
                    customClass: {
                        confirmButton: 'swal2-confirm', // ✅ ใช้ CSS สำหรับปุ่ม "ใช่!"
                        cancelButton: 'swal2-cancel',
                        popup: 'swal-bounce',
                        container: 'no-auto-container',
                        title: 'swal-custom-title',
                        htmlContainer: 'swal-custom-text', // ✅ กำหนดคลาสให้ข้อความ

                    },
                    showClass: {
                        popup: 'animate__animated animate__bounceIn' // ✅ เด้งเข้ามา
                    },
                    hideClass: {
                        popup: 'animate__animated animate__bounceOut' // ✅ จางลงตอนปิด
                    }
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
                confirmButtonText: "ตกลง",
                allowOutsideClick: false,
                allowEscapeKey: false,
                backdrop: false,
                heightAuto: false,
                didOpen: removeSwalAutoClasses,
                customClass: {
                    popup: 'swal-bounce',
                    container: 'no-auto-container'
                },
                showClass: {
                    popup: 'animate__animated animate__bounceIn' // ✅ เด้งเข้ามา
                },
                hideClass: {
                    popup: 'animate__animated animate__bounceOut' // ✅ จางลงตอนปิด
                }
            });
        }
    });
    
    function updateUnlockedLevels() {
        for (let i = 1; i <= totalLevels; i++) {
            const levelButton = document.getElementById(`level${i}-button`);
            const levelImage = levelButton?.querySelector("img");
    
            if (levelButton && levelImage) {
                if (sessionStorage.getItem(`level${i}_passed`) === "true") {
                    levelButton.classList.remove("locked", "unlocked");
                    levelButton.classList.add("passed");
                    levelImage.src = levelImages.pass[`level${i}-button`];
                    console.log(`🏆 Level ${i}: PASSED`);

                } else if (i === 1 || sessionStorage.getItem(`level${i}_unlocked`) === "true") {
                    levelButton.classList.remove("locked");
                    levelButton.classList.add("unlocked");
                    levelImage.src = levelImages.unlocked[`level${i}-button`];
                    console.log(`✅ Level ${i}: UNLOCKED`);
                    
                } else {
                    levelButton.classList.add("locked");
                    levelImage.src = levelImages.locked[`level${i}-button`];
                    console.log(`🔒 Level ${i}: LOCKED`);
                }
            }
        }
    }
    

    updateUnlockedLevels();
    updateCardPositions();
});