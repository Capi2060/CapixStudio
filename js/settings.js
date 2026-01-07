/**
 * SETTINGS CONTROL PANEL
 * Handles Theme (Dark/Light), Language (stub), and Accessibility options.
 */

// Inject the Settings Floating Button and Panel Logic
function initSettingsPanel() {
    // 1. Create Floating Button
    const fab = document.createElement("button");
    fab.className = "settings-fab";
    fab.innerHTML = "⚙️";
    fab.ariaLabel = "Abrir Ajustes y Accesibilidad";
    fab.onclick = toggleSettingsPanel;
    document.body.appendChild(fab);

    // 2. Create Panel
    const panel = document.createElement("div");
    panel.id = "settings-panel";
    panel.className = "settings-panel";
    panel.innerHTML = `
        <div class="panel-header">
            <h3>Ajustes</h3>
            <button onclick="toggleSettingsPanel()" class="close-btn">×</button>
        </div>
        
        <div class="setting-group">
            <label>Apariencia</label>
            <div class="toggle-row">
                <span>Modo Oscuro</span>
                <label class="switch">
                    <input type="checkbox" id="theme-toggle" checked>
                    <span class="slider round"></span>
                </label>
            </div>
        </div>

        <div class="setting-group">
            <label>Accesibilidad</label>
            <div class="toggle-row">
                <span>Reducir Movimiento</span>
                <label class="switch">
                    <input type="checkbox" id="motion-toggle">
                    <span class="slider round"></span>
                </label>
            </div>
            <div class="toggle-row">
                <span>Alto Contraste</span>
                <label class="switch">
                    <input type="checkbox" id="contrast-toggle">
                    <span class="slider round"></span>
                </label>
            </div>
        </div>

        <div class="setting-group">
            <label>Idioma / Language</label>
            <select id="lang-select" style="width: 100%; padding: 8px; border-radius: 4px; background: rgba(0,0,0,0.2); color: inherit; border: 1px solid rgba(255,255,255,0.1);">
                <option value="es">Español (ES)</option>
                <option value="en" disabled>English (Próximamente)</option>
            </select>
        </div>
        
        <div style="margin-top: 2rem; font-size: 0.8rem; color: var(--text-muted); text-align: center;">
            Capix System v1.0.4
        </div>
    `;
    document.body.appendChild(panel);

    // 3. Bind Events
    // Theme
    const themeToggle = document.getElementById("theme-toggle");
    themeToggle.onchange = (e) => {
        document.body.classList.toggle("light-mode", !e.target.checked);
    };

    // Reduced Motion
    const motionToggle = document.getElementById("motion-toggle");
    motionToggle.onchange = (e) => {
        document.body.classList.toggle("reduced-motion", e.target.checked);
    };

    // High Contrast
    const contrastToggle = document.getElementById("contrast-toggle");
    contrastToggle.onchange = (e) => {
        document.body.classList.toggle("high-contrast", e.target.checked);
    };
}

function toggleSettingsPanel() {
    const panel = document.getElementById("settings-panel");
    panel.classList.toggle("open");
}
