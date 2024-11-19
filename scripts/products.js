function getProducts() {
    return JSON.parse(localStorage.getItem('products')) || [];
}

function saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products));
}

function clearLocalStorage() {
    localStorage.removeItem('products');
}

function loadProducts() {
    const products = [
        { id: 1, name: 'Foxy Mama Trucker', price: 50, image: '/images/trucker1.jpg', isOffer: true, isBestSeller: false },
        { id: 2, name: 'Trucker Crew1B Grey/Black', price: 60, image: '/images/trucker2.jpg', isOffer: false, isBestSeller: true },
        { id: 3, name: 'Gorra Crew5 Trucker Green/Black/Beige', price: 70, image: '/images/trucker3.jpg', isOffer: true, isBestSeller: false },
        { id: 4, name: 'Blacky 1 Trucker Black', price: 80, image: '/images/trucker4.jpg', isOffer: false, isBestSeller: true },
        { id: 5, name: 'Blacky2 Trucker', price: 90, image: '/images/trucker5.jpg', isOffer: true, isBestSeller: false },
        { id: 6, name: 'EYEPAT1 Trucker Black', price: 100, image: '/images/trucker6.jpg', isOffer: false, isBestSeller: true },
        { id: 7, name: 'Seesonss x LTDLG Trucker Hat', price: 110, image: '/images/trucker7.jpg', isOffer: true, isBestSeller: false },
        { id: 8, name: 'Dorbz The Farm Patchwork Trucker', price: 120, image: '/images/trucker8.jpg', isOffer: false, isBestSeller: true },
        { id: 9, name: 'BIK/BOR Burgundy trucker', price: 130, image: '/images/trucker9.jpg', isOffer: true, isBestSeller: false },
        { id: 10, name: 'Rooster 100 Trucker', price: 140, image: '/images/trucker10.jpg', isOffer: false, isBestSeller: true },
        { id: 11, name: 'BLKB Trucker Black/Yellow', price: 150, image: '/images/trucker11.jpg', isOffer: true, isBestSeller: false },
        { id: 12, name: 'Good Boy Trucker niño', price: 160, image: '/images/trucker12.jpg', isOffer: false, isBestSeller: true }
    ];
    saveProducts(products);
    displayProducts(products);
}

function displayProducts(products) {
    const productsContainer = document.getElementById('products-container');
    if (productsContainer) {
        productsContainer.innerHTML = products.map((product, index) => {
            const discountedPrice = product.isOffer ? (product.price * 0.7).toFixed(2) : product.price.toFixed(2);
            return `
                <div class="col-12 col-md-6 col-lg-4 mb-4">
                    <div class="card product-card" style="animation-delay: ${index * 0.1}s;" data-id="${product.id}">
                        ${product.isOffer ? '<div class="offer-label">OFERTA</div>' : ''}
                        ${product.isBestSeller ? '<div class="best-seller-label">Más vendido</div>' : ''}
                        <img src="${product.image}" class="card-img-top" alt="${product.name}">
                        <div class="card-body">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text">
                                ${product.isOffer ? `<span class="original-price">$${product.price.toFixed(2)}</span> <span class="discounted-price">$${discountedPrice}</span>` : `<span class="normal-price">$${product.price.toFixed(2)}</span>`}
                            </p>
                            <button class="btn btn-primary view-more-button">Ver más</button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const cards = document.querySelectorAll('.product-card');
        cards.forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
        });

        setTimeout(() => {
            cards.forEach(card => {
                card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            });
        }, 100);

        const viewMoreButtons = document.querySelectorAll('.view-more-button');
        viewMoreButtons.forEach(button => {
            button.addEventListener('click', (event) => {
                const productId = event.target.closest('.product-card').dataset.id;
                window.location.href = `/pages/buy.html?productId=${productId}`;
            });
        });
    }
}

function filterProducts() {
    const products = getProducts();
    const filterOffers = document.getElementById('filter-offers').checked;
    const filterBestSellers = document.getElementById('filter-best-sellers').checked;
    const searchQuery = document.getElementById('search-input').value.toLowerCase();

    let filteredProducts = products;

    if (filterOffers) {
        filteredProducts = filteredProducts.filter(product => product.isOffer);
    }

    if (filterBestSellers) {
        filteredProducts = filteredProducts.filter(product => product.isBestSeller);
    }

    if (searchQuery) {
        filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(searchQuery));
    }

    displayProducts(filteredProducts);
}

document.addEventListener('DOMContentLoaded', () => {
    const products = getProducts();
    if (products.length === 0) {
        loadProducts();
    } else {
        displayProducts(products);
    }

    document.getElementById('filter-offers').addEventListener('change', filterProducts);
    document.getElementById('filter-best-sellers').addEventListener('change', filterProducts);
    document.getElementById('search-input').addEventListener('input', filterProducts);
});