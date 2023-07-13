import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BREAKPOINTS } from '../utils/constants';

const footer = () => {
	const SELECTORS = {
		footer: '.js-footer',
	};
	gsap.registerPlugin(ScrollTrigger);

	const $footer = document.querySelector(SELECTORS.footer);
	if (!$footer) return;

	let mm = gsap.matchMedia();
	mm.add(`(min-width: ${BREAKPOINTS.mediaPoint1}px)`, () => {
		const tl = gsap.timeline({
			paused: true,
		});

		ScrollTrigger.create({
			trigger: $footer,
			start: 'top top',
			end: 'bottom top',
			scrub: true,
			// markers: true,
			animation: tl,
		});

		tl.fromTo(
			$footer,
			{
				yPercent: -100,
			},
			{
				yPercent: 0,
				ease: 'none',
			},
		);
	});
};

export default footer;
