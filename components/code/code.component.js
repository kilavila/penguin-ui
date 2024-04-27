class PenguinCodeExample extends HTMLElement {

	constructor() {
		super();
	}

	connectedCallback() {
		this.render();
		this.listeners();
	}

	formatCode() { }

	render() {
		this.innerHTML = `<pre>
<code>
<!-- TODO: Add formatted code example -->
</code>
</pre>`;
	}

	listeners() { }

}

customElements.define('pui-code-ex', PenguinCodeExample);

export { PenguinCodeExample as CodeEx };
