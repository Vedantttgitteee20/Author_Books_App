import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
// import TempPage from './Screens/Temp';
import BooksPage from './Screens/BooksPage';
import BookDetails from './Screens/BookDetails';
import AddBook from './Screens/AddBook';
import EditBook from './Screens/EditBook';
import AuthorsPage from './Screens/AuthorsPage';
import AuthorDetails from './Screens/AuthorDetails';
import AddAuthor from './Screens/AddAuthor';
import EditAuthor from './Screens/EditAuthor'
import { colors } from './constant/commonStyle';
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
const CustomTabIcon = ({ focused, color, size, iconName }) => {
  // Choose the appropriate icon name and color based on focus
  const icon = focused ? iconName : `${iconName}-outline`;
  const tabColor = focused ? colors.ternary : colors.black;

  return <Ionicons name={icon} size={size} color={tabColor} />;
};
const BooksStack = () => (
  <Stack.Navigator >
    <Stack.Screen name="Books" component={BooksPage} />
    <Stack.Screen name="BookDetails" component={BookDetails} />
    <Stack.Screen name="EditBook" component={EditBook} />
  </Stack.Navigator>
);
const AuthorsStack = () => (
  <Stack.Navigator >
    <Stack.Screen name="Author" component={AuthorsPage} />
    <Stack.Screen name="AuthorDetails" component={AuthorDetails} />
    <Stack.Screen name="AddBook" component={AddBook} />
    <Stack.Screen name="AddAuthor" component={AddAuthor} />
    <Stack.Screen name="EditAuthor" component={EditAuthor} />
  </Stack.Navigator>
);
const App = () => (
  <ApolloProvider client={client}>

  <NavigationContainer>
  <Tab.Navigator
  screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'BooksStack') {
        iconName = 'book';
      } else if (route.name === 'AuthorsStack') {
        iconName = 'person';
      }

      return (
        <CustomTabIcon
          focused={focused}
          color={color}
          size={size}
          iconName={iconName}
        />
      );
    },
    tabBarActiveTintColor: colors.ternary, // Color when focused
    tabBarInactiveTintColor: colors.black, // Color when not focused
  })}
>
  <Tab.Screen name="BooksStack" component={BooksStack} options={{ headerShown: false }} />
  <Tab.Screen name="AuthorsStack" component={AuthorsStack} options={{ headerShown: false }} />
</Tab.Navigator>

  </NavigationContainer>
  </ApolloProvider>
);

export default App;