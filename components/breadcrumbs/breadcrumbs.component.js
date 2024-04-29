class PenguinBreadcrumbs extends HTMLElement {

	constructor(auto, breadcrumbs, separator) {
		super();

		this.auto = auto ? auto : this.getAttribute('auto');
		this.breadcrumbs = breadcrumbs ? breadcrumbs : this.getAttribute('breadcrumbList');
		this.separator = separator ? separator : this.getAttribute('breadcrumbSeparator');
	}

	connectedCallback() {
		this.render();
	}

	autoFormat() {
		// TODO: Format auto breadcrumbs
		// get breadcrumbs from URL
	}

	manualFormat() {
		// TODO: Format manual breadcrumbs
		// get breadcrumbs from attribute / param
	}

	render() {
		this.innerHTML = ``;
	}

}

customElements.define('pui-breadcrumbs', PenguinBreadcrumbs);

export { PenguinBreadcrumbs as Breadcrumbs };
