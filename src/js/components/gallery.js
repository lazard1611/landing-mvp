import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { BREAKPOINTS } from '../utils/constants';
import 'ScssComponents/gallery.scss';

const gallery = () => {
	const SELECTORS = {
		section: '.js-gallery-section',
		item: '.js-gallery-item',
	};

	const $sections = document.querySelectorAll(SELECTORS.section);
	if (!$sections.length) return;

	$sections.forEach(($section) => {
		const $items = $section.querySelectorAll(SELECTORS.item);
		if (!$items.length) return;
		let mm = gsap.matchMedia();
		mm.add(`(min-width: ${BREAKPOINTS.mediaPoint1}px)`, () => {
			const tl = gsap.timeline({
				paused: true,
			});

			gsap.registerPlugin(ScrollTrigger);

			ScrollTrigger.create({
				trigger: $section,
				start: 'top center',
				end: 'bottom center',
				// markers: true,
				animation: tl,
			});

			tl.fromTo(
				$items,
				{
					scale: 0,
				},
				{
					scale: 1,
					stagger: 0.1,
				},
			);
		});
	});
};

export default gallery;
