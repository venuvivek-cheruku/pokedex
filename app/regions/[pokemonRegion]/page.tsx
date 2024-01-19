"use client";
import { PokemonCard } from "@/components/pokemon-card";
import {
  generateDescriptionWithOpenAI,
  getPokemonRegionsData,
} from "@/lib/pokemonAPI";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PokemonRegionProps {
  pokemon: {
    name: string;
  };
}

export default function RegionPage({
  params,
}: {
  params: { pokemonRegion: string };
}) {
  const regionName = params.pokemonRegion;

  const [regionData, setRegionData] = useState<any>();
  const [fetchRegionPokemon, setFetchRegionPokemon] = useState<
    PokemonRegionProps[]
  >([]);
  const [fetchRegionTypes, setFetchRegionTypes] = useState<
    PokemonRegionProps[]
  >([]);
  const [regionDescription, setRegionDescription] = useState("");
  const [loadedImages, setLoadedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState("");

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages((prevImages) => [...prevImages, imageUrl]);
  };

  const regionToGeneration = () => {
    switch (regionName) {
      case "kanto":
        return "generation-i";
      case "johto":
        return "generation-ii";
      case "hoenn":
        return "generation-iii";
      case "sinnoh":
        return "generation-iv";
      case "unova":
        return "generation-v";
      case "kalos":
        return "generation-vi";
      case "alola":
        return "generation-vii";
      case "galar":
        return "generation-viii";
      case "paldea":
        return "generation-ix";
      default:
        "generation-i";
    }
  };

  const PokemonImageURL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/";

  useEffect(() => {
    const fetchRegionData = async () => {
      try {
        const data = await getPokemonRegionsData(regionToGeneration());
        setRegionData(data);
        setFetchRegionPokemon(data.pokemon_species);
        setFetchRegionTypes(data.types);

        const fetchDescription = localStorage.getItem(regionName);
        if (fetchDescription != null) {
          setRegionDescription(fetchDescription);
        } else {
          const prompt = `Compose a concise description of the Pokémon Region ${regionName} within a limit of 100 tokens.`;
          const fetchDescription = await generateDescriptionWithOpenAI(prompt);
          setRegionDescription(fetchDescription);
          localStorage.setItem(regionName, fetchDescription);
        }
      } catch (error) {
        console.error("Error fetching pokemon Region Data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRegionData();
  }, [regionName]);

  const searchFilter = (pokemon: any) => {
    return pokemon.filter((regionPokemon: any) =>
      regionPokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredPokemonList = searchFilter(fetchRegionPokemon);

  if (loading) {
    return (
      <div className="loading-image w-32 relative h-32 mt-20">
        <Image
          src="/images/loading.gif"
          style={{ objectFit: "contain" }}
          fill={true}
          alt={`Loading gif`}
        />
      </div>
    );
  }

  return (
    <>
      <div className="section-title text-center flex flex-col gap-4 mt-14 md:mt-36">
        <h1 className="font-heading text-4xl md:text-5xl uppercase">
          {regionName} ( {regionData.name} )
        </h1>
        <p className="font-body max-w-5xl mx-auto">{regionDescription}</p>
      </div>
      <div className="region-map relative w-full h-[450px] md:h-[650px] mt-4">
        <Image
          src={`/images/${regionName}-map.png`}
          alt={`${regionName} Region Map`}
          fill={true}
          priority
          style={{ objectFit: "cover", borderRadius: "10px" }}
        />
      </div>
      {fetchRegionTypes && fetchRegionTypes.length > 0 && (
        <div className="section-title text-center flex flex-col gap-4 mt-14 md:mt-36 ">
          <h2 className="font-heading text-4xl uppercase">
            Introduced Pokemon Types in {regionName} Region
          </h2>
        </div>
      )}

      <div className="flex flex-wrap justify-around gap-20 mt-14">
        {fetchRegionTypes.map((type: any, index: number) => {
          if (type.name === "shadow" || type.name === "unknown") {
            return null;
          } else {
            return (
              <>
                <Link href={`/types/${type.name}`} key={index}>
                  <div className="typeImage">
                    <Image
                      src={"/Images/" + type.name + ".svg"}
                      alt={type.name + "Image"}
                      width={200}
                      height={200}
                    />
                    <h1 className="font-heading text-xl text-center mt-4 uppercase">
                      {type.name}
                    </h1>
                  </div>
                </Link>
              </>
            );
          }
        })}
      </div>

      <div className="section-title text-center flex flex-col gap-4 mt-14  md:mt-36">
        <h2 className="font-heading text-4xl uppercase">
          Explore {regionName} Region Pokemon
        </h2>
      </div>
      <div className="input-container text-center mt-4 min-w-80">
        <input
          className="p-2 border-2 border-gray-100 mt-5 w-full text-center rounded-lg bg-bgSecondary text-xl "
          type="text"
          name="pokemon"
          value={searchText}
          id="pokemonName"
          placeholder={
            filteredPokemonList && filteredPokemonList.length > 0
              ? `Example: ${
                  filteredPokemonList[0].name.charAt(0).toUpperCase() +
                  filteredPokemonList[0].name.slice(1)
                }`
              : "Enter Pokemon name"
          }
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap gap-4 md:gap-10 justify-around mt-10">
        {filteredPokemonList.map((type: any, index: number) => {
          const imageUrl =
            PokemonImageURL + `${type.url.split("/").slice(-2, -1)}.png`;
          return (
            <div key={index}>
              <img
                src={imageUrl}
                alt={type.name}
                onLoad={() => handleImageLoad(imageUrl)}
                style={{ display: "none" }}
              />{" "}
              {loadedImages && (
                <PokemonCard
                  name={type.name}
                  key={type.name}
                  image={imageUrl}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
