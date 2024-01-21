import Image from "next/image";
import Link from "next/link";
import bug from "../public/static/images/bug.svg";
import dark from "../public/static/images/dark.svg";
import dragon from "../public/static/images/dragon.svg";
import electric from "../public/static/images/electric.svg";
import fairy from "../public/static/images/fairy.svg";
import fighting from "../public/static/images/fighting.svg";
import fire from "../public/static/images/fire.svg";
import flying from "../public/static/images/flying.svg";
import ghost from "../public/static/images/ghost.svg";
import grass from "../public/static/images/grass.svg";
import ground from "../public/static/images/ground.svg";
import ice from "../public/static/images/ice.svg";
import normal from "../public/static/images/normal.svg";
import poison from "../public/static/images/poison.svg";
import psychic from "../public/static/images/psychic.svg";
import rock from "../public/static/images/rock.svg";
import steel from "../public/static/images/steel.svg";
import water from "../public/static/images/water.svg";

interface PokemonTypeProps {
  pokemonType: any;
}

export function PokemonTypeButtons({ pokemonType }: PokemonTypeProps) {
  const typesArray = Object.values(pokemonType);

  return (
    <>
      <div className="flex flex-row flex-wrap justify-center items-center mt-4 gap-4">
        {typesArray.map((typeObj: any, index: number) => (
          <Link href={`/types/${typeObj.type.name}`} key={index}>
            <Image
              src={`static/images/${typeObj.type.name}.svg`}
              alt={`${typeObj.type.name}Icon`}
              width={30}
              height={30}
              title={typeObj.type.name.toUpperCase()}
            />
          </Link>
        ))}
      </div>
    </>
  );
}
