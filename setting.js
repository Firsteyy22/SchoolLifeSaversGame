document.addEventListener("DOMContentLoaded", () => {
    const bgMusicToggle = document.getElementById("bg-music-toggle");
    const bgMusicVolume = document.getElementById("bg-music-volume");
    const sfxToggle = document.getElementById("sfx-toggle");
    const sfxVolume = document.getElementById("sfx-volume");
    const resetButton = document.getElementById("reset-button");

    // โหลดค่าการตั้งค่าเริ่มต้น
    if (window.audioManager) {
        const settings = window.audioManager.settings;
        bgMusicToggle.checked = settings.bgMusicEnabled;
        bgMusicVolume.value = settings.bgMusicVolume; // ใช้ค่าที่บันทึกไว้
        sfxToggle.checked = settings.sfxEnabled;
        sfxVolume.value = settings.sfxVolume; // ใช้ค่าที่บันทึกไว้
    }

    // อัปเดตการตั้งค่าเมื่อเปลี่ยนแปลง
    bgMusicToggle.addEventListener("change", () => {
        window.audioManager.saveSettings({ bgMusicEnabled: bgMusicToggle.checked });
        if (bgMusicToggle.checked) {
            window.audioManager.playBGM();
        } else {
            window.audioManager.pauseBGM();
        }
    });

    bgMusicVolume.addEventListener("input", () => {
        window.audioManager.saveSettings({ bgMusicVolume: parseInt(bgMusicVolume.value, 10) });
        window.audioManager.applySettings(); // ใช้ค่าที่อัปเดตกับ audio
    });

    sfxToggle.addEventListener("change", () => {
        const isEnabled = sfxToggle.checked;
        window.audioManager.saveSettings({ sfxEnabled: isEnabled });
        if (!isEnabled) {
            // หยุดเสียง SFX ถ้า toggle ถูกปิด
            window.audioManager.stopSFX();
        }
    });

    sfxVolume.addEventListener("input", () => {
        window.audioManager.saveSettings({ sfxVolume: parseInt(sfxVolume.value, 10) });
        window.audioManager.applySettings(); // ใช้ค่าที่อัปเดตกับ audio
    });

    // คืนค่าเริ่มต้น
    resetButton.addEventListener("click", () => {
        const defaultSettings = {
            bgMusicEnabled: true,
            bgMusicVolume: 50,
            sfxEnabled: true,
            sfxVolume: 50,
        };

        window.audioManager.saveSettings(defaultSettings);

        bgMusicToggle.checked = defaultSettings.bgMusicEnabled;
        bgMusicVolume.value = defaultSettings.bgMusicVolume;
        sfxToggle.checked = defaultSettings.sfxEnabled;
        sfxVolume.value = defaultSettings.sfxVolume;

        // รีเซ็ตค่าของ audioManager
        window.audioManager.applySettings();
        alert("Settings have been reset to default!");
    });
});
