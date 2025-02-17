import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import color from "../misc/color";

const Screen = (props) => {
  return <View style={styles.container}>{props.children}</View>;
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.APP_BG,
    paddingTop: 10,
  },
});
