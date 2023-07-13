import { onWindowScroll, exist } from '../utils';

const header = () => {
	const SELECTORS = {
		header: '.header',
		headerDisable: '.js-header-disable',
		item: '.js-team-item',
	};

	const CLASSNAMES = {
		bodyOpenMenuState: 'body--open_menu_state',
		headerScrollState: 'header--scroll_state',
		headerScrollPos: 'header--pos_state',
	};

	const $body = document.body;
	const $header = document.querySelector(SELECTORS.header);
	let prevScrollPos = window.pageYOffset;
	const $headerDisableSections = document.querySelectorAll(SELECTORS.headerDisable);
	if (!$headerDisableSections) return;
	let isHeaderDisable = false;
	let itemWidth = 0;

	$headerDisableSections.forEach(($headerDisableSection) => {
		const $itemsTeam = $headerDisableSection.querySelectorAll(SELECTORS.item);
		if (!$itemsTeam.length) return;
		$itemsTeam.forEach(($itemTeam) => {
			itemWidth = $itemTeam.clientWidth * $itemsTeam.length;
		});

		const scrollToSection = (scroll) => {
			const distanceToTop = $headerDisableSection.parentElement.offsetTop;
			if (distanceToTop <= scroll && distanceToTop + itemWidth >= scroll) {
				isHeaderDisable = true;
			} else {
				isHeaderDisable = false;
			}
		};

		onWindowScroll(scrollToSection);
	});

	const headerScroll = (windowScrollTop) => {
		if (windowScrollTop > 10 && !$header.classList.contains(CLASSNAMES.headerScrollState)) {
			$header.classList.add(CLASSNAMES.headerScrollState);
		} else if (windowScrollTop <= 10 && $header.classList.contains(CLASSNAMES.headerScrollState)) {
			$header.classList.remove(CLASSNAMES.headerScrollState);
		}

		if (prevScrollPos < window.pageYOffset || isHeaderDisable) {
			$header.classList.add(CLASSNAMES.headerScrollPos);
		} else {
			$header.classList.remove(CLASSNAMES.headerScrollPos);
		}

		prevScrollPos = window.pageYOffset;
	};

	if (!exist($header)) return;

	onWindowScroll(headerScroll);
};

export default header;
