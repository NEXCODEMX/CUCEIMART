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

function toggleChatbot() {
    const panel = document.getElementById('chatbotPanel');
    panel.classList.toggle('active');
}

function createMessageElement(text, fromUser = false) {
    const div = document.createElement('div');
    div.className = 'chatbot-message';
    div.textContent = text;
    if (fromUser) {
        div.style.backgroundColor = 'var(--color-primary)';
        div.style.color = 'white';
        div.style.alignSelf = 'flex-end';
        div.style.marginLeft = '20%';
    } else {
        div.style.backgroundColor = 'var(--background-overlay)';
        div.style.color = 'var(--text-primary)';
        div.style.alignSelf = 'flex-start';
        div.style.marginRight = '20%';
    }
    return div;
}

function handleChatbotInput(event) {
    if (event.key === 'Enter') {
        sendChatbotMessage();
    }
}

function sendChatbotMessage() {
    const input = document.getElementById('chatbotInput');
    const messages = document.getElementById('chatbotMessages');
    const userMessage = input.value.trim();
    if (!userMessage) return; 
    const userDiv = createMessageElement(userMessage, true);
    messages.appendChild(userDiv);
    messages.scrollTop = messages.scrollHeight;
    input.value = '';
    setTimeout(() => {
        const botResponse = getBotResponse(userMessage);
        const botDiv = createMessageElement(botResponse, false);
        messages.appendChild(botDiv);
        messages.scrollTop = messages.scrollHeight;
    }, 800);
}

function getBotResponse(message) {
  const lower = message.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, ""); 
  // normaliza acentos para mejor comparación
  
  // Función interna para seleccionar respuesta aleatoria de un array
  function randomResp(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  // Detectar saludos
  if (/(^| )((hola|buenas|hey|saludos|holi|que tal|buen dia|buenas tardes|buenas noches|buenos dias|buenos dias|buenos))/i.test(lower)) {
    return randomResp([
      '¡Hola! Soy tu asistente virtual de CUCEI MART. ¿En qué te puedo ayudar hoy? Puedes buscar negocios, conocer cómo registrarte como emprendedor, o cualquier duda que tengas.',
      '¡Buen día! Aquí para ayudarte a encontrar emprendedores y productos dentro de CUCEI. ¿Qué necesitas?',
      '¡Saludos! ¿Quieres buscar un negocio, registrarte como emprendedor, o necesitas ayuda con la plataforma?',
    ]);
  }

  // Despedidas
  if (/(adios|chao|hasta luego|nos vemos|bye|nos vemo|nos vem|bye bye)/.test(lower)) {
    return randomResp([
      '¡Gracias por visitar CUCEI MART! Vuelve cuando quieras, estaré aquí para ayudarte.',
      '¡Hasta pronto! Que tengas un excelente día.',
      'Nos vemos pronto, y recuerda que puedes regresar si necesitas algo.',
    ]);
  }

  // Agradecimientos
  if (/(gracias|muchas gracias|graciass|mucha gracia|muy bien|excelente|muy bueno|perfecto)/.test(lower)) {
    return randomResp([
      '¡Con mucho gusto! ¿Quieres que te ayude a buscar algún negocio o registrarte como emprendedor?',
      'Estoy aquí para ayudarte siempre que lo necesites.',
      'Para eso estamos, ¿quieres saber algo más?',
    ]);
  }

  // Preguntas o dudas generales sobre la plataforma
  if (/(que es esta pagina|que hace esta pagina|para que sirve|como funciona|de que trata)/.test(lower)) {
    return randomResp([
      'CUCEI Emprende es una plataforma para que estudiantes y emprendedores del CUCEI puedan buscar negocios, productos y servicios dentro de la comunidad universitaria.',
      'Aquí puedes buscar negocios, ver ofertas, y los emprendedores pueden registrarse para anunciarse.',
      'Esta página es para conectar a estudiantes con los emprendedores de CUCEI y apoyar el comercio local dentro de la universidad.',
    ]);
  }

  // Preguntas relacionadas con la búsqueda
  if (/(como busco|como encuentro|donde busco|ayuda para buscar|busqueda|buscar negocio|quiero encontrar|como hago para buscar)/.test(lower)) {
    return randomResp([
      'Para buscar, escribe el nombre del negocio o el tipo de producto en la barra de búsqueda en la página principal.',
      'Puedes usar los filtros por categoría para encontrar negocios específicos que te interesen.',
      '¿Quieres que te guíe paso a paso para buscar un negocio o producto?',
    ]);
  }

  // Preguntas sobre registro de emprendedores
  if (/(registrar|registro|como me registro|quiero vender|anunciar negocio|quiero anunciar|como puedo vender|como me uno|quiero ser vendedor)/.test(lower)) {
    return randomResp([
      'Si eres emprendedor, puedes registrarte en la sección "Regístrate como Emprendedor" para anunciar tu negocio en la plataforma.',
      'El proceso de registro es sencillo, solo necesitas llenar un formulario con información básica de tu negocio y tus datos de contacto.',
      '¿Quieres que te envíe el enlace para registrarte o te explique el proceso detalladamente?',
    ]);
  }

  if (/(requisitos para registrarme|que necesito para registrarme|documentos para registro|como es el registro)/.test(lower)) {
    return randomResp([
      'Para registrarte necesitas: nombre del negocio, descripción, categoría, y datos de contacto. No se requiere documentación física en línea.',
      'Solo llena el formulario de registro con la información de tu emprendimiento y esperar la aprobación.',
      '¿Quieres que te ayude con el formulario o tienes dudas específicas sobre el registro?',
    ]);
  }

  // Preguntas sobre contacto con emprendedores
  if (/(contacto|como contacto|telefono|correo|informacion de contacto|datos de contacto)/.test(lower)) {
    return randomResp([
      'Para contactar a un emprendedor, visita su perfil haciendo clic en "Ver Negocio". Ahí encontrarás teléfono, correo u otra información disponible.',
      'Cada negocio tiene su propia información de contacto visible en su perfil dentro de la plataforma.',
      '¿Quieres que te ayude a encontrar el contacto de algún negocio específico?',
    ]);
  }

  // Preguntas sobre precios y promociones
  if (/(precio|precios|cuanto cuesta|costos|barato|caro|promocion|descuento|oferta|ofertas)/.test(lower)) {
    return randomResp([
      'Los precios varían según el negocio y el producto. Puedes ver los detalles y promociones en las tarjetas de cada negocio.',
      'Cada emprendedor establece sus propios precios y ofertas, revisa sus perfiles para más información.',
      '¿Quieres que te ayude a encontrar ofertas especiales o negocios con descuentos?',
    ]);
  }

  // Preguntas sobre horarios de atención
  if (/(horario|horarios|cuando abren|cuando cierran|dias y horas|atencion)/.test(lower)) {
    return randomResp([
      'Los horarios varían según cada negocio. Consulta el perfil de cada emprendedor para conocer sus horarios de atención.',
      'La mayoría atiende durante días hábiles y en horarios diurnos, pero es mejor verificar en su perfil.',
      '¿Quieres que te ayude a buscar el horario de algún negocio específico?',
    ]);
  }

  // Preguntas sobre eventos, ferias o actividades
  if (/(evento|feria|expo|actividad|taller|curso|seminario|charla)/.test(lower)) {
    return randomResp([
      'CUCEI Emprende organiza eventos y ferias para apoyar a los emprendedores. Revisa nuestra sección de noticias para no perderte ninguno.',
      'Los eventos se anuncian con anticipación en la página principal y redes sociales.',
      '¿Quieres información sobre el próximo evento o feria?',
    ]);
  }

  // Preguntas sobre soporte técnico o problemas
  if (/(problema|error|no funciona|fallo|ayuda tecnica|soporte tecnico|mejoras|sugerencia)/.test(lower)) {
    return randomResp([
      'Lamento que tengas problemas. ¿Puedes describir el error o problema para ayudarte mejor?',
      'Estamos para ayudarte con cualquier inconveniente técnico. Por favor, detállame qué sucede.',
      '¿Quieres que te pase contacto del soporte técnico para asistencia directa?',
    ]);
  }

  // Preguntas sobre seguridad y privacidad
  if (/(seguridad|privacidad|datos personales|proteccion de datos|confidencialidad)/.test(lower)) {
    return randomResp([
      'Tus datos están protegidos y se usan solo para mejorar tu experiencia en la plataforma CUCEI Emprende.',
      'Cumplimos con las normativas de protección de datos para garantizar tu privacidad.',
      'Si quieres, puedo enviarte el enlace a nuestra política de privacidad.',
    ]);
  }

  // Preguntas o quejas sobre el servicio
  if (/(queja|reclamo|no me gusta|insatisfaccion|mala experiencia|problema con)/.test(lower)) {
    return randomResp([
      'Lamento que hayas tenido una mala experiencia. Por favor, dime qué sucedió para ayudarte o canalizar tu queja.',
      'Estamos aquí para mejorar, cuéntame qué pasó para darte soporte.',
      '¿Quieres que te pase contacto con atención al cliente para resolver tu situación?',
    ]);
  }

  // Preguntas relacionadas a pagos y métodos de cobro
  if (/(pago|pagos|como pago|formas de pago|tarjeta|efectivo|paypal|transferencia)/.test(lower)) {
    return randomResp([
      'Los métodos de pago dependen de cada emprendedor. Muchos aceptan tarjetas, efectivo y PayPal.',
      'Consulta en el perfil del negocio los métodos de pago que ofrecen.',
      '¿Quieres que te ayude a buscar negocios con método de pago específico?',
    ]);
  }

  // Preguntas vagas o poco claras - sugerencias para clarificar
  if (/(no entiendo|no se|no se que hacer|no se como|confundido|ayuda)/.test(lower)) {
    return randomResp([
      'Parece que tienes dudas. ¿Quieres que te explique cómo buscar negocios, registrarte como emprendedor, o algo más?',
      'Estoy aquí para ayudarte, dime en qué puedo apoyarte o qué quieres hacer.',
      'Puedes intentar con preguntas como "buscar negocios", "registro emprendedor" o "contacto de negocio".',
    ]);
  }

  // Palabras sueltas o frases muy cortas - intentar sugerir opciones
  if (/^(hola|buscar|registro|ayuda|contacto|precio|evento|gracias)$/i.test(lower)) {
    return randomResp([
      '¿Quieres que te ayude a buscar negocios o registrarte como emprendedor?',
      'Puedes preguntarme cómo buscar negocios, registrarte, o contactar emprendedores.',
      'Estoy aquí para ayudarte, dime qué necesitas.',
    ]);
  }

  // Respuesta por defecto si no entiende
  return 'Disculpa, no entendí tu pregunta. Intenta ser más específico o utiliza palabras clave como "buscar negocio", "registro emprendedor" o "contacto". Estoy aquí para ayudarte.';
}


document.getElementById('chatbotSendBtn').addEventListener('click', sendChatbotMessage);


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
