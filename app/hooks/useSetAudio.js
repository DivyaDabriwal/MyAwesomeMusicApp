import { View, Text } from "react-native";
import React from "react";

const useSetAudio = (pObj, sObj, cAudio) => {
  const [playbackObj, setPlaybackObj] = useState(null);
  const [soundObj, setSoundObj] = useState(null);
  const [currentAudio, setCurrentAudio] = useState({});

  const updateState = () => {
    setPlaybackObj(pObj), setSoundObj(sObj);
    setCurrentAudio(cAudio);
  };

  return { playbackObj, soundObj, currentAudio, updateState };
};

export default useSetAudio;
