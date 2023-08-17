import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from 'react-native';
import { colors } from '../constant/commonStyle.js';

const UPDATE_AUTH = gql`
mutation updateAuthor($authorName: String!, $authorAge: Int!, $authorId: String!) {
  update_author_author_by_pk(pk_columns: {id: $authorId}, _set: {name: $authorName, Age: $authorAge}) {
    id
    Age
    name
  }
}
`;

export default function EditAuthor({ route, navigation }) {
  const { author, refetch } = route.params;
  const [authorId, setAuthorId] = useState(author.id);
  const [authorName, setAuthorName] = useState(author.name);
  const [authorAge, setAuthorAge] = useState(author.Age);
//   const [authorId, setAuthorId] = useState(book.author.id);

  const [updateAuth] = useMutation(UPDATE_AUTH, {
    onCompleted: () => {
      refetch();
      navigation.goBack(); // Navigate back to the previous screen after updating the book
    },
  });

  const handleUpdate = () => {
    updateAuth({
      variables: {
        authorName: authorName,
        authorId: authorId,
        authorAge: authorAge,
      },
    });
    refetch();
  };

  return (
    <SafeAreaView style={styles.safearea}>
      <View style={{ height: 50, justifyContent: 'center' }}>
        <Text style={styles.mainTitle}>Edit Author</Text>
      </View>
      <View style={styles.item}>
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
            value={authorId}
            onChangeText={setAuthorId}
            placeholder="Enter author id"
          />
        </View>
        <Button title="Update Author" onPress={handleUpdate} color={colors.ternary} />
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