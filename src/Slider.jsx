import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./slider.scss";

export default function Slider(props) {
  const [countSlider, setSlider] = useState(props.slides);
  const [currentSlide, setCurrent] = useState(0);
  const [timer, setTimer] = useState("");

  const [loop, setLoop] = useState(true);
  const [navs, setNavs] = useState(true);
  const [pags, setPags] = useState(true);
  const [auto, setAuto] = useState(true);
  const [stopMouseHover, setStopMouseHover] = useState(false);
  const [delay, setDelay] = useState(1);

  let count = 0;

  useEffect(() => {
    count++;

    if (count >= 2) {
      return;
    }

    let temp = delay;

    if (auto) {
      if (typeof delay === "number" && delay > 0) {
        setTimer(
          setTimeout(() => {
            setCurrent((value) => {
              if (value + 1 > 2) {
                return 0;
              } else {
                return (value += 1);
              }
            });
          }, temp * 1000)
        );
      } else {
        setTimer(
          setTimeout(() => {
            setCurrent((value) => {
              if (value + 1 > 2) {
                return 0;
              } else {
                return (value += 1);
              }
            });
          }, 5000)
        );
      }
    }
  }, [currentSlide, auto]);

  return (
    <DrawSlider
      countSlider={countSlider}
      currentSlide={currentSlide}
      setSlider={setSlider}
      setCurrent={setCurrent}
      loop={loop}
      navs={navs}
      pags={pags}
      auto={auto}
      delay={delay}
      setStopMouseHover={setStopMouseHover}
      stopMouseHover={stopMouseHover}
      timer={timer}
      setTimer={setTimer}
      setAuto={setAuto}
      setLoop={setLoop}
      setNavs={setNavs}
      setPags={setPags}
      setDelay={setDelay}
    />
  );
}

export function DrawSlider(props) {
  let count = 0;

  const handleSubmitPrevious = () => {
    clearTimeout(props.timer);

    props.setCurrent((value) => {
      if (value - 1 < 0) {
        if (props.loop !== true) {
          return value;
        } else {
          return 2;
        }
      } else {
        return (value -= 1);
      }
    });
  };

  const handleSubmitNext = () => {
    clearTimeout(props.timer);

    props.setCurrent((value) => {
      if (value + 1 >= props.countSlider.length) {
        if (props.loop !== true) {
          return value;
        } else {
          return 0;
        }
      } else {
        return (value += 1);
      }
    });
  };

  const arr = [];

  for (let i = 0; i < props.countSlider.length; i++) {
    let classCircle = "circle";

    if (props.currentSlide === i) {
      classCircle = "circle circle-active";
    }
    arr.push(
      <a className="a__pag" key={i} onClick={(e) => handleSubmitPag(i)}>
        <div className={classCircle}></div>
      </a>
    );
  }

  const handleSubmitPag = (key) => {
    if (props.pags) props.setCurrent(key);
  };

  const handleMouseEnter = () => {
    if (props.stopMouseHover) {
      props.setStopMouseHover(true);

      clearTimeout(props.timer);
    }
  };

  const handleMouseLeave = () => {
    if (props.stopMouseHover) {
      nextSlide(); // тут изменить, в useEffect добавить stopMouse..
    }
  };

  function nextSlide() {
    props.setCurrent((value) => {
      if (value + 1 > 2) {
        return 0;
      } else {
        return value + 1;
      }
    });
  }

  const btnEventLoop = (e) => {
    props.setLoop(props.loop === true ? false : true);
  };
  const btnEventNavs = (e) => {
    props.setNavs(props.navs === true ? false : true);
  };
  const btnEventPags = (e) => {
    props.setPags(props.pags === true ? false : true);
  };
  const btnEventAuto = (e) => {
    clearTimeout(props.timer);
    props.setAuto((value) => {
      return value === true ? false : true;
    });
  };
  const btnEventStopMouseHover = (e) => {
    return props.setStopMouseHover(
      props.stopMouseHover === true ? false : true
    );
  };
  const btnEventDelay = (e) => {
    let title =
      "Введите с какой скоростью в секундах будут переключаться слайды: ";
    let result = prompt(title);

    props.setDelay(Number(result));
  };

  return (
    <div className="slider">
      <div className="buttons">
        <button
          onClick={btnEventLoop}
          className="buttons__btn"
          title={props.loop === true ? "true" : "false"}
        >
          loop
        </button>
        <button
          onClick={btnEventNavs}
          className="buttons__btn"
          title={props.navs === true ? "true" : "false"}
        >
          navs
        </button>
        <button
          onClick={btnEventPags}
          className="buttons__btn"
          title={props.pags === true ? "true" : "false"}
        >
          pags
        </button>
        <button
          onClick={btnEventAuto}
          className="buttons__btn"
          title={props.auto === true ? "true" : "false"}
        >
          auto
        </button>
        <button
          onClick={btnEventStopMouseHover}
          className="buttons__btn"
          title={props.stopMouseHover === true ? "true" : "false"}
        >
          stopMouseHover
        </button>
        <button
          onClick={btnEventDelay}
          className="buttons__btn"
          title={props.delay}
        >
          delay
        </button>
      </div>
      <div className="main-content">
        {props.navs === true ? (
          <button
            className="btn btn-left"
            onClick={handleSubmitPrevious}
          ></button>
        ) : (
          ""
        )}
        <div className="slider__main-content">
          <img
            className="slider-img"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            src={props.countSlider[props.currentSlide].img}
            alt="slide"
          />
          <p className="number-slider">{props.currentSlide + 1 + " / 3"}</p>
          <p className="name-slider">
            {props.countSlider[props.currentSlide].text}
          </p>
        </div>
        {props.navs === true ? (
          <button className="btn" onClick={handleSubmitNext}></button>
        ) : (
          ""
        )}
      </div>
      {props.pags === true ? <div className="circles">{arr}</div> : ""}
    </div>
  );
}
