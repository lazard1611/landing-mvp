import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import 'ScssComponents/our-capabilities.scss';
import { BREAKPOINTS } from '../utils/constants';

const ourCapabilities = () => {
	const SELECTORS = {
		section: '.js-our-capabilities-section',
		flash: '.js-flashlight',
	};

	const CLASSES = {
		activeState: 'our_capabilities__flashlight--active_state',
	};

	const $sections = document.querySelectorAll(SELECTORS.section);
	if (!$sections.length) return;

	gsap.registerPlugin(ScrollTrigger);

	$sections.forEach(($section) => {
		const $flashlight = $section.querySelector(SELECTORS.flash);
		if (!$flashlight) return;
		const sectionRect = $section.getBoundingClientRect();

		const handleMouseMove = (e) => {
			const scrollY = window.pageYOffset || document.documentElement.scrollTop;
			const relativeX = e.clientX;
			const relativeY = e.clientY + scrollY - sectionRect.top - 10;

			gsap.set($flashlight, {
				x: relativeX,
				y: relativeY,
			});
		};

		const addClass = () => {
			$flashlight.classList.add(CLASSES.activeState);
		};

		const removeClass = () => {
			$flashlight.classList.remove(CLASSES.activeState);
		};

		const handleMouseLeave = () => {
			removeClass();
		};

		const handleMouseEnter = () => {
			addClass();
		};

		$section.addEventListener('mousemove', handleMouseMove);
		$section.addEventListener('mouseleave', handleMouseLeave);
		$section.addEventListener('mouseenter', handleMouseEnter);
	});
};

export default ourCapabilities;
