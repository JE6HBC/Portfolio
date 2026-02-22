// Studio Monitor Clock Logic
// Designed for Forethumb LLC Portfolio

let clockInterval;

function initClock() {
    updateClock();
    // Update frequently to ensure seconds flip accurately, though 1000ms is standard.
    // Using 500ms ensures we don't miss a second flip by much if drift occurs.
    clockInterval = setInterval(updateClock, 500);
}

function updateClock() {
    const now = new Date();

    // Time Format: HH:MM:SS
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    const timeString = `${hours}:${minutes}:${seconds}`;

    // Date Format: YYYY-MM-DD
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    // Update DOM
    const timeElement = document.getElementById('clock-time');
    const dateElement = document.getElementById('clock-date');

    if (timeElement) timeElement.textContent = timeString;
    if (dateElement) dateElement.textContent = dateString;

    // Tally Light Blink
    const tallyLight = document.getElementById('tally-light');
    if (tallyLight) {
        // Blink logic: ON for 500ms, OFF for 500ms
        // We use milliseconds to determine state
        const ms = now.getMilliseconds();
        const isOn = ms < 500;

        tallyLight.style.opacity = isOn ? '1' : '0.3';
        tallyLight.style.boxShadow = isOn ? '0 0 15px #ef4444' : 'none';
    }
}

function toggleClockFullscreen() {
    const container = document.getElementById('studio-clock-container');
    if (!container) return;

    if (!document.fullscreenElement) {
        if (container.requestFullscreen) {
            container.requestFullscreen();
        } else if (container.webkitRequestFullscreen) { /* Safari */
            container.webkitRequestFullscreen();
        } else if (container.msRequestFullscreen) { /* IE11 */
            container.msRequestFullscreen();
        }
        container.classList.add('is-fullscreen');
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) { /* Safari */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) { /* IE11 */
            document.msExitFullscreen();
        }
        container.classList.remove('is-fullscreen');
    }
}

// Listen for fullscreen change events to update class if exited via ESC key
document.addEventListener('fullscreenchange', handleFullscreenChange);
document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
document.addEventListener('mozfullscreenchange', handleFullscreenChange);
document.addEventListener('MSFullscreenChange', handleFullscreenChange);

function handleFullscreenChange() {
    const container = document.getElementById('studio-clock-container');
    if (!container) return;

    // Check if we are currently in fullscreen mode
    const isFullscreen = document.fullscreenElement ||
                         document.webkitIsFullScreen ||
                         document.mozFullScreen ||
                         document.msFullscreenElement;

    if (isFullscreen) {
        container.classList.add('is-fullscreen');
    } else {
        container.classList.remove('is-fullscreen');
    }
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', initClock);
