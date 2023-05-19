import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import LoadingScreen from '../Components/Loading';
const ADD_BOOK_TO_USER = gql`
  mutation AddBookToUser($authorId: String!, $bookName: String!, $bookId: String!) {
    insert_book_book(objects: [{ name: $bookName, id: $bookId, authorId: $authorId }]) {
      returning {
        authorId
        id
        name
      }
    }
  }
`;

export default function AddBook({ navigation, route }) {
  const { author } = route.params;
  const [bookName, setBookName] = useState('');
  const [bookId, setBookId] = useState('');

  const [addBookToUser, { loading, error, data }] = useMutation(ADD_BOOK_TO_USER);

  const handleAddBook = () => {
    addBookToUser({
      variables: {
        authorId: author.id,
        bookName,
        bookId,
      },
    })
      .then(() => {
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error adding book:', error);
      });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    console.error('Error adding book:', error);
    return <Text>Error adding book</Text>;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    > 
      <Text style={styles.authorname}>Add book to {author.name}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Book Name"
          value={bookName}
          onChangeText={setBookName}
        />
        <TextInput
          style={styles.input}
          placeholder="Book ID"
          value={bookId}
          onChangeText={setBookId}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddBook}>
          <Text style={styles.buttonText}>Add Book</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  authorname:{
    marginBottom: 10,
    fontSize: 25,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#d2c3cc',
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#f9c2ff',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});
