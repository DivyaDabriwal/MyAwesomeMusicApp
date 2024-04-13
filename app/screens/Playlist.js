import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";

const PlayList = () => {
  return (
    <View style={styles.container}>
      <Text>Play List</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default PlayList;
