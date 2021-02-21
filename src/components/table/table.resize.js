import { $ } from '../../core/dom';

export function resizeHandler($root, event) {
	const $target = $(event.target);
	const $parent = $target.closest('[data-type="resizable"]');
	const coords = $target.getCoords();
  const coordsParent = $parent.getCoords();
  const type = $target.data.resize;
  const isTypeCol = type === 'col';
	const prop = isTypeCol ? 'height' : 'width';
  let value = isTypeCol ? coordsParent.width : coordsParent.height;
  const gap = isTypeCol ? event.pageX - coords.x : event.pageY - coords.y;
  const scrolled = isTypeCol ? $root.scrolled('top') : $root.scrolled('left');

	$target.css({
		opacity: 1,
    [prop]: $('[data-type="wrap"]').getCoords()[prop] + scrolled + 'px'
	});

	document.onmousemove = e => {
		if (isTypeCol) {
			const delta = e.pageX - coords.x - gap;
			value = coordsParent.width + delta;
			$target.css({
				right: -delta + 'px'
			});
		} else {
			const delta = e.pageY - coords.y - gap;
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
		if (isTypeCol) {
			$root.findAll(`[data-col="${$parent.data.col}"]`)
				.forEach(el => el.style.width = (value > 0 ? value : 0) + 'px');
		} else {
			$parent.css({height: (value > 0 ? value : 0) + 'px'});
		}
	};
}
