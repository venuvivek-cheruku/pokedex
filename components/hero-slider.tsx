"use client";

import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import slideImageOne from "../public/images/slideImageOne.png";
import mew from "../public/images/mew.png";

export function HeroSlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 15000,
    pauseOnHover: true,
    pauseOnFocus: true,
    swipeToSlide: true,
    touchMove: true,
    draggable: true,
    accessibility: true,
    centerMode: true,
    centerPadding: "0px",
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <div className="heroSliderInnerContainer gap-20 overflow-hidden w-full p-4 bg-bgDark md:mt-20">
        <Slider {...settings}>
          <div className="heroSlide">
            <div className="heroSlideContainer flex flex-nowrap gap-20">
              <div className="HSlide flex flex-col-reverse md:flex-row gap-10 md:gap-20 items-center justify-center md:justify-between text-center md:text-left">
                <div className="HSlideLeftContainer flex flex-col gap-4 md:w-1/2">
                  <h1 className="font-heading text-3xl md:text-5xl uppercase">
                    {`Catch 'Em All in the Ultimate Pokémon Adventure`}
                  </h1>
                  <p>
                    Welcome to Pokédex, your one-stop destination for all things
                    Pokémon. Dive into a vast Pokedex, explore regions, and
                    uncover the magic of these incredible creatures.
                  </p>
                  <div className="HSlideBtn m-2">
                    <a
                      className="bg-accent py-2 px-4 font-semibold font-accent text-textAccent uppercase rounded-md"
                      href="/pokedex"
                    >
                      Explore the Pokédex
                    </a>
                  </div>
                </div>
                <div className="HSlideRightContainer">
                  <div className="imageWithCircle relative w-60 md:w-[500px] h-60 md:h-[500px]">
                    <span className="imageWithBGCircle"></span>
                    <Image
                      src={slideImageOne}
                      alt="Slide Image"
                      fill={true}
                      sizes="(max-width: 768px) 300px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="heroSlide">
            <div className="heroSlideContainer flex flex-nowrap gap-20">
              <div className="HSlide flex flex-col-reverse md:flex-row gap-10 md:gap-20 items-center justify-center md:justify-between text-center md:text-left">
                <div className="HSlideLeftContainer flex flex-col gap-4 md:w-1/2">
                  <h1 className="font-heading text-3xl md:text-5xl uppercase">
                    {` Catch 'Em All in the Ultimate Pokémon Adventure`}
                  </h1>
                  <p>
                    Welcome to Pokédex, your one-stop destination for all things
                    Pokémon. Dive into a vast Pokedex, explore regions, and
                    uncover the magic of these incredible creatures.
                  </p>
                  <div className="HSlideBtn m-2">
                    <a
                      className="bg-accent py-2 px-4 font-semibold font-accent text-textAccent uppercase rounded-md"
                      href="/pokedex"
                    >
                      Explore the Pokédex
                    </a>
                  </div>
                </div>
                <div className="HSlideRightContainer">
                  <div className="imageWithCircle relative w-60 md:w-[500px] h-60 md:h-[500px]">
                    <span
                      className="imageWithBGCircle"
                      style={{ background: "#f95587" }}
                    ></span>
                    <Image
                      src={mew}
                      alt="Slide Image"
                      fill={true}
                      sizes="(max-width: 768px) 300px"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </>
  );
}
