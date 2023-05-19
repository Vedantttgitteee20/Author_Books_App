import React, { useState , useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  // Button
} from 'react-native';
import 'react-native-gesture-handler';

export default function BooksPage({navigation}){
  const [refreshing, setRefreshing] = useState(false);
  const [books, setBooks] = useState([
      {
         name: 'Harry Potter and the Goblet of Fire',
         id: 1,
         authorId : '6f6929a8-e36e-425c-8a2e-728087dac8ee'
       },
       {
        name: 'Harry Potter and Half Blood Prince',
        id: 2,
        authorId :'6f6929a8-e36e-425c-8a2e-728087dac8ee'
      },
  ]);
  // const [Books, SetBooks]=useState ([
  //   {
  //     title: 'Harry Potter and the Goblet of Fire',
  //     charac: ['Harry Potter', 'Cedric Diggory', 'Victor Krum', 'Barty Crouch'],
  //   },
  //   {
  //     title: 'Harry Potter and the Order of the Phoenix',
  //     charac: ['Professor Snape', 'Harry Potter', 'Lord Voldemort'],
  //   },
  //   {
  //     title: 'Harry Potter and the Prisoner of Azkaban',
  //     charac: ['Serius Black', 'Professor Snape'],
  //   },
  //   {
  //     title: 'Harry Potter and the Chamber of Secrets',
  //     charac: ['Hagrid', 'Ron Weasly'],
  //   },
  //   {
  //     title: 'The Kite Runner',
  //     charac: ['Hassaan', 'Ali'],
  //   },
  // ]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('https://evolving-warthog-44.hasura.app/v1/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary headers, such as authorization token
        },
        body: JSON.stringify({
          query: `
            query{
              book_book{
                id
                name
                authorId
              }
            }
          `,
        }),
      });

      const { data } = await response.json();
      setBooks(data.book_book);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
    // Simulate data fetching delay
    setTimeout(() => {
      fetchData();
      setRefreshing(false);
    }, 2000);
  };
  const navigateToBookDetails = (book) => {
    navigation.navigate('BookDetails', { book });
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
  <ScrollView
  refreshControl={
    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
  }>
  <FlatList
      data={books}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <TouchableOpacity
        onPress={() => navigateToBookDetails(item)}
        style={styles.item}>
          <Text style={styles.booktitle}>{item.name}</Text>
          <Text style={styles.character}>ID: {item.id}</Text>
          <Text style={styles.character}>Author ID: {item.authorId}</Text>
        </TouchableOpacity>
      )}
    />
    </ScrollView>
    {/* <Button title='Go to Author' onPress={pressHandler}/> */}
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
