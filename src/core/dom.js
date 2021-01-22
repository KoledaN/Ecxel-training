import { capitalize } from './utils';

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

	id(flag) {
		if (flag) {
			const id = this.id().split(':');
			return {
				row: +id[0],
				col: +id[1]
			};
		}
		return this.data.id;
	}

	attr(name, value) {
		if (value) {
			this.$el.setAttribute(name, value);
			return this;
		}
		return this.$el.getAtribute(name);
  }

  scroll(direction, value) {
    if (value) {
      this.$el['scroll' + capitalize(direction)] = value;
      return this;
    }
    return this.$el['scroll' + capitalize(direction)];
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

	closest(selector) {
		return $(this.$el.closest(selector));
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector);
	}

	css(styles = {}) {
		Object.keys(styles).forEach(key => {
			this.$el.style[key] = styles[key];
		});
	}

	addClass(className) {
		this.$el.classList.add(className);
		return this;
	}

	removeClass(className) {
		this.$el.classList.remove(className);
		return this;
	}

	find(select) {
		return $(this.$el.querySelector(select));
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
