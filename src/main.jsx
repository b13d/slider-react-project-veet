import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Slider from "./Slider";
import "./main.scss";

const slides = [
  {
    img: "https://www.w3schools.com/howto/img_nature_wide.jpg",
    text: "Caption Text 1",
  },
  {
    img: "https://www.w3schools.com/howto/img_snow_wide.jpg",
    text: "Caption Text 2",
  },
  {
    img: "https://www.w3schools.com/howto/img_mountains_wide.jpg",
    text: "Caption Text 3",
  },
];

let list = (
  <ul className="list-name">
    <li>
      <span className="list-name-theme">loop</span> - возможность листать
      слайдер по кругу (например когда на 3 слайде нажимаем далее - переходим на
      1). true или false
    </li>
    <li>
      <span className="list-name-theme">navs</span> - Вывод стрелочек или их
      отключение. true или false
    </li>
    <li>
      <span className="list-name-theme">pags</span> - вывод пагинации или
      отключение. true или false
    </li>
    <li>
      <span className="list-name-theme">auto</span> - слайдер сам переключается,
      если delay не указан, раз в 5 сек.
    </li>
    <li>
      <span className="list-name-theme">stopMouseHover</span> - если навести
      мышкой на слайд, он не переключается, как только мышку убрали, снова
      пошло. Работает только когда auto равен true. true или false
    </li>
    <li>
      <span className="list-name-theme">delay</span> - время в секундах на показ
      слайда, если auto true
    </li>
  </ul>
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Slider slides={slides} />

    {list}
  </React.StrictMode>
);
