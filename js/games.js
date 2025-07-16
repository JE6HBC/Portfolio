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
let currentAnalysisMode = 'waveform';
let currentTestImage = 'smpte';
let analysisScale = 100;
let showGrid = true;
let effectsAnimationId;
let testImageData = null;

window.initEffectsCanvas = function() {
    effectsCanvas = document.getElementById('effectsCanvas');
    if (!effectsCanvas) return;
    
    effectsCtx = effectsCanvas.getContext('2d');
    effectsCanvas.width = effectsCanvas.offsetWidth;
    effectsCanvas.height = effectsCanvas.offsetHeight;
    generateTestImage();
    drawVideoAnalysis();
};

function generateTestImage() {
    if (!effectsCtx) return;
    
    const w = effectsCanvas.width;
    const h = effectsCanvas.height;
    
    // Create test image based on current selection
    effectsCtx.clearRect(0, 0, w, h);
    
    switch (currentTestImage) {
        case 'smpte':
            drawSMPTEBars();
            break;
        case 'colorChart':
            drawColorChart();
            break;
        case 'gradient':
            drawGradientTest();
            break;
    }
    
    // Store image data for analysis
    testImageData = effectsCtx.getImageData(0, 0, w, h);
}

function drawVideoAnalysis() {
    if (!effectsCtx) return;
    
    const w = effectsCanvas.width;
    const h = effectsCanvas.height;
    
    effectsCtx.clearRect(0, 0, w, h);
    
    // Draw test image first
    generateTestImage();
    
    // Draw analysis overlay
    switch (currentAnalysisMode) {
        case 'waveform':
            drawWaveform();
            break;
        case 'vectorscope':
            drawVectorscope();
            break;
        case 'histogram':
            drawHistogram();
            break;
        case 'parade':
            drawRGBParade();
            break;
    }

    if (showGrid) {
        drawAnalysisGrid();
    }
    
    effectsAnimationId = requestAnimationFrame(drawVideoAnalysis);
}

function drawWaveform() {
    if (!testImageData) return;
    
    const w = effectsCanvas.width;
    const h = effectsCanvas.height;
    const data = testImageData.data;
    
    // Create waveform display
    effectsCtx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    effectsCtx.fillRect(0, h * 0.7, w, h * 0.3);
    
    effectsCtx.strokeStyle = '#00ff00';
    effectsCtx.lineWidth = 1;
    effectsCtx.beginPath();
    
    const waveformHeight = h * 0.3;
    const waveformY = h * 0.7;
    
    for (let x = 0; x < w; x++) {
        let totalLuma = 0;
        let pixelCount = 0;
        
        // Sample vertical line of pixels
        for (let y = 0; y < h * 0.7; y++) {
            const pixelIndex = (y * w + x) * 4;
            const r = data[pixelIndex];
            const g = data[pixelIndex + 1];
            const b = data[pixelIndex + 2];
            
            // Calculate luminance (ITU-R BT.709)
            const luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;
            totalLuma += luma;
            pixelCount++;
        }
        
        const avgLuma = totalLuma / pixelCount;
        const waveformValue = waveformY + waveformHeight - (avgLuma / 255) * waveformHeight;
        
        if (x === 0) {
            effectsCtx.moveTo(x, waveformValue);
        } else {
            effectsCtx.lineTo(x, waveformValue);
        }
    }
    
    effectsCtx.stroke();
    
    // Draw reference lines
    effectsCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    effectsCtx.lineWidth = 1;
    
    // 100% white line
    effectsCtx.beginPath();
    effectsCtx.moveTo(0, waveformY);
    effectsCtx.lineTo(w, waveformY);
    effectsCtx.stroke();
    
    // 0% black line
    effectsCtx.beginPath();
    effectsCtx.moveTo(0, waveformY + waveformHeight);
    effectsCtx.lineTo(w, waveformY + waveformHeight);
    effectsCtx.stroke();
}

function drawVectorscope() {
    if (!testImageData) return;
    
    const w = effectsCanvas.width;
    const h = effectsCanvas.height;
    const data = testImageData.data;
    
    // Draw vectorscope background
    const centerX = w * 0.8;
    const centerY = h * 0.8;
    const radius = Math.min(w, h) * 0.15;
    
    effectsCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    effectsCtx.beginPath();
    effectsCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    effectsCtx.fill();
    
    // Draw vectorscope grid
    effectsCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    effectsCtx.lineWidth = 1;
    
    // Concentric circles
    for (let r = radius * 0.25; r <= radius; r += radius * 0.25) {
        effectsCtx.beginPath();
        effectsCtx.arc(centerX, centerY, r, 0, Math.PI * 2);
        effectsCtx.stroke();
    }
    
    // Cross lines
    effectsCtx.beginPath();
    effectsCtx.moveTo(centerX - radius, centerY);
    effectsCtx.lineTo(centerX + radius, centerY);
    effectsCtx.moveTo(centerX, centerY - radius);
    effectsCtx.lineTo(centerX, centerY + radius);
    effectsCtx.stroke();
    
    // Sample pixels and plot on vectorscope
    effectsCtx.fillStyle = 'rgba(0, 255, 0, 0.1)';
    
    for (let i = 0; i < data.length; i += 16) { // Sample every 4th pixel
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        // Convert RGB to U/V (chroma components)
        const u = -0.147 * r - 0.289 * g + 0.436 * b;
        const v = 0.615 * r - 0.515 * g - 0.100 * b;
        
        const x = centerX + (u / 128) * radius * 0.8;
        const y = centerY - (v / 128) * radius * 0.8;
        
        effectsCtx.beginPath();
        effectsCtx.arc(x, y, 1, 0, Math.PI * 2);
        effectsCtx.fill();
    }
}

function drawHistogram() {
    if (!testImageData) return;
    
    const w = effectsCanvas.width;
    const h = effectsCanvas.height;
    const data = testImageData.data;
    
    // Calculate histograms
    const rHist = new Array(256).fill(0);
    const gHist = new Array(256).fill(0);
    const bHist = new Array(256).fill(0);
    
    for (let i = 0; i < data.length; i += 4) {
        rHist[data[i]]++;
        gHist[data[i + 1]]++;
        bHist[data[i + 2]]++;
    }
    
    // Find max value for scaling
    const maxVal = Math.max(...rHist, ...gHist, ...bHist);
    
    // Draw histogram background
    const histY = h * 0.7;
    const histHeight = h * 0.3;
    
    effectsCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    effectsCtx.fillRect(0, histY, w, histHeight);
    
    // Draw histograms
    const barWidth = w / 256;
    
    for (let i = 0; i < 256; i++) {
        const x = i * barWidth;
        
        // Red histogram
        const rHeight = (rHist[i] / maxVal) * histHeight;
        effectsCtx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        effectsCtx.fillRect(x, histY + histHeight - rHeight, barWidth, rHeight);
        
        // Green histogram
        const gHeight = (gHist[i] / maxVal) * histHeight;
        effectsCtx.fillStyle = 'rgba(0, 255, 0, 0.5)';
        effectsCtx.fillRect(x, histY + histHeight - gHeight, barWidth, gHeight);
        
        // Blue histogram
        const bHeight = (bHist[i] / maxVal) * histHeight;
        effectsCtx.fillStyle = 'rgba(0, 0, 255, 0.5)';
        effectsCtx.fillRect(x, histY + histHeight - bHeight, barWidth, bHeight);
    }
}

function drawRGBParade() {
    if (!testImageData) return;
    
    const w = effectsCanvas.width;
    const h = effectsCanvas.height;
    const data = testImageData.data;
    
    // Draw parade background
    const paradeY = h * 0.7;
    const paradeHeight = h * 0.3;
    const channelWidth = w / 3;
    
    effectsCtx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    effectsCtx.fillRect(0, paradeY, w, paradeHeight);
    
    // Draw RGB channels separately
    const channels = ['red', 'green', 'blue'];
    
    channels.forEach((channel, channelIndex) => {
        const startX = channelIndex * channelWidth;
        
        effectsCtx.strokeStyle = channel === 'red' ? '#ff0000' : 
                                channel === 'green' ? '#00ff00' : '#0000ff';
        effectsCtx.lineWidth = 1;
        effectsCtx.beginPath();
        
        for (let x = 0; x < channelWidth; x++) {
            const sourceX = Math.floor((x / channelWidth) * w);
            let totalValue = 0;
            let pixelCount = 0;
            
            // Sample vertical line
            for (let y = 0; y < h * 0.7; y++) {
                const pixelIndex = (y * w + sourceX) * 4;
                const value = data[pixelIndex + channelIndex]; // R, G, or B
                totalValue += value;
                pixelCount++;
            }
            
            const avgValue = totalValue / pixelCount;
            const paradeValue = paradeY + paradeHeight - (avgValue / 255) * paradeHeight;
            
            if (x === 0) {
                effectsCtx.moveTo(startX + x, paradeValue);
            } else {
                effectsCtx.lineTo(startX + x, paradeValue);
            }
        }
        
        effectsCtx.stroke();
        
        // Draw channel separator
        if (channelIndex < 2) {
            effectsCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            effectsCtx.beginPath();
            effectsCtx.moveTo(startX + channelWidth, paradeY);
            effectsCtx.lineTo(startX + channelWidth, paradeY + paradeHeight);
            effectsCtx.stroke();
        }
    });
}

function drawAnalysisGrid() {
    const w = effectsCanvas.width;
    const h = effectsCanvas.height;
    
    effectsCtx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
    effectsCtx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x < w; x += w / 10) {
        effectsCtx.beginPath();
        effectsCtx.moveTo(x, 0);
        effectsCtx.lineTo(x, h);
        effectsCtx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < h; y += h / 10) {
        effectsCtx.beginPath();
        effectsCtx.moveTo(0, y);
        effectsCtx.lineTo(w, y);
        effectsCtx.stroke();
    }
}

function drawSMPTEBars() {
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
        effectsCtx.fillRect(i * barWidth, 0, barWidth, h * 0.6);
    }
    
    // Bottom section - Pluge and tone bars
    const bottomY = h * 0.6;
    const bottomHeight = h * 0.1;
    
    // Black level variations
    const blackLevels = ['#000000', '#0A0A0A', '#141414', '#1E1E1E'];
    const blackBarWidth = w / 4;
    
    for (let i = 0; i < 4; i++) {
        effectsCtx.fillStyle = blackLevels[i];
        effectsCtx.fillRect(i * blackBarWidth, bottomY, blackBarWidth, bottomHeight);
    }
}

function drawColorChart() {
    const w = effectsCanvas.width;
    const h = effectsCanvas.height * 0.6;
    
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
            const x = col * patchW;
            const y = row * patchH;
            
            effectsCtx.fillRect(x, y, patchW, patchH);
            
            // Add border
            effectsCtx.strokeStyle = '#FFFFFF';
            effectsCtx.lineWidth = 1;
            effectsCtx.strokeRect(x, y, patchW, patchH);
        }
    }
}

function drawGradientTest() {
    const w = effectsCanvas.width;
    const h = effectsCanvas.height * 0.6;
    
    // Horizontal gradient
    const gradient = effectsCtx.createLinearGradient(0, 0, w, 0);
    gradient.addColorStop(0, '#000000');
    gradient.addColorStop(0.5, '#808080');
    gradient.addColorStop(1, '#ffffff');
    
    effectsCtx.fillStyle = gradient;
    effectsCtx.fillRect(0, 0, w, h / 3);
    
    // Color gradients
    const colorGradients = [
        ['#ff0000', '#000000'], // Red to black
        ['#00ff00', '#000000'], // Green to black
        ['#0000ff', '#000000']  // Blue to black
    ];
    
    colorGradients.forEach((colors, index) => {
        const colorGrad = effectsCtx.createLinearGradient(0, 0, w, 0);
        colorGrad.addColorStop(0, colors[0]);
        colorGrad.addColorStop(1, colors[1]);
        
        effectsCtx.fillStyle = colorGrad;
        effectsCtx.fillRect(0, (h / 3) * (index + 1), w, h / 3);
    });
}

window.showAnalysisMode = function(mode) {
    currentAnalysisMode = mode;
};

window.loadTestImage = function(image) {
    currentTestImage = image;
};

window.updateAnalysisScale = function(value) {
    analysisScale = value;
    const scaleDisplay = document.getElementById('scaleValue');
    if (scaleDisplay) {
        scaleDisplay.textContent = value + '%';
    }
};

window.toggleGrid = function() {
    showGrid = !showGrid;
};
    
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