import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import Accordion from './accordion';
import 'ScssComponents/faq.scss';

const faq = () => {
	const acc = new Accordion({
		triggers: document.querySelectorAll('.accordion__item_head'), // eslint-disable-line
		activeStateName: 'accordion__item--active-mod', // eslint-disable-line
	}).init();

	const SELECTORS = {
		section: '.js-faq-section',
		item: '.js-faq-item',
	};

	const $sections = document.querySelectorAll(SELECTORS.section);
	if (!$sections.length) return;

	$sections.forEach(($section) => {
		const $items = $section.querySelectorAll(SELECTORS.item);
		if (!$items.length) return;
		const tl = gsap.timeline({
			paused: true,
		});

		gsap.registerPlugin(ScrollTrigger);

		ScrollTrigger.create({
			trigger: $section,
			start: 'top 70%',
			end: 'bottom 70%',
			// markers: true,
			animation: tl,
		});

		tl.fromTo(
			$items,
			{
				y: 100,
				opacity: 0,
			},
			{
				y: 0,
				opacity: 1,
				stagger: 0.4,
			},
		);
	});
};

export default faq;
