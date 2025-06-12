// screens/ARViewer.tsx
import React from "react";
import { ViroARSceneNavigator } from "@reactvision/react-viro";
import ARProductScene from "./ARScene";

const ARViewer = ({ route }) => {
  const { product } = route.params;

  return (
    <ViroARSceneNavigator
      initialScene={{ scene: ARProductScene }}
      viroAppProps={{ product }}
      autofocus={true}
      style={{ flex: 1 }}
    />
  );
};

export default ARViewer;
