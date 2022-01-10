import Carousel from "./carousel/carousel";
import "./carousel/carousel.scss";
import "./styles/pages/index.scss";

const carousel = new Carousel({
  mainSelector: "slider",
  slidesCount: 1,
  loop: true,
});
carousel.initialize();
