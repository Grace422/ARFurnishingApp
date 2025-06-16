import React, { useState, useCallback } from "react";
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
        // minHeight={0.05}
        // minWidth={0.05}
        // alignment={"Horizontal"}
        // onPlaneSelected={onSetPosition} 
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
          onDrag={onDrag}
          onPlaneSelected={onSetPosition} 
          dragType="FixedToWorld"
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


  const handleRotate = useCallback((rotateState, rotationFactor) => {
    if (rotateState === 2) {
      // Use the functional update form to avoid dependency on 'rotation'
      setRotation(currentRotation => [
        currentRotation[0],
        currentRotation[1] + rotationFactor,
        currentRotation[2],
      ]);
    }
  }, []); // Empty dependency array means this function is created only once

  const handlePinch = useCallback((pinchState, scaleFactor) => {
    if (pinchState === 2) {
      // Use the functional update form to avoid dependency on 'scale'
      setScale(currentScale => {
        const newScale = currentScale[0] * scaleFactor;
        return [newScale, newScale, newScale];
      });
    }
  }, []); // Empty dependency array

  // The 'onDrag' handler is simple and can be defined as is, but for consistency...
  const handleDrag = useCallback((dragToPos) => {
    setPosition(dragToPos);
  }, []); // Empty dependency array

  const handleSetPosition = useCallback((planeData) => {
      // Use functional update form to avoid dependency on 'position'
      setPosition(currentPos => {
          if (!currentPos) {
              return planeData.position;
          }
          return currentPos;
      });
  }, []); 
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
          onDrag: handleDrag,
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
