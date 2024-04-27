class PenguinNavbar extends HTMLElement {
	constructor() {
		super();

		this.menuOpen = false;

		this.menuItems = [
			{
				name: 'Home',
				icon: 'nf-md-home',
				link: '/index.html',
			},
			{
				name: 'Badges',
				icon: 'nf-cod-circle_small_filled',
				link: '/components/badge/badge.html',
			},
			{
				name: 'Buttons',
				icon: 'nf-md-rectangle',
				link: '/components/button/button.html',
			},
			{
				name: 'Carousel',
				icon: 'nf-md-view_carousel',
				link: '/components/carousel/carousel.html',
			},
			{
				name: 'Toast',
				icon: 'nf-md-notification_clear_all',
				link: '/components/toast/toast.html',
			},
		];
	}

	connectedCallback() {
		this.render();
		this.listeners();
	}

	menuItem(item) {
		return `
			<li>
				<a href="${item.link}">
					<i class="nf ${item.icon}"></i>
					${item.name}
				</a>
			</li>
		`;
	}

	render() {
		this.innerHTML = `
			<div class="branding">
				<a href="/index.html">
				  <img src="/assets/img/pengalf.png" alt="Penguin wizard" width="38" />
				  Penguin UI
				</a>
			</div>
			<nav>
				<button id="menuToggle" class="btn btn-ghost btn-neutral">
					<i id="menuIcon" class="nf nf-md-menu"></i>
				</button>
				<div id="mainMenu" class="dropdown">
					<ul>
						${this.menuItems.map(item => this.menuItem(item)).join('')}
					</ul>
				</div>
			</nav>
		`;
	}

	listeners() {
		const menuButton = this.querySelector("#menuToggle");
		const menuIcon = this.querySelector("#menuIcon");
		const mainMenu = this.querySelector("#mainMenu");

		menuButton.addEventListener("click", (event) => {
			event.preventDefault();

			this.menuOpen = !this.menuOpen;

			this.menuOpen
				? this.openMenu(menuIcon, mainMenu)
				: this.closeMenu(menuIcon, mainMenu);
		});
	}

	openMenu(icon, menu) {
		menu.classList.add("open");
		icon.classList.remove("nf-md-menu");
		icon.classList.add("nf-md-close");
	}

	closeMenu(icon, menu) {
		menu.classList.remove("open");
		icon.classList.remove("nf-md-close");
		icon.classList.add("nf-md-menu");
	}

}

customElements.define('pui-navbar', PenguinNavbar);
