import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PokemonListScreen} from '../features/pokemon-list';
import {PokemonDetailScreen} from '../features/pokemon-detail';
import {FavoritesScreen} from '../features/favorites';
import {SearchScreen} from '../features/search/screen';

export type RootStackParamList = {
  MainTabs: undefined;
  PokemonDetail: {name: string};
};

export type TabParamList = {
  Home: undefined;
  Search: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

function MainTabs(): React.JSX.Element {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={PokemonListScreen} options={{title: 'Home'}} />
      <Tab.Screen name="Search" component={SearchScreen} options={{title: 'Busqueda'}} />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{title: 'Favoritos'}}
      />
    </Tab.Navigator>
  );
}

export function AppNavigator(): React.JSX.Element {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainTabs"
        component={MainTabs}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PokemonDetail"
        component={PokemonDetailScreen}
        options={{title: 'Detalle'}}
      />
    </Stack.Navigator>
  );
}
