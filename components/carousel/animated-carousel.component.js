
class PenguinAnimatedCarousel extends HTMLElement {
  constructor() {
    super();

    this.slides = [
      {
        img: '/assets/img/1.png',
        title: 'Slide 1',
        description: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
        button: {
          text: 'Button 1',
          url: '#'
        }
      },
      {
        img: '/assets/img/2.png',
        title: 'Slide 2',
        description: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
        button: {
          text: 'Button 2',
          url: '#'
        }
      },
      {
        img: '/assets/img/3.png',
        title: 'Slide 3',
        description: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
        button: {
          text: 'Button 3',
          url: '#'
        }
      },
      {
        img: '/assets/img/2.png',
        title: 'Slide 4',
        description: 'Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.',
        button: {
          text: 'Button 4',
          url: '#'
        }
      },
    ];

    this.previousIndex = this.slides.length - 1;
    this.activeIndex = 0;
    this.nextIndex = 1;
  }

  connectedCallback() {
    this.render();
    this.listeners();
  }

  newSlide(slide) {
    return `
      <div class="animated-slide">
        <div class="animated-slide-inner">
          <img src="${slide.img}" />

          <div class="animated-carousel-caption">
            <div class="animated-caption-header">
              <h3>${slide.title}</h3>
              <p>${slide.description}</p>
            </div>
            <a href="${slide.button.url}" class="btn btn-success">${slide.button.text}</a>
          </div>
        </div>
      </div>
    `;
  }

  newIndicator(image) {
    return `
      <div class="animated-slide-indicator">
        <img src="${image}" />
      </div>
    `;
  }

  render() {
    this.innerHTML = `
      <div class="animated-slide-container">
        ${this.slides.map(slide => this.newSlide(slide)).join('')}
      </div>

      <div class="animated-slide-indicators">
        ${this.slides.map(slide => this.newIndicator(slide.img)).join('')}
      </div>
    `;
  }

  updateIndicatorClass(indicator, index) {
    switch (index) {
      case this.previousIndex:
        indicator.classList.add('previous');
        indicator.classList.remove('active');
        indicator.classList.remove('next');
        indicator.classList.remove('inactive');
        break;

      case this.activeIndex:
        indicator.classList.add('active');
        indicator.classList.remove('previous');
        indicator.classList.remove('next');
        indicator.classList.remove('inactive');
        break;

      case this.nextIndex:
        indicator.classList.add('next');
        indicator.classList.remove('active');
        indicator.classList.remove('previous');
        indicator.classList.remove('inactive');
        break;

      default:
        indicator.classList.remove('previous');
        indicator.classList.remove('active');
        indicator.classList.remove('next');
        indicator.classList.add('inactive');
        break;
    }
  }

  updateIndicators(indicators) {
    indicators.forEach((indicator, index) => {
      this.updateIndicatorClass(indicator, index);
    });
  }

  updateSlide(slides) {
    slides.forEach((slide, index) => {
      if (slide.classList.contains('active')) {
        slide.classList.add('previous');
        slide.classList.remove('active');
        setTimeout(() => {
          slide.classList.remove('previous');
        }, 500);
      }

      if (index === this.activeIndex) {
        slide.classList.add('active');
      }
    });
  }

  updateIndexes() {
    this.activeIndex > 0
      ? this.previousIndex = this.activeIndex - 1
      : this.previousIndex = this.slides.length - 1;

    this.activeIndex < this.slides.length - 1
      ? this.nextIndex = this.activeIndex + 1
      : this.nextIndex = 0;
  }

  listeners() {
    const addedSlides = this.querySelectorAll('.animated-slide');
    const slideIndicators = this.querySelectorAll('.animated-slide-indicator');

    addedSlides[0].classList.add('active');
    this.updateIndicators(slideIndicators);

    slideIndicators.forEach(indicator => {

      indicator.addEventListener('click', (event) => {
        event.preventDefault();

        if (indicator.classList.contains('previous')) {
          this.activeIndex > 0
            ? this.activeIndex--
            : this.activeIndex = this.slides.length - 1;
        } else if (indicator.classList.contains('next')) {
          this.activeIndex < this.slides.length - 1
            ? this.activeIndex++
            : this.activeIndex = 0;
        }

        this.updateIndexes();
        this.updateSlide(addedSlides);
        this.updateIndicators(slideIndicators);
      });
    });
  }

}

customElements.define('pui-animated-carousel', PenguinAnimatedCarousel);

export default PenguinAnimatedCarousel;
