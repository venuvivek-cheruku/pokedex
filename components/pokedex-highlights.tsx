import Image from "next/image";
import ph1 from "../public/static/images/ph1.png";
import PhRegions from "../public/static/images/PhRegions.png";
import phType2 from "../public/static/images/phType2.png";

export function PokemonHighlights() {
  return (
    <>
      <div className="pokemonHighlightsContainer mt-14 md:mt-36 ">
        <div className="section-title text-center">
          <h1 className="font-heading text-4xl md:text-5xl">
            Pokédex Highlights
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 grid-flow-row gap-y-14 justify-between items-center md:gap-x-20 md:gap-y-0 mt-14">
          <div className="PhGridItem row-span-2 text-center">
            <div className="imageWithCircle relative w-72 h-72 md:w-[450px] md:h-[450px] ">
              <span className="imageWithBGCircle"></span>
              <Image
                src={ph1}
                alt="Slide Image"
                fill={true}
                sizes="(max-width: 768px) 18rem, 18rem"
              />
            </div>
            <div className="PhBtn mt-5">
              <a
                className="bg-accent py-2 px-4 font-semibold font-accent text-textAccent uppercase rounded-md"
                href="/pokedex"
              >
                Search by Pokédex
              </a>
            </div>
          </div>
          <div className="PhGridItem text-center">
            <div className="phGridItemImg w-full h-48 relative overflow-hidden rounded-lg">
              <Image
                src={PhRegions}
                alt="Slide Image"
                fill={true}
                sizes="(max-width: 768px) 18rem, 18rem"
                style={{ objectFit: "cover" }}
              />
            </div>
            <div className="PhBtn mt-5">
              <a
                className="bg-accent py-2 px-4 font-semibold font-accent text-textAccent uppercase rounded-md"
                href="/regions"
              >
                Search by Regions
              </a>
            </div>
          </div>
          <div className="PhGridItem text-center mt-4">
            <div className="phGridItemImg w-full md:w-[500px]  h-48 relative  bg-bgSecondary ">
              <Image
                src={phType2}
                alt="Slide Image"
                fill={true}
                style={{
                  objectFit: "contain",
                  objectPosition: "right",
                  padding: "8px 16px",
                  border: "1px solid #464646",
                  borderRadius: "8px",
                }}
              />
            </div>
            <div className="PhBtn mt-5">
              <a
                className="bg-accent py-2 px-4 font-semibold font-accent text-textAccent uppercase rounded-md"
                href="/types"
              >
                Search by Types
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
