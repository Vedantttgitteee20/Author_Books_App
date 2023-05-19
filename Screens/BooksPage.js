import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  Button
} from 'react-native';
import 'react-native-gesture-handler';

export default function BooksPage({navigation}){
  const [refreshing, setRefreshing] = useState(false);
  const [Books, SetBooks]=useState ([
    {
      title: 'Harry Potter and the Goblet of Fire',
      charac: ['Harry Potter', 'Cedric Diggory', 'Victor Krum', 'Barty Crouch'],
    },
    {
      title: 'Harry Potter and the Order of the Phoenix',
      charac: ['Professor Snape', 'Harry Potter', 'Lord Voldemort'],
    },
    {
      title: 'Harry Potter and the Prisoner of Azkaban',
      charac: ['Serius Black', 'Professor Snape'],
    },
    {
      title: 'Harry Potter and the Chamber of Secrets',
      charac: ['Hagrid', 'Ron Weasly'],
    },
    {
      title: 'The Kite Runner',
      charac: ['Hassaan', 'Ali'],
    },
  ]);
    const onRefresh = () => {
        setRefreshing(true);
    
        // Simulate data fetching delay
        setTimeout(() => {
            SetBooks([
            {
              title: 'New Book 1',
              charac: ['Author 1'],
            },
            {
              title: 'New Book 2',
              charac: ['Author 2'],
            },
          ]);
          setRefreshing(false);
        }, 2000);
      };
  const navigateToBookDetails = (book) => {
    navigation.navigate('BookDetails', { book });
  };
  const pressHandler = () => {
    navigation.navigate('Authors');
  };
  return(
  <SafeAreaView style={styles.safeare}>
  <View style={{
    height: 50, 
    justifyContent: 'center',
  }}>
    <Text style={styles.maintitle}>
      Books
    </Text>
  </View>
  <ScrollView>
  <FlatList
      data={Books}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
        onPress={() => navigateToBookDetails(item)}
        style={styles.item}>
          <Text style={styles.booktitle}>{item.title}</Text>
          <Text style={styles.character}>{item.charac.join(', ')}</Text>
        </TouchableOpacity>
      )}
    />
    </ScrollView>
    <Button title='Go to Author' onPress={pressHandler}/>
    </SafeAreaView>
)
}

const styles = StyleSheet.create({
  maintitle:{
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
  },
  safeare: {
    height: '100%',
    padding: 10,
    backgroundColor: '#d2c3cc' 
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  booktitle: {
    fontSize: 24,
  },
});
