import { Alert, View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import * as MediaLibrary from "expo-media-library";
import AudioContext from "./audio-context";
import { DataProvider } from "recyclerlistview";
import useSetAudio from "../hooks/useSetAudio";

const AudioProvider = (props) => {
  const [addAudioFiles, setAddAudioFiles] = useState([]);
  const [permissionError, setPermissionError] = useState(false);
  const [dataProvider, setDataProvider] = useState(
    new DataProvider((r1, r2) => r1 !== r2)
  );
  useSetAudio();

  useEffect(() => {
    // {
    //     "canAskAgain": true,
    //     "expires":"never",
    //     "granted": false,
    //     "status": "undetermined",
    // }

    const permissionAlert = () => {
      Alert.alert(
        "Permission Required",
        "This app needs to read audio files!",
        [
          {
            text: "I am ready",
            onPress: () => askPermision(),
          },
          {
            text: "cancel",
            onPress: () => permissionAlert(),
          },
        ]
      );
    };

    const getAudioFiles = async () => {
      // const { dataProvider, addAudioFiles } = state;
      let media = await MediaLibrary.getAssetsAsync({
        mediaType: ["audio", "photo"],
      });

      media = await MediaLibrary.getAssetsAsync({
        mediaType: ["audio", "photo"],
        first: media.totalCount,
      });

      setDataProvider(
        dataProvider.cloneWithRows([...addAudioFiles, ...media.assets])
      );
      setAddAudioFiles([...addAudioFiles, ...media.assets]);
    };

    const askPermision = async () => {
      const isAccessToFile = await MediaLibrary.getPermissionsAsync();

      if (isAccessToFile.granted) {
        //  we want to get all the audio files
        getAudioFiles();
      }

      if (!isAccessToFile.canAskAgain && !isAccessToFile.granted) {
        setPermissionError(true);
      }

      if (!isAccessToFile.granted && isAccessToFile.canAskAgain) {
        const { status, canAskAgain } =
          await MediaLibrary.requestPermissionsAsync();

        if (status === "denied" && canAskAgain) {
          //we are going to display alert that user must allow this permission to work this app

          permissionAlert();
        }

        if (status === "granted") {
          //we want to get all the audio files
          getAudioFiles();
        }

        if (status === "denied" && !canAskAgain) {
          //we are some error to the user
          setPermissionError(true);
        }
      }
    };

    askPermision();
  }, []);

  const aContext = {
    audioFiles: addAudioFiles,
    dataProvider: dataProvider,
    playbackObj: playbackObj,
    soundObj: soundObj,
    currentAudio: currentAudio,
    updateState: useSetAudio(),
  };

  if (permissionError)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          It looks like you haven't granted the permission yet
        </Text>
      </View>
    );
  else
    return (
      <AudioContext.Provider value={aContext}>
        {props.children}
      </AudioContext.Provider>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    textAlign: "center",
    color: "red",
  },
});

export default AudioProvider;
