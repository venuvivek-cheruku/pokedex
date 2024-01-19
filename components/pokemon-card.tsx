import Image from "next/image";
import Link from "next/link";
import { PokemonTypeButtons } from "./pokemon-type";
import { getPokemon } from "@/lib/pokemonAPI";
import { useEffect, useState } from "react";

interface PokemonCardProps {
  name: string;
  image: string;
}

interface PokemonProps {
  pokemonData: any;
  name: string;
  image: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: [];
}

export function PokemonCard({ name, image }: PokemonCardProps) {
  const [pokemonData, setPokemonData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const data = await getPokemon(name);
        setPokemonData(data);
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [name]);

  if (loading) {
    return (
      <div className="loading-image w-32 relative h-32 mt-20">
        <Image
          src="/static/images/loading.gif"
          fill={true}
          sizes="(max-width: 768px) 128px, 128px"
          alt={`Loading gif`}
          style={{ objectFit: "contain" }}
        />
      </div>
    );
  }

  return (
    <>
      {pokemonData && (
        <Link href={`/${name}`} key={name + "Card"} title={name.toUpperCase()}>
          <div className="w-40 h-40 md:w-[300px] mx-auto md:h-[300px] relative">
            <span
              className="imageWithBGCircle"
              style={{
                background: `var(--${pokemonData.types[0]?.type.name}, white)`,
                filter: "brightness(1)",
              }}
            ></span>
            <Image
              src={image}
              alt={name}
              fill={true}
              sizes="(max-width: 768px) 160px, 160px"
              priority
            />
          </div>
          <PokemonTypeButtons pokemonType={pokemonData.types} />
          <h2 className="text-2xl mt-4 font-normal font-heading text-center">
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </h2>
        </Link>
      )}
    </>
  );
}
