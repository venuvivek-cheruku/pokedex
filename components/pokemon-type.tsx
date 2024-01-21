import Image from "next/image";
import Link from "next/link";
import bug from "../public/static/Images/bug.svg";
import dark from "../public/static/Images/dark.svg";
import dragon from "../public/static/Images/dragon.svg";
import electric from "../public/static/Images/electric.svg";
import fairy from "../public/static/Images/fairy.svg";
import fighting from "../public/static/Images/fighting.svg";
import fire from "../public/static/Images/fire.svg";
import flying from "../public/static/Images/flying.svg";
import ghost from "../public/static/Images/ghost.svg";
import grass from "../public/static/Images/grass.svg";
import ground from "../public/static/Images/ground.svg";
import ice from "../public/static/Images/ice.svg";
import normal from "../public/static/Images/normal.svg";
import poison from "../public/static/Images/poison.svg";
import psychic from "../public/static/Images/psychic.svg";
import rock from "../public/static/Images/rock.svg";
import steel from "../public/static/Images/steel.svg";
import water from "../public/static/Images/water.svg";

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
              src={`static/Images/${typeObj.type.name}.svg`}
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
