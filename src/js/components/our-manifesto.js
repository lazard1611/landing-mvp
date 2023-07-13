import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { BREAKPOINTS } from '../utils/constants';
import 'ScssComponents/our-manifesto.scss';

const ourManifesto = () => {
	const SELECTORS = {
		section: '.js-our-manifesto-section',
		item: '.js-our-manifesto-item',
	};

	const CLASSES = {
		activeState: 'our_manifesto__item--active_state',
		activePicState: 'our_manifesto__pic--active_state',
	};

	const $sections = document.querySelectorAll(SELECTORS.section);
	if (!$sections.length) return;

	const addActiveState = (item) => {
		if (!item.classList.contains(CLASSES.activeState)) {
			item.classList.add(CLASSES.activeState);
		}
	};

	const removeActiveState = (item) => {
		if (item.classList.contains(CLASSES.activeState)) {
			item.classList.remove(CLASSES.activeState);
		}
	};

	$sections.forEach(($section) => {
		const $items = $section.querySelectorAll(SELECTORS.item);
		if (!$items.length) return;

		gsap.registerPlugin(ScrollTrigger);

		$items.forEach(($item, index) => {
			const $pic = $item.querySelector('picture');
			const sectionRect = $item.getBoundingClientRect();

			const handleMouseMove = (e) => {
				const scrollY = window.pageYOffset;
				const relativeX = e.clientX - 300;
				const relativeY = e.clientY + scrollY - sectionRect.top;

				if ($item.classList.contains(CLASSES.activeState)) {
					gsap.set($pic, {
						x: relativeX,
						y: relativeY,
					});
				}
			};

			const handleMouseLeave = () => {
				if ($pic.classList.contains(CLASSES.activePicState)) {
					$pic.classList.remove(CLASSES.activePicState);
				}
			};

			const handleMouseEnter = () => {
				if ($item.classList.contains(CLASSES.activeState)) {
					$pic.classList.add(CLASSES.activePicState);
				}
			};

			let mm = gsap.matchMedia();
			mm.add(`(min-width: ${BREAKPOINTS.mediaPoint1}px)`, () => {
				$item.addEventListener('mousemove', handleMouseMove);
				$item.addEventListener('mouseleave', handleMouseLeave);
				$item.addEventListener('mouseenter', handleMouseEnter);
			});

			ScrollTrigger.create({
				trigger: $item,
				start: 'top center',
				end: 'bottom center',
				// markers: true,
				onEnter: () => {
					addActiveState($item);
				},
				onEnterBack: () => {
					addActiveState($item);
				},
				onLeave: () => {
					if (index !== $items.length - 1) {
						removeActiveState($item);
						handleMouseLeave();
					}
				},
				onLeaveBack: () => {
					if (index !== 0) {
						removeActiveState($item);
						handleMouseLeave();
					}
				},
			});
		});
	});
};

export default ourManifesto;
