class Dom {
	constructor(selector) {
		this.$el = typeof selector === 'string'
			? document.querySelector(selector)
			: selector;
	}

	get data() {
		return this.$el.dataset;
	}

	html(html) {
		if (typeof html === 'string') {
			this.$el.innerHTML = html;
			return this;
		}
		return this.$el.outerHTML.trim();
	}

	clear() {
		this.html('');
		return this;
	}

	append(node) {
		if (node instanceof Dom) {
			node = node.$el;
		}
		if (Element.prototype.append) {
			this.$el.append(node);
		}	else {
			this.$el.appendChild(node);
		}
		return this;
	}

	closest(select) {
		return $(this.$el.closest(select));
	}

	getCoords() {
		return this.$el.getBoundingClientRect();
	}

	on(eventType, callback) {
		this.$el.addEventListener(eventType, callback);
	}

	off(eventType, callback) {
		this.$el.removeEventListener(eventType, callback);
	}
}

export function $(selector) {
	return new Dom(selector);
}

// static method
$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);
	if (classes) {
		el.classList.add(classes);
	}
	return $(el);
};
