import React, { useState } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
   ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
  ViroMaterials,
  ViroARPlane,
} from "@reactvision/react-viro";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';

ViroMaterials.createMaterials({
  planeMaterial: {
    diffuseColor: "rgba(255, 255, 255, 0.3)",
  },
});

const ProductARScene = ({ sceneNavigator }) => {
   const { 
    product, 
    position, 
    scale, 
    rotation, 
    onSetPosition,
    onRotate,
    onPinch,
    onDrag,
  } = sceneNavigator.viroAppProps;

  return (
    <ViroARScene>
      <ViroAmbientLight color="#FFFFFF" />

      <ViroARPlane
        minHeight={0.05}
        minWidth={0.05}
        alignment={"Horizontal"}
        onPlaneSelected={onSetPosition} // Use onPlaneSelected for robust placement
      >
        <Viro3DObject
          visible={!!position} // Only visible after the first click
          source={product.model}
          position={position ?? [0, 0, 0]}
          scale={scale}
          rotation={rotation}
          type={product.modelType}
          onRotate={onRotate}
          onPinch={onPinch}
          onDrag={onDrag}
        />
      </ViroARPlane>
    </ViroARScene>
  );
};

export default function ARViewer({ route }) {
  const navigation = useNavigation();
  const { product } = route.params;
  const [position, setPosition] = useState(null);
  const [scale, setScale] = useState([0.1, 0.1, 0.1]);
  const [rotation, setRotation] = useState([0, 0, 0]);

  // --- CHANGE #3: Refactored gesture handlers for real-time feedback ---

  const handleRotate = (rotateState, rotationFactor) => {
    // We only care about the continuous rotation (state=2)
    if (rotateState === 2) {
      // The new rotation is the current rotation plus the factor
      const newRotation = [rotation[0], rotation[1] + rotationFactor, rotation[2]];
      setRotation(newRotation);
    }
  };

  const handlePinch = (pinchState, scaleFactor) => {
    // We only care about the continuous pinch (state=2)
    if (pinchState === 2) {
      const currentScale = scale[0];
      const newScale = currentScale * scaleFactor;
      setScale([newScale, newScale, newScale]);
    }
  };

  // Dragging is simpler, it directly gives the new position.
  const handleDrag = (dragToPos) => {
    setPosition(dragToPos);
  };
  
  // onPlaneSelected gives us an object with the position, we extract it.
  const handleSetPosition = (planeData) => {
      if (!position) { // Only place the object once initially
          setPosition(planeData.position);
      }
  };
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <FontAwesomeIcon name="arrow-left" size={30} color="#000" />
      </TouchableOpacity>
       <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: ProductARScene,
        }}
        // Pass all state and handlers down
        viroAppProps={{
          product,
          position,
          scale,
          rotation,
          onSetPosition: handleSetPosition,
          onRotate: handleRotate,
          onPinch: handlePinch,
          onDrag: handleDrag,
        }}
        style={styles.container}
      />I
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 20,
    padding: 5,
  },
});
