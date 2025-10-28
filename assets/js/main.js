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