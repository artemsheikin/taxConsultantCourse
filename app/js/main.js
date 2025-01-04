const showMore = document.querySelector('.reviews__button')
const reviewsList = document.querySelector('.reviews__list')
const allReviews = document.querySelectorAll('.reviews__item') // Все отзывы
let visibleItems = 2 // Изначально отображаем 2 отзыва

// Функция для обновления текста кнопки
function updateButtonText() {
	const hiddenItems = allReviews.length - visibleItems

	// Проверяем, сколько отзывов осталось и изменяем текст кнопки
	if (hiddenItems === 1) {
		showMore.textContent = `Смотреть 1 отзыв`
	} else if (hiddenItems > 1) {
		showMore.textContent = `Смотреть ${hiddenItems} отзывов`
	} else {
		showMore.textContent = `Все отзывы отображены`
	}
}

// Функция для отображения скрытых отзывов
function loadMoreReviews() {
	visibleItems += 2 // Показываем еще 2 отзыва

	// Получаем все элементы отзывов
	const visibleReviews = Array.from(allReviews).slice(0, visibleItems)
	visibleReviews.forEach((item) => {
		item.classList.add('is-visible') // Добавляем класс для отображения отзыва
	})

	// Обновляем текст кнопки
	updateButtonText()

	// Если все элементы видны, скрываем кнопку
	if (visibleItems >= allReviews.length) {
		showMore.style.display = 'none' // Скрываем кнопку, если все отзывы показаны
	}
}

// Обработчик события для кнопки
showMore.addEventListener('click', loadMoreReviews)

// Изначально обновим текст кнопки
updateButtonText()

/*teacherSwiper */
var swiper = new Swiper('.teacherSwiper', {
	spaceBetween: 40,
	slidesOffsetAfter: 0,
	slidesPerView: 'auto',
	navigation: {
		nextEl: '.teacher__next',
		prevEl: '.teacher__prev',
	},
})

/* про аккордион */

// 1. Сначала мы выбираем все заголовки аккордеонов (по классу .accordion-pro__title)
const titles = document.querySelectorAll('.accordion__title')

// 2. С помощью этого мы выбираем все элементы контента аккордеонов (по классу .accordion-pro__content)
const contents = document.querySelectorAll('.accordion__content')

// 3. Для каждого заголовка аккордеона добавляем обработчик события (когда на него нажимают)
titles.forEach((item) => {
	item.addEventListener('click', () => {
		// 4. Когда на заголовок нажали, мы ищем контент, который связан с этим заголовком
		// Мы ищем элемент с id, который совпадает с данными, хранящимися в data-tab заголовка
		const activeContent = document.querySelector('#' + item.dataset.tab)

		// 5. Проверяем, если этот контент уже открыт (если у него есть класс 'active')
		if (activeContent.classList.contains('active')) {
			// 6. Если открыт, скрываем его (удаляем класс 'active' и ставим maxHeight равным 0, чтобы скрыть)
			activeContent.classList.remove('active')
			item.classList.remove('active')
			activeContent.style.maxHeight = 0
		} else {
			// 7. Если он не открыт, то мы сначала закрываем все аккордеоны
			contents.forEach((element) => {
				element.classList.remove('active')
				element.style.maxHeight = 0 // Скрываем все контенты, устанавливая их maxHeight в 0
			})

			// 8. Убираем активный класс с всех заголовков аккордеонов
			titles.forEach((element) => element.classList.remove('active'))

			// 9. Теперь открываем тот аккордеон, на который нажали:
			item.classList.add('active') // Добавляем класс 'active' для заголовка
			activeContent.classList.add('active') // Добавляем класс 'active' для контента
			activeContent.style.maxHeight = activeContent.scrollHeight + 'px' // Устанавливаем максимальную высоту контента в его естественную высоту
		}
	})
})

/* // 10. Здесь мы сразу открываем второй аккордеон при загрузке страницы, добавляем классы 'active' как для заголовка, так и для контента.
document.querySelector('[data-tab=tab-2]').classList.add('active')
document.querySelector('#tab-2').classList.add('active')
document.querySelector('#tab-2').style.maxHeight =
	document.querySelector('#tab-2').scrollHeight + 'px' // Устанавливаем максимальную высоту для второго аккордеона на его реальную высоту */

/* бургер */

// Ожидаем, пока DOM полностью загрузится
document.addEventListener('DOMContentLoaded', () => {
	// Находим элементы на странице
	const burger = document.querySelector('.burger') // Кнопка бургера
	const mobileMenu = document.querySelector('.header__list') // Мобильное меню
	const bodyLock = document.querySelector('body') // Тег body для блокировки прокрутки

	// Обработчик клика по кнопке бургера
	burger.addEventListener('click', () => {
		// Добавляем/удаляем активный класс у мобильного меню
		mobileMenu.classList.toggle('menu--active')

		// Проверяем, открыто ли меню
		if (mobileMenu.classList.contains('menu--active')) {
			// Если меню открыто, меняем иконку бургера на крестик
			burger.classList.add('burger--active')
			// Блокируем прокрутку страницы при открытом меню
			bodyLock.classList.add('lock')
		} else {
			// Если меню закрыто, возвращаем иконку бургера в исходное состояние
			burger.classList.remove('burger--active')
			// Разрешаем прокрутку страницы при закрытом меню
			bodyLock.classList.remove('lock')
		}
	})

	// Обработчик клика по всему документу
	document.addEventListener('click', (e) => {
		// Если клик был не по бургеру и не по меню
		if (e.target !== burger && e.target !== mobileMenu) {
			// Закрываем меню и возвращаем бургер в исходное состояние
			burger.classList.remove('burger--active')
			mobileMenu.classList.remove('menu--active')
			// Разрешаем прокрутку страницы
			bodyLock.classList.remove('lock')
		}
	})
})
