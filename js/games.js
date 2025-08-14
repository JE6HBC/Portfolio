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
let circuitGrid = {};
const GRID_SIZE = 40;
const COMPONENT_WIDTH = 60;
const COMPONENT_HEIGHT = 20;

window.initCircuitCanvas = function() {
    circuitCanvas = document.getElementById('circuitCanvas');
    if (!circuitCanvas) return;
    
    circuitCtx = circuitCanvas.getContext('2d');
    circuitCanvas.width = circuitCanvas.offsetWidth;
    circuitCanvas.height = circuitCanvas.offsetHeight;
    
    // Initialize grid tracking
    circuitGrid = {};
    components = [];
    
    drawCircuit();
};

// Helper function to get grid position
function getGridPos(x, y) {
    return {
        x: Math.floor(x / GRID_SIZE) * GRID_SIZE + GRID_SIZE / 2,
        y: Math.floor(y / GRID_SIZE) * GRID_SIZE + GRID_SIZE / 2
    };
}

// Check if position is occupied
function isPositionOccupied(gridX, gridY) {
    const key = `${gridX}_${gridY}`;
    return circuitGrid[key] !== undefined;
}

// Find next available position
function findRandomPosition() {
    const cols = Math.floor(circuitCanvas.width / GRID_SIZE);
    const rows = Math.floor(circuitCanvas.height / GRID_SIZE);
    const availablePositions = [];
    
    // Find all available positions
    for (let row = 1; row < rows - 1; row++) {
        for (let col = 1; col < cols - 1; col++) {
            const x = col * GRID_SIZE + GRID_SIZE / 2;
            const y = row * GRID_SIZE + GRID_SIZE / 2;
            
            if (!isPositionOccupied(x, y)) {
                availablePositions.push({ x, y });
            }
        }
    }
    
    // Return random position from available ones
    if (availablePositions.length > 0) {
        const randomIndex = Math.floor(Math.random() * availablePositions.length);
        return availablePositions[randomIndex];
    }
    
    return null; // Grid is full
}

// Check if line intersects with any component or other lines
function lineIntersectsComponent(x1, y1, x2, y2, excludeComponents = []) {
    // Check intersection with components
    for (const component of components) {
        if (excludeComponents.includes(component)) continue;
        
        const compLeft = component.x - COMPONENT_WIDTH/2;
        const compRight = component.x + COMPONENT_WIDTH/2;
        const compTop = component.y - COMPONENT_HEIGHT/2;
        const compBottom = component.y + COMPONENT_HEIGHT/2;
        
        // Check if line passes through component bounds
        if (lineIntersectsRect(x1, y1, x2, y2, compLeft, compTop, compRight, compBottom)) {
            return true;
        }
    }
    return false;
}

// Line-rectangle intersection test
function lineIntersectsRect(x1, y1, x2, y2, rectLeft, rectTop, rectRight, rectBottom) {
    // Simple line-rectangle intersection test
    // Check if either endpoint is inside rectangle
    if ((x1 >= rectLeft && x1 <= rectRight && y1 >= rectTop && y1 <= rectBottom) ||
        (x2 >= rectLeft && x2 <= rectRight && y2 >= rectTop && y2 <= rectBottom)) {
        return true;
    }
    
    // Check if line crosses rectangle edges
    return (
        lineIntersectsLine(x1, y1, x2, y2, rectLeft, rectTop, rectRight, rectTop) ||    // Top edge
        lineIntersectsLine(x1, y1, x2, y2, rectRight, rectTop, rectRight, rectBottom) || // Right edge
        lineIntersectsLine(x1, y1, x2, y2, rectRight, rectBottom, rectLeft, rectBottom) || // Bottom edge
        lineIntersectsLine(x1, y1, x2, y2, rectLeft, rectBottom, rectLeft, rectTop)      // Left edge
    );
}

// Line-line intersection test
function lineIntersectsLine(x1, y1, x2, y2, x3, y3, x4, y4) {
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);
    if (Math.abs(denom) < 0.0001) return false; // Lines are parallel
    
    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;
    
    return t >= 0 && t <= 1 && u >= 0 && u <= 1;
}

// Add smart connection lines that avoid intersections
function drawConnections() {
    circuitCtx.strokeStyle = '#38bdf8';
    circuitCtx.lineWidth = 2;
    const drawnConnections = []; // Track drawn connections to avoid duplicates
    
    components.forEach((component, index) => {
        // Find nearby components to connect (within reasonable distance)
        components.forEach((otherComponent, otherIndex) => {
            if (index !== otherIndex) {
                const dx = Math.abs(component.x - otherComponent.x);
                const dy = Math.abs(component.y - otherComponent.y);
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Connect if components are close enough (within 2-3 grid units)
                if (distance <= GRID_SIZE * 2.5 && distance > 0) {
                    const connectionKey = `${Math.min(index, otherIndex)}-${Math.max(index, otherIndex)}`;
                    if (drawnConnections.includes(connectionKey)) return;
                    
                    // Check for intersections with other components
                    if (!lineIntersectsComponent(component.x, component.y, otherComponent.x, otherComponent.y, [component, otherComponent])) {
                        drawConnection(component, otherComponent);
                        drawnConnections.push(connectionKey);
                    }
                }
            }
        });
    });
}

// Draw connection between two components
function drawConnection(comp1, comp2) {
    circuitCtx.strokeStyle = '#38bdf8';
    circuitCtx.lineWidth = 2;
    circuitCtx.beginPath();
    
    const dx = comp2.x - comp1.x;
    const dy = comp2.y - comp1.y;
    
    // Determine connection points based on relative positions
    let startX, startY, endX, endY;
    
    if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal connection
        if (dx > 0) {
            // comp1 is left of comp2
            startX = comp1.x + COMPONENT_WIDTH/2;
            startY = comp1.y;
            endX = comp2.x - COMPONENT_WIDTH/2;
            endY = comp2.y;
        } else {
            // comp1 is right of comp2
            startX = comp1.x - COMPONENT_WIDTH/2;
            startY = comp1.y;
            endX = comp2.x + COMPONENT_WIDTH/2;
            endY = comp2.y;
        }
    } else {
        // Vertical connection
        if (dy > 0) {
            // comp1 is above comp2
            startX = comp1.x;
            startY = comp1.y + COMPONENT_HEIGHT/2;
            endX = comp2.x;
            endY = comp2.y - COMPONENT_HEIGHT/2;
        } else {
            // comp1 is below comp2
            startX = comp1.x;
            startY = comp1.y - COMPONENT_HEIGHT/2;
            endX = comp2.x;
            endY = comp2.y + COMPONENT_HEIGHT/2;
        }
    }
    
    // Draw L-shaped connection for non-aligned components
    if (Math.abs(dx) > GRID_SIZE/2 && Math.abs(dy) > GRID_SIZE/2) {
        const midX = startX + dx/2;
        circuitCtx.moveTo(startX, startY);
        circuitCtx.lineTo(midX, startY);
        circuitCtx.lineTo(midX, endY);
        circuitCtx.lineTo(endX, endY);
    } else {
        // Direct connection for aligned components
        circuitCtx.moveTo(startX, startY);
        circuitCtx.lineTo(endX, endY);
    }
    
    circuitCtx.stroke();
}

function drawCircuit() {
    if (!circuitCtx) return;
    
    circuitCtx.clearRect(0, 0, circuitCanvas.width, circuitCanvas.height);
    
    // Draw grid points
    circuitCtx.fillStyle = '#334155';
    circuitCtx.lineWidth = 1;
    
    for (let x = GRID_SIZE / 2; x < circuitCanvas.width; x += GRID_SIZE) {
        for (let y = GRID_SIZE / 2; y < circuitCanvas.height; y += GRID_SIZE) {
            circuitCtx.beginPath();
            circuitCtx.arc(x, y, 1, 0, Math.PI * 2);
            circuitCtx.fill();
        }
    }
    
    // Draw connections first (behind components)
    drawConnections();

    // Draw components
    components.forEach(component => {
        circuitCtx.strokeStyle = '#38bdf8';
        circuitCtx.lineWidth = 3;
        
        // Draw component symbols
        circuitCtx.lineWidth = 3;
        circuitCtx.strokeStyle = '#38bdf8';
        
        const centerX = component.x;
        const centerY = component.y;
        
        switch (component.type) {
            case 'resistor':
                // Draw resistor zigzag pattern
                circuitCtx.beginPath();
                const zigzagWidth = COMPONENT_WIDTH * 0.6;
                const zigzagHeight = 8;
                const segments = 6;
                const segmentWidth = zigzagWidth / segments;
                
                circuitCtx.moveTo(centerX - zigzagWidth/2, centerY);
                for (let i = 0; i < segments; i++) {
                    const x = centerX - zigzagWidth/2 + (i + 0.5) * segmentWidth;
                    const y = centerY + (i % 2 ? -zigzagHeight : zigzagHeight);
                    circuitCtx.lineTo(x, y);
                }
                circuitCtx.lineTo(centerX + zigzagWidth/2, centerY);
                circuitCtx.stroke();
                
                // Component label
                circuitCtx.fillStyle = '#38bdf8';
                circuitCtx.font = 'bold 12px monospace';
                circuitCtx.textAlign = 'center';
                circuitCtx.fillText('R', centerX, centerY + 18);
                break;
                
            case 'capacitor':
                // Draw capacitor plates
                const plateGap = 4;
                const plateHeight = COMPONENT_HEIGHT * 0.6;
                
                circuitCtx.beginPath();
                // Left plate
                circuitCtx.moveTo(centerX - plateGap/2, centerY - plateHeight/2);
                circuitCtx.lineTo(centerX - plateGap/2, centerY + plateHeight/2);
                // Right plate
                circuitCtx.moveTo(centerX + plateGap/2, centerY - plateHeight/2);
                circuitCtx.lineTo(centerX + plateGap/2, centerY + plateHeight/2);
                // Connection lines
                circuitCtx.moveTo(centerX - COMPONENT_WIDTH/2, centerY);
                circuitCtx.lineTo(centerX - plateGap/2, centerY);
                circuitCtx.moveTo(centerX + plateGap/2, centerY);
                circuitCtx.lineTo(centerX + COMPONENT_WIDTH/2, centerY);
                circuitCtx.stroke();
                
                // Component label
                circuitCtx.fillStyle = '#38bdf8';
                circuitCtx.font = 'bold 12px monospace';
                circuitCtx.textAlign = 'center';
                circuitCtx.fillText('C', centerX, centerY + 18);
                break;
                
            case 'inductor':
                // Draw inductor coil pattern
                const coilRadius = 6;
                const coils = 4;
                const coilSpacing = (COMPONENT_WIDTH * 0.6) / coils;
                
                circuitCtx.beginPath();
                circuitCtx.moveTo(centerX - COMPONENT_WIDTH/2, centerY);
                
                for (let i = 0; i < coils; i++) {
                    const startX = centerX - COMPONENT_WIDTH/2 + i * coilSpacing + coilSpacing/2;
                    const endX = startX + coilSpacing;
                    
                    // Draw half circle (coil)
                    circuitCtx.arc(startX, centerY, coilRadius/2, Math.PI, 0, false);
                }
                
                circuitCtx.lineTo(centerX + COMPONENT_WIDTH/2, centerY);
                circuitCtx.stroke();
                
                // Component label
                circuitCtx.fillStyle = '#38bdf8';
                circuitCtx.font = 'bold 12px monospace';
                circuitCtx.textAlign = 'center';
                circuitCtx.fillText('L', centerX, centerY + 18);
                break;
        }
    });
}

window.addComponent = function(type) {
    if (!circuitCanvas) return;
    
    const position = findRandomPosition();
    if (!position) {
        // Grid is full, show message
        circuitCtx.fillStyle = '#ef4444';
        circuitCtx.font = '16px sans-serif';
        circuitCtx.textAlign = 'center';
        circuitCtx.fillText('回路が満杯です！クリアしてください', circuitCanvas.width/2, 30);
        setTimeout(() => drawCircuit(), 2000);
        return;
    }
    
    const component = {
        type: type,
        x: position.x,
        y: position.y,
        id: components.length
    };
    
    components.push(component);
    circuitGrid[`${position.x}_${position.y}`] = component;
    
    drawCircuit();
    
    // Show success message briefly
    setTimeout(() => {
        circuitCtx.fillStyle = '#10b981';
        circuitCtx.font = '12px sans-serif';
        circuitCtx.textAlign = 'center';
        circuitCtx.fillText(`${getComponentName(type)}を追加しました`, circuitCanvas.width/2, 30);
    }, 100);
    
    setTimeout(() => drawCircuit(), 1500);
};

function getComponentName(type) {
    const names = {
        'resistor': '抵抗',
        'capacitor': 'コンデンサ',
        'inductor': 'インダクタ'
    };
    return names[type] || type;
}

window.clearCircuit = function() {
    components = [];
    circuitGrid = {};
    if (circuitCanvas) {
        drawCircuit();
        
        // Show clear message
        setTimeout(() => {
            circuitCtx.fillStyle = '#6b7280';
            circuitCtx.font = '14px sans-serif';
            circuitCtx.textAlign = 'center';
            circuitCtx.fillText('回路をクリアしました', circuitCanvas.width/2, circuitCanvas.height/2);
        }, 100);
        
        setTimeout(() => drawCircuit(), 1500);
    }
};

// Add roundRect method if not available
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function(x, y, width, height, radius) {
        this.beginPath();
        this.moveTo(x + radius, y);
        this.lineTo(x + width - radius, y);
        this.arcTo(x + width, y, x + width, y + radius, radius);
        this.lineTo(x + width, y + height - radius);
        this.arcTo(x + width, y + height, x + width - radius, y + height, radius);
        this.lineTo(x + radius, y + height);
        this.arcTo(x, y + height, x, y + height - radius, radius);
        this.lineTo(x, y + radius);
        this.arcTo(x, y, x + radius, y, radius);
        this.closePath();
    };
}

// Visual Effects Playground
let effectsCanvas, effectsCtx;
let currentEffect = 'none';
let currentPattern = 'none';
let effectIntensity = 50;
let effectsAnimationId;
let effectTime = 0;

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
    
    effectTime += 0.016; // ~60fps timing
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
            applyGlitchEffect(intensity, effectTime);
            break;
        case 'chromatic':
            applyChromaticEffect(intensity, effectTime);
            break;
        case 'noise':
            applyNoiseEffect(intensity, effectTime);
            break;
        case 'scan':
            applyScanLinesEffect(intensity, effectTime);
            break;
        case 'wave':
            applyWaveEffect(intensity, effectTime);
            break;
        case 'rgb':
            applyRGBSplitEffect(intensity, effectTime);
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
    
    // Professional Video Color Chart for Waveform Analysis
    // Based on industry standards for camera calibration and video evaluation
    const colors = [
        // Row 1: Primary Colors (100% saturation for vectorscope calibration)
        '#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF',
        // Row 2: Skin Tones (Critical for flesh tone evaluation)
        '#FFDBAC', '#F1C27D', '#E0AC69', '#C68642', '#8D5524', '#654321',
        // Row 3: Standard Reference Colors (For color accuracy testing)
        '#8F3F3F', '#2E8B57', '#4682B4', '#DAA520', '#9932CC', '#DC143C',
        // Row 4: Grayscale Steps (For luminance and gamma evaluation)
        '#FFFFFF', '#E0E0E0', '#C0C0C0', '#808080', '#404040', '#000000'
    ];
    
    const cols = 6;
    const rows = 4;
    const patchW = w / cols;
    const patchH = h / rows;
    
    // Draw color patches
    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const colorIndex = row * cols + col;
            effectsCtx.fillStyle = colors[colorIndex];
            
            const x = col * patchW;
            const y = row * patchH;
            
            // Fill the color patch
            effectsCtx.fillRect(x, y, patchW, patchH);
            
            // Add subtle border for patch separation
            effectsCtx.strokeStyle = '#333333';
            effectsCtx.lineWidth = 1;
            effectsCtx.strokeRect(x, y, patchW, patchH);
            
            // Add IRE value indicators for grayscale patches (bottom row)
            if (row === 3) {
                const ireValues = ['100', '80', '60', '40', '20', '0'];
                effectsCtx.fillStyle = col < 3 ? '#000000' : '#FFFFFF';
                effectsCtx.font = '12px monospace';
                effectsCtx.textAlign = 'center';
                effectsCtx.fillText(ireValues[col] + ' IRE', x + patchW/2, y + patchH/2 + 4);
            }
        }
    }
    
    // Add center cross for alignment reference
    effectsCtx.strokeStyle = '#FFFFFF';
    effectsCtx.lineWidth = 2;
    effectsCtx.setLineDash([5, 5]);
    effectsCtx.beginPath();
    effectsCtx.moveTo(w/2 - 20, h/2);
    effectsCtx.lineTo(w/2 + 20, h/2);
    effectsCtx.moveTo(w/2, h/2 - 20);
    effectsCtx.lineTo(w/2, h/2 + 20);
    effectsCtx.stroke();
    effectsCtx.setLineDash([]);
    
    // Add corner registration marks
    const markSize = 10;
    effectsCtx.strokeStyle = '#FFFFFF';
    effectsCtx.lineWidth = 2;
    
    // Top-left
    effectsCtx.beginPath();
    effectsCtx.moveTo(markSize, markSize);
    effectsCtx.lineTo(markSize * 2, markSize);
    effectsCtx.moveTo(markSize, markSize);
    effectsCtx.lineTo(markSize, markSize * 2);
    effectsCtx.stroke();
    
    // Top-right
    effectsCtx.beginPath();
    effectsCtx.moveTo(w - markSize, markSize);
    effectsCtx.lineTo(w - markSize * 2, markSize);
    effectsCtx.moveTo(w - markSize, markSize);
    effectsCtx.lineTo(w - markSize, markSize * 2);
    effectsCtx.stroke();
    
    // Bottom-left
    effectsCtx.beginPath();
    effectsCtx.moveTo(markSize, h - markSize);
    effectsCtx.lineTo(markSize * 2, h - markSize);
    effectsCtx.moveTo(markSize, h - markSize);
    effectsCtx.lineTo(markSize, h - markSize * 2);
    effectsCtx.stroke();
    
    // Bottom-right
    effectsCtx.beginPath();
    effectsCtx.moveTo(w - markSize, h - markSize);
    effectsCtx.lineTo(w - markSize * 2, h - markSize);
    effectsCtx.moveTo(w - markSize, h - markSize);
    effectsCtx.lineTo(w - markSize, h - markSize * 2);
    effectsCtx.stroke();
    
    // Add title
    effectsCtx.fillStyle = '#FFFFFF';
    effectsCtx.font = 'bold 14px monospace';
    effectsCtx.textAlign = 'center';
    effectsCtx.fillText('VIDEO COLOR CHART - WAVEFORM ANALYSIS', w/2, 20);
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
    
    // Update button states
    updateButtonStates();

function applyGlitchEffect(intensity, time) {
    const imageData = effectsCtx.getImageData(0, 0, effectsCanvas.width, effectsCanvas.height);
    const data = imageData.data;
    
    // Dynamic glitch frequency based on time and intensity
    const glitchFreq = intensity * 0.1 + Math.sin(time * 2) * intensity * 0.05;
    
    for (let i = 0; i < data.length; i += 4) {
        if (Math.random() < glitchFreq) {
            const glitchIntensity = intensity * (0.5 + Math.sin(time * 5) * 0.5);
            data[i] = Math.random() * 255 * glitchIntensity;     // Red
            data[i + 1] = Math.random() * 255 * glitchIntensity; // Green
            data[i + 2] = Math.random() * 255 * glitchIntensity; // Blue
        }
    }
    
    // Add horizontal displacement lines
    if (Math.random() < intensity * 0.3) {
        const y = Math.floor(Math.random() * effectsCanvas.height);
        const displacement = Math.sin(time * 10) * intensity * 20;
        const lineHeight = Math.floor(intensity * 10) + 1;
        
        const lineData = effectsCtx.getImageData(0, y, effectsCanvas.width, lineHeight);
        effectsCtx.putImageData(lineData, displacement, y);
    }
    
    effectsCtx.putImageData(imageData, 0, 0);
}

function applyChromaticEffect(intensity, time) {
    const offsetX = Math.sin(time * 3) * intensity * 10;
    const offsetY = Math.cos(time * 2) * intensity * 5;
    
    effectsCtx.globalCompositeOperation = 'screen';
    
    // Red channel
    effectsCtx.fillStyle = `rgba(255, 0, 0, ${intensity * 0.4})`;
    effectsCtx.fillRect(offsetX, offsetY, effectsCanvas.width, effectsCanvas.height);
    
    // Green channel (stationary)
    effectsCtx.fillStyle = `rgba(0, 255, 0, ${intensity * 0.2})`;
    effectsCtx.fillRect(0, 0, effectsCanvas.width, effectsCanvas.height);
    
    // Blue channel
    effectsCtx.fillStyle = `rgba(0, 0, 255, ${intensity * 0.4})`;
    effectsCtx.fillRect(-offsetX, -offsetY, effectsCanvas.width, effectsCanvas.height);
    
    effectsCtx.globalCompositeOperation = 'source-over';
}

function applyNoiseEffect(intensity, time) {
    const imageData = effectsCtx.getImageData(0, 0, effectsCanvas.width, effectsCanvas.height);
    const data = imageData.data;
    
    const noiseIntensity = intensity * (0.5 + Math.sin(time * 4) * 0.5) * 100;
    
    for (let i = 0; i < data.length; i += 4) {
        const noise = (Math.random() - 0.5) * noiseIntensity;
        data[i] += noise;     // Red
        data[i + 1] += noise; // Green
        data[i + 2] += noise; // Blue
    }
    
    effectsCtx.putImageData(imageData, 0, 0);
}

function applyScanLinesEffect(intensity, time) {
    const alpha = intensity * 0.5 * (0.7 + Math.sin(time * 6) * 0.3);
    effectsCtx.strokeStyle = `rgba(0, 0, 0, ${alpha})`;
    effectsCtx.lineWidth = 1;
    
    const offset = Math.sin(time * 2) * 2;
    for (let y = 0; y < effectsCanvas.height; y += 4) {
        effectsCtx.beginPath();
        effectsCtx.moveTo(0, y + offset);
        effectsCtx.lineTo(effectsCanvas.width, y + offset);
        effectsCtx.stroke();
    }
    
    // Add moving highlight line
    const highlightY = (Math.sin(time) + 1) / 2 * effectsCanvas.height;
    effectsCtx.strokeStyle = `rgba(56, 189, 248, ${intensity * 0.8})`;
    effectsCtx.lineWidth = 2;
    effectsCtx.beginPath();
    effectsCtx.moveTo(0, highlightY);
    effectsCtx.lineTo(effectsCanvas.width, highlightY);
    effectsCtx.stroke();
}

// New wave effect
function applyWaveEffect(intensity, time) {
    const imageData = effectsCtx.getImageData(0, 0, effectsCanvas.width, effectsCanvas.height);
    const newImageData = effectsCtx.createImageData(effectsCanvas.width, effectsCanvas.height);
    
    const waveAmplitude = intensity * 20;
    const waveFrequency = 0.02;
    
    for (let y = 0; y < effectsCanvas.height; y++) {
        for (let x = 0; x < effectsCanvas.width; x++) {
            const offset = Math.sin((y + time * 50) * waveFrequency) * waveAmplitude;
            const sourceX = Math.floor(x + offset);
            
            if (sourceX >= 0 && sourceX < effectsCanvas.width) {
                const destIndex = (y * effectsCanvas.width + x) * 4;
                const srcIndex = (y * effectsCanvas.width + sourceX) * 4;
                
                newImageData.data[destIndex] = imageData.data[srcIndex];
                newImageData.data[destIndex + 1] = imageData.data[srcIndex + 1];
                newImageData.data[destIndex + 2] = imageData.data[srcIndex + 2];
                newImageData.data[destIndex + 3] = imageData.data[srcIndex + 3];
            }
        }
    }
    
    effectsCtx.putImageData(newImageData, 0, 0);
}

// New RGB split effect
function applyRGBSplitEffect(intensity, time) {
    const canvas = effectsCtx.canvas;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    // Copy current frame
    tempCtx.drawImage(canvas, 0, 0);
    
    // Clear main canvas
    effectsCtx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Dynamic offsets
    const offsetR = Math.sin(time * 3) * intensity * 15;
    const offsetG = Math.cos(time * 2.5) * intensity * 12;
    const offsetB = Math.sin(time * 4) * intensity * 18;
    
    // Draw RGB channels with different blend modes
    effectsCtx.globalCompositeOperation = 'screen';
    
    // Red channel
    effectsCtx.globalAlpha = intensity;
    effectsCtx.filter = 'sepia(1) saturate(2) hue-rotate(0deg)';
    effectsCtx.drawImage(tempCanvas, offsetR, 0);
    
    // Green channel
    effectsCtx.filter = 'sepia(1) saturate(2) hue-rotate(120deg)';
    effectsCtx.drawImage(tempCanvas, offsetG, 0);
    
    // Blue channel
    effectsCtx.filter = 'sepia(1) saturate(2) hue-rotate(240deg)';
    effectsCtx.drawImage(tempCanvas, offsetB, 0);
    
    // Reset
    effectsCtx.filter = 'none';
    effectsCtx.globalAlpha = 1;
    effectsCtx.globalCompositeOperation = 'source-over';
}

window.applyEffect = function(effect) {
    currentEffect = effect;
    effectTime = 0; // Reset time for new effect
    currentPattern = 'none'; // Reset pattern when applying effect
    
    // Update button states
    updateButtonStates();
};

window.resetEffects = function() {
    currentEffect = 'none';
    effectTime = 0;
    
    // Update button states
    updateButtonStates();
    currentPattern = 'none';
};

window.updateEffectIntensity = function(value) {
    effectIntensity = value;
    effectIntensity = parseInt(value); // Ensure it's a number
    const intensityDisplay = document.getElementById('intensityValue');
    if (intensityDisplay) {
        intensityDisplay.textContent = value + '%';
    }
};
function updateButtonStates() {
    // Remove active class from all buttons
    document.querySelectorAll('.effect-button, .test-pattern-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Add active class to current effect/pattern
    if (currentEffect !== 'none') {
        const effectButtons = document.querySelectorAll('.effect-button');
        effectButtons.forEach(btn => {
            const onclick = btn.getAttribute('onclick');
            if (onclick && onclick.includes(`'${currentEffect}'`)) {
                btn.classList.add('active');
            }
        });
    }
}

    
    // Update intensity display visibility
    const intensityContainer = document.querySelector('.flex.flex-col.sm\\:flex-row.items-start.sm\\:items-center.gap-4.mb-4');
    if (intensityContainer) {
        if (currentEffect === 'none' || currentPattern !== 'none') {
            intensityContainer.style.opacity = '0.5';
            intensityContainer.style.pointerEvents = 'none';
        } else {
            intensityContainer.style.opacity = '1';
            intensityContainer.style.pointerEvents = 'auto';
        }
    }