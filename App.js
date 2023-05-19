import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
// import TempPage from './Screens/Temp';
import BooksPage from './Screens/BooksPage';
import AuthorsPage from './Screens/AuthorPage';
import BookDetails from './Screens/BookDetails';
const Stack = createStackNavigator();
const App = () => (
  <NavigationContainer>
  <Stack.Navigator>
      {/* <Stack.Screen name="Temp" component={TempPage} /> */}
      <Stack.Screen name="Books" component={BooksPage} />
      <Stack.Screen name="Authors" component={AuthorsPage} />
      <Stack.Screen name="BookDetails" component={BookDetails} />
      {/* <Stack.Screen name="Settings" component={Settings} /> */}
  </Stack.Navigator>
  </NavigationContainer>
);

export default App;