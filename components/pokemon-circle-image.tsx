import Image from "next/image";

interface PokemonProps {
  image: string;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: any[];
}

interface PokemonCircleImageProps {
  pokemonData: PokemonProps;
}

export function PokemonCircleImage({ pokemonData }: PokemonCircleImageProps) {
  const firstType = pokemonData.types[0]?.type.name || "fire";

  return (
    <div className="imageWithCircle w-80 md:w-[600px] h-80 md:h-[600px] relative">
      <span
        className="imageWithBGCircle"
        style={{
          background: `var(--${firstType}, white)`,
          filter: "brightness(2)",
        }}
      ></span>
      <Image
        src={pokemonData.sprites.other["home"].front_default}
        alt="Slide Image"
        fill={true}
      />
    </div>
  );
}
