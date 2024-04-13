import { Dimensions } from "react-native";
import React, { useState, useContext } from "react";
import AudioContext from "../context/audio-context.js";
import { LayoutProvider, RecyclerListView } from "recyclerlistview";
import AudioListItem from "../components/AudioListItem.js";
import Screen from "../components/Screen.js";
import OptionModal from "../components/OptionModal.js";
import { StatusBar } from "expo-status-bar";
import { Audio } from "expo-av";
import { pause, play, resume } from "../misc/audioController.js";

const AudioList = () => {
  const ACtx = useContext(AudioContext);

  const [optionModalVisible, setOptionModalVisible] = useState(false);
  const [currentItem, setCurrentItem] = useState({});

  const layoutProvider = new LayoutProvider(
    (i) => "audio",
    (type, dim) => {
      dim.width = Dimensions.get("window").width;
      dim.height = 70;
    }
  );

  const handleAudioPress = async (audio) => {
    const { soundObj, playbackObj, currentAudio, updateState } = ACtx;

    //playing audio for the first time.
    if (soundObj === null) {
      const playbackObj = new Audio.Sound();
      const status = await play(playbackObj, audio.uri);
      return updateState(ACtx, {
        currentAudio: audio,
        playbackObj: playbackObj,
        soundObj: status,
      });
    }
    //pause audio
    if (soundObj.isLoaded && soundObj.isPlaying) {
      const status = await pause(playbackObj);
      return updateState(ACtx, { soundObj: status });
    }
    //resume audio
    if (
      soundObj.isLoaded &&
      !soundObj.isPlaying &&
      currentAudio.id === audio.id
    ) {
      const status = await resume(playbackObj);
      return updateState(ACtx, { soundObj: status });
    }
  };

  const rowRenderer = (type, item) => {
    return (
      <AudioListItem
        item={item}
        onAudioPress={() => handleAudioPress(item)}
        onOptionPress={() => {
          setCurrentItem(item);
          setOptionModalVisible(true);
        }}
      />
    );
  };

  return (
    <AudioContext.Consumer>
      {(contextValue) => {
        const { dataProvider } = contextValue;
        return (
          <Screen>
            <StatusBar hidden translucent={true} />
            <RecyclerListView
              dataProvider={dataProvider}
              layoutProvider={layoutProvider}
              rowRenderer={rowRenderer}
            />
            <OptionModal
              visible={optionModalVisible}
              onClose={() => setOptionModalVisible(false)}
              currentItem={currentItem}
              onPlayPress={() => handleAudioPress(currentItem)}
              onPlaylistPress={() => console.log("Pressed 2")}
            />
          </Screen>
        );
      }}
    </AudioContext.Consumer>
  );
};

export default AudioList;
