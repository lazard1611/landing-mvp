import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { SplitText } from 'vendors/SplitText';
import { BREAKPOINTS } from '../utils/constants';
import 'ScssComponents/projects.scss';

const projects = () => {
	const SELECTORS = {
		section: '.js-projects-section',
		row: '.js-projects-row',
		item: '.js-item-projects',
		subtitle: '.js-projects-subtitle',
		title: '.js-projects-title',
		label: '.js-projects-label',
	};

	gsap.registerPlugin(ScrollTrigger, SplitText);
	const $sections = document.querySelectorAll(SELECTORS.section);
	if (!$sections.length) return;

	const itemObj = [];

	$sections.forEach(($section) => {
		const $rows = $section.querySelectorAll(SELECTORS.row);
		if (!$rows.length) return;

		$rows.forEach(($row, index) => {
			const $items = $row.querySelectorAll(SELECTORS.item);
			if (!$items.length) return;
			const tl = gsap.timeline({
				paused: true,
			});

			let mm = gsap.matchMedia();
			mm.add(`(min-width: ${BREAKPOINTS.mediaPoint1}px)`, () => {
				if (index === 0) {
					gsap.fromTo(
						$row,
						{
							opacity: 0,
							y: 100,
						},
						{
							delay: 5,
							opacity: 1,
							y: 0,
						},
					);
				}

				ScrollTrigger.create({
					trigger: $row,
					start: `top ${$section.offsetTop}+=30`,
					end: 'bottom center',
					// markers: true,
					animation: tl,
				});

				if (index !== 0) {
					tl.fromTo(
						$items,
						{
							opacity: 0,
							y: 100,
						},
						{
							stagger: 0.6,
							opacity: 1,
							duration: 0.8,
							y: 0,
						},
					);
				}

				$items.forEach(($item) => {
					const $subtitle = $item.querySelector(SELECTORS.subtitle);
					if (!$subtitle) return;
					const $title = $item.querySelector(SELECTORS.title);
					if (!$title) return;
					const $label = $item.querySelector(SELECTORS.label);
					if (!$label) return;
					const $parentNode = $subtitle.parentElement;
					// console.log($parentNode);
					const tlContent = gsap.timeline({
						paused: true,
					});

					const splitTitle = new SplitText($title, {
						type: 'lines,words,chars',
						linesClass: 'split-line',
					});
					const { chars, words } = splitTitle;
					const allDone = () => {
						splitTitle.revert();
					};

					ScrollTrigger.create({
						trigger: $parentNode,
						start: 'top 80%',
						end: 'bottom bottom',
						// markers: true,
						animation: tlContent,
					});

					tlContent
						.fromTo(
							$subtitle,
							{
								y: 50,
								opacity: 0,
							},
							{
								y: 0,
								opacity: 1,
							},
							'start_1',
						)
						.fromTo(
							words,
							{
								y: 50,
								opacity: 0,
							},
							{
								y: 0,
								opacity: 1,
								stagger: 0.1,
							},
							'start_1',
						)
						.fromTo(
							$label,
							{
								y: $label.clientHeight,
								opacity: 0,
							},
							{
								y: 0,
								opacity: 1,
								stagger: 0.1,
							},
						);
				});
			});
		});
	});
};

export default projects;
