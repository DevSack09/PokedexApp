import {useQuery} from '@tanstack/react-query';
import {queryKeys} from '../../constants/api';
import {fetchPokemonByName} from './services';

export function usePokemonDetailController(name: string) {
  const {data, isLoading} = useQuery({
    queryKey: [queryKeys.pokemonDetail, name],
    queryFn: () => fetchPokemonByName(name),
    enabled: Boolean(name),
  });

  return {
    isLoading,
    name: data?.name ?? name,
    imageUrl: data?.sprites?.front_default ?? null,
  };
}
