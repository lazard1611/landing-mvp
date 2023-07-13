import gsap from 'gsap';
import { ScrollSmoother } from 'vendors/ScrollSmoother';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { getWindowSize, onWindowResize } from '../utils';
import { BREAKPOINTS } from '../utils/constants';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const smoothAnimation = () => {
	const SELECTORS = {
		wrapper: '.wrapper',
		content: '.wrapper_in',
		excludedElement: '.js-excluded-element',
		img: '.js-parallax-img',
	};

	let isDesktopScreen;
	let { windowWidth } = getWindowSize();
	let scrollSmootherInited = false;
	let smoother;
	const $wrapper = document.querySelector(SELECTORS.wrapper);
	const $content = document.querySelector(SELECTORS.content);

	const initScrollSmoother = () => {
		smoother = ScrollSmoother.create({
			wrapper: $wrapper,
			content: $content,
			smooth: 1.5,
			effects: true,
			normalizeScroll: true,
			exclude: SELECTORS.excludedElement,
		});

		const $imgParallax = document.querySelectorAll(SELECTORS.img);
		if (!$imgParallax.length) return;

		smoother.effects($imgParallax, {
			speed: 'auto',
		});
	};

	const killScrollSmoother = () => {
		smoother.kill();
	};

	onWindowResize(() => {
		windowWidth = getWindowSize().windowWidth;
		isDesktopScreen = windowWidth > BREAKPOINTS.mediaPoint1;
		ScrollTrigger.update();
		if (isDesktopScreen) {
			if (!scrollSmootherInited) {
				initScrollSmoother();
				scrollSmootherInited = true;
			}
		} else {
			if (scrollSmootherInited) {
				killScrollSmoother();
				scrollSmootherInited = false;
			}
		}
	});
};

export default smoothAnimation;
