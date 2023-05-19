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
} from 'react-native';
import 'react-native-gesture-handler';
import {gql, useQuery } from '@apollo/client';

export default function AuthorsPage({navigation}){
  const [refreshing, setRefreshing] = useState(false);
  const GET_AUTHS = gql`
    query {
      author_author {
        name
        Age
        id
        books {
          name
        }
      }
      }
  `;
  const { loading, error, data } = useQuery(GET_AUTHS);
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    if (data) {
      setAuthors(data.author_author);
    }
  }, [data]);
  const fetchData = async () => {
    client
      .query({
        query: GET_AUTHS,
      })
      .then((result) => {
        setAuthors(result.data.author_author);
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
    }, 2000);
  };
    const navigateToAuthorDetails = (author) => {
      navigation.navigate('AuthorDetails', { author });
    };
    if (loading) {
      return <Text>Loading...</Text>;
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
          Authors
        </Text>
      </View>
      <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <FlatList
          data={authors}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
            onPress={() => navigateToAuthorDetails(item)}
            style={styles.item}>
              <Text style={styles.booktitle}>{item.name}</Text>
              <Text style={styles.bookNames}>
              Books Name:{' '}
                {item.books.map((book) => (
                  <Text key={book.name}>{book.name}, </Text>
                ))}</Text>
            </TouchableOpacity>
          )}
        />
        </ScrollView>
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
      bookNames: {
        fontSize: 16,
        marginTop: 8,
      },
    });
    