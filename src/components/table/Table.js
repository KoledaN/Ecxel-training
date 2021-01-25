import { $ } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent';
import { isCell, matrix, shouldResize } from './table.functions';
import { resizeHandler } from './table.resize';
import { createTable } from './table.template';
import { TableSelection } from './TableSelection';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	constructor($root) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown']
		});
	}

	prepare() {
		this.selection = new TableSelection();
	}

	init() {
		super.init();
		const $cell = this.$root.find('[data-id="0:0"]');
		this.selection.select($cell);
	}

	toHTML() {
		return createTable(20);
	}

	onMousedown(event) {
		if (shouldResize(event)) {
			resizeHandler(this.$root, event);
		} else if (isCell) {
			const $target = $(event.target);
			if (event.shiftKey) {
				const $cells = 	matrix(this.selection.current, $target)
					.map(id => this.$root.find(`[data-id="${id}"]`));
				this.selection.selectGroup($cells);
			} else {
			this.selection.select($target);
			}
		}
	}
}
