const CODES = {
	A: 65,
	Z: 90
};

function toColumn(col, index) {
	return `
		<div class="column" data-type="resizable" data-col="${index}">
			${col}
			<div class="col-resize" data-resize="col"></div>
		</div>
		`;
}

function toCell(row) {
	return function(_, index) {
		return `
			<div
				class="cell"
				contenteditable
				data-col="${index}"
				data-id="${row}:${index}"
			></div>
		`;
	};
}

function createRow(index, content) {
	const resize = index
		? '<div class="row-resize" data-resize="row"></div>'
		: '';
	const resizable = index ? `data-type="resizable"` : '';
	return `
		<div class="row" ${resizable}>
			<div class="row-info">
				${index ? index : ''}
				${resize}
			</div>
			<div class="row-data">${content}</div>
		</div>
	`;
}

function toChar(_, number) {
	return String.fromCharCode(CODES.A + number);
}

function wrapTable(content) {
  return `<div data-type="wrap">${content}</div>`;
}

export function createTable(rowsCount = 15) {
	const colsCount = CODES.Z - CODES.A + 1;
	const rows = [];
	const cols = new Array(colsCount)
		.fill('')
		.map(toChar)
		.map(toColumn)
		.join('');
	rows.push(createRow(null, cols));
	for (let i = 0; i < rowsCount; i++) {
		const cells =	new Array(colsCount)
			.fill('')
			.map(toCell(i))
			.join('');
		rows.push(createRow(i + 1, cells));
  }
  return wrapTable(rows.join(''));
}
