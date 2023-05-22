import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Button } from 'react-native';
import { gql, useMutation} from '@apollo/client';
import LoadingScreen from '../Components/Loading';
import ErrorModal from '../Components/ModalForError';
import { colors } from '../constant/commonStyle.js';
const DEL_AUTH = gql`
  mutation DelAuthor($authorId: String!) {
    delete_author_author_by_pk(id: $authorId) {
      id
    }
  }
`;

const DELETE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    delete_book_book_by_pk(id: $bookId) {
      id
    }
  }
`;

export default function AuthorDetails({ navigation, route }) {
  const { author } = route.params;
  const [delAuthor, { loading: authorLoading, error: authorError }] = useMutation(DEL_AUTH);
  const [delBook, { loading: bookLoading, error: bookError }] = useMutation(DELETE_BOOK);

  const deleteAuthor =async  () => {
    try {
      // Delete the associated books
      for (const book of author.books) {
        await delBook({ variables: { bookId: author.books.id } });
      }

      // Delete the author
      await delAuthor({ variables: { authorId: author.id } });

      // Navigate back after successful deletion
      navigation.goBack();
    } catch (error) {
      console.error('Error Deleting Author:', error);
    }
  };
  const handleClose = () =>{
    navigation.goBack();
  } 
  if (authorLoading || bookLoading) {
    return <LoadingScreen />;
  }

  if (authorError || bookError) {
    console.error('Error Deleting Author:', authorError || bookError);
    return <ErrorModal errorMessage="Delete all associate books first" onClose={handleClose} ></ErrorModal>;
  }

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
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.smalltitlecss}>
                <Text style={styles.smalltitle}>Author ID</Text>
              </View>
              <View style={styles.smallvaluecss}>
                <Text style={styles.smallvalue}>{author.id}</Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.smalltitlecss}>
                <Text style={styles.smalltitle}>Author Name</Text>
              </View>
              <View style={styles.smallvaluecss}>
                <Text style={styles.smallvalue}>{author.name}</Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.smalltitlecss}>
                <Text style={styles.smalltitle}>Author age</Text>
              </View>
              <View style={styles.smallvaluecss}>
                <Text style={styles.smallvalue}>{author.Age}</Text>
              </View>
            </View>
          </View>
          <View style={{ marginBottom: 20 }}>
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.smalltitlecss}>
                <Text style={styles.smalltitle}>Book Name</Text>
              </View>
              <View style={styles.smallvaluecss}>
                <Text style={styles.smallvalue}>
                  {author.books.map((author) => (
                    <Text key={author.name}>{author.name}, </Text>
                  ))}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Button title="Delete Author" onPress={deleteAuthor} color={colors.ternary}/>
      </ScrollView>
      <Button title="Add a Book" onPress={navigateToAddBook} color={colors.ternary}/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  smalltitlecss: {
    width: '30%'
  },
  smallvaluecss: {
    width: '75%'
  },
  smalltitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'black',
  },
  smallvalue: {
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
