window.addEventListener('load', () => {
	let isMobile, customSlider, visibleSlides;

	const slider = document.querySelector('.customSlider');
	const enableMob = slider.classList.contains('custom-slider__slider--enable_mob');
	const enableDesk = slider.classList.contains('custom-slider__slider--enable_desk');
	const currentSlide = document.querySelector('.custom-slider_fractions__item--current');
	const totalSlides = document.querySelector('.custom-slider_fractions__item--total');

	renderCurrentSlider = () => {
		let additionNumber = window.innerWidth < 750 ? 1 : 0;

		visibleSlides = slider.querySelectorAll('.swiper-slide-visible');
		currentSlide.innerHTML = customSlider.realIndex + visibleSlides.length - additionNumber;
	};

	sliderInit = () => {
		customSlider = new Swiper('.customSlider', {
			observer: true,
			speed: 800,
			slidesPerView: 'auto',
			watchSlidesProgress: true,
			navigation: {
				nextEl: '.custom-slider__navigation .custom-slider__arrow--next',
				prevEl: '.custom-slider__navigation .custom-slider__arrow--prev'
			},
			pagination: {
				el: '.custom-slider__navigation .custom-slider__dotts',
				type: 'bullets',
				clickable: true
			},
			scrollbar: {
				el: '.custom-slider__navigation .custom-slider__scrollbar',
				draggable: true,
			}
		});


		totalSlides.innerHTML = customSlider.slides.length;
		renderCurrentSlider();

		customSlider.on('slideChange', () => renderCurrentSlider()),
			customSlider.on('resize', () => renderCurrentSlider())
	};

	toggleSlider = () => {
		isMobile = window.innerWidth < 750;

		if (isMobile && enableMob && !slider.classList.contains('swiper-initialized')) {
			sliderInit();
		} else if (!isMobile && enableDesk && !slider.classList.contains('swiper-initialized')) {
			sliderInit();
		} else if (
			slider.classList.contains('swiper-initialized') &&
			(!enableMob && !enableDesk) ||
			(!enableMob && isMobile) ||
			(!enableDesk && !isMobile)
		) {
			customSlider.destroy(true, true);
		}
	};

	toggleSlider();
	window.addEventListener('resize', () => toggleSlider());
});