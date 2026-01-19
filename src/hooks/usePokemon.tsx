/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from 'react';

interface Pokemon {
  id: number;
  name: string;
  imageUrl: string;
}

interface Props {
  id: number;
}
export const usePokemon = ({ id }: Props) => {
  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  const [isLoading, setIsLoading] = useState(true);

  const getPokemonBiId = async (id: number) => {

    setIsLoading(true);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

    const data = await response.json();

    setPokemon({
      id: id,
      name: data.name,
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
    });

    setIsLoading(false);
  };

  useEffect(() => {
    getPokemonBiId(id);
  }, [id]);

  return {
    // Properties
    isLoading,
    pokemon,

    // Methods
    getPokemonBiId,
    formattedId: id.toString().padStart(3, '0'),
  };
};
