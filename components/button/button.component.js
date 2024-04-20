class PenguinButton extends HTMLElement {
	constructor(style, color, text) {
		super();

		this.buttonStyle = style ? style : ""; // raised, outlined, ghost, icon
		this.buttonColor = color ? color : this.getAttribute("color"); // primary, secondary, accent, neutral, base, info, success, warning, error
		this.buttonText = text ? text : this.getAttribute("text");
	}

	connectedCallback() {
		this.buttonStyleSheet();
		this.buttonAttribute();
		this.buttonContent();

		console.log(this.innerHTML);
	}

	buttonStyleSheet() {
		this.sheet = new CSSStyleSheet();
		this.sheet.replaceSync("pui-button { display: inline; }");
		this.adoptedStyleSheets = [this.sheet];
	}

	buttonAttribute() {
		if (!this.buttonStyle) {
			const buttonAttributes = this.attributes;

			for (const attr of buttonAttributes) {
				if (attr.name.startsWith("pui-")) {
					this.buttonStyle = attr.name.replace("pui-", "");
				}
			}
		}

		this.setAttribute("class", `btn btn-${this.buttonStyle} btn-${this.buttonColor}`);
		this.setAttribute("type", "button");
	}

	buttonContent() {
		if (this.buttonText) {
			this.innerHTML = this.buttonText;
		}
	}
}

customElements.define("pui-button", PenguinButton);

export { PenguinButton as Button };
