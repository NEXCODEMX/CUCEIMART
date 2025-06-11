const businessesData = [
  {
    id: 1,
    name: "Sabores CUCEI",
    description: "Deliciosas salchipapas, hamburguesas y snacks preparados al momento. Los mejores sabores para estudiantes.",
    category: "comida",
    icon: "fas fa-hamburger",
    price: "Desde $25 MXN",
    url: "sabores-cucei.html",
    image: "img/negocio1.jpg"
  },
  {
    id: 2,
    name: "Papeleria Cucei",
    description: "Servicio de impresiones, copias, engargolados y material escolar. Rápido y económico.",
    category: "servicios",
    icon: "fas fa-print",
    price: "Desde $0.20 MXN",
    url: "copymax-express.html",
    image: "img/negocio2.jpg"
  },
  {
    id: 3,
    name: "Tech CUCEI",
    description: "Ropa casual y playeras personalizadas con diseños únicos para universitarios modernos.",
    category: "ropa",
    icon: "fas fa-tshirt",
    price: "Desde $150 MXN",
    url: "techstyle-cucei.html",
    image: "img/negocio3.jpg"
  },
  {
    id: 4,
    name: "Accesorios",
    description: "Fundas para celular, cables, audífonos y gadgets tecnológicos a precios de estudiante.",
    category: "accesorios",
    icon: "fas fa-mobile-alt",
    price: "Desde $50 MXN",
    url: "accesorios-tech.html",
    image: "img/negocio4.jpg"
  },
  {
    id: 5,
    name: "Cabeza",
    description: "Decoraciones personalizadas para eventos, cumpleaños y celebraciones estudiantiles.",
    category: "decoraciones",
    icon: "fas fa-birthday-cake",
    price: "Desde $100 MXN",
    url: "crea-cucei.html",
    image: "img/negocio5.jpg"
  },
  {
    id: 6,
    name: "Videojuegos",
    description: "Venta y renta de videojuegos, consolas retro y accesorios gaming para estudiantes.",
    category: "videojuegos",
    icon: "fas fa-gamepad",
    price: "Desde $80 MXN",
    url: "gamezone-cucei.html",
    image: "img/negocio6.jpg"
  },
  {
    id: 7,
    name: "Café",
    description: "Café gourmet, bebidas calientes y postres artesanales para energizar tus estudios.",
    category: "comida",
    icon: "fas fa-coffee",
    price: "Desde $30 MXN",
    url: "cafe-ingenio.html",
    image: "img/negocio7.jpg"
  },
  {
    id: 8,
    name: "Reparar PC",
    description: "Reparación de celulares, tablets y computadoras. Diagnóstico gratuito y garantía.",
    category: "servicios",
    icon: "fas fa-tools",
    price: "Desde $150 MXN",
    url: "repair-tech.html",
    image: "img/negocio8.jpg"
  },
  {
    id: 9,
    name: "Estilo Urbano",
    description: "Zapatillas, gorras y accesorios urbanos con las últimas tendencias de moda juvenil.",
    category: "ropa",
    icon: "fas fa-shoe-prints",
    price: "Desde $200 MXN",
    url: "urban-style.html",
    image: "img/negocio9.jpg"
  }
];

let currentBusinesses = [...businessesData];
let currentCategory = 'todos';
let currentSearch = '';

function renderBusinesses(businesses) {
    const grid = document.getElementById('businessesGrid');
    grid.innerHTML = '';
    businesses.forEach(business => {
        const card = document.createElement('div');
        card.className = 'business-card';
        card.onclick = () => window.location.href = business.url;
        card.innerHTML = `
            <div class="business-image">
                <img src="${business.image}" alt="${business.name}" />
            </div>
            <h3 class="business-name">${business.name}</h3>
            <p class="business-description">${business.description}</p>
            <div class="business-category">
                <i class="${business.icon}"></i>
                <span>${business.category.charAt(0).toUpperCase() + business.category.slice(1)}</span>
            </div>
            <div style="font-weight: bold; color: #667eea; margin-bottom: 1rem;">${business.price}</div>
            <button class="business-btn">
                <i class="fas fa-external-link-alt"></i> Ver Negocio
            </button>
        `;
        grid.appendChild(card);
    });

    if (businesses.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: white;">
                <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.7;"></i>
                <h3>No se encontraron resultados</h3>
                <p>Intenta con otros términos de búsqueda o categoría</p>
            </div>
        `;
    }
}

function filterBusinesses() {
    let filtered = businessesData;
    if (currentCategory !== 'todos') {
        filtered = filtered.filter(business => business.category === currentCategory);
    }
    if (currentSearch) {
        filtered = filtered.filter(business => 
            business.name.toLowerCase().includes(currentSearch.toLowerCase()) ||
            business.description.toLowerCase().includes(currentSearch.toLowerCase()) ||
            business.category.toLowerCase().includes(currentSearch.toLowerCase())
        );
    }
    currentBusinesses = filtered;
    renderBusinesses(currentBusinesses);
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        filterBusinesses();
    });
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            filterBusinesses();
        });
    });
}

function toggleNotifications() {
    const popup = document.getElementById('notificationPopup');
    popup.classList.toggle('show');
    if (popup.classList.contains('show')) {
        setTimeout(() => {
            document.addEventListener('click', function closeNotifications(e) {
                if (!popup.contains(e.target) && !e.target.closest('.nav-icon')) {
                    popup.classList.remove('show');
                    document.removeEventListener('click', closeNotifications);
                }
            });
        }, 100);
    }
}

function initBannerRotation() {
    const slides = document.querySelectorAll('.banner-slide');
    let currentSlide = 0;
    setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 4000);
}

document.addEventListener('DOMContentLoaded', () => {
    renderBusinesses(businessesData);
    setupEventListeners();
    initBannerRotation();
});

window.toggleNotifications = toggleNotifications;

class PaletteManager {
    constructor() {
        this.currentPalette = this.getPaletteFromStorage() || 'ocean';
        this.init();
    }
    init() {
        this.applyPalette(this.currentPalette);
        this.updateActiveOption();
    }
    changePalette(paletteName) {
        this.currentPalette = paletteName;
        this.applyPalette(paletteName);
        this.savePaletteToStorage(paletteName);
        this.updateActiveOption();
        setTimeout(() => {
            this.closePalette();
        }, 300);
        this.showPaletteNotification(paletteName);
    }
    applyPalette(paletteName) {
        document.documentElement.setAttribute('data-palette', paletteName);
    }
    updateActiveOption() {
        document.querySelectorAll('.palette-option').forEach(option => {
            option.classList.remove('active');
        });
        const activeOption = document.querySelector(`[data-palette="${this.currentPalette}"]`);
        if (activeOption) {
            activeOption.classList.add('active');
        }
    }
    togglePalette() {
        const popup = document.getElementById('palettePopup');
        popup.classList.toggle('show');
        if (popup.classList.contains('show')) {
            setTimeout(() => {
                document.addEventListener('click', this.handleClickOutside.bind(this));
            }, 100);
        }
    }
    closePalette() {
        const popup = document.getElementById('palettePopup');
        popup.classList.remove('show');
        document.removeEventListener('click', this.handleClickOutside.bind(this));
    }
    handleClickOutside(e) {
        const popup = document.getElementById('palettePopup');
        const trigger = document.querySelector('.palette-trigger');
        
        if (!popup.contains(e.target) && !trigger.contains(e.target)) {
            this.closePalette();
        }
    }
    savePaletteToStorage(paletteName) {
        try {
            window.currentSelectedPalette = paletteName;
        } catch (error) {
            console.log('Guardado en memoria:', paletteName);
        }
    }
    getPaletteFromStorage() {
        try {
            return window.currentSelectedPalette || null;
        } catch (error) {
            return null;
        }
    }
    showPaletteNotification(paletteName) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--background-overlay);
            backdrop-filter: blur(10px);
            padding: 1rem 2rem;
            border-radius: 10px;
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
            z-index: 9999;
            color: var(--text-primary);
            font-weight: 500;
            animation: fadeInUp 0.3s ease;
        `;
        const paletteNames = {
            ocean: 'Océano',
            sunset: 'Atardecer',
            forest: 'Bosque',
            neon: 'Neón',
            dark: 'Oscuro',
            royal: 'Real',
            rosenight: 'RoseNight',
            greenroots: 'GreenRoots',
        };
        notification.innerHTML = `
            <i class="fas fa-palette" style="margin-right: 0.5rem; color: var(--primary-start);"></i>
            Paleta cambiada a: <strong>${paletteNames[paletteName]}</strong>
        `; 
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.style.animation = 'fadeOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

let paletteManager;
document.addEventListener('DOMContentLoaded', () => {
    paletteManager = new PaletteManager();
});

function togglePalette() {
    if (paletteManager) {
        paletteManager.togglePalette();
    }
}

function changePalette(paletteName) {
    if (paletteManager) {
        paletteManager.changePalette(paletteName);
    }
}
const styleSheet = document.createElement('style');
styleSheet.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(styleSheet);
