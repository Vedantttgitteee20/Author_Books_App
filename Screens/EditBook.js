import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';
import { colors } from '../constant/commonStyle.js';

const UPDATE_BOOK = gql`
mutation updateBook($bookId: String!, $name: String!, $authorName: String!, $authorAge: Int!, $authorId: String!) {
  update_book_book_by_pk(pk_columns: {id: $bookId}, _set: {name: $name, authorId: $authorId}) {
    id
    name
  }
  update_author_author_by_pk(pk_columns: {id: $authorId}, _set: {name: $authorName, Age: $authorAge}) {
    id
    Age
    name
  }
}
`;

export default function EditBook({ route, navigation }) {
  const { book } = route.params;
  const { refetch } = route.params;
  const [bookName, setBookName] = useState(book.name);
  const [authorName, setAuthorName] = useState(book.author.name);
  const [authorAge, setAuthorAge] = useState(book.author.Age);
//   const [authorId, setAuthorId] = useState(book.author.id);

  const [updateBook] = useMutation(UPDATE_BOOK, {
    onCompleted: () => {
      navigation.goBack(); // Navigate back to the previous screen after updating the book
    },
  });

  const handleUpdate = () => {
    updateBook({
      variables: {
        bookId: book.id,
        name: bookName,
        authorName: authorName,
        authorId: book.author.id,
        authorAge: authorAge,
      },
    });
    refetch();
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={{ height: 50, justifyContent: 'center' }}>
        <Text style={styles.mainTitle}>Edit Book</Text>
      </View>
      <View style={styles.item}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Book Name:</Text>
          <TextInput
            style={styles.input}
            value={bookName}
            onChangeText={setBookName}
            placeholder="Enter book name"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Author Name:</Text>
          <TextInput
            style={styles.input}
            value={authorName}
            onChangeText={setAuthorName}
            placeholder="Enter author name"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Author Age:</Text>
          <TextInput
            style={styles.input}
            value={authorAge}
            onChangeText={setAuthorAge}
            placeholder="Enter author age"
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Author Id:</Text>
          <TextInput
            style={styles.input}
            value={book.author.id}
            editable={false}
            placeholder="Enter author id"
          />
        </View>
        <Button title="Update Book" onPress={handleUpdate} color={colors.ternary} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainTitle: {
    fontSize: 35,
    fontWeight: 'bold',
    color: 'black',
  },
  safearea: {
    height: '100%',
    padding: 10,
    backgroundColor: colors.background,
  },
  item: {
    backgroundColor: colors.secondary,
    padding: 20,
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    color: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
},
});