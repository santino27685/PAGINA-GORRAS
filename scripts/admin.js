function displayProductsAdmin() {
    const productList = document.getElementById('product-list');
    if (productList) {
        const products = getProducts();
        productList.innerHTML = products.map(product => {
            const discountedPrice = product.isOffer ? (product.price * 0.7).toFixed(2) : product.price.toFixed(2);
            return `
                <li class="list-group-item">
                    ${product.name} - 
                    ${product.isOffer ? `EN OFERTA: $${discountedPrice}</span>` : `$${product.price.toFixed(2)}`}
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-sm btn-outline-primary edit-product" data-id="${product.id}">Editar</button>
                        <button type="button" class="btn btn-sm btn-outline-danger delete-product" data-id="${product.id}">Eliminar</button>
                    </div>
                </li>
            `;
        }).join('');
        document.querySelectorAll('.edit-product').forEach(button => {
            button.addEventListener('click', editProduct);
        });
        document.querySelectorAll('.delete-product').forEach(button => {
            button.addEventListener('click', deleteProduct);
        });
    }
}

function addProduct(event) {
    event.preventDefault();
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const imageFile = document.getElementById('product-image-file').files[0];
    const isOffer = document.getElementById('product-offer').checked;
    const isBestSeller = document.getElementById('product-best-seller').checked;

    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const image = e.target.result;
            saveProduct(name, price, image, isOffer, isBestSeller);
        };
        reader.readAsDataURL(imageFile);
    } else {
        alert('Por favor, selecciona un archivo de imagen.');
    }
}

function saveProduct(name, price, image, isOffer, isBestSeller) {
    const products = getProducts();
    const newProduct = {
        id: products.length ? products[products.length - 1].id + 1 : 1,
        name,
        price,
        image,
        isOffer,
        isBestSeller
    };
    products.push(newProduct);
    saveProducts(products);
    displayProductsAdmin();
    document.getElementById('product-form').reset();
}

function editProduct(event) {
    const productId = parseInt(event.target.dataset.id);
    const products = getProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-offer').checked = product.isOffer;
        document.getElementById('product-best-seller').checked = product.isBestSeller;
        const form = document.getElementById('product-form');
        form.dataset.editId = productId;
        form.querySelector('button[type="submit"]').textContent = 'Actualizar producto';
        form.removeEventListener('submit', addProduct);
        form.addEventListener('submit', updateProduct);
    }
}

function updateProduct(event) {
    event.preventDefault();
    const productId = parseInt(event.target.dataset.editId);
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const imageFile = document.getElementById('product-image-file').files[0];
    const isOffer = document.getElementById('product-offer').checked;
    const isBestSeller = document.getElementById('product-best-seller').checked;
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const image = e.target.result;
            saveUpdatedProduct(productId, name, price, image, isOffer, isBestSeller);
        };
        reader.readAsDataURL(imageFile);
    } else {
        const products = getProducts();
        const product = products.find(p => p.id === productId);
        const image = product ? product.image : '';
        saveUpdatedProduct(productId, name, price, image, isOffer, isBestSeller);
    }
}

function saveUpdatedProduct(productId, name, price, image, isOffer, isBestSeller) {
    const products = getProducts();
    const productIndex = products.findIndex(p => p.id === productId);
    if (productIndex !== -1) {
        products[productIndex] = { ...products[productIndex], name, price, image, isOffer, isBestSeller };
        saveProducts(products);
        displayProductsAdmin();
        document.getElementById('product-form').reset();
        document.getElementById('product-form').removeAttribute('data-edit-id');
        document.getElementById('product-form').querySelector('button[type="submit"]').textContent = 'Agregar producto';
        document.getElementById('product-form').removeEventListener('submit', updateProduct);
        document.getElementById('product-form').addEventListener('submit', addProduct);
    }
}

function deleteProduct(event) {
    const productId = parseInt(event.target.dataset.id);
    const products = getProducts().filter(p => p.id !== productId);
    saveProducts(products);
    displayProductsAdmin();
}

document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', addProduct);
    }
    displayProductsAdmin();
});