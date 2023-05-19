import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Button } from 'react-native';

export default function AuthorDetails({ navigation, route }) {
  const { author } = route.params;
  const navigateToAddBook = () => {
    navigation.navigate('AddBook', { author: author });
  };

  return (
    <SafeAreaView style={styles.safeare}>
      <View style={{ height: 50, justifyContent: 'center' }}>
        <Text style={styles.maintitle}>Author Details</Text>
      </View>
      <ScrollView>
        <View style={styles.item}>
            <View style={{marginBottom: 20}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.smalltitlecss}>
                        <Text style={styles.smalltitle}>
                         Author Name
                        </Text>
                    </View>
                    <View style={styles.smallvaluecss}>
                        <Text style={styles.smallvalue}>
                        {author.name}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{marginBottom: 20}}>
                <View style={{flexDirection: 'row'}}>
                    <View style={styles.smalltitlecss}>
                        <Text style={styles.smalltitle}>
                         Author age
                        </Text>
                    </View>
                    <View style={styles.smallvaluecss}>
                        <Text style={styles.smallvalue}>
                        {author.Age}
                        </Text>
                    </View>
                </View>
            </View>
            <View style={{marginBottom: 20}}>
                <View style={{flexDirection: 'row'}}>
                <View style={styles.smalltitlecss}>
                        <Text style={styles.smalltitle}>
                         Book Name
                        </Text>
                    </View>
                    <View style={styles.smallvaluecss}>
                        <Text style={styles.smallvalue}>
                        {/* {author.books.name} */}
                        {author.books.map((author) => (
                  <Text key={author.name}>{author.name}, </Text>
                ))}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
      </ScrollView>
      <Button title="Add a Book" onPress={navigateToAddBook} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  smalltitlecss:{
    width: '30%'
  },
  smallvaluecss:{
    width: '75%'
  },
  smalltitle:{
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  smallvalue:{
    fontSize: 12,
    color: 'black',
  },
  maintitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
  },
  safeare: {
    height: '100%',
    padding: 10,
    backgroundColor: '#d2c3cc',
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
});