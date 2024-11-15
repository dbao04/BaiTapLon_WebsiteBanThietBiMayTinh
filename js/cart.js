// cart.js
class ShoppingCart {
    constructor() {
        this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
        this.initializeCart();
    }

    initializeCart() {
        // Add hover functionality to cart icon
        const cartIcon = document.querySelector('.header-right a:nth-child(3)');
        const cartPreview = this.createCartPreview();
        document.body.appendChild(cartPreview);

        cartIcon.addEventListener('mouseenter', () => {
            this.updateCartPreview();
            cartPreview.style.display = 'block';
        });

        cartPreview.addEventListener('mouseenter', () => {
            cartPreview.style.display = 'block';
        });

        cartPreview.addEventListener('mouseleave', () => {
            cartPreview.style.display = 'none';
        });

        cartIcon.addEventListener('mouseleave', (e) => {
            if (!e.relatedTarget?.closest('.cart-preview')) {
                cartPreview.style.display = 'none';
            }
        });

        // Update cart icon with item count
        this.updateCartIcon();
    }

    createCartPreview() {
        const preview = document.createElement('div');
        preview.className = 'cart-preview';
        preview.innerHTML = `
            <div class="cart-preview-header">Giỏ hàng của bạn</div>
            <div class="cart-preview-items"></div>
            <div class="cart-preview-footer">
                <div class="cart-preview-total"></div>
                <button onclick="window.location.href='cart.html'" class="view-cart-btn">Xem giỏ hàng</button>
            </div>
        `;
        return preview;
    }

    addItem(item) {
        const existingItem = this.items.find(i => i.id === item.id);
        if (existingItem) {
            existingItem.quantity += item.quantity;
        } else {
            this.items.push(item);
        }
        this.saveCart();
        this.updateCartIcon();
        this.updateCartPreview();
    }

    removeItem(itemId) {
        this.items = this.items.filter(item => item.id !== itemId);
        this.saveCart();
        this.updateCartIcon();
        this.updateCartPreview();
    }

    updateQuantity(itemId, quantity) {
        const item = this.items.find(i => i.id === itemId);
        if (item) {
            item.quantity = quantity;
            this.saveCart();
            this.updateCartIcon();
            this.updateCartPreview();
        }
    }

    saveCart() {
        localStorage.setItem('cartItems', JSON.stringify(this.items));
    }

    updateCartIcon() {
        const cartCount = this.items.reduce((total, item) => total + item.quantity, 0);
        const cartIcon = document.querySelector('.header-right a:nth-child(3)');
        cartIcon.innerHTML = `Giỏ hàng (${cartCount})`;
    }

    updateCartPreview() {
        const previewItems = document.querySelector('.cart-preview-items');
        const previewTotal = document.querySelector('.cart-preview-total');
        
        if (this.items.length === 0) {
            previewItems.innerHTML = '<div class="empty-cart">Giỏ hàng trống</div>';
            previewTotal.innerHTML = 'Tổng tiền: 0đ';
            return;
        }

        previewItems.innerHTML = this.items.map(item => `
            <div class="preview-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="preview-item-details">
                    <div class="preview-item-name">${item.name}</div>
                    <div class="preview-item-price">${item.price.toLocaleString()}đ x ${item.quantity}</div>
                </div>
                <button onclick="cart.removeItem('${item.id}')" class="remove-item">×</button>
            </div>
        `).join('');

        const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        previewTotal.innerHTML = `Tổng tiền: ${total.toLocaleString()}đ`;
    }
}

// Initialize cart
const cart = new ShoppingCart();

// Function to add item to cart from product page
function addToCart(productId, name, price, image, quantity = 1) {
    cart.addItem({
        id: productId,
        name: name,
        price: price,
        image: image,
        quantity: quantity
    });
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
}