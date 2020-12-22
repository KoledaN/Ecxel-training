class Dom {

}

export function $() {
	return new Dom();
}

$.create = (className) => {
	const $el = document.createElement('div');
	if (className) {
		$el.classList.add(className);
	}
	return $el;
};
