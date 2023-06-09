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
  Button
} from 'react-native';
import 'react-native-gesture-handler';
import {gql, useQuery } from '@apollo/client';
import LoadingScreen from '../Components/Loading.js';
import ErrorModal from '../Components/ModalForError.js';
import { colors } from '../constant/commonStyle.js';

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
  const { loading, error, data, refetch } = useQuery(GET_AUTHS);
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    refetch();
    if (data) {
      setAuthors(data.author_author);
    }
  }, [data]);
  // const fetchData = async () => {
  //   client
  //     .query({
  //       query: GET_AUTHS,
  //     })
  //     .then((result) => {
  //       setAuthors(result.data.author_author);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     })
  //     .finally(() => {
  //       setRefreshing(false);
  //     });
  // };
  const fetchData = async () => {
    try {
      const result = await refetch();
      setAuthors(result.data.author_author);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setRefreshing(false);
    }
  };
  const onRefresh = () => {
    setRefreshing(true);
    // Simulate data fetching delay
    setTimeout(() => {
      fetchData();
      setRefreshing(false);
    }, 500);
  };
    const navigateToAuthorDetails = (author) => {
      navigation.navigate('AuthorDetails', { author });
    };
    const navigatetoAddAuthor =() => {
      navigation.navigate('AddAuthor');
    }
    const handleClose = () =>{
      console.error('Error fetching data:', error);
    } 
    if (loading) {
      return <LoadingScreen />;
    }
    if (error) {
      return <ErrorModal errorMessage="Error fetching data" onClose={handleClose} ></ErrorModal>;
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
        <Button title="Add Author" onPress={navigatetoAddAuthor} color={colors.ternary} />
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
        backgroundColor: colors.background 
      },
      container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        marginHorizontal: 16,
      },
      item: {
        backgroundColor: colors.secondary,
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
    