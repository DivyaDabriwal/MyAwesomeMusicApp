import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import color from "../misc/color";
import { StatusBar } from "expo-status-bar";

const OptionModal = (props) => {
  return (
    <>
      <StatusBar hidden translucent={true} />
      <Modal animationType="slide" transparent visible={props.visible}>
        <View style={styles.modal}>
          <Text numberOfLines={2} style={styles.title}>
            {props.currentItem.filename}
          </Text>
          <View style={styles.optionContainer}>
            <TouchableOpacity onPress={props.onPlayPress}>
              <Text style={styles.option}>Play</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPlaylistPress}>
              <Text style={styles.option}>Add to Playlist</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback onPress={props.onClose}>
          <View style={styles.modalBg} />
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};

export default OptionModal;

const styles = StyleSheet.create({
  modal: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: color.APP_BG,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    zIndex: 1000,
  },
  optionContainer: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 20,
    paddingBottom: 0,
    color: color.FONT_MEDIUM,
  },
  option: {
    fontSize: 16,
    fontWeight: "bold",
    color: color.FONT,
    paddingVertical: 10,
    letterSpacing: 1,
  },
  modalBg: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor: color.MODAL_BG,
  },
});
