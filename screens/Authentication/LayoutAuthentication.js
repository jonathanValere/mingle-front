import { View, StyleSheet, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import Colors from "../../Constants/Colors";

export default function LayoutAuthentication({ children }) {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        <Image
          source={require("../../assets/img/logo_authentification.png")}
          style={styles.logo}
        />
        {children}
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: "50%",
    backgroundColor: Colors.greyLight,
  },
  logo: {
    marginBottom: 50,
  },
});
