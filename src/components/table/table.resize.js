import { $ } from '../../core/dom';

export function resizeHandler($root, event) {
	const $target = $(event.target);
	const $parent = $target.closest('[data-type="resizable"]');
	const coords = $target.getCoords();
	const coordsParent = $parent.getCoords();
	const type = $target.data.resize;
	const prop = type === 'col' ? 'height' : 'width';
	let value;

	$target.css({
		opacity: 1,
		[prop]: $('[data-type="wrap"]').getCoords()[prop] + 'px'
	});

	document.onmousemove = e => {
		if (type === 'col') {
			const delta = e.pageX - coords.x;
			value = coordsParent.width + delta;
			$target.css({
				right: -delta + 'px'
			});
		} else {
			const delta = e.pageY - coords.y;
			value = coordsParent.height + delta;
			$target.css({
				bottom: -delta + 'px'
			});
		}
	};

	document.onmouseup = () => {
		document.onmousemove = null;
		document.onmouseup = null;
		$target.css({
			right: '',
			bottom: '',
			[prop]: '',
			opacity: ''
		});
		if (type === 'col') {
			$root.findAll(`[data-col="${$parent.data.col}"]`)
				.forEach(el => el.style.width = (value > 0 ? value : 0) + 'px');
		} else {
			$parent.css({height: (value > 0 ? value : 0) + 'px'});
		}
	};
}
