import { StyleSheet, FlatList } from "react-native";
import { useContext } from "react";
import { useRoute } from "@react-navigation/native";

import { DarkModeContext } from "../../store/Context/DarkModeContext";

// Components --
import Student from "../Student/Student";
import Meet from "../Meet/Meet";

import Colors from "../../Constants/Colors";

export default function ListItems({ itemSearch, list, userToken }) {
  const { darkMode } = useContext(DarkModeContext);
  const route = useRoute();

  // filter --
  const handlerFilter = () => {
    // Create a copy --
    const listCopy = [...list];

    // Filter the list --
    const listFilter = listCopy.filter((item) => {
      if (route.name === "AlumnisStack") {
        // Concatene firstname and lastname
        const fullName = `${item.student_firstname} ${item.student_lastname}`;
        // search
        return (
          fullName.toLowerCase().includes(itemSearch.toLowerCase()) &&
          item.student_firstname
        );
      } else {
        return (
          item.meet_title.toLowerCase().includes(itemSearch.toLowerCase()) &&
          item
        );
      }
    });
    return listFilter;
  };

  return (
    <FlatList
      contentContainerStyle={[
        styles.containerContent,
        { backgroundColor: darkMode ? Colors.darkgrey : Colors.white },
      ]}
      showsVerticalScrollIndicator={false}
      data={handlerFilter()}
      renderItem={({ item }) =>
        route.name === "AlumnisStack" ? (
          <Student
            firstname={item.student_firstname}
            lastname={item.student_lastname}
            idStudent={item._id}
            userToken={userToken}
          />
        ) : (
          <Meet
            title={item.meet_title}
            numAlumnis={item.meet_students.length}
            time={item.meet_time ? item.meet_time : "1"}
            idMeet={item._id}
            userToken={userToken}
          />
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  containerContent: {
    padding: 10,
  },
});
