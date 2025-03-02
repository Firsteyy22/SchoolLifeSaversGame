document.addEventListener("DOMContentLoaded", () => {
    const bgMusicVolume = document.getElementById("bg-music-volume");
    const sfxVolume = document.getElementById("sfx-volume");
    const resetButton = document.getElementById("reset-button");

    // โหลดค่าการตั้งค่าเริ่มต้น
    if (window.audioManager) {
        const settings = window.audioManager.settings;
        bgMusicVolume.value = settings.bgMusicVolume ?? 0; // ใช้ค่าที่บันทึกไว้
        sfxVolume.value = settings.sfxVolume; // ใช้ค่าที่บันทึกไว้
    }

    bgMusicVolume.addEventListener("input", () => {
        window.audioManager.saveSettings({ bgMusicVolume: parseInt(bgMusicVolume.value, 10) });
        document.getElementById("bg-music").volume = bgMusicVolume.value / 100; // ตั้งค่า volume ให้กับ bg-music
        window.audioManager.applySettings(); // ใช้ค่าที่อัปเดตกับ audio
    });

    sfxVolume.addEventListener("input", () => {
        window.audioManager.saveSettings({ sfxVolume: parseInt(sfxVolume.value, 10) });
        document.getElementById("sfx").volume = sfxVolume.value / 100; // ตั้งค่า volume ให้กับ sfx
        window.audioManager.applySettings(); // ใช้ค่าที่อัปเดตกับ audio
    });
    
    // คืนค่าเริ่มต้น
    resetButton.addEventListener("click", () => {
        const defaultSettings = {
            bgMusicVolume: 50,
            sfxVolume: 50,
        };

        window.audioManager.saveSettings(defaultSettings);

        bgMusicVolume.value = defaultSettings.bgMusicVolume;
        sfxVolume.value = defaultSettings.sfxVolume;

        // รีเซ็ตค่าของ audioManager
        window.audioManager.applySettings();
        alert("Settings have been reset to default!");
    });
});
