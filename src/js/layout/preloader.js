import gsap from 'gsap';
import { CustomEase } from '../vendors/CustomEase';
import { BREAKPOINTS } from '../utils/constants';

const preloader = () => {
	const SELECTORS = {
		item: '.js-preload-item',
	};

	gsap.registerPlugin(CustomEase);

	const $items = document.querySelectorAll(SELECTORS.item);
	if (!$items.length) return;
	const srcArr = [];
	const imgArr = [];
	let mm = gsap.matchMedia();
	mm.add(`(min-width: ${BREAKPOINTS.mediaPoint1}px)`, () => {
		const createImg = (src, index) => {
			const img = document.createElement('img');
			img.setAttribute('src', src);
			img.setAttribute('alt', `Image ${index + 1}`);
			return img;
		};

		$items.forEach(($item, index) => {
			const srcForImg = $item.getAttribute('data-src');
			if (!srcForImg) return;
			srcArr.push(srcForImg);
		});

		const shuffledImages = srcArr.sort(() => Math.random() - 0.5);

		const selectedImages = shuffledImages.slice(0, 3);

		selectedImages.forEach((src, index) => {
			const $item = $items[index];
			let img = createImg(src, index);
			$item.appendChild(img);
		});

		const deleteEmpItems = (item) => {
			if (!item.querySelector('img')) {
				item.remove();
			}
		};

		$items.forEach(($item, index) => {
			deleteEmpItems($item);
		});

		const tl = gsap.timeline({
			delay: 1,
		});

		const easeCustom = CustomEase.create(
			'custom',
			'M0,0 C0,0 0.514,0.082 0.596,0.158 0.788,0.336 0.8,0.393 0.888,0.67 0.934,0.816 0.924,0.875 0.942,0.936 0.96,1 1,1 1,1',
		);
		tl.to(SELECTORS.item, {
			reversed: 1,
			opacity: 1,
			stagger: 1.2,
			duration: 0.8,
			yPercent: -100,
			ease: easeCustom,
		});
	});
};

export default preloader;
