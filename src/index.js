import "./styles/pages/index.scss";
import Carousel from "./carousel/carousel";

const carousel = new Carousel({
  mainSelector: "slider",
  slidesCount: 2,
});
carousel.initialize();
