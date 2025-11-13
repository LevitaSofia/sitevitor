/*===== MENU SHOW/HIDE =====*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu');
    });
}

/*===== REMOVE MENU MOBILE =====*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*===== SCROLL SECTIONS ACTIVE LINK =====*/
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== SHOW SCROLL TOP =====*/ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); 
    else scrollTop.classList.remove('show-scroll');
}
window.addEventListener('scroll', scrollTop);

/*===== PRODUCTS DATA =====*/
const productsData = [
    {
        id: 1,
        name: "Samsung Galaxy A15",
        brand: "Samsung",
        storage: "128GB",
        image: "assets/images/samsung-a15.jpg",
        price: 1099,
        installmentPrice: "12x de R$ 106,90",
        badge: "Mais Vendido",
        category: "samsung",
        condition: "novo",
        availability: "InStock"
    },
    {
        id: 2,
        name: "Xiaomi Redmi Note 13",
        brand: "Xiaomi",
        storage: "256GB",
        image: "assets/images/xiaomi-note13.jpg",
        price: 1499,
        installmentPrice: "12x de R$ 145,90",
        badge: "Oferta",
        category: "xiaomi",
        condition: "novo",
        availability: "InStock"
    },
    {
        id: 3,
        name: "iPhone 12",
        brand: "Apple",
        storage: "128GB",
        image: "assets/images/iphone-12.jpg",
        price: 2399,
        installmentPrice: "12x de R$ 233,90",
        badge: "Seminovo",
        category: "apple",
        condition: "seminovo",
        availability: "InStock"
    },
    {
        id: 4,
        name: "Motorola Moto G84",
        brand: "Motorola",
        storage: "256GB",
        image: "assets/images/moto-g84.jpg",
        price: 1599,
        installmentPrice: "12x de R$ 155,90",
        badge: "Lançamento",
        category: "motorola",
        condition: "novo",
        availability: "InStock"
    },
    {
        id: 5,
        name: "Samsung Galaxy A55",
        brand: "Samsung",
        storage: "256GB",
        image: "assets/images/samsung-a55.jpg",
        price: 1899,
        installmentPrice: "12x de R$ 184,90",
        badge: "Destaque",
        category: "samsung",
        condition: "novo",
        availability: "InStock"
    },
    {
        id: 6,
        name: "Xiaomi POCO X6",
        brand: "Xiaomi",
        storage: "256GB",
        image: "assets/images/poco-x6.jpg",
        price: 1799,
        installmentPrice: "12x de R$ 175,90",
        badge: "Gamer",
        category: "xiaomi",
        condition: "novo",
        availability: "InStock"
    },
    {
        id: 7,
        name: "iPhone 13",
        brand: "Apple",
        storage: "128GB",
        image: "assets/images/iphone-13.jpg",
        price: 2899,
        installmentPrice: "12x de R$ 282,90",
        badge: "Premium",
        category: "apple",
        condition: "novo",
        availability: "InStock"
    },
    {
        id: 8,
        name: "Motorola Edge 40",
        brand: "Motorola",
        storage: "256GB",
        image: "assets/images/moto-edge40.jpg",
        price: 2199,
        installmentPrice: "12x de R$ 214,90",
        badge: "5G",
        category: "motorola",
        condition: "novo",
        availability: "InStock"
    }
];

/*===== RENDER PRODUCTS =====*/
function renderProducts(products, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    if (products.length === 0) {
        container.innerHTML = '<p class="no-products">Nenhum produto encontrado.</p>';
        return;
    }

    container.innerHTML = products.map(product => `
        <div class="product__card" itemscope itemtype="https://schema.org/Product">
            <div class="product__img">
                <img src="${product.image}" alt="${product.name} ${product.storage}" itemprop="image" onerror="this.src='assets/images/placeholder.jpg'">
            </div>
            <span class="product__badge">${product.badge}</span>
            <h3 class="product__title" itemprop="name">${product.name}</h3>
            <p class="product__specs" itemprop="description">${product.storage} • ${product.condition === 'novo' ? 'Novo' : 'Seminovo'}</p>
            <div class="product__price" itemprop="offers" itemscope itemtype="https://schema.org/Offer">
                <span class="product__price-current" itemprop="price" content="${product.price}">R$ ${product.price.toLocaleString('pt-BR')}</span>
                <meta itemprop="priceCurrency" content="BRL">
                <meta itemprop="availability" content="https://schema.org/${product.availability}">
                <p class="product__price-installment">ou ${product.installmentPrice}</p>
            </div>
            <meta itemprop="brand" content="${product.brand}">
            <meta itemprop="sku" content="${product.id}">
            <button class="button product__button" onclick="contactWhatsApp('${product.name}', '${product.storage}', ${product.price})">
                <i class="fab fa-whatsapp"></i>
                Chamar no WhatsApp
            </button>
        </div>
    `).join('');
}

/*===== WHATSAPP CONTACT FUNCTION =====*/
function contactWhatsApp(productName = '', storage = '', price = 0) {
    const phoneNumber = '5516992691445';
    let message = 'Olá! Gostaria de mais informações sobre smartphones.';
    
    if (productName) {
        message = `Olá! Tenho interesse no ${productName} ${storage} por R$ ${price.toLocaleString('pt-BR')}. Pode me passar mais informações?`;
    }
    
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}

/*===== LOAD FEATURED PRODUCTS =====*/
function loadFeaturedProducts() {
    const featuredProducts = productsData.slice(0, 8);
    renderProducts(featuredProducts, 'featured-products');
}

/*===== FILTER PRODUCTS =====*/
function filterProducts(category = 'all', condition = 'all', priceRange = 'all') {
    let filteredProducts = [...productsData];

    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.category === category);
    }

    if (condition !== 'all') {
        filteredProducts = filteredProducts.filter(product => product.condition === condition);
    }

    if (priceRange !== 'all') {
        switch (priceRange) {
            case 'under-1500':
                filteredProducts = filteredProducts.filter(product => product.price < 1500);
                break;
            case '1500-2500':
                filteredProducts = filteredProducts.filter(product => product.price >= 1500 && product.price <= 2500);
                break;
            case 'over-2500':
                filteredProducts = filteredProducts.filter(product => product.price > 2500);
                break;
        }
    }

    return filteredProducts;
}

/*===== SEARCH PRODUCTS =====*/
function searchProducts(query) {
    const searchTerm = query.toLowerCase();
    return productsData.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.brand.toLowerCase().includes(searchTerm) ||
        product.storage.toLowerCase().includes(searchTerm)
    );
}

/*===== FILTER BUTTONS EVENT LISTENERS =====*/
document.addEventListener('DOMContentLoaded', function() {
    // Load initial products
    loadFeaturedProducts();

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter__button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            // Get filter values
            const category = this.dataset.category || 'all';
            const condition = this.dataset.condition || 'all';
            const priceRange = this.dataset.price || 'all';

            // Filter and render products
            const filteredProducts = filterProducts(category, condition, priceRange);
            renderProducts(filteredProducts, 'products-container');
        });
    });

    // Search functionality
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.trim();
            if (query.length >= 2) {
                const searchResults = searchProducts(query);
                renderProducts(searchResults, 'products-container');
            } else if (query.length === 0) {
                // Show all products if search is cleared
                renderProducts(productsData, 'products-container');
            }
        });
    }

    // Contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const name = formData.get('name');
            const phone = formData.get('phone');
            const message = formData.get('message');
            
            const whatsappMessage = `Olá! Meu nome é ${name}.\nTelefone: ${phone}\nMensagem: ${message}`;
            contactWhatsApp('', '', 0, whatsappMessage);
        });
    }
});

/*===== SMOOTH SCROLLING =====*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

/*===== LOADING ANIMATION =====*/
function showLoading(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = `
            <div class="loading">
                <div class="spinner"></div>
            </div>
        `;
    }
}

/*===== LAZY LOADING IMAGES =====*/
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

/*===== PRICE FORMATTING =====*/
function formatPrice(price) {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(price);
}

/*===== GET PRODUCTS BY BRAND =====*/
function getProductsByBrand(brand) {
    return productsData.filter(product => product.brand.toLowerCase() === brand.toLowerCase());
}

/*===== SORT PRODUCTS =====*/
function sortProducts(products, sortBy) {
    const sorted = [...products];
    
    switch (sortBy) {
        case 'price-low':
            return sorted.sort((a, b) => a.price - b.price);
        case 'price-high':
            return sorted.sort((a, b) => b.price - a.price);
        case 'name':
            return sorted.sort((a, b) => a.name.localeCompare(b.name));
        case 'brand':
            return sorted.sort((a, b) => a.brand.localeCompare(b.brand));
        default:
            return sorted;
    }
}

/*===== FAQ ACCORDION =====*/
document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq__item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq__question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all FAQ items
                faqItems.forEach(faqItem => {
                    faqItem.classList.remove('active');
                });
                
                // Open clicked item if it wasn't active
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });
});

/*===== SCROLL ANIMATIONS =====*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.benefits__card, .product__card, .category__card, .testimonial__card').forEach(el => {
    observer.observe(el);
});

/*===== LOCAL STORAGE FUNCTIONS =====*/
function saveToWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    if (!wishlist.includes(productId)) {
        wishlist.push(productId);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        showNotification('Produto adicionado à lista de desejos!');
    }
}

function removeFromWishlist(productId) {
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    wishlist = wishlist.filter(id => id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    showNotification('Produto removido da lista de desejos!');
}

function getWishlist() {
    return JSON.parse(localStorage.getItem('wishlist')) || [];
}

/*===== NOTIFICATION SYSTEM =====*/
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remove notification
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}

/*===== ANALYTICS TRACKING =====*/
function trackEvent(action, category, label) {
    // Google Analytics 4 event tracking
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track WhatsApp button clicks
document.addEventListener('click', function(e) {
    if (e.target.closest('.whatsapp-fixed a') || e.target.closest('[onclick*="contactWhatsApp"]')) {
        trackEvent('click', 'contact', 'whatsapp_button');
    }
});

/*===== PERFORMANCE OPTIMIZATION =====*/
// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to search
const debouncedSearch = debounce((query) => {
    const searchResults = searchProducts(query);
    renderProducts(searchResults, 'products-container');
}, 300);

/*===== ERROR HANDLING =====*/
window.addEventListener('error', function(e) {
    console.error('Erro capturado:', e.error);
    // Aqui você pode enviar erros para um serviço de monitoramento
});

/*===== SERVICE WORKER REGISTRATION =====*/
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registrado com sucesso:', registration);
            })
            .catch(registrationError => {
                console.log('Falha no registro do SW:', registrationError);
            });
    });
}

/*===== NOVAS FUNCIONALIDADES =====*/

// Timer para ofertas flash
function updateFlashTimer() {
    const now = new Date().getTime();
    const endTime = now + (24 * 60 * 60 * 1000); // 24 horas a partir de agora
    
    const timer = setInterval(() => {
        const currentTime = new Date().getTime();
        const timeLeft = endTime - currentTime;
        
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
        
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        if (timeLeft < 0) {
            clearInterval(timer);
            if (hoursElement) hoursElement.textContent = "00";
            if (minutesElement) minutesElement.textContent = "00";
            if (secondsElement) secondsElement.textContent = "00";
        }
    }, 1000);
}

// Filtros de produtos
function initProductFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const productsGrid = document.getElementById('products-grid');
    
    if (!filterTabs.length || !productsGrid) return;
    
    // Produtos em destaque para filtro
    const featuredProducts = [
        {
            id: 1,
            name: 'iPhone 15 Pro Max 256GB',
            brand: 'iphone',
            price: 8999,
            oldPrice: 9999,
            image: 'https://via.placeholder.com/300x300/000000/ffffff?text=iPhone+15+Pro',
            rating: 5,
            inStock: true
        },
        {
            id: 2,
            name: 'Galaxy S24 Ultra 512GB',
            brand: 'samsung',
            price: 7499,
            oldPrice: 8299,
            image: 'https://via.placeholder.com/300x300/1428A0/ffffff?text=Galaxy+S24',
            rating: 5,
            inStock: true
        },
        {
            id: 3,
            name: 'Xiaomi 14 Pro 256GB',
            brand: 'xiaomi',
            price: 3999,
            oldPrice: 4499,
            image: 'https://via.placeholder.com/300x300/FF6900/ffffff?text=Xiaomi+14',
            rating: 4,
            inStock: true
        },
        {
            id: 4,
            name: 'Moto Edge 40 Pro 256GB',
            brand: 'motorola',
            price: 2999,
            oldPrice: 3499,
            image: 'https://via.placeholder.com/300x300/0066CC/ffffff?text=Moto+Edge',
            rating: 4,
            inStock: true
        }
    ];
    
    function renderFeaturedProducts(products) {
        const productsHTML = products.map(product => `
            <div class="product-card" data-brand="${product.brand}">
                <div class="product-card__image">
                    <img src="${product.image}" alt="${product.name}" loading="lazy">
                    ${product.oldPrice ? `<div class="product-card__discount">-${Math.round((1 - product.price/product.oldPrice) * 100)}%</div>` : ''}
                </div>
                <div class="product-card__content">
                    <h3 class="product-card__title">${product.name}</h3>
                    <div class="product-card__rating">
                        ${'★'.repeat(product.rating)}${'☆'.repeat(5 - product.rating)}
                    </div>
                    <div class="product-card__price">
                        ${product.oldPrice ? `<span class="product-card__old-price">R$ ${product.oldPrice.toLocaleString('pt-BR')}</span>` : ''}
                        <span class="product-card__new-price">R$ ${product.price.toLocaleString('pt-BR')}</span>
                    </div>
                    <button class="product-card__button" onclick="contactWhatsApp('${product.name} - R$ ${product.price.toLocaleString('pt-BR')}')">
                        <i class="fab fa-whatsapp"></i>
                        Comprar Agora
                    </button>
                </div>
            </div>
        `).join('');
        
        productsGrid.innerHTML = productsHTML;
    }
    
    // Renderizar todos os produtos inicialmente
    renderFeaturedProducts(featuredProducts);
    
    // Adicionar event listeners para os filtros
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remover classe active de todas as tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Adicionar classe active na tab clicada
            tab.classList.add('active');
            
            const filter = tab.dataset.filter;
            const filteredProducts = filter === 'all' 
                ? featuredProducts 
                : featuredProducts.filter(product => product.brand === filter);
                
            renderFeaturedProducts(filteredProducts);
        });
    });
}

// Newsletter
function initNewsletter() {
    const newsletterForm = document.getElementById('newsletter-form');
    
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('.newsletter__input');
        const email = emailInput.value.trim();
        
        if (!email) {
            showNotification('Por favor, digite seu e-mail.', 'warning');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Por favor, digite um e-mail válido.', 'error');
            return;
        }
        
        // Simular envio
        const button = newsletterForm.querySelector('.newsletter__button');
        const originalText = button.innerHTML;
        
        button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cadastrando...';
        button.disabled = true;
        
        setTimeout(() => {
            button.innerHTML = '<i class="fas fa-check"></i> Cadastrado!';
            emailInput.value = '';
            showNotification('E-mail cadastrado com sucesso! Você receberá nossas ofertas.', 'success');
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.disabled = false;
            }, 2000);
        }, 1500);
    });
}

// Validação de e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    // Remover notificação existente se houver
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification__content">
            <i class="notification__icon ${getNotificationIcon(type)}"></i>
            <span class="notification__message">${message}</span>
            <button class="notification__close" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => {
        notification.classList.add('notification--visible');
    }, 100);
    
    // Remover automaticamente após 5 segundos
    setTimeout(() => {
        notification.classList.remove('notification--visible');
        setTimeout(() => {
            if (notification.parentElement) {
                notification.remove();
            }
        }, 300);
    }, 5000);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fas fa-check-circle',
        error: 'fas fa-exclamation-circle',
        warning: 'fas fa-exclamation-triangle',
        info: 'fas fa-info-circle'
    };
    return icons[type] || icons.info;
}

// Animação de elementos ao entrar na viewport
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que devem ser animados
    const elementsToAnimate = document.querySelectorAll(
        '.benefit, .category-card, .flash-card, .testimonial, .stat'
    );
    
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Lazy loading para imagens
function initLazyLoading() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// Contador animado para estatísticas
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat__number');
    
    const countUp = (element, target) => {
        let current = 0;
        const increment = target / 100;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            // Formatação especial para diferentes tipos de números
            if (element.textContent.includes('+')) {
                element.textContent = Math.floor(current) + '+';
            } else if (element.textContent.includes('.')) {
                element.textContent = current.toFixed(1);
            } else if (element.textContent.includes('h')) {
                element.textContent = Math.floor(current) + 'h';
            } else {
                element.textContent = Math.floor(current);
            }
        }, 20);
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const text = element.textContent;
                let target = parseFloat(text.replace(/[^\d.]/g, ''));
                
                // Ajustar target baseado no conteúdo
                if (text.includes('1000+')) target = 1000;
                else if (text.includes('4.9')) target = 4.9;
                else if (text.includes('24h')) target = 24;
                else if (text.includes('2 Anos')) target = 2;
                
                countUp(element, target);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Inicializar todas as funcionalidades quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    // Funcionalidades existentes
    showActiveNav();
    scrollHeader();
    scrollUp();
    scrollActive();
    scrollTop();
    
    // Novas funcionalidades
    updateFlashTimer();
    initProductFilters();
    initNewsletter();
    initScrollAnimations();
    initLazyLoading();
    initCounterAnimation();
});

// Adicionar estilos para notificações e animações via JavaScript
const additionalStyles = `
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    }
    
    .notification--visible {
        transform: translateX(0);
    }
    
    .notification__content {
        background: white;
        border-radius: 8px;
        padding: 1rem 1.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-width: 300px;
        border-left: 4px solid;
    }
    
    .notification--success .notification__content {
        border-left-color: #10B981;
    }
    
    .notification--error .notification__content {
        border-left-color: #EF4444;
    }
    
    .notification--warning .notification__content {
        border-left-color: #F59E0B;
    }
    
    .notification--info .notification__content {
        border-left-color: #3B82F6;
    }
    
    .notification__icon {
        font-size: 1.2rem;
    }
    
    .notification--success .notification__icon {
        color: #10B981;
    }
    
    .notification--error .notification__icon {
        color: #EF4444;
    }
    
    .notification--warning .notification__icon {
        color: #F59E0B;
    }
    
    .notification--info .notification__icon {
        color: #3B82F3;
    }
    
    .notification__message {
        flex: 1;
        font-size: 0.9rem;
        color: #374151;
    }
    
    .notification__close {
        background: none;
        border: none;
        color: #6B7280;
        cursor: pointer;
        padding: 0.25rem;
        border-radius: 4px;
        transition: background-color 0.2s;
    }
    
    .notification__close:hover {
        background-color: #F3F4F6;
    }
    
    .animate-in {
        animation: slideInUp 0.6s ease-out;
    }
    
    @keyframes slideInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
    
    .product-card {
        background: white;
        border-radius: 1rem;
        overflow: hidden;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        transition: all 0.3s ease;
        border: 1px solid #E5E7EB;
    }
    
    .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    
    .product-card__image {
        position: relative;
        height: 250px;
        overflow: hidden;
        background: #F8FAFC;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .product-card__image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.3s ease;
    }
    
    .product-card:hover .product-card__image img {
        transform: scale(1.1);
    }
    
    .product-card__discount {
        position: absolute;
        top: 0.75rem;
        left: 0.75rem;
        background: #EF4444;
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 1rem;
        font-size: 0.75rem;
        font-weight: 600;
    }
    
    .product-card__content {
        padding: 1.5rem;
    }
    
    .product-card__title {
        font-size: 1.1rem;
        font-weight: 600;
        margin-bottom: 0.5rem;
        color: #0F172A;
        line-height: 1.3;
    }
    
    .product-card__rating {
        color: #FFD700;
        font-size: 1rem;
        margin-bottom: 0.75rem;
    }
    
    .product-card__price {
        margin-bottom: 1rem;
    }
    
    .product-card__old-price {
        font-size: 0.875rem;
        text-decoration: line-through;
        color: #6B7280;
        margin-right: 0.5rem;
    }
    
    .product-card__new-price {
        font-size: 1.25rem;
        font-weight: 700;
        color: #10B981;
    }
    
    .product-card__button {
        width: 100%;
        background: linear-gradient(135deg, #10B981, #059669);
        color: white;
        border: none;
        padding: 0.875rem 1rem;
        border-radius: 0.5rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        font-size: 0.9rem;
    }
    
    .product-card__button:hover {
        background: linear-gradient(135deg, #059669, #047857);
        transform: translateY(-2px);
    }
`;

// Adicionar estilos ao documento
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);