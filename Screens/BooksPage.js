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
import {gql, useQuery } from '@apollo/client';
import LoadingScreen from '../Components/Loading';

export default function BooksPage({navigation}){
  const [refreshing, setRefreshing] = useState(false);
  const GET_BOOKS = gql`
  query {
      book_book {
       id
       name
       authorId
       author {
         id
         name
         Age
       }
      }
    }
  `;
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [books, setBooks] = useState([
      {
         name: 'Harry Potter and the Goblet of Fire',
         id: 1,
         authorId : '6f6929a8-e36e-425c-8a2e-728087dac8ee',
         author: {
          id: '6f6929a8-e36e-425c-8a2e-728087dac8ee',
          name: 'J.K. Rowling',
          Age: 55,
        },
       },
       {
        name: 'Harry Potter and Half Blood Prince',
        id: 2,
        authorId :'6f6929a8-e36e-425c-8a2e-728087dac8ee',
        author: {
          id: '6f6929a8-e36e-425c-8a2e-728087dac8ee',
          name: 'J.K. Rowling',
          Age: 55,
        },
      },
  ]);
  useEffect(() => {
    if (data) {
      setBooks(data.book_book);
    }
  }, [data]);


  const fetchData = async () => {
    client
      .query({
        query: GET_BOOKS,
      })
      .then((result) => {
        setBooks(result.data.book_book);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setRefreshing(false);
      });
  };

  const onRefresh = () => {
    setRefreshing(true);
    // Simulate data fetching delay
    setTimeout(() => {
      fetchData();
      setRefreshing(false);
    }, 500);
  };
  const navigateToBookDetails = (book) => {
    navigation.navigate('BookDetails', { book });
  };
  if (loading) {
    return <LoadingScreen/>;
  }

  if (error) {
    console.error('Error fetching data:', error);
    return <Text>Error fetching data</Text>;
  }
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
          <Text style={styles.character}>Author Name: {item.author.name}</Text>
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
