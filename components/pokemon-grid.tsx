"use client";
import { useEffect, useRef, useState } from "react";
import { PokemonCard } from "./pokemon-card";
import { getPokemonList } from "@/lib/pokemonAPI";

export function PokemonGrid() {
  const [searchText, setSearchText] = useState("");
  const [visiblePokemonList, setVisiblePokemonList] = useState<any[]>([]);
  const [isPlaceholderDisabled, setPlaceholderDisabled] = useState(false);
  const [count, setCount] = useState<number>(50);

  const handleInputChange = (e: any) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    const fetchPokemonList = async () => {
      const pokemonList = await getPokemonList(count);
      setVisiblePokemonList(pokemonList);
    };

    fetchPokemonList();
  }, [count]);

  const searchFilter = (visiblePokemonList: any) => {
    return visiblePokemonList.filter((pokemon: any) =>
      pokemon.name.toLowerCase().includes(searchText.toLowerCase())
    );
  };

  const filteredPokemonList = searchFilter(visiblePokemonList);

  const PokemonImageURL =
    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/";

  // Intersection Observer logic for lazy loading more Pokemon
  const observer = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Initialize Intersection Observer
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMorePokemon();
        }
      },
      { threshold: 1.0 }
    );

    // Start observing the "loadMoreRef"
    if (loadMoreRef.current) {
      observer.current.observe(loadMoreRef.current);
    }

    return () => {
      // Cleanup: Disconnect the Intersection Observer when the component unmounts
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, []);

  const loadMorePokemon = () => {
    setCount((prevCount: number) => {
      const newCount = prevCount + 50;
      return newCount;
    });
  };

  return (
    <>
      <div className="searchBarContainer mt-14 md:mt-36">
        <div className="section-title text-center uppercase">
          <h1 className="font-heading text-4xl md:text-5xl">
            Search for your Pokemon!
          </h1>
        </div>
        <input
          className=" p-2 border-2 border-gray-100 mt-5 w-full text-center rounded-lg bg-bgSecondary text-xl"
          type="text"
          name="pokemon"
          value={searchText}
          id="pokemonName"
          placeholder={isPlaceholderDisabled ? "" : "Charizard, Pikachu, etc"}
          onChange={(e) => setSearchText(e.target.value)}
          onClick={handleInputChange}
        />
      </div>

      <div className="pokemonCollectionContainer mt-14">
        <div className="flex flex-wrap gap-4 md:gap-10 justify-around ">
          {filteredPokemonList.map((pokemon: any) => {
            return (
              <div className="pokemon-card">
                <PokemonCard
                  name={pokemon.name}
                  key={pokemon.name}
                  image={
                    PokemonImageURL +
                    `${pokemon.url.split("/").slice(-2, -1)}.png`
                  }
                />
              </div>
            );
          })}
        </div>
        <div ref={loadMoreRef} style={{ height: "10px" }}></div>
      </div>
    </>
  );
}
