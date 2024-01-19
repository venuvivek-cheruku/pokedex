"use client";
import { useEffect, useState } from "react";
import {
  generateDescriptionWithOpenAI,
  getPokemonType,
} from "@/lib/pokemonAPI";
import Link from "next/link";
import Image from "next/image";
import LoadingIcon from "@/components/loading";

export default function TypesPage() {
  const [fetchPokemonTypeList, setFetchPokemonTypeList] = useState([]);
  const [fetchPokemonTypeDescription, setFetchPokemonTypeDescription] =
    useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const types = await getPokemonType();
        setFetchPokemonTypeList(types);

        const pokemonTypePage = "pokemonTypeDescription";

        const checkStoredTypeDescription =
          localStorage.getItem(pokemonTypePage);

        if (checkStoredTypeDescription != null) {
          setFetchPokemonTypeDescription(checkStoredTypeDescription);
        } else {
          const prompt = `Compose a concise description of the Pokémon Types within a limit of 100 tokens.`;
          const pokemonTypeDescription = await generateDescriptionWithOpenAI(
            prompt
          );
          setFetchPokemonTypeDescription(pokemonTypeDescription);

          localStorage.setItem(pokemonTypePage, pokemonTypeDescription);
        }
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="typeContainer mt-14 md:mt-36">
        <div className="section-title text-center flex flex-col gap-4 justify-center items-center">
          <h1 className="font-heading text-4xl md:text-5xl uppercase">
            Choose any Type to explore
          </h1>
          <LoadingIcon loading={loading} />
          <p className="font-body max-w-5xl mx-auto">
            {fetchPokemonTypeDescription}
          </p>
        </div>
        <div className="flex flex-wrap gap-10 md:gap-20 justify-around mt-14 md:mt-36">
          {fetchPokemonTypeList.map((type: any, index: number) => {
            if (type.name === "shadow" || type.name === "unknown") {
              return null;
            } else {
              return (
                <Link href={`types/${type.name}`} key={index}>
                  <div className="typeImage w-32 h-32  md:w-52 md:h-52 relative">
                    <Image
                      src={"/Images/" + type.name + ".svg"}
                      alt={type.name + "Image"}
                      fill={true}
                      priority
                      sizes="(max-width: 768px) 150px auto"
                    />
                  </div>
                  <h1 className="font-heading text-xl text-center mt-4 uppercase">
                    {type.name}
                  </h1>
                </Link>
              );
            }
          })}
        </div>
      </div>
    </>
  );
}
