window.addEventListener('load', () => {
	let isMobile, customSlider, visibleSlides;

	const slider = document.querySelector('.customSlider');
	const enableMob = slider.classList.contains('custom-slider__slider--enable_mob');
	const enableDesk = slider.classList.contains('custom-slider__slider--enable_desk');
	const currentSlide = document.querySelector('.custom-slider_fractions__item--current');
	const totalSlides = document.querySelector('.custom-slider_fractions__item--total');

	renderCurrentSlider = (swiper) => {
		const slideWidth = slider.querySelector('.swiper-slide').clientWidth;
		const additionalNumber = Math.round(slider.clientWidth / slideWidth);

		let currentSlideNumber = swiper.activeIndex;

		if (currentSlideNumber > swiper.slides.length) currentSlideNumber = currentSlideNumber - 1;

		currentSlide.innerHTML = currentSlideNumber + additionalNumber;
	};

	sliderInit = () => {
		customSlider = new Swiper('.customSlider', {
			observer: true,
			speed: 800,
			slidesPerView: 'auto',
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
		renderCurrentSlider(customSlider);

		customSlider.on('slideChange', () => renderCurrentSlider(customSlider)),
			customSlider.on('resize', () => renderCurrentSlider(customSlider))
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