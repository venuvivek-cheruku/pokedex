import {
  getPokemon,
  getPokemonList,
  getPokemonType,
  getPokemonTypeData,
} from "@/lib/pokemonAPI";
import Image from "next/image";
import Link from "next/link";

export async function ExploreTypes() {
  return (
    <>
      <div className="exploreByTypesContainer mt-14 md:mt-36 md:mt-36">
        <div className="section-title text-center">
          <h1 className="font-heading text-4xl md:text-5xl">
            Explore by Types
          </h1>
        </div>
        <div className="exploreByTypes flex flex-wrap mt-14 justify-around w-full gap-14">
          <div className="gridType">
            <div
              className="relative w-60 h-60 md:w-72 md:h-72
            "
            >
              <span
                className="imageWithBGCircle"
                style={{
                  background: "#be5649",
                  filter: "brightness(2)",
                }}
              ></span>
              <Image
                src={"/static/images/charmander.png"}
                alt={"type Image"}
                fill={true}
              />
            </div>
            <div className="mt-10 text-center">
              <Link
                className="bg-accent py-2 px-4 font-semibold font-accent text-textAccent uppercase rounded-md"
                href={"/types/fire"}
              >
                Search by Fire
              </Link>
            </div>
          </div>
          <div className="gridType">
            <div
              className="relative w-60 h-60 md:w-72 md:h-72
            "
            >
              <span
                className="imageWithBGCircle"
                style={{
                  background: "#0dafd9",
                  filter: "brightness(2)",
                }}
              ></span>
              <Image
                src={"/static/images/squirtle.png"}
                alt={"type Image"}
                fill={true}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="mt-10 text-center">
              <Link
                className="bg-accent py-2 px-4 font-semibold font-accent text-textAccent uppercase rounded-md"
                href={"/types/water"}
              >
                Search by Water
              </Link>
            </div>
          </div>
          <div className="gridType">
            <div
              className="relative w-60 h-60 md:w-72 md:h-72
            "
            >
              <span
                className="imageWithBGCircle"
                style={{
                  background: "#7ac74c",
                  filter: "brightness(1)",
                }}
              ></span>
              <Image
                src={"/static/images/bulbasaur.png"}
                alt={"type Image"}
                fill={true}
              />
            </div>
            <div className="mt-10 text-center">
              <Link
                className="bg-accent py-2 px-4 font-semibold font-accent text-textAccent uppercase rounded-md"
                href={"/types/grass"}
              >
                Search by Grass
              </Link>
            </div>
          </div>
          <div className="gridType">
            <div
              className="relative w-60 h-60 md:w-72 md:h-72
            "
            >
              <span
                className="imageWithBGCircle"
                style={{
                  background: "#ffb759",
                  filter: "brightness(2)",
                }}
              ></span>
              <Image
                src={"/static/images/pikachu2.png"}
                alt={"type Image"}
                fill={true}
              />
            </div>
            <div className="mt-10 text-center">
              <Link
                className="bg-accent py-2 px-4 font-semibold font-accent text-textAccent uppercase rounded-md"
                href={"/types/electric"}
              >
                Search by Electric
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-14 text-center">
          <Link
            className="bg-transparent py-2 px-4 font-semibold font-accent  text-white border-white border uppercase rounded-md"
            href={"/types"}
          >
            Explore More
          </Link>
        </div>
      </div>
    </>
  );
}
