export class DomListener {
	constructor($root) {
		if (!$root) {
			throw new Error('root is not available!');
		}
		this.$root = $root;
	}
}
