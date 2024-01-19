"use client";
import LoadingIcon from "@/components/loading";
import { PokemonCard } from "@/components/pokemon-card";
import {
  generateDescriptionWithOpenAI,
  getPokemonTypeData,
} from "@/lib/pokemonAPI";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PokemonTypeProps {
  pokemonTypeData: {
    pokemon: {
      name: string;
    };
    damage_relations: {
      double_damage_from: { name: string; url: string }[];
      double_damage_to: { name: string; url: string }[];
      half_damage_from: { name: string; url: string }[];
      half_damage_to: { name: string; url: string }[];
      no_damage_to: { name: string; url: string }[];
    };
  }[];
}

export default function PokemonTypePage({
  params,
}: {
  params: { pokemonType: string };
}) {
  const [searchText, setSearchText] = useState("");
  const [typeDescription, setTypeDescription] = useState("");
  const [loading, setLoading] = useState<boolean>(true);
  const [pokemonTypeData, setPokemonTypeData] = useState<any>();
  const [typePokemon, setTypePokemon] = useState<PokemonTypeProps[]>([]);

  const pokemonType = params.pokemonType;

  const [loadedImages, setLoadedImages] = useState<string[]>([]);

  const handleImageLoad = (imageUrl: string) => {
    setLoadedImages((prevImages) => [...prevImages, imageUrl]);
  };

  useEffect(() => {
    const fetchPokemonTypeData = async () => {
      try {
        const pokemonTypeData = await getPokemonTypeData(pokemonType);
        setPokemonTypeData(pokemonTypeData);
        setTypePokemon(pokemonTypeData.pokemon);

        const checkStoredTypeDescription = localStorage.getItem(pokemonType);

        if (checkStoredTypeDescription != null) {
          setTypeDescription(checkStoredTypeDescription);
        } else {
          const prompt = `Compose a concise description of the Pokémon type ${pokemonType} within a limit of 100 tokens.`;
          const pokemonTypeDescription = await generateDescriptionWithOpenAI(
            prompt
          );
          setTypeDescription(pokemonTypeDescription);

          localStorage.setItem(pokemonType, pokemonTypeDescription);
        }
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonTypeData();
  }, [pokemonType]);

  const searchFilter = (pokemon: any) => {
    return pokemon.filter((type: any) =>
      type.pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredPokemonList = searchFilter(typePokemon);

  const PokemonImageURL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/";

  if (loading) {
    return (
      <div className="loading-image w-32 relative h-32 mt-20">
        <Image
          src="/images/loading.gif"
          objectFit="contain"
          fill={true}
          alt={`Loading gif`}
        />
      </div>
    );
  }

  return (
    <>
      <div className="pokemonType-container mt-14 md:mt-36 ">
        <div className="flex flex-col md:flex-row gap-10 items-center justify-around">
          <Image
            src={"/images/" + pokemonType + ".svg"}
            alt="Pokemon Type Icon"
            width={350}
            height={350}
            layout="responsive"
            sizes="(max-width: 768px) 250px, 250px"
          />
          <div className="type-content flex flex-col gap-4 text-center md:text-left">
            <h1 className="font-heading text-4xl md:text-5xl uppercase mt-7 ">
              {pokemonType}
            </h1>
            <div className="type-descriprtion font-body flex flex-col gap-2">
              {typeDescription}
            </div>
          </div>
        </div>

        <div className="damage-relations mt-14 flex flex-wrap justify-center gap-10 md:gap-20 items-start">
          {Array.isArray(pokemonTypeData.damage_relations.double_damage_from) &&
            pokemonTypeData.damage_relations.double_damage_from.length > 0 && (
              <div className="damage-relation mt-4 flex gap-10 flex-col justify-center items-center rounded-xl border border-darkGray p-4 px-6  bg-bgSecondary">
                <h2 className="text-3xl font-heading uppercase ">
                  Double Damage from
                </h2>
                <div className="damage-icons flex flex-wrap gap-10 justify-center items-center ">
                  {Object.values(
                    pokemonTypeData.damage_relations.double_damage_from
                  ).map((damageRelation: any, index: number) => (
                    <Link
                      href={"/types/" + damageRelation.name}
                      target={damageRelation.name}
                      key={index}
                    >
                      <div className="flex flex-col gap-2 justify-center items-center">
                        <Image
                          src={"/images/" + damageRelation.name + ".svg"}
                          alt="double damage Icon"
                          width={100}
                          height={100}
                        />
                        <h3 className="font-accent uppercase ">
                          {" "}
                          {damageRelation.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          {Array.isArray(pokemonTypeData.damage_relations.double_damage_to) &&
            pokemonTypeData.damage_relations.double_damage_to.length > 0 && (
              <div className="damage-relation mt-4 flex gap-10 flex-col justify-center items-center rounded-xl border border-darkGray p-4 px-6  bg-bgSecondary">
                <h2 className="text-3xl font-heading uppercase ">
                  Double Damage To
                </h2>
                <div className="damage-icons flex flex-wrap gap-10 justify-center items-center ">
                  {Object.values(
                    pokemonTypeData.damage_relations.double_damage_to
                  ).map((damageRelation: any, index: number) => (
                    <Link
                      href={"/types/" + damageRelation.name}
                      target={damageRelation.name}
                      key={index}
                    >
                      <div className="flex flex-col gap-2 justify-center items-center">
                        <Image
                          src={"/images/" + damageRelation.name + ".svg"}
                          alt="double damage Icon"
                          width={100}
                          height={100}
                        />
                        <h3 className="font-accent uppercase ">
                          {" "}
                          {damageRelation.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          {Array.isArray(pokemonTypeData.damage_relations.half_damage_from) &&
            pokemonTypeData.damage_relations.half_damage_from.length > 0 && (
              <div className="damage-relation mt-4 flex gap-10 flex-col justify-center items-center rounded-xl border border-darkGray p-4 px-6  bg-bgSecondary">
                <h2 className="text-3xl font-heading uppercase ">
                  half Damage from
                </h2>
                <div className="damage-icons flex flex-wrap gap-10 justify-center items-center ">
                  {Object.values(
                    pokemonTypeData.damage_relations.half_damage_from
                  ).map((damageRelation: any, index: number) => (
                    <Link
                      href={"/types/" + damageRelation.name}
                      target={damageRelation.name}
                      key={index}
                    >
                      <div className="flex flex-col gap-2 justify-center items-center">
                        <Image
                          src={"/images/" + damageRelation.name + ".svg"}
                          alt="half damage Icon"
                          width={100}
                          height={100}
                        />
                        <h3 className="font-accent uppercase ">
                          {" "}
                          {damageRelation.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          {Array.isArray(pokemonTypeData.damage_relations.half_damage_to) &&
            pokemonTypeData.damage_relations.half_damage_to.length > 0 && (
              <div className="damage-relation mt-4 flex gap-10 flex-col justify-center items-center rounded-xl border border-darkGray p-4 px-6  bg-bgSecondary">
                <h2 className="text-3xl font-heading uppercase ">
                  half Damage to
                </h2>
                <div className="damage-icons flex flex-wrap gap-10 justify-center items-center ">
                  {Object.values(
                    pokemonTypeData.damage_relations.half_damage_to
                  ).map((damageRelation: any, index: number) => (
                    <Link
                      href={"/types/" + damageRelation.name}
                      target={damageRelation.name}
                      key={index}
                    >
                      <div className="flex flex-col gap-2 justify-center items-center">
                        <Image
                          src={"/images/" + damageRelation.name + ".svg"}
                          alt="half damage Icon"
                          width={100}
                          height={100}
                        />
                        <h3 className="font-accent uppercase ">
                          {" "}
                          {damageRelation.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          {Array.isArray(pokemonTypeData.damage_relations.no_damage_from) &&
            pokemonTypeData.damage_relations.no_damage_from.length > 0 && (
              <div className="damage-relation mt-4 flex gap-10 flex-col justify-center items-center rounded-xl border border-darkGray p-4 px-6  bg-bgSecondary">
                <h2 className="text-3xl font-heading uppercase ">
                  No Damage from
                </h2>
                <div className="damage-icons flex flex-wrap gap-10 justify-center items-center ">
                  {Object.values(
                    pokemonTypeData.damage_relations.no_damage_from
                  ).map((damageRelation: any, index: number) => (
                    <Link
                      href={"/types/" + damageRelation.name}
                      target={damageRelation.name}
                      key={index}
                    >
                      <div className="flex flex-col gap-2 justify-center items-center">
                        <Image
                          src={"/images/" + damageRelation.name + ".svg"}
                          alt="half damage Icon"
                          width={100}
                          height={100}
                        />
                        <h3 className="font-accent uppercase ">
                          {" "}
                          {damageRelation.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          {Array.isArray(pokemonTypeData.damage_relations.no_damage_to) &&
            pokemonTypeData.damage_relations.no_damage_to.length > 0 && (
              <div className="damage-relation mt-4 flex gap-10 flex-col justify-center items-center rounded-xl border border-darkGray p-4 px-6  bg-bgSecondary">
                <h2 className="text-3xl font-heading uppercase">
                  No Damage to
                </h2>
                <div className="damage-icons flex flex-wrap gap-10 justify-center items-center">
                  {Object.values(
                    pokemonTypeData.damage_relations.no_damage_to
                  ).map((damageRelation: any, index: number) => (
                    <Link
                      href={"/types/" + damageRelation.name}
                      target={damageRelation.name}
                      key={index}
                    >
                      <div className="flex flex-col gap-2 justify-center items-center">
                        <Image
                          src={"/images/" + damageRelation.name + ".svg"}
                          alt="half damage Icon"
                          width={100}
                          height={100}
                        />
                        <h3 className="font-accent uppercase">
                          {damageRelation.name}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
        </div>
      </div>
      <div className="pokemonType mt-14 md:mt-36">
        <div className="section-title text-center">
          <h1 className="font-heading text-4xl uppercase">
            Search Pokemon of type {pokemonType}
          </h1>
          <input
            className="p-2 border-2 border-gray-100 mt-5 w-full text-center rounded-lg bg-bgSecondary text-xl"
            type="text"
            name="pokemon"
            value={searchText}
            id="pokemonName"
            placeholder={
              filteredPokemonList && filteredPokemonList.length > 0
                ? `Example: ${
                    filteredPokemonList[0].pokemon.name
                      .charAt(0)
                      .toUpperCase() +
                    filteredPokemonList[0].pokemon.name.slice(1)
                  }`
                : "Enter Pokemon name"
            }
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
      </div>
      <div className="pokemonCollectionContainer ">
        <div className="flex flex-wrap gap-4 justify-around mt-10">
          {filteredPokemonList.map((type: any, index: number) => {
            const imageUrl =
              PokemonImageURL +
              `${type.pokemon.url.split("/").slice(-2, -1)}.png`;

            return (
              <div key={index}>
                <img
                  src={imageUrl}
                  alt={type.pokemon.name}
                  onLoad={() => handleImageLoad(imageUrl)}
                  style={{ display: "none" }}
                />{" "}
                {loadedImages.includes(imageUrl) && (
                  <PokemonCard
                    name={type.pokemon.name}
                    key={type.pokemon.name}
                    image={imageUrl}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
