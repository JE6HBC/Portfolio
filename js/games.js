// Interactive Games for Yuki Koyama Portfolio
// GitHub Pages Compatible

// Signal Processing Game
let currentWaveform = 'sine';
let signalCanvas, signalCtx;
let signalAnimationId;

window.initSignalCanvas = function() {
    signalCanvas = document.getElementById('signalCanvas');
    if (!signalCanvas) return;
    
    signalCtx = signalCanvas.getContext('2d');
    signalCanvas.width = signalCanvas.offsetWidth;
    signalCanvas.height = signalCanvas.offsetHeight;
    drawSignal();
};

function drawSignal() {
    if (!signalCtx) return;
    
    signalCtx.clearRect(0, 0, signalCanvas.width, signalCanvas.height);
    signalCtx.strokeStyle = '#38bdf8';
    signalCtx.lineWidth = 2;
    signalCtx.beginPath();

    const amplitude = signalCanvas.height / 4;
    const frequency = 0.02;
    const offset = signalCanvas.height / 2;
    const time = Date.now() * 0.001;

    for (let x = 0; x < signalCanvas.width; x++) {
        let y;
        switch (currentWaveform) {
            case 'sine':
                y = Math.sin((x + time * 50) * frequency) * amplitude + offset;
                break;
            case 'square':
                y = (Math.sin((x + time * 50) * frequency) > 0 ? 1 : -1) * amplitude + offset;
                break;
            case 'sawtooth':
                y = (((x + time * 50) * frequency) % (2 * Math.PI) - Math.PI) / Math.PI * amplitude + offset;
                break;
        }
        
        if (x === 0) signalCtx.moveTo(x, y);
        else signalCtx.lineTo(x, y);
    }
    
    signalCtx.stroke();
    signalAnimationId = requestAnimationFrame(drawSignal);
}

window.changeWaveform = function(type) {
    currentWaveform = type;
};

// Circuit Designer Game
let circuitCanvas, circuitCtx;
let components = [];

window.initCircuitCanvas = function() {
    circuitCanvas = document.getElementById('circuitCanvas');
    if (!circuitCanvas) return;
    
    circuitCtx = circuitCanvas.getContext('2d');
    circuitCanvas.width = circuitCanvas.offsetWidth;
    circuitCanvas.height = circuitCanvas.offsetHeight;
    drawCircuit();
};

function drawCircuit() {
    if (!circuitCtx) return;
    
    circuitCtx.clearRect(0, 0, circuitCanvas.width, circuitCanvas.height);
    
    // Draw grid
    circuitCtx.strokeStyle = '#334155';
    circuitCtx.lineWidth = 1;
    for (let x = 0; x < circuitCanvas.width; x += 20) {
        circuitCtx.beginPath();
        circuitCtx.moveTo(x, 0);
        circuitCtx.lineTo(x, circuitCanvas.height);
        circuitCtx.stroke();
    }
    for (let y = 0; y < circuitCanvas.height; y += 20) {
        circuitCtx.beginPath();
        circuitCtx.moveTo(0, y);
        circuitCtx.lineTo(circuitCanvas.width, y);
        circuitCtx.stroke();
    }

    // Draw components
    components.forEach(component => {
        circuitCtx.strokeStyle = '#38bdf8';
        circuitCtx.lineWidth = 3;
        circuitCtx.beginPath();
        
        if (component.type === 'resistor') {
            // Draw resistor zigzag
            circuitCtx.moveTo(component.x, component.y);
            for (let i = 0; i < 6; i++) {
                circuitCtx.lineTo(component.x + i * 8, component.y + (i % 2 ? -10 : 10));
            }
        } else if (component.type === 'capacitor') {
            // Draw capacitor plates
            circuitCtx.moveTo(component.x, component.y - 15);
            circuitCtx.lineTo(component.x, component.y + 15);
            circuitCtx.moveTo(component.x + 10, component.y - 15);
            circuitCtx.lineTo(component.x + 10, component.y + 15);
        }
        
        circuitCtx.stroke();
    });
}

window.addComponent = function(type) {
    if (!circuitCanvas) return;
    
    const x = Math.random() * (circuitCanvas.width - 50) + 25;
    const y = Math.random() * (circuitCanvas.height - 30) + 15;
    components.push({ type, x, y });
    drawCircuit();
};

window.clearCircuit = function() {
    components = [];
    if (circuitCanvas) drawCircuit();
};

// Visual Effects Playground
let effectsCanvas, effectsCtx;
let currentEffect = 'none';
let currentPattern = 'none';
let effectIntensity = 50;
let effectsAnimationId;

window.initEffectsCanvas = function() {
    effectsCanvas = document.getElementById('effectsCanvas');
    if (!effectsCanvas) return;
    
    effectsCtx = effectsCanvas.getContext('2d');
    effectsCanvas.width = effectsCanvas.offsetWidth;
    effectsCanvas.height = effectsCanvas.offsetHeight;
    drawEffects();
};

function drawEffects() {
    if (!effectsCtx) return;
    
    effectsCtx.clearRect(0, 0, effectsCanvas.width, effectsCanvas.height);
    
    // Draw base pattern or test pattern
    if (currentPattern === 'none') {
        // Default gradient background
        const gradient = effectsCtx.createLinearGradient(0, 0, effectsCanvas.width, effectsCanvas.height);
        gradient.addColorStop(0, '#1e40af');
        gradient.addColorStop(0.5, '#7c3aed');
        gradient.addColorStop(1, '#1e40af');
        effectsCtx.fillStyle = gradient;
        effectsCtx.fillRect(0, 0, effectsCanvas.width, effectsCanvas.height);
    } else {
        drawTestPattern();
    }

    // Apply effects
    const intensity = effectIntensity / 100;
    
    switch (currentEffect) {
        case 'glitch':
            applyGlitchEffect(intensity);
            break;
        case 'chromatic':
            applyChromaticEffect(intensity);
            break;
        case 'noise':
            applyNoiseEffect(intensity);
            break;
        case 'scan':
            applyScanLinesEffect(intensity);
            break;
    }
    
    effectsAnimationId = requestAnimationFrame(drawEffects);
}

function drawTestPattern() {
    const time = Date.now() * 0.001;
    
    switch (currentPattern) {
        case 'smpte':
            drawSMPTEBars(time);
            break;
        case 'colorChart':
            drawColorChart(time);
            break;
        case 'grid':
            drawGridPattern(time);
            break;
    }
}

function drawSMPTEBars(time) {
    const w = effectsCanvas.width;
    const h = effectsCanvas.height;
    
    // Top section - Color bars
    const barWidth = w / 7;
    const colors = [
        '#C0C0C0', // White
        '#C0C000', // Yellow
        '#00C0C0', // Cyan
        '#00C000', // Green
        '#C000C0', // Magenta
        '#C00000', // Red
        '#0000C0'  // Blue
    ];
    
    for (let i = 0; i < 7; i++) {
        effectsCtx.fillStyle = colors[i];
        effectsCtx.fillRect(i * barWidth, 0, barWidth, h * 0.7);
    }
    
    // Bottom section - Pluge and tone bars
    const bottomY = h * 0.7;
    const bottomHeight = h * 0.3;
    
    // Black level variations
    const blackLevels = ['#000000', '#0A0A0A', '#141414', '#1E1E1E'];
    const blackBarWidth = w / 4;
    
    for (let i = 0; i < 4; i++) {
        effectsCtx.fillStyle = blackLevels[i];
        effectsCtx.fillRect(i * blackBarWidth, bottomY, blackBarWidth, bottomHeight);
    }
    
    // Moving indicator
    const indicatorX = (Math.sin(time) + 1) / 2 * (w - 20) + 10;
    effectsCtx.fillStyle = '#FF0000';
    effectsCtx.fillRect(indicatorX, bottomY + bottomHeight - 10, 20, 10);
}

function drawColorChart(time) {
    const w = effectsCanvas.width;
    const h = effectsCanvas.height;
    
    // Macbeth ColorChecker inspired pattern
    const colors = [
        // Row 1
        '#735244', '#C29682', '#627A9D', '#576C43', '#8580B1', '#67BDAA',
        // Row 2
        '#D67E2C', '#505BA6', '#C15A63', '#5E3C6C', '#9DD35F', '#EDB120',
        // Row 3
        '#8252A0', '#2D5016', '#A13E52', '#EDD51F', '#C44AA0', '#819FF7',
        // Row 4 (Grayscale)
        '#F3F3F2', '#C8C8C8', '#A0A0A0', '#7A7A79', '#555555', '#343434'
    ];
    
    const cols = 6;
    const rows = 4;
    const patchW = w / cols;
    const patchH = h / rows;
    
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const colorIndex = row * cols + col;
            effectsCtx.fillStyle = colors[colorIndex];
            
            // Add subtle pulsing effect
            const pulse = Math.sin(time + colorIndex * 0.5) * 0.1 + 1;
            const x = col * patchW;
            const y = row * patchH;
            
            effectsCtx.save();
            effectsCtx.translate(x + patchW/2, y + patchH/2);
            effectsCtx.scale(pulse, pulse);
            effectsCtx.fillRect(-patchW/2, -patchH/2, patchW, patchH);
            effectsCtx.restore();
            
            // Add border
            effectsCtx.strokeStyle = '#FFFFFF';
            effectsCtx.lineWidth = 1;
            effectsCtx.strokeRect(x, y, patchW, patchH);
        }
    }
}

function drawGridPattern(time) {
    const w = effectsCanvas.width;
    const h = effectsCanvas.height;
    
    // Background
    effectsCtx.fillStyle = '#000000';
    effectsCtx.fillRect(0, 0, w, h);
    
    // Grid lines
    effectsCtx.strokeStyle = '#FFFFFF';
    effectsCtx.lineWidth = 1;
    
    const gridSize = 20;
    const offset = (time * 10) % gridSize;
    
    // Vertical lines
    for (let x = -offset; x < w + gridSize; x += gridSize) {
        effectsCtx.beginPath();
        effectsCtx.moveTo(x, 0);
        effectsCtx.lineTo(x, h);
        effectsCtx.stroke();
    }
    
    // Horizontal lines
    for (let y = -offset; y < h + gridSize; y += gridSize) {
        effectsCtx.beginPath();
        effectsCtx.moveTo(0, y);
        effectsCtx.lineTo(w, y);
        effectsCtx.stroke();
    }
    
    // Center crosshair
    effectsCtx.strokeStyle = '#FF0000';
    effectsCtx.lineWidth = 2;
    effectsCtx.beginPath();
    effectsCtx.moveTo(w/2 - 20, h/2);
    effectsCtx.lineTo(w/2 + 20, h/2);
    effectsCtx.moveTo(w/2, h/2 - 20);
    effectsCtx.lineTo(w/2, h/2 + 20);
    effectsCtx.stroke();
    
    // Corner markers
    const markerSize = 10;
    effectsCtx.strokeStyle = '#00FF00';
    effectsCtx.lineWidth = 2;
    
    // Top-left
    effectsCtx.strokeRect(markerSize, markerSize, markerSize, markerSize);
    // Top-right
    effectsCtx.strokeRect(w - markerSize * 2, markerSize, markerSize, markerSize);
    // Bottom-left
    effectsCtx.strokeRect(markerSize, h - markerSize * 2, markerSize, markerSize);
    // Bottom-right
    effectsCtx.strokeRect(w - markerSize * 2, h - markerSize * 2, markerSize, markerSize);
}

window.showTestPattern = function(pattern) {
    currentPattern = pattern;
    currentEffect = 'none'; // Reset effects when showing test patterns
};

function applyGlitchEffect(intensity) {
    const imageData = effectsCtx.getImageData(0, 0, effectsCanvas.width, effectsCanvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < intensity * 0.1) {
            data[i] = Math.random() * 255;     // Red
            data[i + 1] = Math.random() * 255; // Green
            data[i + 2] = Math.random() * 255; // Blue
        }
    }
    
    effectsCtx.putImageData(imageData, 0, 0);
}

function applyChromaticEffect(intensity) {
    effectsCtx.globalCompositeOperation = 'screen';
    effectsCtx.fillStyle = `rgba(255, 0, 0, ${intensity * 0.3})`;
    effectsCtx.fillRect(2, 0, effectsCanvas.width, effectsCanvas.height);
    effectsCtx.fillStyle = `rgba(0, 255, 0, ${intensity * 0.3})`;
    effectsCtx.fillRect(-2, 0, effectsCanvas.width, effectsCanvas.height);
    effectsCtx.globalCompositeOperation = 'source-over';
}

function applyNoiseEffect(intensity) {
    const imageData = effectsCtx.getImageData(0, 0, effectsCanvas.width, effectsCanvas.height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * intensity * 100;
        data[i] += noise;     // Red
        data[i + 1] += noise; // Green
        data[i + 2] += noise; // Blue
    }
    
    effectsCtx.putImageData(imageData, 0, 0);
}

function applyScanLinesEffect(intensity) {
    effectsCtx.strokeStyle = `rgba(0, 0, 0, ${intensity * 0.5})`;
    effectsCtx.lineWidth = 1;
    for (let y = 0; y < effectsCanvas.height; y += 4) {
        effectsCtx.beginPath();
        effectsCtx.moveTo(0, y);
        effectsCtx.lineTo(effectsCanvas.width, y);
        effectsCtx.stroke();
    }
}

window.applyEffect = function(effect) {
    currentEffect = effect;
};

window.resetEffects = function() {
    currentEffect = 'none';
};

window.updateEffectIntensity = function(value) {
    effectIntensity = value;
    const intensityDisplay = document.getElementById('intensityValue');
    if (intensityDisplay) {
        intensityDisplay.textContent = value + '%';
    }
}