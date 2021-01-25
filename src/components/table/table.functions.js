import { range } from '../../core/utils';

export function shouldResize(event) {
	return event.target.dataset.resize;
}

export function isCell(event) {
	return event.target.dataset.id;
}

export function matrix($start, $end) {
	const start = $start.id(true);
	const end = $end.id(true);
	const rows = range(start.row, end.row);
	const cols = range(start.col, end.col);

	return rows.reduce((m, row) => {
	cols.forEach(col => m.push(`${row}:${col}`));
		return m;
	}, []);
}
