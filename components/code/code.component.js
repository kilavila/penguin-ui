import hljs from 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/highlight.min.js';

import { Toaster } from '../toast/toast.component.js';

class PenguinCodeExample extends HTMLElement {

	constructor(title, lang, code) {
		super();

		this.title = title || this.getAttribute("title");
		this.lang = lang || this.getAttribute("lang");
		this.code = code || this.getAttribute("code");
		this.formattedCode = '';
	}

	connectedCallback() {
		this.highlighter();
		this.render();
		this.listeners();
	}

	highlighter() {
		if (!this.code) {
			this.code = this.innerHTML;
		}

		this.code = this.code.replace(/\t/g, '   ');

		if (!this.lang) {
			// FIX: if lang is not specified, auto detection doesn't work
			this.formattedCode = hljs.highlightAuto(this.code).value;
		} else {
			this.formattedCode = hljs.highlight(this.code, { language: this.lang }).value;
		}
	}

	render() {
		this.innerHTML = `
			<div class="code-ex-header">
				<div class="code-buttons">
					<div class="code-close"></div>
					<div class="code-maximize"></div>
					<div class="code-minimize"></div>
				</div>
				<div class="code-title">
					${this.title}
				</div>
				<button id="copyCode" class="btn code-ex-copy" title="Copy to clipboard">
					<i class="nf nf-fa-copy"></i>
				</button>
			</div>
			<div class="code-ex-body">
				<pre><code>${this.formattedCode}</code></pre>
				${this.lang ? `<div class="code-ex-lang">${this.lang}</div>` : ''}
			</div>
		`;
	}

	listeners() {
		const copyButton = this.querySelector('#copyCode');
		const toaster = new Toaster('bottom', 'right');

		this.append(toaster);

		copyButton.addEventListener('click', (event) => {
			event.preventDefault();

			navigator.clipboard.writeText(this.code);

			const notification = {
				type: 'info',
				icon: 'nf nf-md-information',
				title: 'Copied to clipboard',
				message: 'Code copied to system clipboard.',
				time: 3000
			};

			toaster.notify(notification);
		});
	}

}

customElements.define('pui-code-ex', PenguinCodeExample);

export { PenguinCodeExample as CodeEx };
