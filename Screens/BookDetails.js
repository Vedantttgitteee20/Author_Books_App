import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar } from 'react-native';

export default function BookDetails({ route }) {
  const { book } = route.params;

  return (
    <SafeAreaView style={styles.safeare}>
      <View style={{ height: 50, justifyContent: 'center' }}>
        <Text style={styles.maintitle}>Book Details</Text>
      </View>
      <ScrollView>
        <View style={styles.item}>
          <Text style={styles.booktitle}>{book.title}</Text>
          <Text style={styles.character}>{book.charac.join(', ')}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  booktitle: {
    fontSize: 24,
  },
});