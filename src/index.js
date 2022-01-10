import "./carousel/carousel.scss";
import Carousel from "./carousel/carousel";

import "./styles/pages/index.scss";

const carousel = new Carousel({
  mainSelector: "slider",
  slidesCount: 1,
  loop: false,
});
carousel.initialize();
