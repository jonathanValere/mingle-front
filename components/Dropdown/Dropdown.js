import { StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

import Colors from "../../Constants/Colors";

export default function Dropdown(props) {
  return (
    <RNPickerSelect
      onValueChange={(value) => props.setMode(value)}
      style={{
        inputAndroid,
        inputIOS,
      }}
      placeholder={{ label: "Sélectionner votre mode" }}
      items={[
        { label: "Distanciel", value: "distanciel" },
        { label: "Présentiel", value: "présentiel" },
      ]}
    />
  );
}

const inputAndroid = {
  backgroundColor: Colors.greyLight,
  paddingVertical: 10,
  paddingHorizontal: 5,
  height: 40,
  marginBottom: 15,
};

const inputIOS = {
  backgroundColor: Colors.greyLight,
  paddingVertical: 10,
  paddingHorizontal: 5,
  height: 40,
};

const styles = StyleSheet.create({
  customPicker: {
    backgroundColor: "blue",
    borderWidth: 2,
  },
  inputAndroid: {
    backgroundColor: "blue",
  },
});
