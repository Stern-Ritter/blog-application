import Carousel from "./carousel";

const selector = "test-slider";
const slideSelector = `${selector}__slide`;
const currentSlideSelector = `${selector}__slide_current`;
const buttonSelector = `${selector}__button`;
const previousButtonSelector = `${selector}__button_type_prev`;
const nextButtonSelector = `${selector}__button_type_next`;
const elements = ["first", "second", "third", "fourth", "fifth"];
let carousel;

describe("Class Carousel", () => {
  beforeEach(() => {
    document.body.innerHTML = `     
        <div class="${selector}">
        <ul class="${selector}__wrapper">
        ${elements.reduce((prev, el) => {
          const res = `${prev}
                      <li class="${selector}__slide">
                        <img src="${el}.jpg" alt="${el}">
                      </li>`;
          return res;
        }, "")}
        </ul>
        </div>`;
  });

  it(`method initialize() calls methods:
  _setSlideWidth(), _initSlides(), _addButtons(), _addEventListeners() once`, () => {
    carousel = new Carousel({ mainSelector: selector });
    carousel._setSlideWidth = jest.fn();
    carousel._initSlides = jest.fn();
    carousel._addButtons = jest.fn();
    carousel._addEventListeners = jest.fn();
    carousel.initialize();

    expect(carousel._setSlideWidth).toBeCalledTimes(1);
    expect(carousel._initSlides).toBeCalledTimes(1);
    expect(carousel._addButtons).toBeCalledTimes(1);
    expect(carousel._addEventListeners).toBeCalledTimes(1);
  });

  it("method _showSlide() correct add class to selected by index slide", () => {
    carousel = new Carousel({ mainSelector: selector, slidesCount: 0 });
    carousel.initialize();

    const firstElementIndex = 0;
    const lastElementIndex = elements.length - 1;
    carousel._showSlide(firstElementIndex);
    carousel._showSlide(lastElementIndex);
    const [firstElementImg, lastElementImg] = document.querySelectorAll(
      `.${currentSlideSelector}`
    );
    expect(firstElementImg.querySelector("img").alt).toBe(
      elements[firstElementIndex]
    );
    expect(lastElementImg.querySelector("img").alt).toBe(
      elements[lastElementIndex]
    );
  });

  it("method _hideSlide() correct remove class from selected by index slide", () => {
    carousel = new Carousel({
      mainSelector: selector,
      slidesCount: elements.length,
    });
    carousel.initialize();

    const firstElementIndex = 0;
    const lastElementIndex = elements.length - 1;
    carousel._hideSlide(firstElementIndex);
    carousel._hideSlide(lastElementIndex);
    const slides = document.querySelectorAll(`.${slideSelector}`);
    const currentSlides = document.querySelectorAll(`.${currentSlideSelector}`);
    expect(currentSlides).toHaveLength(elements.length - 2);
    expect(
      slides[firstElementIndex].classList.contains(currentSlideSelector)
    ).toBeFalsy();
    expect(
      slides[lastElementIndex].classList.contains(currentSlideSelector)
    ).toBeFalsy();
  });

  it("method _initSlides() calls method _showSlide() correct number of times", () => {
    const slidesCount = 10;
    carousel = new Carousel({ mainSelector: selector, slidesCount });
    carousel._showSlide = jest.fn();
    carousel.initialize();

    expect(carousel._showSlide).toBeCalledTimes(slidesCount);
  });

  it("method _setSlideWidth() set correct width to slides", () => {
    const slidesCount = 3;
    carousel = new Carousel({ mainSelector: selector, slidesCount });
    carousel.initialize();
    const slides = document.querySelectorAll(`.${slideSelector}`);
    const expectedWidth = Math.floor(100 / slidesCount);

    slides.forEach((slide) => {
      expect(slide.style.width).toBe(`${expectedWidth}%`);
    });
  });

  it(`method _addButtons() correct add previous and next buttons,
  if they are not added in html markup`, () => {
    carousel = new Carousel({ mainSelector: selector });
    carousel.initialize();

    expect(document.querySelectorAll(`.${buttonSelector}`)).toHaveLength(2);
    expect(document.querySelector(`.${previousButtonSelector}`)).not.toBeNull();
    expect(document.querySelector(`.${nextButtonSelector}`)).not.toBeNull();
  });

  it(`method _addEventListeners() correct add event listeners to
  previous and next buttons`, () => {
    carousel = new Carousel({ mainSelector: selector, slidesCount: 3 });
    carousel.getPreviousState = jest.fn();
    carousel.getNextState = jest.fn();
    carousel.initialize();

    const previousButton = document.querySelector(`.${previousButtonSelector}`);
    const nextButton = document.querySelector(`.${nextButtonSelector}`);
    previousButton.dispatchEvent(new Event("click"));
    previousButton.dispatchEvent(new Event("click"));
    nextButton.dispatchEvent(new Event("click"));
    expect(carousel.getPreviousState).toBeCalledTimes(2);
    expect(carousel.getNextState).toBeCalledTimes(1);
  });

  it(`methods getNextState() and getPreviousState() correct switch current slides
  for option loop: false`, () => {
    carousel = new Carousel({
      mainSelector: selector,
      slidesCount: 3,
      loop: false,
    });
    carousel.initialize();
    const previousButton = document.querySelector(`.${previousButtonSelector}`);
    const nextButton = document.querySelector(`.${nextButtonSelector}`);

    let [first, second, third] = document.querySelectorAll(
      `.${currentSlideSelector}`
    );
    expect(first.querySelector("img").alt).toBe(elements[0]);
    expect(second.querySelector("img").alt).toBe(elements[1]);
    expect(third.querySelector("img").alt).toBe(elements[2]);

    nextButton.dispatchEvent(new Event("click"));
    nextButton.dispatchEvent(new Event("click"));
    nextButton.dispatchEvent(new Event("click"));
    [first, second, third] = document.querySelectorAll(
      `.${currentSlideSelector}`
    );
    expect(first.querySelector("img").alt).toBe(elements[2]);
    expect(second.querySelector("img").alt).toBe(elements[3]);
    expect(third.querySelector("img").alt).toBe(elements[4]);

    previousButton.dispatchEvent(new Event("click"));
    [first, second, third] = document.querySelectorAll(
      `.${currentSlideSelector}`
    );
    expect(first.querySelector("img").alt).toBe(elements[1]);
    expect(second.querySelector("img").alt).toBe(elements[2]);
    expect(third.querySelector("img").alt).toBe(elements[3]);

    previousButton.dispatchEvent(new Event("click"));
    previousButton.dispatchEvent(new Event("click"));
    [first, second, third] = document.querySelectorAll(
      `.${currentSlideSelector}`
    );
    expect(first.querySelector("img").alt).toBe(elements[0]);
    expect(second.querySelector("img").alt).toBe(elements[1]);
    expect(third.querySelector("img").alt).toBe(elements[2]);
  });

  it(`methods getNextState() and getPreviousState() correct switch current slides
  for option loop: true`, () => {
    carousel = new Carousel({
      mainSelector: selector,
      slidesCount: 3,
      loop: true,
    });
    carousel.initialize();
    const previousButton = document.querySelector(`.${previousButtonSelector}`);
    const nextButton = document.querySelector(`.${nextButtonSelector}`);

    let [first, second, third] = document.querySelectorAll(
      `.${currentSlideSelector}`
    );
    expect(first.querySelector("img").alt).toBe(elements[0]);
    expect(second.querySelector("img").alt).toBe(elements[1]);
    expect(third.querySelector("img").alt).toBe(elements[2]);

    nextButton.dispatchEvent(new Event("click"));
    nextButton.dispatchEvent(new Event("click"));
    nextButton.dispatchEvent(new Event("click"));
    [first, second, third] = document.querySelectorAll(
      `.${currentSlideSelector}`
    );
    expect(first.querySelector("img").alt).toBe(elements[3]);
    expect(second.querySelector("img").alt).toBe(elements[4]);
    expect(third.querySelector("img").alt).toBe(elements[0]);

    previousButton.dispatchEvent(new Event("click"));
    [first, second, third] = document.querySelectorAll(
      `.${currentSlideSelector}`
    );
    expect(first.querySelector("img").alt).toBe(elements[2]);
    expect(second.querySelector("img").alt).toBe(elements[3]);
    expect(third.querySelector("img").alt).toBe(elements[4]);

    previousButton.dispatchEvent(new Event("click"));
    previousButton.dispatchEvent(new Event("click"));
    previousButton.dispatchEvent(new Event("click"));
    [first, second, third] = document.querySelectorAll(
      `.${currentSlideSelector}`
    );
    expect(first.querySelector("img").alt).toBe(elements[4]);
    expect(second.querySelector("img").alt).toBe(elements[0]);
    expect(third.querySelector("img").alt).toBe(elements[1]);
  });
});
