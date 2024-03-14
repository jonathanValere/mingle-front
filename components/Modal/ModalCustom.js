import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  Modal,
} from "react-native";

import { AntDesign } from "@expo/vector-icons";
import Colors from "../../Constants/Colors";

export default function ModalCustom(props) {
  return (
    <Modal
      visible={props.isVisibleModal}
      animationType="slide"
      onRequestClose={() => props.setIsVisibleModal(false)}
      transparent={true}
    >
      <View style={styles.containerModal}>
        <View style={styles.modalView}>
          <View style={styles.containerCloseBtn}>
            <Pressable
              onPress={() => props.setIsVisibleModal(false)}
              style={styles.btnClose}
            >
              <AntDesign
                name="closecircle"
                size={25}
                color={Colors.secondary}
              />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.containerTextModal}>
            <View>
              <Text style={styles.titleModal}>[Title]</Text>
              <Text style={styles.textModal}>
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo
                nam facilis numquam rem officia laudantium quis quas dolorem
                voluptatem qui dolores ipsa voluptate blanditiis esse enim
                dolore, dignissimos, veniam magni.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  containerModal: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    marginTop: 100,
    shadowColor: Colors.shadowColor,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.5,
  },
  modalView: {
    backgroundColor: Colors.primary,
    width: "100%",
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  containerCloseBtn: {
    alignItems: "flex-end",
    marginBottom: 10,
  },
  btnClose: {
    width: "10%",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  containerTextModal: {
    marginTop: 15,
  },
  titleModal: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 14,
    color: Colors.secondary,
  },
  textModal: {
    lineHeight: 18,
    fontSize: 14,
    color: Colors.white,
  },
});
