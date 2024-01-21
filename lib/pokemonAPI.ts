const POKEMON_API = "https://pokeapi.co/api/v2/";
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// getPokemon first

export async function getPokemonList(count: number) {
  const maxCount = Math.max(count, 1400);
  const response = await fetch(
    POKEMON_API + `pokemon-species?limit=${count}&offset=0`
  );
  const data = await response.json();
  return data.results;
}

// then specific pokemon details

export async function getPokemon(name: string) {
  try {
    const response = await fetch(POKEMON_API + "pokemon/" + name);

    if (!response.ok) {
      if (response.status === 404) {
        // Handle the case where the Pokémon is not found
        console.error(`Pokémon not found for ${name}`);
        return null; // Return null or some default value indicating not found
      } else {
        throw new Error(
          `Failed to fetch Pokémon details for ${name}. Status: ${response.status}`
        );
      }
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Error fetching Pokémon details for ${name}:`, error.message);
    throw error; // Re-throw the error to be caught by the caller
  }
}

export async function getPokemonSpecies(name: string) {
  try {
    const response = await fetch(POKEMON_API + "pokemon-species/" + name);

    if (!response.ok) {
      if (response.status === 404) {
        console.log(`Pokémon not found for ${name}`);
        return null;
      } else {
        throw new Error(
          `Failed to fetch Pokémon details for ${name}. Status: ${response.status}`
        );
      }
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(`Error fetching Pokémon details for ${name}:`, error.message);
    throw error;
  }
}

export async function generateDescriptionWithOpenAI(prompt: any) {
  const APIBody = {
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You will be provided with statements, and your task is to convert them to summarize in easy text.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 100,
    top_p: 1,
  };

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + OPENAI_API_KEY,
      },
      body: JSON.stringify(APIBody),
    });
    if (!response.ok) {
      if (response.status === 404) {
        console.log(`No results found`);
        return null;
      } else {
        throw new Error(
          `Failed to fetch details for ${prompt}. Status: ${response.status}`
        );
      }
    }
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error: any) {
    console.error(`Error fetching details for ${prompt}:`, error.message);
    throw error;
  }
}

// Pokemon Type API

export async function getPokemonType() {
  const response = await fetch(POKEMON_API + "type");
  const data = await response.json();
  return data.results;
}

export async function getPokemonTypeData(typeName: any) {
  try {
    const response = await fetch(POKEMON_API + "type/" + typeName);
    if (!response.ok) {
      if (response.status === 404) {
        console.error(`Pokémon not found for ${typeName}`);
        return null; // Return null or some default value indicating not found
      } else {
        throw new Error(
          `Failed to fetch Pokémon details for ${typeName}. Status: ${response.status}`
        );
      }
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    console.error(
      `Error fetching Pokémon details for ${typeName}:`,
      error.message
    );
    throw error;
  }
}

export async function getPokemonRegionsList() {
  try {
    const response = await fetch(POKEMON_API + "generation/");
    if (!response.ok) {
      if (response.status === 404) {
        console.error("Failed to fetch the regions list");
        return null;
      } else {
        throw new Error(`Failed to fetch the regions list: ${response.status}`);
      }
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error("Error Fetching Regional Data");
    throw error;
  }
}

export async function getPokemonRegionsData(region: any) {
  try {
    const response = await fetch(POKEMON_API + "generation/" + region);
    if (!response.ok) {
      if (response.status === 404) {
        console.error(" Failed to fetch the region data");
        return null;
      } else {
        throw new Error(`Failed to fetch ${region} data`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Fetching Region Data");
    throw error;
  }
}

export async function getPokemonEvolutionData(id: number) {
  try {
    const response = await fetch(POKEMON_API + "evolution-chain/" + id);
    if (!response.ok) {
      if (response.status === 404) {
        console.error(" Failed to fetch the region data");
        return null;
      } else {
        throw new Error(`Failed to fetch evolution chain of ${id} data`);
      }
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error Fetching evolution Data");
    throw error;
  }
}
