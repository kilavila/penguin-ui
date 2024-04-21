import { Button } from '/components/button/button.component.js';

class PenguinNavbar extends HTMLElement {
	constructor() {
		super();

		this.menuOpen = false;

    this.menuItems = [
      {
        name: '<i class=\'nf nf-md-home\'></i> Home',
        link: '/index.html',
      },
      {
        name: '<i class=\'nf nf-md-rectangle\'></i> Buttons',
        link: '/components/button/button.html',
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
        <a href="${item.link}">${item.name}</a>
      </li>
    `;
  }

	render() {
		this.innerHTML = `
			<div class="branding">
        <a href="/index.html">Penguin UI</a>
			</div>
			<nav>
				<button id="menuToggle" class="btn btn-ghost btn-neutral">
					<i id="menuIcon" class="nf nf-md-menu"></i>
				</button>
				<div id="mainMenu" class="dropdown">
					<ul>
            ${ this.menuItems.map(item => this.menuItem(item)).join('') }
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
		mainMenu.classList.add("open");
		menuIcon.classList.remove("nf-md-menu");
		menuIcon.classList.add("nf-md-close");
	}

	closeMenu(icon, menu) {
		mainMenu.classList.remove("open");
		menuIcon.classList.remove("nf-md-close");
		menuIcon.classList.add("nf-md-menu");
	}

}

customElements.define('pui-navbar', PenguinNavbar);
