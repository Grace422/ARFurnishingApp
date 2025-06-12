import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import {
  ViroARScene,
  ViroARSceneNavigator,
  Viro3DObject,
  ViroAmbientLight,
} from "@reactvision/react-viro";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from '@react-navigation/native';


const ProductARScene = ({ sceneNavigator }) => {
  const { product } = sceneNavigator.viroAppProps;

  return (
    <ViroARScene>
      <ViroAmbientLight color="#FFFFFF" />

      <Viro3DObject
        source={product.model}
        position={[0, 0, 0]}
        scale={[0.1, 0.1, 0.1]}
        type={product.modelType}
        dragType="FixedToWorld"
        onDrag={() => {}}
      />
    </ViroARScene>
  );
};

export default function ARViewer({ route }) {
    const navigation = useNavigation();
  const { product } = route.params;

  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("DetailScreen")}
        style={{ padding: 20 }}
      >
        <FontAwesomeIcon name="arrow-left" size={30} color="#000" />
      </TouchableOpacity>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: ProductARScene,
        }}
        viroAppProps={{ product }}
        style={styles.container}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
