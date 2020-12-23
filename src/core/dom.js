class Dom {

}

export function $() {
	return new Dom();
}

// static method
$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);
	if (classes) {
		el.classList.add(classes);
	}
	return el;
};
