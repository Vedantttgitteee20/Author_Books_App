import React, { useState } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform } from 'react-native';
import { gql, useMutation } from '@apollo/client';
import LoadingScreen from '../Components/Loading';
import ErrorModal from '../Components/ModalForError';
const ADD_AUTHOR = gql`
mutation AddAuthor($authorId:String!,$authorName:String!,$authorAge:Int!){
  insert_author_author_one(
    object: { 
        id: $authorId, 
        name: $authorName
        Age: $authorAge,
        }) {
    id
    name
  }
}

`;

export default function AddAuthor({ navigation}) {
  const { refetch } = route.params;
  const [authorName, setAuthorName] = useState('');
  const [authorId, setAuthorId] = useState('');
  const [authorAge, setAuthorAge] = useState(20);

  const [addoneAuthor, { loading, error, data }] = useMutation(ADD_AUTHOR);
  const handleClose = () =>{
    navigation.goBack();
  } 
  const handleAddAuthor = () => {
    addoneAuthor({
      variables: {
        authorName,
        authorAge,
        authorId
      },
    })
      .then(() => {
        refetch();
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error adding Author:', error);
      });
  };

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    console.error('Error adding Author:', error);
    const displaymessage = "Error adding Author: \n"+ error;
    return <ErrorModal errorMessage={displaymessage} onClose={handleClose} ></ErrorModal>;
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    > 
      <Text style={styles.authorTitle}>Add Author</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Author ID"
          value={authorId}
          onChangeText={setAuthorId}
        />
        <TextInput
          style={styles.input}
          placeholder="Author Name"
          value={authorName}
          onChangeText={setAuthorName}
        />
        <TextInput
          style={styles.input}
          placeholder="Author Age"
          value={authorAge}
          onChangeText={setAuthorAge}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddAuthor}>
          <Text style={styles.buttonText}>Add Author</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
    authorTitle:{
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
