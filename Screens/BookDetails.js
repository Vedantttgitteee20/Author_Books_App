import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Button } from 'react-native';
import { colors } from '../constant/commonStyle.js';
const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    delete_book_book_by_pk(id: $bookId) {
      id
    }
  }
`;

export default function BookDetails({ route, navigation }) {
  const { book } = route.params;
  const { refetch }= route.params;

  const [deleteBook] = useMutation(DELETE_BOOK, {
    onCompleted: () => {
      refetch();
      navigation.goBack(); // Navigate back to the previous screen after deleting the book
    },
  });

  const handleDelete = () => {
    deleteBook({ variables: { bookId: book.id } });
  };

  const handleEditBook = (refetch) => {
    navigation.navigate('EditBook', { book, refetch });
  };
  return (
    <SafeAreaView style={styles.safeare}>
      <View style={{ height: 50, justifyContent: 'center' }}>
        <Text style={styles.maintitle}>Book Details</Text>
      </View>
      <ScrollView >
        <View style={styles.item}>
          {/* Render book details */}
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.smalltitlecss}>
                <Text style={styles.smalltitle}>Book id</Text>
              </View>
              <View style={styles.smallvaluecss}>
                <Text style={styles.smallvalue}>{book.id}</Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.smalltitlecss}>
                <Text style={styles.smalltitle}>Book Name</Text>
              </View>
              <View style={styles.smallvaluecss}>
                <Text style={styles.smallvalue}>{book.name}</Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.smalltitlecss}>
                <Text style={styles.smalltitle}>Author Name</Text>
              </View>
              <View style={styles.smallvaluecss}>
                <Text style={styles.smallvalue}>{book.author.name}</Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.smalltitlecss}>
                <Text style={styles.smalltitle}>Author age</Text>
              </View>
              <View style={styles.smallvaluecss}>
                <Text style={styles.smallvalue}>{book.author.Age}</Text>
              </View>
            </View>
          </View>
          <Button title="Delete Book" onPress={handleDelete} color={colors.ternary} />
        </View>
      </ScrollView>
      <Button title="Edit Book" onPress={handleEditBook(refetch)} color={colors.ternary} />
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
    backgroundColor: colors.background,
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
});