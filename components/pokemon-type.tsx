import Image from "next/image";
import Link from "next/link";
import bug from "../public/images/bug.svg";
import dark from "../public/images/dark.svg";
import dragon from "../public/images/dragon.svg";
import electric from "../public/images/electric.svg";
import fairy from "../public/images/fairy.svg";
import fighting from "../public/images/fighting.svg";
import fire from "../public/images/fire.svg";
import flying from "../public/images/flying.svg";
import ghost from "../public/images/ghost.svg";
import grass from "../public/images/grass.svg";
import ground from "../public/images/ground.svg";
import ice from "../public/images/ice.svg";
import normal from "../public/images/normal.svg";
import poison from "../public/images/poison.svg";
import psychic from "../public/images/psychic.svg";
import rock from "../public/images/rock.svg";
import steel from "../public/images/steel.svg";
import water from "../public/images/water.svg";

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
