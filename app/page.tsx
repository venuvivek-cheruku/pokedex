import { ExploreRegions } from "@/components/explore-regions";
import { ExploreTypes } from "@/components/explore-types";
import { FeaturedPokemon } from "@/components/featured-pokemon";
import { HeroSlider } from "@/components/hero-slider";
import { PokemonHighlights } from "@/components/pokedex-highlights";

export default async function Home() {
  return (
    <>
      <HeroSlider />
      <PokemonHighlights />
      <FeaturedPokemon />
      <ExploreTypes />
      <ExploreRegions />
    </>
  );
}
