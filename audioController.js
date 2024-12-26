(() => {
    const audioManager = {
        bgMusic: document.getElementById("bg-music"),
        sfx: document.getElementById("sfx"),
        settings: {},
        isPlayingBGM: false,

        // เริ่มต้นระบบ
        init() {
            const defaultSettings = {
                bgMusicEnabled: true,
                bgMusicVolume: 50, // ค่าเริ่มต้น
                sfxEnabled: true,
                sfxVolume: 50, // ค่าเริ่มต้น
            };

            // โหลดค่าที่เก็บไว้หรือใช้ค่าเริ่มต้น
            this.settings = JSON.parse(localStorage.getItem("settings")) || defaultSettings;

            // ใช้ค่าการตั้งค่าที่โหลดมา
            this.applySettings();

            // ตั้งเวลาเล่น BGM ต่อ (ถ้ามี)
            const savedTime = localStorage.getItem("bgMusicCurrentTime");
            if (savedTime) {
                this.bgMusic.currentTime = parseFloat(savedTime);
            }

            // บันทึกเวลาเล่นปัจจุบัน
            this.bgMusic.addEventListener("timeupdate", () => {
                localStorage.setItem("bgMusicCurrentTime", this.bgMusic.currentTime);
            });
        },

        // เล่น BGM
        async playBGM() {
            if (this.settings.bgMusicEnabled) {
                this.bgMusic.volume = this.settings.bgMusicVolume / 100;
                if (!this.isPlayingBGM) {
                    try {
                        await this.bgMusic.play();
                        this.isPlayingBGM = true;
                    } catch (err) {
                        console.error("Failed to play BGM:", err);
                    }
                }
            }
        },

        // หยุด BGM
        pauseBGM() {
            this.bgMusic.pause();
            this.isPlayingBGM = false;
        },

        // บันทึกค่าการตั้งค่า
        saveSettings(newSettings) {
            this.settings = { ...this.settings, ...newSettings };
            localStorage.setItem("settings", JSON.stringify(this.settings));
            this.applySettings();
        },

        // ใช้ค่าการตั้งค่ากับ audio element และ input
        applySettings() {
            // BGM
            const bgMusicVolumeSlider = document.getElementById("bg-music-volume");
            const bgMusicToggle = document.getElementById("bg-music-toggle");

            if (!this.settings.bgMusicEnabled) {
                this.pauseBGM();
            } else {
                this.playBGM();
            }

            // อัปเดตระดับเสียงใน `input` และ audio
            if (bgMusicVolumeSlider) {
                bgMusicVolumeSlider.value = this.settings.bgMusicVolume; // อัปเดต UI
            }
            this.bgMusic.volume = this.settings.bgMusicVolume / 100;

            // SFX
            const sfxVolumeSlider = document.getElementById("sfx-volume");
            const sfxToggle = document.getElementById("sfx-toggle");

            if (sfxToggle) {
                sfxToggle.checked = this.settings.sfxEnabled;
            }
            if (sfxVolumeSlider) {
                sfxVolumeSlider.value = this.settings.sfxVolume; // อัปเดต UI
            }

            if (!this.settings.sfxEnabled) {
                this.stopSFX(); // ปิด SFX ถ้า toggle ปิดอยู่
            }

            this.sfx.volume = this.settings.sfxVolume / 100;
        },

        // หยุดเสียง SFX
        stopSFX() {
            if (this.sfx) {
                this.sfx.pause();
                this.sfx.currentTime = 0; // รีเซ็ตเสียง
            }
        },
    };

    window.audioManager = audioManager;

    document.addEventListener("DOMContentLoaded", () => {
        audioManager.init();

        const buttons = document.querySelectorAll("a"); // เลือกทุก <a>
        const sfx = document.getElementById("sfx"); // ไฟล์เสียง SFX

        // ตรวจสอบว่า SFX พร้อมเล่น
        if (!sfx) {
            console.error("SFX element not found!");
            return;
        }

        buttons.forEach((button) => {
            button.addEventListener("click", async (event) => {
                event.preventDefault(); // ป้องกัน default behavior ของลิงก์

                if (!audioManager.settings.sfxEnabled) {
                    console.log("SFX is disabled.");
                    // ถ้า SFX ปิด ให้ดำเนินการลิงก์ทันที
                    const href = button.getAttribute("href");
                    if (href) {
                        window.location.href = href;
                    }
                    return;
                }

                try {
                    // รีเซ็ตเสียงก่อนเล่นใหม่
                    sfx.currentTime = 0;

                    // เล่น SFX
                    await sfx.play();

                    console.log("SFX played successfully");

                    // หากปุ่มมี href ให้นำทางหลังเสียงเล่นเสร็จ
                    const href = button.getAttribute("href");
                    if (href) {
                        setTimeout(() => {
                            window.location.href = href;
                        }, 200); // รอ 200ms เพื่อให้เสียงเล่นเสร็จ
                    }
                } catch (error) {
                    console.error("Error playing SFX:", error);

                    // กรณีที่เล่นเสียงไม่ได้ ให้นำทางทันที
                    const href = button.getAttribute("href");
                    if (href) {
                        window.location.href = href;
                    }
                }
            });
        });

        console.log("SFX setup completed for all buttons.");
    });
})();
