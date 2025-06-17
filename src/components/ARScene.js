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
    // onDrag,
  } = sceneNavigator.viroAppProps;

  return (
    <ViroARScene>
      <ViroAmbientLight color="#FFFFFF" />

      <ViroARPlane
        minHeight={0.05}
        minWidth={0.05}
        alignment={"Horizontal"}
        onPlaneSelected={onSetPosition} 
        dragType="FixedToWorld"
      >
        <Viro3DObject
          visible={!!position} 
          source={product.model}
          position={position ?? [0, 0, 0]}
          scale={scale}
          rotation={rotation}
          type={product.modelType}
          onRotate={onRotate}
          onPinch={onPinch}
          // onDrag={onDrag}
          onPlaneSelected={onSetPosition} 
          dragType="FixedToWorld"
					onDrag={() => {}}
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


  const handleRotate = (rotateState, rotationFactor) => {
     console.log("ROTATE EVENT: State=", rotateState, "Factor=", rotationFactor);
    if (rotateState === 2) {
      const newRotation = [rotation[0], rotation[1] + rotationFactor, rotation[2]];
      setRotation(newRotation);
    }
  };

  const handlePinch = (pinchState, scaleFactor) => {
     console.log("PINCH EVENT: State=", pinchState, "Factor=", scaleFactor);
    if (pinchState === 2) {
      const currentScale = scale[0];
      const newScale = currentScale * scaleFactor;
      setScale([newScale, newScale, newScale]);
    }
  };

  // const handleDrag = (dragToPos) => {
  //   console.log("DRAG EVENT: New Position=", dragToPos); 
  //   setPosition(dragToPos);
  // };
  
  const handleSetPosition = (planeData) => {
      if (!position) { 
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
        viroAppProps={{
          product,
          position,
          scale,
          rotation,
          onSetPosition: handleSetPosition,
          onRotate: handleRotate,
          onPinch: handlePinch,
          // onDrag: handleDrag,
        }}
        style={styles.container}
      />
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
