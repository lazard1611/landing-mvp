import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { BREAKPOINTS } from '../utils/constants';
import 'ScssComponents/logos.scss';

const logos = () => {
	const SELECTORS = {
		logo: '.js-logos-item',
		section: '.js-logos-section',
	};

	gsap.registerPlugin(ScrollTrigger);
	const $section = document.querySelector(SELECTORS.section);
	if (!$section) return;
	const $logos = $section.querySelectorAll(SELECTORS.logo);
	if (!$logos.length) return;

	let mm = gsap.matchMedia();
	mm.add(`(min-width: ${BREAKPOINTS.mediaPoint1}px)`, () => {
		const groups = Array.from($logos).reduce((acc, logo, index) => {
			const groupIndex = Math.floor(index / 3);
			acc[groupIndex] = acc[groupIndex] || [];
			acc[groupIndex].push(logo);
			return acc;
		}, []);

		groups.forEach((group) => {
			const tl = gsap.timeline({
				paused: true,
			});
			ScrollTrigger.create({
				trigger: group,
				start: 'top 80%',
				end: 'bottom top',
				// markers: true,
				animation: tl,
			});

			tl.fromTo(
				group,
				{
					opacity: 0,
					y: 100,
				},
				{
					opacity: 1,
					y: 0,
				},
			);
		});
	});
};

export default logos;
