import { Button } from '/components/button/button.component.js';

class PenguinNavbar extends HTMLElement {
	constructor() {
		super();

		this.menuOpen = false;

    this.menuItems = [
      {
        name: 'Home',
        link: '/index.html',
      },
      {
        name: 'Button Ghost',
        link: '/components/button/ghost/button-ghost.html',
      },
      {
        name: 'Button Outlined',
        link: '/components/button/outlined/button-outlined.html',
      },
      {
        name: 'Button Raised',
        link: '/components/button/raised/button-raised.html',
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
				<button id="menuToggle" class="btn btn-raised btn-base-100">
					Menu
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
    const mainMenu = this.querySelector("#mainMenu");

		menuButton.addEventListener("click", (event) => {
			event.preventDefault();

			this.menuOpen = !this.menuOpen;

			if (this.menuOpen) {
        mainMenu.classList.add("open");
			} else {
        mainMenu.classList.remove("open");
			}
		});
	}

}

customElements.define('pui-navbar', PenguinNavbar);
