import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { onWindowResize } from '../utils';
import { BREAKPOINTS } from '../utils/constants';
import 'ScssComponents/team.scss';

const team = () => {
	const SELECTORS = {
		section: '.js-team-section',
		item: '.js-team-item',
		btn: '.js-team-btn',
	};

	const CLASSES = {
		activeBtn: 'team__button--active_state',
	};

	const $sections = document.querySelectorAll(SELECTORS.section);
	if (!$sections.length) return;

	gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

	$sections.forEach(($section) => {
		const $items = $section.querySelectorAll(SELECTORS.item);
		const $item = $section.querySelector(SELECTORS.item);
		const $btn = $section.querySelector(SELECTORS.btn);
		if (!$btn) return;
		const tl = gsap.timeline({
			paused: true,
		});
		const $nextSection = $section.nextElementSibling;
		const $prevSection = $section.previousElementSibling;

		const addActiveClass = () => {
			$btn.classList.add(CLASSES.activeBtn);
		};

		const removeActiveClass = () => {
			$btn.classList.remove(CLASSES.activeBtn);
		};

		const scrollDown = () => {
			$btn.style.transform = 'rotate(0deg)';
			if (!$nextSection) return;
			$btn.addEventListener('click', () => {
				gsap.to(window, {
					scrollTo: $nextSection,
				});
			});
		};

		const scrollUp = () => {
			$btn.style.transform = 'rotate(180deg)';
			if (!$prevSection) return;
			$btn.addEventListener('click', () => {
				gsap.to(window, {
					scrollTo: $prevSection,
				});
			});
		};

		ScrollTrigger.create({
			trigger: $section,
			start: 'top top',
			end: `${$item.offsetWidth * $items.length} top`,
			pin: true,
			scrub: 1,
			// markers: true,
			onEnter: () => {
				// console.log('on enter');
				setTimeout(() => {
					addActiveClass();
					scrollDown();
				}, 0.5);
			},
			onEnterBack: () => {
				// console.log('on enter back');
				setTimeout(() => {
					addActiveClass();
					scrollUp();
				}, 0.5);
			},
			onLeave: () => {
				// console.log('on leave');
				setTimeout(() => {
					removeActiveClass();
				}, 0.5);
			},
			onLeaveBack: () => {
				// console.log('on leave back');
				setTimeout(() => {
					removeActiveClass();
				}, 0.5);
			},
			animation: tl,
		});

		tl.to($items, {
			xPercent: -100 * ($items.length - 1),
			duration: 1,
			ease: 'none',
		});

		onWindowResize(() => {
			ScrollTrigger.refresh();
		});
	});
};

export default team;
