import React from 'react';
import 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
// import TempPage from './Screens/Temp';
import BooksPage from './Screens/BooksPage';
import AuthorsPage from './Screens/AuthorPage';
import BookDetails from './Screens/BookDetails';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
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
const App = () => (
  <NavigationContainer>
    <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => (
        <CustomTabIcon focused={focused} color={color} size={size} />
      ),
    })}>
      <Tab.Screen name="BooksStack" component={BooksStack} options={{ headerShown: false }} />
      <Tab.Screen name="Authors" component={AuthorsPage}  />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;