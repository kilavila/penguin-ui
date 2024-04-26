class PenguinToastContainer extends HTMLElement {

	constructor(yPos, xPos) {
		super();

		// TODO: Add more positions
		this.yPos = yPos ? yPos : this.getAttribute('yPos'); // INFO: top, bottom
		this.xPos = xPos ? xPos : this.getAttribute('xPos'); // INFO: left, right

		this.toastList = [];
	}

	history() { return this.toastList }

	connectedCallback() {
		this.classList.add(`toast-${this.yPos}`, `toast-${this.xPos}`);
		this.innerHTML = `<div class="toast-container-inner"></div>`;
	}

	notify(notification) {
		const container = this.querySelector('.toast-container-inner');
		const newToast = new PenguinToast(notification);
		this.toastList.push(newToast);

		this.yPos === 'bottom'
			? container.append(newToast)
			: container.prepend(newToast);
	}

}

class PenguinToast extends HTMLElement {

	constructor(toast) {
		super();

		this.counter;

		// TODO: Add more types
		this.type = toast.type ? toast.type : this.getAttribute('type'); // INFO: info, success, warning, error
		this.icon = toast.icon ? toast.icon : this.getAttribute('icon'); // TODO: Default icon?
		this.title = toast.title ? toast.title : this.getAttribute('title');
		this.message = toast.message ? toast.message : this.getAttribute('message'); // TODO: Test long messages
		this.time = toast.time ? toast.time : this.getAttribute('time');
	}

	connectedCallback() {
		this.render();
		this.timer();
	}

	// TODO: Fade out animation
	fadeOut() { }

	timer() {
		!this.time
			? this.time = 7000
			: null;

		this.counter = setTimeout(() => this.remove(), this.time); // FIX: Change this.remove() to this.fadeOut()
	}

	// TODO: Add progress bar?
	render() {
		this.classList.add('toast', 'toast-slide-in', `toast-${this.type}`)
		this.innerHTML = `
			<div class="toast-icon">
				<i class="${this.icon}"></i>
			</div>
			<div class="toast-content">
				<div class="toast-header">
					${this.title}
				</div>
				<div class="toast-body">
					${this.message}
				</div>
			</div>
		`;
	}

	// TODO: Mouseover and click events
	// Stop timer and click to expand/remove?
	listeners() { }

}

customElements.define('pui-toast-container', PenguinToastContainer);
customElements.define('pui-toast', PenguinToast);

export {
	PenguinToastContainer as Toaster,
	PenguinToast as Toast,
};
