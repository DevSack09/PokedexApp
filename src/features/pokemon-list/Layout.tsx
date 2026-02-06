import React from 'react';
import {ActivityIndicator, FlatList, Text, TextInput, View} from 'react-native';
import {PokemonCard} from '../../components/PokemonCard';
import {styles} from './styles';

export type PokemonListItem = {
  name: string;
  imageUrl?: string | null;
};

type PokemonListLayoutProps = {
  items: PokemonListItem[];
  query: string;
  onChangeQuery: (value: string) => void;
  onEndReached: () => void;
  isLoading: boolean;
  isError: boolean;
  isFetchingNextPage: boolean;
  hasNextPage: boolean;
};

export function PokemonListLayout({
  items,
  query,
  onChangeQuery,
  onEndReached,
  isLoading,
  isError,
  isFetchingNextPage,
  hasNextPage,
}: PokemonListLayoutProps): React.JSX.Element {
  const showEmpty = !isLoading && items.length === 0;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pokedex</Text>
      <TextInput
        style={styles.search}
        placeholder="Buscar por nombre"
        value={query}
        onChangeText={onChangeQuery}
      />
      <FlatList
        data={items}
        keyExtractor={item => item.name}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        onEndReached={onEndReached}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator size="small" />
          ) : isError ? (
            <Text style={styles.helper}>Ocurrio un error.</Text>
          ) : showEmpty ? (
            <Text style={styles.helper}>Sin resultados.</Text>
          ) : null
        }
        ListFooterComponent={
          isFetchingNextPage && hasNextPage ? (
            <ActivityIndicator size="small" />
          ) : null
        }
        renderItem={({item}) => (
          <View style={styles.card}>
            <PokemonCard name={item.name} imageUrl={item.imageUrl} />
          </View>
        )}
      />
    </View>
  );
}
