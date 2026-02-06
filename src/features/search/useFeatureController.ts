import {usePokemonListController} from '../pokemon-list/useFeatureController';

export function useSearchController() {
  const {
    items,
    query,
    isOffline,
    recentSearches,
    recentViews,
    types,
    selectedType,
    onChangeQuery,
    onSelectType,
    isLoading,
    isError,
  } = usePokemonListController();

  return {
    items,
    query,
    isOffline,
    recentSearches,
    recentViews,
    types,
    selectedType,
    onChangeQuery,
    onSelectType,
    isLoading,
    isError,
  };
}
