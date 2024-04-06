import { View, StyleSheet, TextInput } from "react-native";
import { useState } from "react";

import Colors from "../../Constants/Colors";

export default function SearchBar({ placeholder, itemSearch, setItemSearch }) {
  return (
    <View style={styles.containerInput}>
      <TextInput
        style={styles.inputSearch}
        placeholder={placeholder}
        value={itemSearch}
        onChangeText={setItemSearch}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  containerInput: {
    marginHorizontal: 10,
    marginVertical: 10,
  },
  inputSearch: {
    backgroundColor: Colors.greyLight,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 5,
  },
});
