// search.js

// Dữ liệu tìm kiếm
const searchData = [
    {
        name: 'PC XPROART INTEL I7',
        category: 'PC Gaming',
        url: '../html/pc.html',
        keywords: ['pc', 'gaming', 'intel', 'i7', 'xproart']
    },
    {
        name: 'PC Class INTEL I5',
        category: 'PC Gaming',
        url: '../html/pc.html',
        keywords: ['pc', 'gaming', 'intel', 'i5', 'class']
    },
    {
        name: 'ASUS Vivobook S 15',
        category: 'Laptop',
        url: '../html/laptop.html',
        keywords: ['laptop', 'asus', 'vivobook', 'gaming']
    },
    {
        name: 'MSI Gaming Laptop',
        category: 'Laptop',
        url: '../html/laptop.html',
        keywords: ['laptop', 'msi', 'gaming']
    },
    {
        name: 'Bàn Phím Gaming DAREU EK98',
        category: 'Bàn Phím',
        url: '../html/banphim.html',
        keywords: ['bàn phím', 'gaming', 'dareu', 'ek98']
    },
    {
        name: 'Bàn Phím Gaming DAREU EK65S',
        category: 'Bàn Phím',
        url: '../html/banphim.html',
        keywords: ['bàn phím', 'gaming', 'dareu', 'ek65s']
    },
    {
        name: 'Chuột Gaming Logitech G502',
        category: 'Chuột',
        url: '../html/chuot.html',
        keywords: ['chuột', 'gaming', 'logitech', 'g502']
    },
    {
        name: 'Chuột Wireless Logitech M585',
        category: 'Chuột',
        url: '../html/chuot.html',
        keywords: ['chuột', 'wireless', 'logitech', 'm585']
    }
];

// Khởi tạo các elements
document.addEventListener('DOMContentLoaded', function() {
    initializeSearchComponent();
});

function initializeSearchComponent() {
    // Tìm form search
    const searchForm = document.querySelector('form[action="search_results.html"]');
    const searchInput = searchForm.querySelector('input[name="query"]');

    // Tạo container cho search
    const searchContainer = document.createElement('div');
    searchContainer.className = 'search-container';
    searchInput.parentNode.insertBefore(searchContainer, searchInput);
    searchContainer.appendChild(searchInput);

    // Tạo div cho suggestions
    const suggestionsDiv = document.createElement('div');
    suggestionsDiv.className = 'search-suggestions';
    searchContainer.appendChild(suggestionsDiv);

    // Thêm các event listeners
    setupEventListeners(searchInput, suggestionsDiv, searchForm, searchContainer);
}

function setupEventListeners(searchInput, suggestionsDiv, searchForm, searchContainer) {
    // Xử lý input
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value;
        showSuggestions(query, suggestionsDiv);
    });

    // Xử lý click vào suggestion
    suggestionsDiv.addEventListener('click', (e) => {
        const suggestionItem = e.target.closest('.suggestion-item');
        if (suggestionItem) {
            window.location.href = suggestionItem.dataset.url;
        }
    });

    // Xử lý form submit
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        handleSearch(searchInput.value);
    });

    // Đóng suggestions khi click ngoài
    document.addEventListener('click', (e) => {
        if (!searchContainer.contains(e.target)) {
            suggestionsDiv.style.display = 'none';
        }
    });

    // Xử lý phím tắt
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            suggestionsDiv.style.display = 'none';
        }
    });
}

function showSuggestions(query, suggestionsDiv) {
    if (!query) {
        suggestionsDiv.style.display = 'none';
        return;
    }

    // Tìm kiếm trong dữ liệu
    const suggestions = searchData.filter(item => {
        const searchTerms = query.toLowerCase().split(' ');
        return searchTerms.every(term =>
            item.name.toLowerCase().includes(term) ||
            item.keywords.some(keyword => keyword.toLowerCase().includes(term))
        );
    });

    if (suggestions.length === 0) {
        suggestionsDiv.style.display = 'none';
        return;
    }

    // Hiển thị suggestions
    suggestionsDiv.innerHTML = suggestions.map(item => `
        <div class="suggestion-item" data-url="${item.url}">
            ${item.name}
            <span class="suggestion-category">${item.category}</span>
        </div>
    `).join('');

    suggestionsDiv.style.display = 'block';
}

function handleSearch(query) {
    if (!query) return;

    const searchTerms = query.toLowerCase().split(' ');
    
    // Tìm kết quả phù hợp nhất
    const bestMatch = searchData.find(item => 
        searchTerms.every(term =>
            item.name.toLowerCase().includes(term) ||
            item.keywords.some(keyword => keyword.toLowerCase().includes(term))
        )
    );

    if (bestMatch) {
        window.location.href = bestMatch.url;
    } else {
        // Nếu không tìm thấy, chuyển đến trang kết quả tìm kiếm
        window.location.href = `search_results.html?query=${encodeURIComponent(query)}`;
    }
}