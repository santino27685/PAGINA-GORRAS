document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('productId');
    const products = JSON.parse(localStorage.getItem('products'));
    const product = products.find(p => p.id == productId);
    if (product) {
        const discountedPrice = product.isOffer ? (product.price * 0.7).toFixed(2) : product.price.toFixed(2);
        document.getElementById('product-details').innerHTML = `
            <h5>${product.name}</h5>
            <p>${product.isOffer ? `<span class="original-price">$${product.price.toFixed(2)}</span> <span class="discounted-price">$${discountedPrice}</span>` : `$${product.price.toFixed(2)}`}</p>
            <img src="${product.image}" class="img-fluid" alt="${product.name}">
        `;
        document.getElementById('buy-button').addEventListener('click', () => {
            const message = `Hola, estoy interesado en comprar el producto ${product.name} por $${discountedPrice}.`;
            window.location.href = `https://wa.me/5492604533989?text=${encodeURIComponent(message)}`;
        });
    }
});