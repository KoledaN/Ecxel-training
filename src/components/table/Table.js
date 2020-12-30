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

			document.onmousemove = e => {
				console.log('move');
				const delta = e.pageX - $target.getCoords().x;
				const value = $parent.getCoords().width + delta;
				$parent.$el.style.width = value + 'px';
			};

			document.onmouseup = () => {
				document.onmousemove = null;
			};
		}
	}
}
