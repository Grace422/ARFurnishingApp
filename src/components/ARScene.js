import React from 'react';
import { StyleSheet } from 'react-native';
import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
} from '@reactvision/react-viro';

const ProductARScene = ({ sceneNavigator }) => {
  const { product } = sceneNavigator.viroAppProps;

  return (
    <ViroARScene>
      <ViroAmbientLight color="#FFFFFF" />

      <Viro3DObject
        source={{ uri: product.model }} 
        position={[0, 0, -1]}
        scale={[0.1, 0.1, 0.1]}
        type="GLB" // or 'OBJ', 'VRX', etc., depending on your model
        dragType="FixedToWorld"
				onDrag={() => {}}
      />
    </ViroARScene>
  );
};


export default function ARViewer({ route }) {
  const { product } = route.params;

  return (
    <ViroARSceneNavigator
      autofocus={true}
      initialScene={{
        scene: ProductARScene, 
      }}
      viroAppProps={{ product }} 
      style={styles.container}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});