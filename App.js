import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
// import TempPage from './Screens/Temp';
import BooksPage from './Screens/BooksPage';
import AuthorsPage from './Screens/AuthorsPage';
import BookDetails from './Screens/BookDetails';
import AuthorDetails from './Screens/AuthorDetails';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const client = new ApolloClient({
  uri: 'https://evolving-warthog-44.hasura.app/v1/graphql',
  cache: new InMemoryCache(),
  headers: {
    // Add the required header
    'x-hasura-admin-secret': 't0Y9AsLGDMsXCrjCPPepcPvqNkZ1Yyxd22NA0VK7G941Kx9RvfNMgYcRAbjJ983B',
    // or 'x-hasura-access-key': 'YOUR_HASURA_ACCESS_KEY',
  },
});
const CustomTabIcon = ({ focused, color, size }) => {
  // Customize the icon based on the `focused` prop
  const iconName = focused ? 'book' : 'book-outline';
  return <Ionicons name={iconName} size={size} color={color} />;
};
const BooksStack = () => (
  <Stack.Navigator >
    <Stack.Screen name="Books" component={BooksPage} />
    <Stack.Screen name="BookDetails" component={BookDetails} />
  </Stack.Navigator>
);
const AuthorsStack = () => (
  <Stack.Navigator >
    <Stack.Screen name="Author" component={AuthorsPage} />
    <Stack.Screen name="AuthorDetails" component={AuthorDetails} />
  </Stack.Navigator>
);
const App = () => (
  <ApolloProvider client={client}>

  <NavigationContainer>
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => (
        <CustomTabIcon focused={focused} color={color} size={size} />
      ),
    })}>
      <Tab.Screen name="BooksStack" component={BooksStack} options={{ headerShown: false }} />
      <Tab.Screen name="AuthorsStack" component={AuthorsStack} options={{ headerShown: false }} />
    </Tab.Navigator>
  </NavigationContainer>
  </ApolloProvider>
);

export default App;