// product.js

function changeImage(src) {
    const mainImage = document.querySelector('.product-image .main-image');
    mainImage.src = src;

    // Cập nhật khung viền cho thumbnail
    document.querySelectorAll('.thumbnail-images img').forEach(img => {
        img.classList.remove('selected');
    });
    event.target.classList.add('selected');
}

function addToCart() {
    alert('Sản phẩm đã được thêm vào giỏ hàng!');
}

function increaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    quantityInput.value = parseInt(quantityInput.value) + 1;
}

function decreaseQuantity() {
    const quantityInput = document.getElementById('quantity');
    if (quantityInput.value > 1) {
        quantityInput.value = parseInt(quantityInput.value) - 1;
    }
}

