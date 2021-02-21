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

export function nextSelector(key, {row, col}) {
  const MIN_VALUE = 0;
  switch (key) {
    case 'ArrowUp':
      row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1;
      break;
    case 'ArrowRight':
    case 'Tab':
      col = col + 1;
      break;
    case 'ArrowDown':
    case 'Enter':
      row = row + 1;
      break;
    case 'ArrowLeft':
      col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1;
      break;
  }
  return `[data-id="${row}:${col}"]`;
}
