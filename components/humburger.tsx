"use client";
import { faHeart, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function HamburgerIcon() {
  const [isActive, setIsActive] = useState(false);

  const handleHamburgerClick = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      <div className="mobile-menu-container">
        <div
          id="hamburger-10"
          className={`hamburger ${isActive ? "is-active" : ""}`}
          onClick={handleHamburgerClick}
        >
          <span className="line"></span>
          <span className="line"></span>
          <span className="line"></span>
        </div>
        <div
          className={`mobile-menu absolute bg-bgSecondary min-h-screen flex flex-col items-center w-2/3 -right-[100%] ${
            isActive ? "is-active" : ""
          }`}
        >
          <nav
            role="navigation"
            className="menuItems font-heading text-white uppercase mt-14 md:mt-36"
          >
            <ul className="list-none text-2xl  items-left gap-6 flex-shrink-0 flex-col flex justify-center">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/pokedex">Pokédex</a>
              </li>
              <li>
                <a href="/types">Types</a>
              </li>
              <li>
                <a href="/regions">Regions</a>
              </li>
              <li className="flex flex-nowrap gap-4 items-center">Favorite</li>
              <li className="flex flex-nowrap gap-4 items-center">Account</li>
              <li className="flex flex-nowrap gap-4 items-center">Search</li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
