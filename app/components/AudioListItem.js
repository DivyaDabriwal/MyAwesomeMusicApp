import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Entypo } from "@expo/vector-icons";
import color from "../misc/color";

const convertTime = (minutes) => {
  if (minutes) {
    const hrs = minutes / 60;
    const minute = hrs.toString().split(".")[0];
    const percent = parseInt(hrs.toString().split(".")[1].slice(0, 2));
    const sec = Math.ceil((60 * percent) / 100);

    if (parseInt(minute) < 10 && sec < 10) {
      return `0${minute}:0${sec}`;
    }

    if (parseInt(minute) < 10) {
      return `0${minute}:${sec}`;
    }

    if (sec < 10) {
      return `${minute}:0${sec}`;
    }

    return `${minute}:${sec}`;
  }
};

const AudioListItem = (props) => {
  const thumbnailText = props.item.filename.slice(0, 1);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={props.onAudioPress}>
          <View style={styles.leftContainer}>
            <View style={styles.thumbnail}>
              <Text style={styles.thumbnailText}>{thumbnailText}</Text>
            </View>
            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {props.item.filename}
              </Text>
              <Text style={styles.timeText}>
                {convertTime(props.item.duration)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.rightContainer}>
          <Entypo
            onPress={props.onOptionPress}
            style={{ padding: 10 }}
            name="dots-three-vertical"
            size={20}
            color={color.FONT_MEDIUM}
          />
        </View>
      </View>
      <View style={styles.separator} />
    </>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    width: width - 40,
    justifyContent: "space-between",
  },
  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rightContainer: {
    flexBasis: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  thumbnail: {
    height: 50,
    flexBasis: 50,
    backgroundColor: color.FONT_LIGHT,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  thumbnailText: {
    fontSize: 22,
    fontWeight: "bold",
    color: color.FONT,
  },
  titleContainer: {
    width: width - 180,
    paddingLeft: 10,
  },
  title: {
    fontSize: 16,
    color: color.FONT,
  },
  separator: {
    width: width - 50,
    backgroundColor: "#333",
    opacity: 0.5,
    height: 1.5,
    alignSelf: "center",
    marginTop: 10,
  },
  timeText: {
    fontSize: 14,
    color: color.FONT_LIGHT,
  },
});

export default AudioListItem;
