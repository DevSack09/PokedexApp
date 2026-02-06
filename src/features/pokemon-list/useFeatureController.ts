import {useMemo, useState} from 'react';
import {InfiniteData, useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {apiConfig, queryKeys} from '../../constants/api';
import {useDebounce} from '../../hooks/useDebounce';
import {fetchPokemonByName, fetchPokemonList} from './services';
import {PokemonListItem} from './Layout';
import {PokemonListResponse} from '../../types/pokemon';

function getPokemonIdFromUrl(url: string): number | null {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);
  return match ? Number(match[1]) : null;
}

function getImageUrlFromId(id: number | null): string | null {
  if (!id) {
    return null;
  }
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`;
}

function normalizeSearchTerm(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, '-').replace(/\./g, '');
}

export function usePokemonListController() {
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const debouncedSetQuery = useDebounce((value: string) => {
    setDebouncedQuery(normalizeSearchTerm(value));
  }, 400);

  const listQuery = useInfiniteQuery<
    PokemonListResponse,
    Error,
    InfiniteData<PokemonListResponse>,
    string[],
    number
  >({
    queryKey: [queryKeys.pokemonList],
    initialPageParam: 0,
    queryFn: ({pageParam}) => fetchPokemonList(pageParam, apiConfig.pageSize),
    getNextPageParam: (lastPage, pages) =>
      lastPage.next ? pages.length * apiConfig.pageSize : undefined,
  });

  const searchQuery = useQuery({
    queryKey: [queryKeys.pokemonDetail, debouncedQuery],
    queryFn: () => fetchPokemonByName(debouncedQuery),
    enabled: debouncedQuery.length > 0,
    retry: false,
  });

  const listItems = useMemo(() => {
    const pages = listQuery.data?.pages ?? [];
    return pages.flatMap(page =>
      page.results.map(item => {
        const id = getPokemonIdFromUrl(item.url);
        return {
          name: item.name,
          imageUrl: getImageUrlFromId(id),
        } satisfies PokemonListItem;
      }),
    );
  }, [listQuery.data]);

  const searchItem = useMemo(() => {
    if (!searchQuery.data) {
      return null;
    }
    return {
      name: searchQuery.data.name,
      imageUrl:
        searchQuery.data.sprites?.front_default ??
        getImageUrlFromId(searchQuery.data.id),
    } satisfies PokemonListItem;
  }, [searchQuery.data]);

  const items = debouncedQuery ? (searchItem ? [searchItem] : []) : listItems;
  const isLoading = debouncedQuery
    ? searchQuery.isLoading
    : listQuery.isLoading;
  const isError = debouncedQuery ? searchQuery.isError : listQuery.isError;

  const onEndReached = () => {
    if (debouncedQuery) {
      return;
    }
    if (listQuery.hasNextPage && !listQuery.isFetchingNextPage) {
      listQuery.fetchNextPage();
    }
  };

  const onChangeQuery = (value: string) => {
    setQuery(value);
    debouncedSetQuery(value);
  };

  return {
    items,
    query,
    isLoading,
    isError,
    isFetchingNextPage: listQuery.isFetchingNextPage,
    hasNextPage: Boolean(listQuery.hasNextPage),
    onEndReached,
    onChangeQuery,
  };
}
