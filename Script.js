const products = [
    { id: 1, category: 'milktea', name: "Trà sữa Trân châu", price: 35000, img: "img/34c1de9eba347d06b26776df83b7e88a.jpg" },
    { id: 2, category: 'milktea', name: "Trà sữa Khoai môn", price: 38000, img: " img/images (2).jpg" },
    { id: 3, category: 'milktea', name: "Trà sữa phô mai", price: 38000, img: " img/cach-lam-tra-sua-pho-mai-tuoi.jpg" },
    { id: 4, category: 'blacktea', name: "Hồng trà kem ", price: 30000, img: "img/images (8).jpg" },
    { id: 5, category: 'blacktea', name: "Hồng trà phô mai ", price: 35000, img: "img/Hong-Tra-Kem-Pho-Mai-2-copy-300x300.jpg" },
    { id: 6, category: 'matcha', name: "Matcha Latte nóng", price: 45000, img: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=400" },
    { id: 7, category: 'matcha', name: "Matcha kem trứng ", price: 30000, img: "img/images (4).jpg" },
    { id: 8, category: 'cake', name: "Tiramisu", price: 55000, img: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400" },
    { id: 9, category: 'cake', name: "Cheesecake Dâu", price: 50000, img: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400" },
    { id: 10, category: 'cake', name: "Cheesecake socola", price: 45000, img: "img/Decadent Chocolate Crepe Cake with Layers.jpg" },
    { id: 11, category: 'cake', name: " bánh su ", price: 25000, img: "img/bánh su.jpg" }
];

let cart = [];

// Hiển thị sản phẩm
function renderProducts(filter = 'all') {
    const list = document.getElementById('product-list');
    list.innerHTML = "";
    
    const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
    
    filtered.forEach(p => {
        list.innerHTML += `
            <div class="product-card">
                <img src="${p.img}">
                <h3>${p.name}</h3>
                <p>${p.price.toLocaleString()}đ</p>
                <button onclick="addToCart(${p.id})" class="btn-main" style="padding: 5px 15px; font-size: 0.9rem;">Thêm</button>
            </div>
        `;
    });
}

function filterMenu(cat) {
    renderProducts(cat);
}

// Giỏ hàng logic
function addToCart(id) {
    const p = products.find(item => item.id === id);
    cart.push(p);
    updateCart();
}

function updateCart() {
    document.getElementById('cart-count').innerText = cart.length;
    const list = document.getElementById('cart-items-list');
    list.innerHTML = "";
    
    let total = 0;
    cart.forEach((item, index) => {
        total += item.price;
        list.innerHTML += `
            <div class="cart-item">
                <span>${item.name}</span>
                <span>${item.price.toLocaleString()}đ</span>
                <button onclick="removeItem(${index})" style="color:red; border:none; background:none; cursor:pointer;">Xóa</button>
            </div>
        `;
    });
    document.getElementById('cart-total').innerText = total.toLocaleString();
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function clearCart() {
    if(confirm("Bạn muốn xóa toàn bộ giỏ hàng?")) {
        cart = [];
        updateCart();
    }
}

// Thanh toán
function openCheckout() {
    if(cart.length === 0) return alert("Giỏ hàng đang trống!");
    document.getElementById('checkout-modal').style.display = 'flex';
}

function closeCheckout() {
    document.getElementById('checkout-modal').style.display = 'none';
}

function confirmOrder() {
    const name = document.getElementById('cust-name').value;
    if(!name) return alert("Vui lòng nhập tên!");
    
    alert(`Cảm ơn ${name}! Đơn hàng đã được đặt thành công.`);
    cart = [];
    updateCart();
    closeCheckout();
}

renderProducts();