"use client";
import { PokemonCard } from "@/components/pokemon-card";
import { PokemonStats } from "@/components/pokemon-stat";
import { PokemonTypeButtons } from "@/components/pokemon-type";
import {
  generateDescriptionWithOpenAI,
  getPokemon,
  getPokemonEvolutionData,
  getPokemonSpecies,
} from "@/lib/pokemonAPI";
import Image from "next/image";
import Link from "next/link";
import {
  JSXElementConstructor,
  PromiseLikeOfReactNode,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";

interface PokemonProps {
  id: number;
  weight: number;
  height: number;
  base_experience: number;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number }[];
  abilities: { ability: { name: string } }[];
}

interface PokemonPageProps {
  params: {
    pokemonName: string;
  };
}

export default function PokemonPage({ params }: PokemonPageProps) {
  const { pokemonName } = params;
  const [pokemonData, setPokemonData] = useState<any | null>(null);
  const [pokemonSpeciesData, setPokemonSpeciesData] = useState<any>();
  const [pokemonDescription, setPokemonDescription] = useState<string>("");
  const [pokemonEvolutionData, setPokemonEvolutionData] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const pokemonObject = await getPokemon(pokemonName);
        setPokemonData(pokemonObject);

        const pokemonSpeciesObject = await getPokemonSpecies(pokemonName);
        setPokemonSpeciesData(pokemonSpeciesObject);

        const evolutionID = pokemonSpeciesObject.evolution_chain.url
          .split("/")
          .slice(-2, -1)[0];

        const fetchPokemonEvolutionData = await getPokemonEvolutionData(
          evolutionID
        );

        setPokemonEvolutionData(fetchPokemonEvolutionData);

        const fetchPokemonDescription = localStorage.getItem(pokemonName);

        if (fetchPokemonDescription !== null) {
          setPokemonDescription(fetchPokemonDescription);
        } else {
          const prompt = `Compose a concise description of the Pokémon ${pokemonName} within a limit of 100 tokens.`;

          const getPokemonDescription = await generateDescriptionWithOpenAI(
            prompt
          );

          setPokemonDescription(getPokemonDescription);

          localStorage.setItem(pokemonName, getPokemonDescription);
        }
      } catch (error) {
        console.error("Error getting Pokemon data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPokemonData();
  }, [pokemonName]);

  if (loading) {
    return (
      <div className="loading-image w-32 relative h-32  mt-14 md:mt-36">
        <Image
          src="/images/loading.gif"
          style={{ objectFit: "contain" }}
          alt={`Loading gif`}
          width={128}
          height={128}
        />
      </div>
    );
  }

  const PokemonImageURL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/";

  return (
    <>
      <div className="PokemonDetailsContainer mt-20 md:mt-36 w-full">
        <div className="section-title text-center flex flex-col gap-4 ">
          <h1 className="font-heading text-3xl md:text-5xl uppercase relative w-fit mx-auto">
            {pokemonName}{" "}
            <span className="absolute -top-10 -right-10  p-4 rounded-[50%] inline-flex justify-center items-center text-accent  font-accent font-bold text-2xl">
              #{pokemonData.id}
            </span>
          </h1>
          <p className="font-body max-w-5xl mx-auto">{pokemonDescription}</p>
        </div>

        <div className=" w-80  md:w-[500px] h-80  md:h-[500px] relative mx-auto">
          <span
            className="imageWithBGCircle"
            style={{
              background: `var(--${pokemonData.types[0]?.type.name}, white)`,
              filter: "brightness(1)",
            }}
          ></span>
          <Image
            alt={"Picture of " + pokemonName}
            src={pokemonData.sprites.other["home"].front_default}
            fill={true}
            priority
          />
        </div>

        <PokemonTypeButtons pokemonType={pokemonData.types} />

        <div className="flex flex-wrap justify-center items-center mt-8 gap-4">
          <div className="flex flex-col gap-1 border border-darkGray bg-bgSecondary px-4 py-2 rounded-lg items-center">
            <p className="text-2xl md:text-3xl font-accent">
              {pokemonData.weight / 10}
              <span className="text-xl"> kgs</span>
            </p>
            <p className="font-accent text-sm ">Weight</p>
          </div>
          <div className="flex flex-col gap-1 border border-darkGray bg-bgSecondary px-4 py-2 rounded-lg items-center">
            <p className="text-2xl md:text-3xl font-accent">
              {pokemonData.height / 10} <span className="text-xl"> m</span>
            </p>
            <p className="font-accent text-sm ">Height</p>
          </div>
          <div className="flex flex-col gap-1 border border-darkGray bg-bgSecondary px-4 py-2 rounded-lg items-center">
            <p className="text-2xl md:text-3xl font-accent">
              {pokemonData.base_experience}
            </p>
            <p className="font-accent text-sm ">Base Exp.</p>
          </div>
          {pokemonSpeciesData && (
            <div className="flex flex-col gap-1 border border-darkGray bg-bgSecondary px-4 py-2 rounded-lg items-center">
              <p className="text-2xl md:text-3xl font-accent">
                {pokemonSpeciesData.base_happiness}
              </p>
              <p className="font-accent text-sm ">Base Friendship</p>
            </div>
          )}
          {pokemonSpeciesData && (
            <div className="flex flex-col gap-1 border border-darkGray bg-bgSecondary px-4 py-2 rounded-lg items-center">
              <p className="text-2xl md:text-3xl font-accent">
                {pokemonSpeciesData.capture_rate} %
              </p>
              <p className="font-accent text-sm ">Catch rate</p>
            </div>
          )}
        </div>
        <div className="stat-abilities flex flex-wrap justify-around flex-shrink-0 mt-14 md:mt-36 gap-10">
          <div className="stat-container w-full md:w-2/3 flex flex-col justify-center flex-shrink-0 items-center">
            <div className="section-title text-center flex flex-col gap-4 ">
              <h2 className="font-heading text-3xl md:text-4xl uppercase">
                Stats
              </h2>
            </div>
            <PokemonStats pokemonStats={pokemonData.stats} />
          </div>
          <div className="  w-[1px] bg-darkGray hidden md:flex flex-col items-center justify-center"></div>
          <div className="right-container flex flex-col gap-10">
            <div className="abilities">
              <div className="section-title text-center flex flex-col gap-4 ">
                <h2 className="font-heading text-3xl uppercase">abilities</h2>
              </div>
              {pokemonData.abilities.map(
                (
                  abilities: {
                    ability: {
                      name: string;
                    };
                  },
                  index: number
                ) => {
                  return (
                    <p
                      key={index}
                      className="mt-2 text-center capitalize font-body font-xl"
                    >
                      {abilities.ability.name}
                    </p>
                  );
                }
              )}
            </div>
            {pokemonSpeciesData && (
              <div className="growth">
                <div className="section-title text-center flex flex-col gap-4 ">
                  <h2 className="font-heading text-3xl uppercase">
                    Growth Rate
                  </h2>
                </div>
                <p className="mt-2 text-center capitalize font-body font-xl">
                  {pokemonSpeciesData.growth_rate.name}
                </p>
              </div>
            )}
            {pokemonSpeciesData && (
              <div className="Egg">
                <div className="section-title text-center flex flex-col gap-4 ">
                  <h2 className="font-heading text-3xl uppercase">
                    Egg Groups
                  </h2>
                </div>
                {pokemonSpeciesData.egg_groups.map(
                  (egg_group: any, index: number) => {
                    return (
                      <p
                        key={index}
                        className="mt-2 text-center capitalize font-body font-xl"
                      >
                        {egg_group.name}
                      </p>
                    );
                  }
                )}
              </div>
            )}
            {pokemonSpeciesData && (
              <div className="generation">
                <div className="section-title text-center flex flex-col gap-4 ">
                  <h2 className="font-heading text-3xl uppercase">
                    Generation
                  </h2>
                </div>
                <p className="mt-2 text-center capitalize font-body font-xl">
                  {pokemonSpeciesData.generation.name.toUpperCase()}
                </p>
              </div>
            )}
          </div>
        </div>
        {pokemonSpeciesData && (
          <div className="mt-14 md:mt-36 evolution-chart">
            <div className="section-title text-center flex flex-col gap-4 ">
              <h2 className="font-heading text-3xl md:text-4xl uppercase">
                Evolutions
              </h2>
            </div>
            <div className="evolutionPokemon-container flex items-center flex-wrap gap-0 md:gap-20 justify-center mt-10">
              {pokemonEvolutionData.chain.evolves_to[0] ? (
                <>
                  <div className="evolution-pokemon flex items-center gap-10">
                    {pokemonEvolutionData.chain.evolves_to[0] && (
                      <>
                        <PokemonCard
                          name={pokemonEvolutionData.chain.species.name}
                          key={pokemonEvolutionData.chain.species.name}
                          image={
                            PokemonImageURL +
                            `${pokemonEvolutionData.chain.species.url
                              .split("/")
                              .slice(-2, -1)}.png`
                          }
                        />
                      </>
                    )}
                  </div>

                  {pokemonEvolutionData.chain.evolves_to[0] && (
                    <span className=" text-2xl md:text-7xl"> ⟶</span>
                  )}

                  <div className="evolution-pokemon flex flex-row items-center gap-10">
                    {pokemonEvolutionData.chain.evolves_to[0] && (
                      <>
                        <PokemonCard
                          name={
                            pokemonEvolutionData.chain.evolves_to[0].species
                              .name
                          }
                          key={
                            pokemonEvolutionData.chain.evolves_to[0].species
                              .name
                          }
                          image={
                            PokemonImageURL +
                            `${pokemonEvolutionData.chain.evolves_to[0].species.url
                              .split("/")
                              .slice(-2, -1)}.png`
                          }
                        />
                      </>
                    )}
                  </div>

                  {pokemonEvolutionData.chain.evolves_to[0]?.evolves_to[0] && (
                    <span className=" text-2xl md:text-7xl"> ⟶</span>
                  )}

                  <div className="evolution-pokemon flex flex-row items-center gap-10">
                    {pokemonEvolutionData.chain.evolves_to[0]
                      ?.evolves_to[0] && (
                      <>
                        <PokemonCard
                          name={
                            pokemonEvolutionData.chain.evolves_to[0]
                              ?.evolves_to[0].species.name
                          }
                          key={
                            pokemonEvolutionData.chain.evolves_to[0]
                              ?.evolves_to[0].species.name
                          }
                          image={
                            PokemonImageURL +
                            `${pokemonEvolutionData.chain.evolves_to[0]?.evolves_to[0].species.url
                              .split("/")
                              .slice(-2, -1)}.png`
                          }
                        />
                      </>
                    )}
                  </div>
                </>
              ) : (
                <p className="font-body mt-10 text-xl">No Evolutions</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}
