import Image from "next/image";
import Link from "next/link";

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
              src={`/static/images/${typeObj.type.name}.svg`}
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
