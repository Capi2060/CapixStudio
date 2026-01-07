/**
 * CAPIXSTUDIO / CAPI DESIGNS - MAIN CONTROLLER
 * 
 * Logic to handle Password Authentication, Session Persistence,
 * and dynamic UI injections (Navigation, Mobile Menu).
 */

const AUTH_CONFIG = {
    PASSWORDS: {
        IDEA: "0!aJkeU8?1.@",
        EMPRESA: "6hJnV!(P-.@"
    },
    PATHS: {
        IDEA: "idea.html",
        EMPRESA: "empresa.html"
    },
    SESSION_KEY: "capix_session_access"
};

// Global State
const state = {
    currentPath: window.location.pathname.split("/").pop() || "index.html"
};

(function init() {
    console.log("CAPIX System Initializing...");

    // Check Session Access on Pages (Security Gate)
    // If not on index.html, verify we have permission to be here
    if (state.currentPath !== "index.html" && state.currentPath !== "") {
        const access = sessionStorage.getItem(AUTH_CONFIG.SESSION_KEY);

        // If unauthorized access attempts
        if (!access) {
            console.warn("Unauthorized access. Redirecting to Portal.");
            window.location.href = "index.html";
            return;
        }

        // If trying to access Idea page with Empresa credentials (or vice versa), redirect?
        // For now, let's keep it simple: access token stores the 'role'.
        if (state.currentPath.includes(AUTH_CONFIG.PATHS.IDEA) && access !== "IDEA") {
            window.location.href = "index.html";
        }
        else if (state.currentPath.includes(AUTH_CONFIG.PATHS.EMPRESA) && access !== "EMPRESA") {
            window.location.href = "index.html";
        }
    }

    // Initialize UI Components
    document.addEventListener("DOMContentLoaded", () => {
        injectNavigation();
        initMobileMenu();
        initSettingsPanel(); // Provided by settings.js (will be imported via script tag)
    });
})();

// === AUTHENTICATION LOGIC (Called from Index HTML) ===
window.attemptLogin = function (mode, passwordInput) {
    const errorMsg = document.getElementById("auth-error");

    if (mode === "IDEA") {
        if (passwordInput === AUTH_CONFIG.PASSWORDS.IDEA) {
            sessionStorage.setItem(AUTH_CONFIG.SESSION_KEY, "IDEA");
            window.location.href = AUTH_CONFIG.PATHS.IDEA;
            return;
        }
    } else if (mode === "EMPRESA") {
        if (passwordInput === AUTH_CONFIG.PASSWORDS.EMPRESA) {
            sessionStorage.setItem(AUTH_CONFIG.SESSION_KEY, "EMPRESA");
            window.location.href = AUTH_CONFIG.PATHS.EMPRESA;
            return;
        }
    }

    // Failed
    if (errorMsg) {
        errorMsg.textContent = "Credenciales inválidas. Acceso denegado.";
        errorMsg.style.display = "block";

        // Shake animation on input
        const inputs = document.querySelectorAll('input[type="password"]');
        inputs.forEach(inp => inp.classList.add('shake'));
        setTimeout(() => inputs.forEach(inp => inp.classList.remove('shake')), 500);
    }
};


// === NAVIGATION LOGIC ===
function injectNavigation() {
    const navContainer = document.getElementById("main-nav");
    if (!navContainer) return;

    // Detect which page we are on to render correct links
    const isIdea = state.currentPath.includes("idea.html");

    let links = [];

    if (isIdea) {
        links = [
            { text: "Concepto", href: "#concept" },
            { text: "Fases", href: "#timeline" },
            { text: "Estructura", href: "#vision" },
            { text: "$$$", href: "#salary" }
        ];
    } else {
        links = [
            { text: "Servicios", href: "#services" },
            { text: "Portfolio", href: "#portfolio" }, // Keep English? User asked for Spanish.
            { text: "Contacto", href: "#contact" }
        ];
    }

    const ul = document.createElement("ul");
    ul.className = "nav-list";

    links.forEach(link => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = link.href;
        a.textContent = link.text;
        a.className = "nav-link";

        // Close mobile menu on click
        a.addEventListener("click", () => {
            document.body.classList.remove("mobile-menu-open");
        });

        li.appendChild(a);
        ul.appendChild(li);
    });

    navContainer.appendChild(ul);
}

// === MOBILE MENU LOGIC ===
function initMobileMenu() {
    // Only fetch if not already existing
    const headerInner = document.querySelector('.header-inner');
    if (!headerInner) return;

    // Create Hamburger
    const burger = document.createElement("button");
    burger.className = "burger-menu-btn";
    burger.ariaLabel = "Abrir menú";
    burger.innerHTML = `<span></span><span></span><span></span>`;

    burger.addEventListener("click", () => {
        document.body.classList.toggle("mobile-menu-open");
    });

    headerInner.appendChild(burger);
}
