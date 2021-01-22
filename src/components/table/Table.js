import { $ } from '../../core/dom';
import { ExcelComponent } from '../../core/ExcelComponent';
import { isCell, shouldResize } from './table.functions';
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
			const {shiftKey} = event;
			if (shiftKey) {
				const start = this.selection.group[0].id(true);
				console.log(start);
				const finish = $(event.target).id(true);
				console.log(finish);
				const rowLine = line(start.row, finish.row);
				const colLine = line(start.col, finish.col);
				console.log(cells(rowLine, colLine));
				// console.log(line(0, 4));
			} else {
			this.selection.select($(event.target));
			console.log(this.selection.group);
			}
		}
	}
}

function line(start, finish) {
	if (start > finish) {
		const newStart = finish;
		finish = start;
		start = newStart;
	}
	const m = [];
	for (let i = start; i <= finish; i++) {
		m.push(i);
	}
	return m;
}

function cells(arrRow, arrCol) {
	const m = [];
	arrRow.reduce((row) => {
		arrCol.forEach(col => {
			m.push(`${row}:${col}`);
			return m;
		})
		, m;
	});
	return m;
}
