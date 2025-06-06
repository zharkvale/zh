// Получаем все кнопки навигации
const navButtons = document.querySelectorAll('.nav-button');

// Добавляем обработчики событий для каждой кнопки
navButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Здесь можно добавить логику для обработки клика по кнопке
        console.log(`Нажата кнопка: ${button.textContent}`);
    });
});

// Добавляем эффект свечения для заголовка
const mainHeading = document.querySelector('.main-heading');

function toggleGlow() {
    mainHeading.classList.add('glow');
    
    setTimeout(() => {
        mainHeading.classList.remove('glow');
        
        setTimeout(toggleGlow, 2000); // Пауза 2 секунды перед следующим свечением
    }, 2000); // Свечение длится 2 секунды
}

// Запускаем анимацию свечения
toggleGlow();

// Код для слайдера
const slider = {
    container: document.querySelector('.slider-container'),
    slides: document.querySelectorAll('.slide'),
    dots: document.querySelectorAll('.dot'),
    prevButton: document.querySelector('.slider-button.prev'),
    nextButton: document.querySelector('.slider-button.next'),
    currentSlide: 0,
    autoPlayInterval: null,
    
    init() {
        // Показываем первый слайд
        this.slides[0].classList.add('active');
        this.addEventListeners();
        this.startAutoPlay();
    },
    
    addEventListeners() {
        this.prevButton.addEventListener('click', () => {
            this.prevSlide();
            this.restartAutoPlay();
        });
        this.nextButton.addEventListener('click', () => {
            this.nextSlide();
            this.restartAutoPlay();
        });
        
        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.restartAutoPlay();
            });
        });
        
        // Остановка автопрокрутки при наведении на слайдер
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Обработка свайпов на мобильных устройствах
        let touchStartX = 0;
        let touchEndX = 0;
        
        this.container.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.stopAutoPlay();
        });
        
        this.container.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            if (touchStartX - touchEndX > 50) {
                this.nextSlide();
            } else if (touchEndX - touchStartX > 50) {
                this.prevSlide();
            }
            this.startAutoPlay();
        });
    },
    
    updateSlidePosition() {
        // Убираем активный класс у всех слайдов
        this.slides.forEach(slide => slide.classList.remove('active'));
        // Добавляем активный класс текущему слайду
        this.slides[this.currentSlide].classList.add('active');
        
        // Обновляем активную точку
        this.dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    },
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlidePosition();
    },
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlidePosition();
    },
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlidePosition();
    },
    
    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 3000); // Уменьшили интервал до 3 секунд
    },
    
    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    },

    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
};

// Инициализация слайдера после загрузки страницы
window.addEventListener('load', () => slider.init());

// Функции для работы с попапами
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
    }
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = ''; // Возвращаем прокрутку страницы
    }
}

// Закрытие попапа при клике вне его содержимого
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('popup-overlay')) {
        closePopup(event.target.id);
    }
});

// Предотвращаем закрытие попапа при клике на кнопку "Заказать" внутри карточки
document.querySelectorAll('.product-button').forEach(button => {
    button.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});

// Добавляем обработчики для всех карточек товаров
document.addEventListener('DOMContentLoaded', function() {
    // Новинки
    document.querySelector('.category-section:nth-child(2) .products-grid .product-card:nth-child(1)').onclick = () => openPopup('new1');
    document.querySelector('.category-section:nth-child(2) .products-grid .product-card:nth-child(2)').onclick = () => openPopup('new2');
    document.querySelector('.category-section:nth-child(2) .products-grid .product-card:nth-child(3)').onclick = () => openPopup('new3');
    document.querySelector('.category-section:nth-child(2) .products-grid .product-card:nth-child(4)').onclick = () => openPopup('new4');

    // Букеты
    document.querySelector('.category-section:nth-child(3) .products-grid .product-card:nth-child(1)').onclick = () => openPopup('bouquet1');
    document.querySelector('.category-section:nth-child(3) .products-grid .product-card:nth-child(2)').onclick = () => openPopup('bouquet2');
    document.querySelector('.category-section:nth-child(3) .products-grid .product-card:nth-child(3)').onclick = () => openPopup('bouquet3');
    document.querySelector('.category-section:nth-child(3) .products-grid .product-card:nth-child(4)').onclick = () => openPopup('bouquet4');

    // Композиции
    document.querySelector('.category-section:nth-child(4) .products-grid .product-card:nth-child(1)').onclick = () => openPopup('comp1');
    document.querySelector('.category-section:nth-child(4) .products-grid .product-card:nth-child(2)').onclick = () => openPopup('comp2');
    document.querySelector('.category-section:nth-child(4) .products-grid .product-card:nth-child(3)').onclick = () => openPopup('comp3');
    document.querySelector('.category-section:nth-child(4) .products-grid .product-card:nth-child(4)').onclick = () => openPopup('comp4');

    // Необычные букеты
    document.querySelector('.category-section:nth-child(5) .products-grid .product-card:nth-child(1)').onclick = () => openPopup('unusual1');
    document.querySelector('.category-section:nth-child(5) .products-grid .product-card:nth-child(2)').onclick = () => openPopup('unusual2');
    document.querySelector('.category-section:nth-child(5) .products-grid .product-card:nth-child(3)').onclick = () => openPopup('unusual3');
    document.querySelector('.category-section:nth-child(5) .products-grid .product-card:nth-child(4)').onclick = () => openPopup('unusual4');
});

// Функционал аккордеона
document.querySelectorAll('.accordion-header').forEach(button => {
    button.addEventListener('click', () => {
        const accordionItem = button.parentElement;
        const isActive = accordionItem.classList.contains('active');
        
        // Закрываем все активные элементы
        document.querySelectorAll('.accordion-item').forEach(item => {
            item.classList.remove('active');
        });

        // Если элемент не был активен, открываем его
        if (!isActive) {
            accordionItem.classList.add('active');
        }
    });
});

// Функционал кнопки прокрутки наверх
const scrollToTopButton = document.getElementById('scroll-to-top');

// Показываем кнопку, когда пользователь прокрутил страницу на 300px
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollToTopButton.classList.add('visible');
    } else {
        scrollToTopButton.classList.remove('visible');
    }
});

// Плавная прокрутка наверх при клике на кнопку
scrollToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Функционал формы вопроса
const questionButton = document.querySelector('.ask-question-button');
const questionPopup = document.getElementById('question-popup');
const successNotification = document.getElementById('success-notification');

questionButton.addEventListener('click', () => {
    questionPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
});

function closeQuestionPopup() {
    questionPopup.classList.remove('active');
    document.body.style.overflow = '';
}

function submitQuestion() {
    // Получаем значения полей
    const phone = document.getElementById('phone').value;
    const question = document.getElementById('question').value;

    // Проверяем заполнение полей
    if (!phone || !question) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    // Закрываем попап
    closeQuestionPopup();

    // Очищаем поля формы
    document.getElementById('phone').value = '';
    document.getElementById('question').value = '';

    // Показываем уведомление
    successNotification.style.display = 'block';

    // Скрываем уведомление через 5 секунд
    setTimeout(() => {
        successNotification.style.display = 'none';
    }, 5000);
}

// Закрытие попапа при клике вне его содержимого
questionPopup.addEventListener('click', (event) => {
    if (event.target === questionPopup) {
        closeQuestionPopup();
    }
});

// Функционал карусели отзывов
const reviewsCarousel = {
    container: document.querySelector('.reviews-carousel'),
    slides: document.querySelectorAll('.review-slide'),
    prevButton: document.querySelector('.review-nav.prev'),
    nextButton: document.querySelector('.review-nav.next'),
    dotsContainer: document.querySelector('.review-dots'),
    currentSlide: 0,
    autoPlayInterval: null,

    init() {
        // Создаем точки навигации
        this.createDots();
        
        // Показываем первый слайд
        this.slides[0].classList.add('active');
        this.dots[0].classList.add('active');
        
        // Добавляем обработчики событий
        this.addEventListeners();
        
        // Запускаем автопрокрутку
        this.startAutoPlay();
    },

    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('review-dot');
            this.dotsContainer.appendChild(dot);
        });
        this.dots = this.dotsContainer.querySelectorAll('.review-dot');
    },

    addEventListeners() {
        this.prevButton.addEventListener('click', () => {
            this.prevSlide();
            this.restartAutoPlay();
        });

        this.nextButton.addEventListener('click', () => {
            this.nextSlide();
            this.restartAutoPlay();
        });

        this.dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                this.goToSlide(index);
                this.restartAutoPlay();
            });
        });

        // Остановка автопрокрутки при наведении на слайдер
        this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.container.addEventListener('mouseleave', () => this.startAutoPlay());
    },

    updateSlidePosition() {
        // Убираем активный класс у всех слайдов и точек
        this.slides.forEach(slide => slide.classList.remove('active'));
        this.dots.forEach(dot => dot.classList.remove('active'));

        // Добавляем активный класс текущему слайду и точке
        this.slides[this.currentSlide].classList.add('active');
        this.dots[this.currentSlide].classList.add('active');
    },

    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlidePosition();
    },

    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlidePosition();
    },

    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlidePosition();
    },

    startAutoPlay() {
        this.stopAutoPlay();
        this.autoPlayInterval = setInterval(() => this.nextSlide(), 5000);
    },

    stopAutoPlay() {
        if (this.autoPlayInterval) {
            clearInterval(this.autoPlayInterval);
            this.autoPlayInterval = null;
        }
    },

    restartAutoPlay() {
        this.stopAutoPlay();
        this.startAutoPlay();
    }
};

// Инициализация карусели отзывов после загрузки страницы
window.addEventListener('load', () => {
    reviewsCarousel.init();
});

// Функционал попапа отзыва
const addReviewButton = document.querySelector('.add-review-button');
const reviewPopup = document.getElementById('review-popup');

addReviewButton.addEventListener('click', () => {
    reviewPopup.classList.add('active');
    document.body.style.overflow = 'hidden';
});

function closeReviewPopup() {
    reviewPopup.classList.remove('active');
    document.body.style.overflow = '';
}

function submitReview() {
    // Получаем значения полей
    const name = document.getElementById('review-name').value;
    const phone = document.getElementById('review-phone').value;
    const email = document.getElementById('review-email').value;
    const reviewText = document.getElementById('review-text').value;

    // Проверяем заполнение полей
    if (!name || !phone || !email || !reviewText) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    // Закрываем попап
    closeReviewPopup();

    // Очищаем поля формы
    document.getElementById('review-name').value = '';
    document.getElementById('review-phone').value = '';
    document.getElementById('review-email').value = '';
    document.getElementById('review-text').value = '';

    // Показываем уведомление
    successNotification.style.display = 'block';

    // Скрываем уведомление через 5 секунд
    setTimeout(() => {
        successNotification.style.display = 'none';
    }, 5000);
}

// Закрытие попапа при клике вне его содержимого
reviewPopup.addEventListener('click', (event) => {
    if (event.target === reviewPopup) {
        closeReviewPopup();
    }
});

// Обновляем время автопрокрутки карусели отзывов
reviewsCarousel.startAutoPlay = function() {
    this.stopAutoPlay();
    this.autoPlayInterval = setInterval(() => this.nextSlide(), 7000); // Увеличили интервал до 7 секунд
};

// Функция форматирования номера телефона
function formatPhoneNumber(input) {
    let value = input.value.replace(/\D/g, '');
    if (value.length > 0) {
        if (value[0] === '7' || value[0] === '8') {
            value = value.substring(1);
        }
        let formattedNumber = '+7';
        if (value.length > 0) {
            formattedNumber += ' (' + value.substring(0, 3);
        }
        if (value.length > 3) {
            formattedNumber += ') ' + value.substring(3, 6);
        }
        if (value.length > 6) {
            formattedNumber += '-' + value.substring(6, 8);
        }
        if (value.length > 8) {
            formattedNumber += '-' + value.substring(8, 10);
        }
        input.value = formattedNumber;
    }
}

// Добавляем обработчики для полей ввода телефона
document.addEventListener('DOMContentLoaded', function() {
    const phoneInputs = [
        document.getElementById('phone'),
        document.getElementById('review-phone')
    ];

    phoneInputs.forEach(input => {
        if (input) {
            input.addEventListener('input', function() {
                formatPhoneNumber(this);
            });

            input.addEventListener('focus', function() {
                if (!this.value) {
                    this.value = '+7';
                }
            });

            input.addEventListener('blur', function() {
                if (this.value === '+7') {
                    this.value = '';
                }
            });
        }
    });
});

// Функция плавной прокрутки к разделам
function scrollToSection(sectionId) {
    let sectionMap = {
        'new-items': '.category-section:nth-child(2)',
        'bouquets': '.category-section:nth-child(3)',
        'compositions': '.category-section:nth-child(4)',
        'unusual': '.category-section:nth-child(5)'
    };

    const section = document.querySelector(sectionMap[sectionId]);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Обработчики для кнопок в шапке
document.addEventListener('DOMContentLoaded', function() {
    // Кнопка "Каталог"
    const catalogButton = document.querySelector('.nav-button:nth-child(1)');
    if (catalogButton) {
        catalogButton.addEventListener('click', function() {
            const productsSection = document.querySelector('.products-section');
            if (productsSection) {
                productsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Кнопка "Контакты"
    const contactsButton = document.querySelector('.nav-button:nth-child(2)');
    if (contactsButton) {
        contactsButton.addEventListener('click', function() {
            const footer = document.querySelector('.footer');
            if (footer) {
                footer.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Кнопка "Отзывы"
    const reviewsButton = document.querySelector('.nav-button:nth-child(3)');
    if (reviewsButton) {
        reviewsButton.addEventListener('click', function() {
            const reviewsSection = document.querySelector('.reviews-section');
            if (reviewsSection) {
                reviewsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});

// Функция открытия попапа вопроса
function openQuestionPopup() {
    const questionPopup = document.getElementById('question-popup');
    if (questionPopup) {
        questionPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

// Функционал попапа заказа
function openOrderPopup() {
    const orderPopup = document.getElementById('order-popup');
    if (orderPopup) {
        orderPopup.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeOrderPopup() {
    const orderPopup = document.getElementById('order-popup');
    if (orderPopup) {
        orderPopup.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function submitOrder() {
    // Получаем значения полей
    const name = document.getElementById('order-name').value;
    const phone = document.getElementById('order-phone').value;
    const email = document.getElementById('order-email').value;

    // Проверяем заполнение полей
    if (!name || !phone || !email) {
        alert('Пожалуйста, заполните все поля');
        return;
    }

    // Закрываем попап
    closeOrderPopup();

    // Очищаем поля формы
    document.getElementById('order-name').value = '';
    document.getElementById('order-phone').value = '';
    document.getElementById('order-email').value = '';

    // Показываем уведомление
    successNotification.style.display = 'block';

    // Скрываем уведомление через 5 секунд
    setTimeout(() => {
        successNotification.style.display = 'none';
    }, 5000);
}

// Закрытие попапа при клике вне его содержимого
document.addEventListener('DOMContentLoaded', function() {
    const orderPopup = document.getElementById('order-popup');
    if (orderPopup) {
        orderPopup.addEventListener('click', (event) => {
            if (event.target === orderPopup) {
                closeOrderPopup();
            }
        });
    }

    // Добавляем форматирование телефона для поля заказа
    const orderPhoneInput = document.getElementById('order-phone');
    if (orderPhoneInput) {
        orderPhoneInput.addEventListener('input', function() {
            formatPhoneNumber(this);
        });

        orderPhoneInput.addEventListener('focus', function() {
            if (!this.value) {
                this.value = '+7';
            }
        });

        orderPhoneInput.addEventListener('blur', function() {
            if (this.value === '+7') {
                this.value = '';
            }
        });
    }
}); 