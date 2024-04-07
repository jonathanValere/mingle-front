import { StyleSheet, FlatList } from "react-native";

import Student from "../Student/Student";

import Colors from "../../Constants/Colors";

export default function ListItems({ itemSearch, list, userToken }) {
  // filter --
  const handlerFilter = () => {
    // Create a copy --
    const listCopy = [...list];

    // Filter the list --
    const listFilter = listCopy.filter((item) => {
      // Concatene firstname and lastname
      const fullName = `${item.student_firstname} ${item.student_lastname}`;
      // search
      return (
        fullName.toLowerCase().includes(itemSearch.toLowerCase()) &&
        item.student_firstname
      );
    });
    return listFilter;
  };

  return (
    <FlatList
      contentContainerStyle={styles.containerContent}
      showsVerticalScrollIndicator={false}
      data={handlerFilter()}
      renderItem={({ item }) => (
        <Student
          firstname={item.student_firstname}
          lastname={item.student_lastname}
          idStudent={item._id}
          userToken={userToken}
        />
      )}
    />
  );
}

const styles = StyleSheet.create({
  containerContent: {
    backgroundColor: Colors.white,
    padding: 10,
  },
});
