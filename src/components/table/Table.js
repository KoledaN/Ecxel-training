import { $ } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent';
import { createTable } from './table.template';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	constructor($root) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown']
		});
	}

	toHTML() {
		return createTable(20);
	}

	onMousedown(event) {
		if (event.target.dataset.resize) {
			const $target = $(event.target);
			const $parent = $target.closest('[data-type="resizable"]');

			const coords = $target.getCoords();
			const coordsParent = $parent.getCoords();

			const type = $target.data.resize;
			const cells = this.$root.findAll(`[data-col="${$parent.data.col}"]`);

			document.onmousemove = e => {
				if (type === 'col') {
					const delta = e.pageX - coords.x;
					const value = coordsParent.width + delta;
					cells.forEach(el => el.style.width = value + 'px');
				} else {
					const delta = e.pageY - coords.y;
					const value = coordsParent.height + delta;
					$parent.$el.style.height = value + 'px';
				}
			};

			document.onmouseup = () => {
				document.onmousemove = null;
			};
		}
	}
}
