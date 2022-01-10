export default class Carousel {
  constructor({ mainSelector, slidesCount = 1, loop = true }) {
    this._mainSelector = mainSelector;
    this._slidesCount = slidesCount;
    this._loop = loop;
    this._currentFirst = 0;
    this._currentLast = slidesCount - 1;
  }

  _showSlide(index) {
    this._slides[index].classList.add(`${this._mainSelector}__slide_current`);
  }

  _initSlides() {
    for (let i = 0; i < this._slidesCount; i += 1) {
      this._showSlide(i);
    }
  }

  _hideSlide(index) {
    this._slides[index].classList.remove(
      `${this._mainSelector}__slide_current`
    );
  }

  _updateSlides() {
    this._slides = this._element.querySelectorAll(
      `.${this._mainSelector}__slide`
    );
  }

  getNextState() {
    if (this._slides.length > this._slidesCount) {
      if (this._loop && this._currentLast === this._slides.length - 1) {
        this._wrapper.append(this._slides[0]);
        this._updateSlides();
        this._hideSlide(this._currentFirst - 1);
        this._showSlide(this._currentLast);
      } else if (this._currentLast < this._slides.length - 1) {
        this._hideSlide(this._currentFirst);
        this._showSlide(this._currentLast + 1);
        this._currentFirst += 1;
        this._currentLast += 1;
      }
    }
  }

  getPreviousState() {
    if (this._slides.length > this._slidesCount) {
      if (this._loop && this._currentFirst === 0) {
        this._wrapper.prepend(this._slides[this._slides.length - 1]);
        this._updateSlides();
        this._hideSlide(this._currentLast + 1);
        this._showSlide(this._currentFirst);
      } else if (this._currentFirst > 0) {
        this._hideSlide(this._currentLast);
        this._showSlide(this._currentFirst - 1);
        this._currentFirst -= 1;
        this._currentLast -= 1;
      }
    }
  }

  _setSlideWidth() {
    this._slides.forEach((slide) => {
      slide.style.width = `${Math.floor(100 / this._slidesCount)}%`;
    });
  }

  _addButtons() {
    if (!this._prevElButton) {
      this._prevElButton = document.createElement("button");
      this._prevElButton.classList.add(
        `${this._mainSelector}__button`,
        `${this._mainSelector}__button_type_prev`
      );
      this._element.append(this._prevElButton);
    }
    if (!this._nextElButton) {
      this._nextElButton = document.createElement("button");
      this._nextElButton.classList.add(
        `${this._mainSelector}__button`,
        `${this._mainSelector}__button_type_next`
      );
      this._element.append(this._nextElButton);
    }
  }

  _addEventListeners() {
    this._nextElButton.addEventListener("click", () => this.getNextState());
    this._prevElButton.addEventListener("click", () => this.getPreviousState());
  }

  initialize() {
    this._element = document.querySelector(`.${this._mainSelector}`);
    this._wrapper = this._element.querySelector(
      `.${this._mainSelector}__wrapper`
    );
    this._slides = this._element.querySelectorAll(
      `.${this._mainSelector}__slide`
    );
    this._prevElButton = this._element.querySelector(
      `.${this._mainSelector}__button_type_prev`
    );
    this._nextElButton = this._element.querySelector(
      `.${this._mainSelector}__button_type_next`
    );
    this._setSlideWidth();
    this._initSlides();
    this._addButtons();
    this._addEventListeners();
  }
}
