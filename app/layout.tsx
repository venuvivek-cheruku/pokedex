import type { Metadata } from "next";
import { Changa_One, Roboto, Exo_2 } from "next/font/google";
import "./globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { faHeart, faSearch, faUser } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import Breadcrumbs from "@/components/breadcrumbs";
import Link from "next/link";
import HamburgerIcon from "@/components/humburger";

const changaOne = Changa_One({
  weight: "400",
  preload: false,
  variable: "--heading-font",
});
const roboto = Roboto({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
  variable: "--body-font",
});
const exo2 = Exo_2({
  weight: [],
  subsets: ["latin"],
  variable: "--accent-font",
});

export const metadata: Metadata = {
  title: "Pokédex",
  description: "Here you find your desired pokemon information",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const openMenu = () => {
    const menuIcon = document.querySelector(".hamburger");
    menuIcon?.classList.toggle("is-active");
  };

  return (
    <html
      lang="en"
      className={`${changaOne.variable} ${roboto.variable} ${exo2.variable}`}
    >
      <body className={roboto.className}>
        <header className="menuMainContainer fixed top-0 bg-bgDark w-full left-0 z-[999] h-20">
          <div className="max-w-[1398px]  mx-auto w-full top-5 md:top-10 relative bg-bgDark">
            <div className="menuContainer p-2 md:p-4 bg-bgSecondary border rounded-lg flex justify-between w-full  items-center border-darkGray  ">
              <div className="logo">
                <Link href={"/"}>
                  <Image
                    src="/images/logo.png"
                    alt="Your Company Logo"
                    width="120"
                    height="50"
                  />
                </Link>
              </div>
              <nav
                role="navigation"
                className="menuItems font-heading text-white uppercase"
              >
                <ul className="ist-none text-2xl  items-center gap-6 flex-shrink-0 hidden md:flex">
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
                  <li>
                    <FontAwesomeIcon icon={faHeart} width="25" />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faUser} width="20" />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faSearch} width="20" />
                  </li>
                </ul>
              </nav>

              <div className="mobile-menu-container md:hidden">
                <HamburgerIcon />
              </div>
            </div>
            <Breadcrumbs
              homeElement={"Home"}
              separator={<span> | </span>}
              activeClasses="text-amber-500"
              containerClasses="flex py-5 bg-gradient-to-r from-purple-600 to-blue-600"
              listClasses="hover:underline mx-2 font-bold"
              capitalizeLinks
            />
          </div>
        </header>
        <main className="flex min-h-screen flex-col items-center mt-24  md:mt-36">
          {children}
        </main>
        <footer className="bg-bgSecondary ">
          <div className="p-20  flex flex-col items-center justify-center mt-14  md:mt-36 border-t border-t-darkGray">
            <div className="footer-logo-image w-60 md:w-80 relative h-20 md:h-32 ">
              <Image
                src={"/images/logo.png"}
                style={{ objectFit: "contain" }}
                fill={true}
                priority
                sizes="(max-width: 768px) 15rem 8rem"
                alt={`footer logo`}
              />
            </div>
            <nav
              role="navigation"
              className="menuItems font-heading text-white uppercase mt-14"
            >
              <ul className="list-none text-lg md:text-2xl flex flex-wrap items-center gap-10 flex-shrink-0 justify-center">
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
                <li>
                  <FontAwesomeIcon icon={faHeart} width="25" />
                </li>
                <li>
                  <FontAwesomeIcon icon={faUser} width="20" />
                </li>
                <li>
                  <FontAwesomeIcon icon={faSearch} width="20" />
                </li>
              </ul>
            </nav>
          </div>
          <div className="credits px-4 py-2 w-full text-center md:text-right font-accent">
            Developed by{" "}
            <a className="hover:text-accent" href="http://venuvivek.com">
              Venu Vivek Cheruku
            </a>
          </div>
        </footer>
      </body>
    </html>
  );
}
