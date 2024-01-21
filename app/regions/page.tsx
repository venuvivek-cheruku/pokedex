"use client";
import LoadingIcon from "@/components/loading";
import {
  generateDescriptionWithOpenAI,
  getPokemonRegionsData,
  getPokemonRegionsList,
} from "@/lib/pokemonAPI";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PokemonRegions() {
  const [regionsList, setRegionsList] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [regionDescription, setRegionDescription] = useState("");
  const generationRegions = [
    "Kanto", // Generation I
    "Johto", // Generation II
    "Hoenn", // Generation III
    "Sinnoh", // Generation IV
    "Unova", // Generation V
    "Kalos", // Generation VI
    "Alola", // Generation VII
    "Galar", // Generation VIII
    "paldea", // Generation IX
  ];

  const generationRegionsLowercase = generationRegions.map((region) => {
    return region.toLowerCase();
  });

  useEffect(() => {
    const regions = async () => {
      try {
        const data = await getPokemonRegionsList();
        setRegionsList(data);

        const regionPageDescription = "pokemonRegionDescription";

        const checkStoredTypeDescription = localStorage.getItem(
          regionPageDescription
        );

        if (checkStoredTypeDescription != null) {
          setRegionDescription(checkStoredTypeDescription);
        } else {
          const prompt = `Compose a concise description of the Pokémon Regions within a limit of 100 tokens.`;
          const pokemonRegionDescription = await generateDescriptionWithOpenAI(
            prompt
          );
          setRegionDescription(pokemonRegionDescription);

          localStorage.setItem(regionPageDescription, pokemonRegionDescription);
        }
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setLoading(false);
      }
    };
    regions();
  }, []);

  return (
    <>
      <div className="section-title text-center flex flex-col gap-4 mt-14 md:mt-36 justify-center items-center">
        <h1 className="font-heading text-4xl md:text-5xl uppercase">
          Choose any Region to explore
        </h1>
        <LoadingIcon loading={loading} />
        <p className="font-body max-w-5xl mx-auto">{regionDescription}</p>
      </div>
      <div className="regions-list-container flex flex-wrap gap-20 justify-around mt-14 md:mt-36">
        {regionsList.map((region: any, index: number) => (
          <div className="region rounded-xl" key={index}>
            <Link
              className="relative inline-block w-[350px] h-[450px]"
              href={`/regions/${generationRegionsLowercase[index]}`}
            >
              <Image
                src={`/images/${generationRegionsLowercase[index]}.png`}
                alt={`Picture of ${generationRegions[index]}`}
                fill={true}
                priority
                sizes="(max-width: 768px) 300px, 400px"
                style={{
                  borderRadius: "0.75rem",
                  objectFit: "cover",
                  objectPosition: "top",
                }}
              />
            </Link>
            <Link href={`/regions/${generationRegionsLowercase[index]}`}>
              <p className="font-accent text-2xl font-bold text-center">
                {generationRegions[index].toUpperCase()}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
