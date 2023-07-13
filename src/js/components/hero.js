import gsap from 'gsap';
import { SplitText } from '../vendors/SplitText';
import { BREAKPOINTS } from '../utils/constants';

const hero = () => {
	const SELECTORS = {
		section: '.js-hero-section',
		title: '.js-hero-title',
		text: '.js-hero-description',
	};

	const $sections = document.querySelectorAll(SELECTORS.section);
	if (!$sections.length) return;

	$sections.forEach(($section) => {
		const $title = $section.querySelector(SELECTORS.title);
		if (!$title) return;
		const $text = $section.querySelector(SELECTORS.text);
		if (!$text) return;

		const splitTitle = new SplitText($title, {
			type: 'lines,words,chars',
			linesClass: 'split-line',
		});
		const { chars, words } = splitTitle;
		let mm = gsap.matchMedia();
		mm.add(`(min-width: ${BREAKPOINTS.mediaPoint1}px)`, () => {
			gsap.set(words, { overflow: 'hidden' });
			if (chars) {
				gsap.fromTo(
					chars,
					{
						y: 200,
					},
					{
						opacity: 1,
						duration: 0.4,
						delay: 4.6,
						ease: 'circ',
						y: 0,
						stagger: 0.02,
					},
				);
			}
			gsap.fromTo(
				$text,
				{
					y: $text.clientHeight,
					opacity: 0,
				},
				{
					delay: 5,
					duration: 0.7,
					y: 0,
					opacity: 1,
				},
			);
		});
	});
};

export default hero;
