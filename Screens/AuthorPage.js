import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  StatusBar,
  RefreshControl,
  FlatList,
  Button
} from 'react-native';
import 'react-native-gesture-handler';

function AuthorsPage({navigation}){
    const [Authors, SetAuthors]=useState([
        {
          title: 'Harry Potter and the Goblet of Fire',
          charac: ['JK Rowling'],
        },
        {
          title: 'Harry Potter and the Order of the Phoenix',
          charac: ['JK Rowling'],
        },
        {
          title: 'Harry Potter and the Prisoner of Azkaban',
          charac: ['JK Rowling'],
        },
        {
          title: 'Harry Potter and the Chamber of Secrets',
          charac: ['JK Rowling'],
        },
        {
          title: 'The Kite Runner',
          charac: ['Khaled Hosseini'],
        },
      ]);   
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = () => {
        setRefreshing(true);
    
        // Simulate data fetching delay
        setTimeout(() => {
            SetAuthors([
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
    const pressHandler = () => {
      navigation.navigate('Books');
    };
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
      data={Authors}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.character}>{item.charac.join(', ')}</Text>
        </View>
      )}
    />
    </ScrollView>
    <Button title='Go to Books' onPress={pressHandler}/>
  </SafeAreaView>
)};

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
  title: {
    fontSize: 24,
  },
});

export default AuthorsPage;