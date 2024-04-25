class PenguinSimpleCarousel extends HTMLElement {

  constructor(slides) {
    super();

    this.slides = slides ? slides : this.slideAttr();
    this.currentSlideIndex = 0;
  }

  slideAttr() {
    let jsonRaw = this.getAttribute('slides');
    let jsonParsed = JSON.parse(jsonRaw);
    return jsonParsed.slides;
  }

  connectedCallback() {
    console.log(this.slides);
    this.render();
    this.listeners();
  }

  disconnectedCallback() { }

  newSlide(slide) {
    return `
      <pui-slide
        image="${slide.img}"
        title="${slide.title}"
        description="${slide.description}"
        buttonText="${slide.button.text}"
        buttonUrl="${slide.button.url}"
      >
      </pui-slide>
    `;
  }

  newIndicator() {
    return `<div class="carousel-indicator"></div>`;
  }

  render() {
    this.innerHTML = `
      <div class="carousel-slide-container">
        ${this.slides.map(slide => this.newSlide(slide)).join('')}
      </div>

      <div class="carousel-controls">
        <button class="btn btn-ghost btn-base-100 btn-previous">
          <i class="nf nf-fa-chevron_left"></i>
        </button>
        <button class="btn btn-ghost btn-base-100 btn-next">
          <i class="nf nf-fa-chevron_right"></i>
        </button>

        <div class="carousel-indicators">
          ${this.slides.map(() => this.newIndicator()).join('')}
        </div>
      </div>
    `;
  }

  listeners() {
    const nextButton = this.querySelector('.btn-next');
    const previousButton = this.querySelector('.btn-previous');
    const addedSlides = this.querySelectorAll('pui-slide');
    const slideIndicators = this.querySelectorAll('.carousel-indicator');

    addedSlides[0].classList.add('active');
    slideIndicators[0].classList.add('active');

    console.log(addedSlides, slideIndicators);

    previousButton.addEventListener('click', () => {
      this.currentSlideIndex > 0
        ? this.currentSlideIndex--
        : this.currentSlideIndex = this.slides.length - 1;

      addedSlides.forEach((slide, index) => {
        if (index === this.currentSlideIndex) {
          slide.classList.add('active');
          slideIndicators[index].classList.add('active');
        } else {
          slide.classList.remove('active');
          slideIndicators[index].classList.remove('active');
        }
      });
    });
    nextButton.addEventListener('click', () => {
      this.currentSlideIndex < this.slides.length - 1
        ? this.currentSlideIndex++
        : this.currentSlideIndex = 0;

      addedSlides.forEach((slide, index) => {
        if (index === this.currentSlideIndex) {
          slide.classList.add('active');
          slideIndicators[index].classList.add('active');
        } else {
          slide.classList.remove('active');
          slideIndicators[index].classList.remove('active');
        }
      });
    });
  }

}

class PenguinSlide extends HTMLElement {
  constructor(image, title, description, buttonText, buttonUrl) {
    super();

    this.image = image ? image : this.getAttribute('image');
    this.title = title ? title : this.getAttribute('title');
    this.description = description ? description : this.getAttribute('description');
    this.buttonText = buttonText ? buttonText : this.getAttribute('buttonText');
    this.buttonUrl = buttonUrl ? buttonUrl : this.getAttribute('buttonUrl');
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.classList.add('carousel-slide');
    this.innerHTML = `
      <img src="${this.image}" />

      <div class="carousel-caption">
        <h3>${this.title}</h3>
        <p>${this.description}</p>
        <a href="${this.buttonUrl}" class="btn btn-primary">${this.buttonText}</a>
      </div>
    `;
  }

}

customElements.define('pui-carousel', PenguinSimpleCarousel);
customElements.define('pui-slide', PenguinSlide);

export { PenguinSimpleCarousel as SimpleCarousel };
