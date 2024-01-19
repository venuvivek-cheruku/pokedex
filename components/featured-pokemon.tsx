"use client";

import { generateDescriptionWithOpenAI, getPokemon } from "@/lib/pokemonAPI";
import Image from "next/image";
import { useEffect, useState } from "react";
import { PokemonTypeButtons } from "./pokemon-type";
import { PokemonStats } from "./pokemon-stat";
import Link from "next/link";
import { PokemonCircleImage } from "./pokemon-circle-image";

interface PokemonProps {
  pokemonData: any;
  name: string;
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
  stats: [];
}

export function FeaturedPokemon() {
  const featuredPokemon = [
    "greninja",
    "pyroar",
    "mewtwo",
    "gengar",
    "heracross",
  ];

  const [randomFeaturedPokemon, setRandomFeaturedPokemon] = useState<any>(
    featuredPokemon[0]
  );
  const [openAIDescription, setOpenAIDescription] = useState("");

  const [featuredPokemonData, setFeaturedPokemonData] =
    useState<PokemonProps | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * featuredPokemon.length);
    const selectedRandomFeaturedPokemon = featuredPokemon[randomIndex];
    setRandomFeaturedPokemon(selectedRandomFeaturedPokemon);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pokemonData = await getPokemon(randomFeaturedPokemon);
        setFeaturedPokemonData(pokemonData);

        // Check if description is already in local storage
        const storedDescription = localStorage.getItem(randomFeaturedPokemon);

        if (storedDescription != null) {
          setOpenAIDescription(storedDescription);
        } else {
          // If not, generate a new description
          const prompt = `Compose a concise description of the Pokémon  ${randomFeaturedPokemon} within a limit of 100 tokens.`;
          const pokemonDescription = await generateDescriptionWithOpenAI(
            prompt
          );

          setOpenAIDescription(pokemonDescription);

          // Store the new description in local storage
          localStorage.setItem(randomFeaturedPokemon, pokemonDescription);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [randomFeaturedPokemon]);

  if (loading) {
    return (
      <div className="loading-image w-24 relative h-24">
        <Image
          src="/static/images/loading.gif"
          fill={true}
          alt={`Loading gif`}
        />
      </div>
    );
  }

  return (
    <>
      {featuredPokemonData && (
        <div className="featuredPokemonContainer flex flex-col md:flex-row gap-10 mt-14  md:mt-36 items-center justify-between">
          <div className="pokemonItem">
            <PokemonCircleImage pokemonData={featuredPokemonData} />

            <PokemonTypeButtons pokemonType={featuredPokemonData.types} />
          </div>
          <div className="pokemonItemContent text-center md:text-left">
            <h2 className="font-heading text-4xl uppercase">
              {featuredPokemonData.name}
            </h2>
            <div className="pokemonDescription mt-4">
              <p>{openAIDescription}</p>
            </div>

            <PokemonStats pokemonStats={featuredPokemonData.stats} />
            <div className="mt-10 text-center">
              <Link
                className="bg-accent py-2 px-4 font-semibold font-accent text-textAccent uppercase rounded-md"
                href={featuredPokemonData.name}
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
