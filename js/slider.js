// Slider cho slider-container
const sliderContainer = document.querySelector('.slider-container .slider');
const slides = document.querySelectorAll('.slider-container .slide');
const paginationDots = document.querySelectorAll('.pagination .dot');
let currentSlideIndex = 0;

function showSlide(index) {
    // Điều chỉnh chỉ số slide hợp lệ
    if (index >= slides.length) {
        currentSlideIndex = 0;
    } else if (index < 0) {
        currentSlideIndex = slides.length - 1;
    } else {
        currentSlideIndex = index;
    }
  
    // Cập nhật vị trí slide
    sliderContainer.style.transform = `translateX(-${currentSlideIndex * 100}%)`;

    // Cập nhật chấm tròn trong pagination
    paginationDots.forEach(dot => dot.classList.remove('active'));
    paginationDots[currentSlideIndex].classList.add('active');
}

// Thay đổi slide khi click vào chấm tròn
paginationDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showSlide(index);
    });
});

// Thiết lập tự động chuyển đổi slide mỗi 5 giây
setInterval(() => {
    showSlide(currentSlideIndex + 1);
}, 5000);


// Slider cho màn hình máy tính
const screenProductContainer = document.querySelector('.screen-slider');
const screenPrevButton = document.querySelector('.screen-prev');
const screenNextButton = document.querySelector('.screen-next');
let currentScreenSlide = 0;

function showScreenSlide(index) {
  const totalScreenSlides = document.querySelectorAll('.screen-slider .product-item').length;
  if (index >= totalScreenSlides) {
    currentScreenSlide = 0;
  } else if (index < 0) {
    currentScreenSlide = totalScreenSlides - 1;
  } else {
    currentScreenSlide = index;
  }
  screenProductContainer.style.transform = `translateX(-${currentScreenSlide * 100 / totalScreenSlides}%)`;
}

screenPrevButton.addEventListener('click', () => {
  showScreenSlide(currentScreenSlide - 1);
});

screenNextButton.addEventListener('click', () => {
  showScreenSlide(currentScreenSlide + 1);
});

// Thiết lập tự động chuyển đổi slide mỗi 5 giây cho màn hình
setInterval(() => {
  showScreenSlide(currentScreenSlide + 1);
}, 5000);


// Slider cho bàn phím
const keyboardProductContainer = document.querySelector('.keyboard-slider');
const keyboardPrevButton = document.querySelector('.keyboard-prev');
const keyboardNextButton = document.querySelector('.keyboard-next');
let currentKeyboardSlide = 0;

function showKeyboardSlide(index) {
  const totalKeyboardSlides = document.querySelectorAll('.keyboard-slider .product-item').length;
  if (index >= totalKeyboardSlides) {
    currentKeyboardSlide = 0;
  } else if (index < 0) {
    currentKeyboardSlide = totalKeyboardSlides - 1;
  } else {
    currentKeyboardSlide = index;
  }
  keyboardProductContainer.style.transform = `translateX(-${currentKeyboardSlide * 100 / totalKeyboardSlides}%)`;
}

keyboardPrevButton.addEventListener('click', () => {
  showKeyboardSlide(currentKeyboardSlide - 1);
});

keyboardNextButton.addEventListener('click', () => {
  showKeyboardSlide(currentKeyboardSlide + 1);
});

// Thiết lập tự động chuyển đổi slide mỗi 5 giây cho bàn phím
setInterval(() => {
  showKeyboardSlide(currentKeyboardSlide + 1);
}, 5000);


// Slider cho PC-LAPTOP
const pcProductContainer = document.querySelector('.pc-slider');
const pcPrevButton = document.querySelector('.PC-prev');
const pcNextButton = document.querySelector('.PC-next');
let currentPCSlide = 0;

function showPCSlide(index) {
    const totalPCSlides = document.querySelectorAll('.pc-slider .product-item').length;
    
    // Kiểm tra và điều chỉnh index
    if (index >= totalPCSlides) {
        currentPCSlide = 0;
    } else if (index < 0) {
        currentPCSlide = totalPCSlides - 1;
    } else {
        currentPCSlide = index;
    }

    // Tính toán vị trí transform
    const slidePosition = -(currentPCSlide * 100 / totalPCSlides);
    pcProductContainer.style.transform = `translateX(${slidePosition}%)`;
}

// Xử lý sự kiện nút Previous
pcPrevButton.addEventListener('click', () => {
    showPCSlide(currentPCSlide - 1);
});

// Xử lý sự kiện nút Next
pcNextButton.addEventListener('click', () => {
    showPCSlide(currentPCSlide + 1);
});

// Tự động chuyển slide sau mỗi 5 giây
setInterval(() => {
    showPCSlide(currentPCSlide + 1);
}, 5000);


