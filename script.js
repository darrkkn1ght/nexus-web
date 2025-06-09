// Sample products data with categories
const products = [
    {
        id: 1,
        name: "iPhone 15 Pro Max",
        price: 1800000,
        description: "Latest Apple flagship with titanium design and A17 Pro chip",
        category: "phones",
        image: "image/iphone-15-pro-max.jpg"
    },
    {
        id: 2,
        name: "Samsung Galaxy S24 Ultra",
        price: 1600000,
        description: "Premium Android flagship with S Pen and AI features",
        category: "phones",
        image: "image/samsung-s24-ultra.jpg"
    },
    {
        id: 3,
        name: "Apple Watch Series 9",
        price: 450000,
        description: "Advanced health monitoring with bright Always-On display",
        category: "wearables",
        image: "image/apple-watch-series-9.jpg"
    },
    {
        id: 4,
        name: "AirPods Pro 2nd Gen",
        price: 280000,
        description: "Active noise cancellation with spatial audio",
        category: "audio",
        image: "image/airpods-pro-2.jpg"
    },
    {
        id: 5,
        name: "MacBook Air M2",
        price: 1950000,
        description: "Ultra-thin laptop with M2 chip and all-day battery",
        category: "laptops",
        image: "image/macbook-air-m2.jpg"
    },
    {
        id: 6,
        name: "Sony WH-1000XM5",
        price: 380000,
        description: "Industry-leading noise canceling headphones",
        category: "audio",
        image: "image/sony-wh1000xm5.jpeg"
    },
    {
        id: 7,
        name: "iPad Air 5th Gen",
        price: 780000,
        description: "Powerful tablet with M1 chip and stunning display",
        category: "tablets",
        image: "image/ipad-air-5.png"
    },
    {
        id: 8,
        name: "Samsung Galaxy Buds2 Pro",
        price: 195000,
        description: "Premium wireless earbuds with 360 Audio",
        category: "audio",
        image: "image/galaxy-buds2-pro.jpg"
    },
    {
        id: 9,
        name: "HP Pavilion 15",
        price: 990000,
        description: "Reliable laptop for work and entertainment",
        category: "laptops",
        image: "image/hp-pavilion-15.jpg"
    },
    {
        id: 10,
        name: "Samsung Galaxy Watch 6",
        price: 340000,
        description: "Smartwatch with advanced health tracking",
        category: "wearables",
        image: "image/galaxy-watch-6.jpg"
    },
    {
        id: 11,
        name: "iPhone 14",
        price: 1050000,
        description: "Reliable iPhone with excellent camera system",
        category: "phones",
        image: "image/iphone-14.png"
    },
    {
        id: 12,
        name: "Anker PowerCore 20K",
        price: 52000,
        description: "High-capacity portable charger for all devices",
        category: "accessories",
        image: "image/anker-powercore-20k.jpeg"
    }
];

let cart = [];
let currentFilter = 'all';

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    createParticles();
    loadProducts();
    updateCartUI();
    initializeRouter();
});

// Router functionality
function initializeRouter() {
    // Handle initial page load
    handleRoute();
    
    // Listen for browser back/forward buttons
    window.addEventListener('popstate', handleRoute);
}

function handleRoute() {
    const path = window.location.pathname;
    const page = getPageFromPath(path);
    showPageDirect(page);
}

function getPageFromPath(path) {
    if (path === '/' || path === '/index.html' || path === '') {
        return 'home';
    } else if (path.includes('/products')) {
        return 'products';
    } else if (path.includes('/about')) {
        return 'about';
    } else if (path.includes('/contact')) {
        return 'contact';
    }
    return 'home'; // default
}

function navigateToPage(pageId) {
    const newUrl = pageId === 'home' ? '/' : `/${pageId}`;
    window.history.pushState({ page: pageId }, '', newUrl);
    showPageDirect(pageId);
}

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 20 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 15) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Page navigation (updated for routing)
function showPage(pageId) {
    navigateToPage(pageId);
}

// Direct page showing (without changing URL)
function showPageDirect(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Find and activate the correct nav item
    const activeNavItem = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }

    // Update page title
    updatePageTitle(pageId);

    // Close cart if open
    document.getElementById('cartSidebar').classList.remove('open');
}

// Update page title based on current page
function updatePageTitle(pageId) {
    const titles = {
        'home': 'NEXUS - Future Tech',
        'products': 'Products - NEXUS',
        'about': 'About - NEXUS',
        'contact': 'Contact - NEXUS'
    };
    document.title = titles[pageId] || 'NEXUS - Future Tech';
}

// Load and display products
function loadProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const filteredProducts = currentFilter === 'all' 
        ? products 
        : products.filter(product => product.category === currentFilter);

    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" data-category="${product.category}">
            <div class="product-image" style="background-image: url('${product.image}'); background-size: cover; background-position: center; background-repeat: no-repeat;"></div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-price">₦${product.price.toLocaleString()}</div>
            <p class="product-description">${product.description}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">
                Add to Cart
            </button>
        </div>
    `).join('');
}

// Filter products by category
function filterProducts(category) {
    currentFilter = category;
    
    // Update filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Reload products
    loadProducts();
}

// Add product to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    showCartAnimation();
}

// Remove item from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

// Update cart quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            updateCartUI();
        }
    }
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    // Update cart count
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    cartCount.style.display = totalItems > 0 ? 'flex' : 'none';

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; opacity: 0.7;">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <h4>${item.name}</h4>
                    <p>₦${item.price.toLocaleString()} × ${item.quantity}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 10px;">
                    <button onclick="updateQuantity(${item.id}, -1)" style="background: #ff6b6b; border: none; color: white; width: 25px; height: 25px; border-radius: 50%; cursor: pointer;">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, 1)" style="background: #40e0d0; border: none; color: white; width: 25px; height: 25px; border-radius: 50%; cursor: pointer;">+</button>
                    <button onclick="removeFromCart(${item.id})" style="background: #ff6b6b; border: none; color: white; padding: 5px 10px; border-radius: 15px; cursor: pointer; margin-left: 10px;">Remove</button>
                </div>
            </div>
        `).join('');
    }

    // Update total
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.textContent = `Total: ₦${total.toLocaleString()}`;
}

// Toggle cart sidebar
function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    cartSidebar.classList.toggle('open');
}

// Toggle mobile menu
function toggleMobileMenu() {
    const navLinks = document.getElementById('navLinks');
    const toggle = document.querySelector('.mobile-menu-toggle');
    
    navLinks.classList.toggle('active');
    
    // Animate hamburger to X
    if (navLinks.classList.contains('active')) {
        toggle.innerHTML = '<span style="transform: rotate(45deg) translate(5px, 5px);"></span><span style="opacity: 0;"></span><span style="transform: rotate(-45deg) translate(7px, -6px);"></span>';
    } else {
        toggle.innerHTML = '<span></span><span></span><span></span>';
    }
}

// Close mobile menu when clicking on nav items
function showPageDirect(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    // Update navigation
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => item.classList.remove('active'));
    
    // Find and activate the correct nav item
    const activeNavItem = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (activeNavItem) {
        activeNavItem.classList.add('active');
    }

    // Update page title
    updatePageTitle(pageId);

    // Close cart if open
    document.getElementById('cartSidebar').classList.remove('open');
    
    // Close mobile menu if open
    const navLinks = document.getElementById('navLinks');
    const toggle = document.querySelector('.mobile-menu-toggle');
    if (navLinks.classList.contains('active')) {
        navLinks.classList.remove('active');
        toggle.innerHTML = '<span></span><span></span><span></span>';
    }
}

// Show cart animation
function showCartAnimation() {
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    cartIcon.style.transition = 'transform 0.2s ease';
    
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

// Checkout function
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    alert(`Thank you for your purchase!\n\nItems: ${itemCount}\nTotal: ₦${total.toLocaleString()}\n\nYour order is being processed.`);
    
    // Clear cart
    cart = [];
    updateCartUI();
    toggleCart();
}

// Contact form submission
function submitForm(event) {
    event.preventDefault();
    
    const submitBtn = event.target.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.innerHTML = '<div class="loading"></div> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission
    setTimeout(() => {
        alert('Thank you for your message! We\'ll get back to you soon.');
        event.target.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
}

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.8)';
    }
});

// Add smooth scrolling
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

// Close cart when clicking outside
document.addEventListener('click', function(event) {
    const cartSidebar = document.getElementById('cartSidebar');
    const cartIcon = document.querySelector('.cart-icon');
    
    if (!cartSidebar.contains(event.target) && !cartIcon.contains(event.target)) {
        cartSidebar.classList.remove('open');
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        document.getElementById('cartSidebar').classList.remove('open');
    }
});

// Add loading states for interactions
function addLoadingState(element) {
    const originalContent = element.innerHTML;
    element.innerHTML = '<div class="loading"></div>';
    element.disabled = true;
    
    setTimeout(() => {
        element.innerHTML = originalContent;
        element.disabled = false;
    }, 500);
}

// Right-click context menu for opening pages in new tabs
function openInNewTab(pageId) {
    const newUrl = pageId === 'home' ? '/' : `/${pageId}`;
    window.open(newUrl, '_blank');
}

// Add right-click context menu functionality to navigation links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-item');
    navLinks.forEach(link => {
        link.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            const onclick = this.getAttribute('onclick');
            if (onclick) {
                const pageMatch = onclick.match(/showPage\('(.+?)'\)/);
                if (pageMatch) {
                    openInNewTab(pageMatch[1]);
                }
            }
        });
    });
    
    // Also add to logo
    const logo = document.querySelector('.logo');
    logo.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        openInNewTab('home');
    });
});
