/* звездный рейтинг */
function updateStarRatings() {
	const ratings = document.querySelectorAll('.testimonials-slide__reiting')

	ratings.forEach((ratingElement) => {
		let rating = parseFloat(ratingElement.getAttribute('data-rating'))
		const stars = ratingElement.querySelectorAll('.star')

		// Округление по вашей логике
		if (rating >= 1.0 && rating <= 1.2) {
			rating = 1 // округляем до 1
		} else if (rating >= 1.3 && rating <= 1.4) {
			rating = 1.5 // округляем до 1.5
		} else if (rating >= 1.5 && rating < 2) {
			rating = 2 // округляем до 2
		} else if (rating >= 2 && rating < 2.3) {
			rating = 2 // округляем до 2
		} else if (rating >= 2.3 && rating < 2.6) {
			rating = 2.5 // округляем до 2.5
		} else if (rating >= 2.6 && rating < 3) {
			rating = 3 // округляем до 3
		} else if (rating >= 3 && rating < 3.3) {
			rating = 3 // округляем до 3
		} else if (rating >= 3.3 && rating < 3.6) {
			rating = 3.5 // округляем до 3.5
		} else if (rating >= 3.6 && rating < 4) {
			rating = 4 // округляем до 4
		} else if (rating >= 4 && rating < 4.3) {
			rating = 4 // округляем до 4
		} else if (rating >= 4.3 && rating < 4.6) {
			rating = 4.5 // округляем до 4.5
		} else if (rating >= 4.6 && rating <= 5) {
			rating = 5 // округляем до 5
		}

		stars.forEach((star, index) => {
			star.classList.remove('filled', 'half') // Сброс классов перед обновлением

			const fullStars = Math.floor(rating) // Количество полных звезд
			const hasHalfStar = rating - fullStars >= 0.5 // Проверка, нужно ли добавить половинную звезду

			// Если индекс меньше целой части, то это полная звезда
			if (index < fullStars) {
				star.classList.add('filled') // Полные звезды
			} else if (index === fullStars && hasHalfStar) {
				// Если есть половинная звезда, добавляем ее
				star.classList.add('half')
			}
		})
	})
}

updateStarRatings()

// Проверка ширины экрана для определения мобильного устройства
var isMobile = window.matchMedia('(max-width: 768px)').matches

// Инициализация слайдера Swiper для отзывов
var swiper = new Swiper('.testimonials-slide__information', {
	navigation: {
		nextEl: '.testimonials-slide__next', // Стрелка для перехода к следующему слайду
		prevEl: '.testimonials-slide__prev', // Стрелка для перехода к предыдущему слайду
	},
	slidesPerView: 1, // Показывать один слайд одновременно
	loop: true, // Бесконечный цикл
	speed: 800, // Скорость анимации смены слайдов
	effect: 'coverflow', // Используем эффект coverflow
	coverflowEffect: {
		rotate: 50, // Угол поворота
		stretch: 0, // Расстояние между слайдами
		depth: 100, // Глубина слайдов
		modifier: 1, // Интенсивность эффекта
		slideShadows: false, // Отключение теней для слайдов
	},
	fadeEffect: {
		crossFade: true, // Плавное перекрытие между слайдами
	},
	pagination: {
		el: '.swiper-pagination', // Элемент пагинации
		clickable: true, // Позволяет кликать по точкам пагинации
	},
	autoplay: isMobile
		? {
				delay: 3000, // Время между сменой слайдов (для мобильных)
				disableOnInteraction: false, // Автопрокрутка не останавливается при взаимодействии
		  }
		: false, // Отключение autoplay для десктопов
	on: {
		slideChange: function () {
			const currentSlide = this.slides[this.activeIndex]
			currentSlide.classList.add('animate__animated', 'animate__fadeIn') // Анимация для активного слайда
		},
	},
})

// Снятие закруглений для элементов с классом .event__top
// Это улучшает внешний вид списка событий
const eventItems = document.querySelectorAll('.event__item')
eventItems.forEach((item) => {
	if (item.querySelector('.event__top')) {
		item.style.borderTopLeftRadius = '0'
		item.style.borderTopRightRadius = '0'
	}
})

const showMore = document.querySelector('.reviews__button')
const reviewsList = document.querySelector('.reviews__list')
const allReviews = document.querySelectorAll('.reviews__item')
let visibleItems = 2

function getReviewText(count) {
	const lastDigit = count % 10
	const lastTwoDigits = count % 100
	if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
		return `Смотреть ${count} отзывов`
	} else if (lastDigit === 1) {
		return `Смотреть ${count} отзыв`
	} else if (lastDigit >= 2 && lastDigit <= 4) {
		return `Смотреть ${count} отзыва`
	} else {
		return `Смотреть ${count} отзывов`
	}
}

function updateButtonText() {
	const hiddenItems = allReviews.length - visibleItems
	showMore.textContent =
		hiddenItems > 0 ? getReviewText(hiddenItems) : 'Все отзывы отображены'
}

function loadMoreReviews() {
	visibleItems += 2
	const visibleReviews = Array.from(allReviews).slice(0, visibleItems)
	visibleReviews.forEach((item) => {
		item.style.display = 'block' // Добавляем элемент в разметку
		setTimeout(() => item.classList.add('is-visible'), 10) // Плавно отображаем
	})
	updateButtonText()
	if (visibleItems >= allReviews.length) {
		showMore.style.display = 'none'
	}
}

showMore.addEventListener('click', loadMoreReviews)
updateButtonText()
// Инициализация второго слайдера для "teacherSwiper"
var teacherSwiper = new Swiper('.teacherSwiper', {
	spaceBetween: 40, // Расстояние между слайдами
	slidesOffsetAfter: 0,
	slidesPerView: 'auto', // Автоматическое определение количества видимых слайдов
	navigation: {
		nextEl: '.teacher__next', // Навигация вперед
		prevEl: '.teacher__prev', // Навигация назад
	},
})

// Логика аккордеона для секции FAQ или других разделов с раскрывающимся контентом
const titles = document.querySelectorAll('.accordion__title')
const contents = document.querySelectorAll('.accordion__content')

titles.forEach((item) => {
	item.addEventListener('click', () => {
		const activeContent = document.querySelector('#' + item.dataset.tab)
		if (activeContent.classList.contains('active')) {
			activeContent.classList.remove('active')
			item.classList.remove('active')
			activeContent.style.maxHeight = 0
		} else {
			contents.forEach((element) => {
				element.classList.remove('active')
				element.style.maxHeight = 0
			})
			titles.forEach((element) => element.classList.remove('active'))
			item.classList.add('active')
			activeContent.classList.add('active')
			activeContent.style.maxHeight = activeContent.scrollHeight + 'px'
		}
	})
})

// Добавьте код для открытия определенного аккордеона по умолчанию, если нужно.

// Логика для мобильного меню с кнопкой-бургером
// Ожидаем полной загрузки DOM

document.addEventListener('DOMContentLoaded', () => {
	const burger = document.querySelector('.burger')
	const mobileMenu = document.querySelector('.header__list')
	const bodyLock = document.querySelector('body')

	burger.addEventListener('click', () => {
		mobileMenu.classList.toggle('menu--active')
		if (mobileMenu.classList.contains('menu--active')) {
			burger.classList.add('burger--active')
			bodyLock.classList.add('lock')
		} else {
			burger.classList.remove('burger--active')
			bodyLock.classList.remove('lock')
		}
	})

	document.addEventListener('click', (e) => {
		if (!burger.contains(e.target) && !mobileMenu.contains(e.target)) {
			burger.classList.remove('burger--active')
			mobileMenu.classList.remove('menu--active')
			bodyLock.classList.remove('lock')
		}
	})
})
