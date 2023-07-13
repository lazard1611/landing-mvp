import gsap from 'gsap';
import { SplitText } from 'vendors/SplitText';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { BREAKPOINTS } from '../utils/constants';

const animation = () => {
	const SELECTORS = {
		section: '.js-section-trigger',
		title: '.js-title-split',
	};

	gsap.registerPlugin(ScrollTrigger, SplitText);

	const $sections = document.querySelectorAll(SELECTORS.section);
	if (!$sections.length) return;

	let mm = gsap.matchMedia();
	mm.add(`(min-width: ${BREAKPOINTS.mediaPoint1}px)`, () => {
		$sections.forEach(($section) => {
			const tl = gsap.timeline({
				paused: true,
			});
			const $title = $section.querySelector(SELECTORS.title);
			if (!$title) return;
			const splitTitle = new SplitText($title, {
				type: 'lines,words,chars',
				linesClass: 'split-line',
			});
			const { chars, words } = splitTitle;
			const allDone = () => {
				splitTitle.revert();
			};

			ScrollTrigger.create({
				trigger: $section,
				start: 'top 80%',
				end: 'bottom top',
				// markers: true,
				animation: tl,
			});

			gsap.set(words, { overflow: 'hidden' });
			if (chars) {
				tl.fromTo(
					chars,
					{
						y: 200,
					},
					{
						opacity: 1,
						duration: 0.4,
						delay: 0.2,
						ease: 'circ',
						y: 0,
						stagger: 0.02,
					},
					allDone,
				);
			}
		});
	});
};

export default animation;
