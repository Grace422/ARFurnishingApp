import React, { useState } from "react";
import { 
  StyleSheet, 
  TouchableOpacity, 
  View, 
  FlatList, 
  Text, 
  Image,
  Animated,
} from "react-native";
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
import { products } from '../data/modelList';

ViroMaterials.createMaterials({
  planeMaterial: {
    diffuseColor: "rgba(255, 255, 255, 0.3)",
  },
});

const ProductARScene = ({ sceneNavigator }) => {
  const { 
    placedModels,
    onPlaneSelected,
    onModelInteraction,
  } = sceneNavigator.viroAppProps;

  return (
    <ViroARScene>
      <ViroAmbientLight color="#FFFFFF" />
     
        {placedModels.map((modelData) => (
           <ViroARPlane
        minHeight={0.05}
        minWidth={0.05}
        alignment={"Horizontal"}
        onPlaneSelected={onPlaneSelected}
      >
          <Viro3DObject
            key={modelData.id}
            visible={true}
            source={modelData.product.source}
            position={modelData.position}
            scale={modelData.scale}
            rotation={modelData.rotation}
            type="GLB"
            onRotate={(rotateState, rotationFactor) => 
              onModelInteraction(modelData.id, 'rotate', { rotateState, rotationFactor })
            }
            onPinch={(pinchState, scaleFactor) => 
              onModelInteraction(modelData.id, 'pinch', { pinchState, scaleFactor })
            }
            onDrag={(dragToPos) => 
              onModelInteraction(modelData.id, 'drag', { dragToPos })
            }
            dragType="FixedToWorld"
          />
      </ViroARPlane>

        ))}
    </ViroARScene>
  );
};

export default function ARViewer({ route }) {
  const navigation = useNavigation();
  const { product: initialProduct } = route.params;
  
  // State for managing multiple placed models
  const [placedModels, setPlacedModels] = useState([]);
  const [selectedModelId, setSelectedModelId] = useState(null);
  const [planeDetected, setPlaneDetected] = useState(false);
  const [showModelList, setShowModelList] = useState(false);
  const slideAnim = useState(new Animated.Value(-200))[0];

  React.useEffect(() => {
    if (planeDetected && placedModels.length === 0) {
      addModel(initialProduct, [0, 0, -1]);
    }
  }, [planeDetected, initialProduct]);

  const addModel = (product, position = [0, 0, -1]) => {
    const newModel = {
      id: `${product.id}_${Date.now()}`,
      product: product,
      position: position,
      scale: product.scale || [0.1, 0.1, 0.1],
      rotation: product.rotation || [0, 0, 0],
    };
    setPlacedModels(prev => [...prev, newModel]);
    setSelectedModelId(newModel.id);
  };

  const handlePlaneSelected = (planeData) => {
    if (!planeDetected) {
      setPlaneDetected(true);
    }
  };

  const handleModelInteraction = (modelId, interactionType, data) => {
    setPlacedModels(prev => prev.map(model => {
      if (model.id !== modelId) return model;
      switch (interactionType) {
        case 'rotate':
          if (data.rotateState === 2) {
            const newRotation = [
              model.rotation[0], 
              model.rotation[1] + data.rotationFactor, 
              model.rotation[2]
            ];
            return { ...model, rotation: newRotation };
          }
          break;
        case 'pinch':
          if (data.pinchState === 2) {
            const MIN_SCALE = 0.05;
            const MAX_SCALE = 2;
            const currentScale = model.scale[0];
            let newScale = currentScale * data.scaleFactor;
            if (newScale < MIN_SCALE) newScale = MIN_SCALE;
            else if (newScale > MAX_SCALE) newScale = MAX_SCALE;
            return { ...model, scale: [newScale, newScale, newScale] };
          }
          break;
        case 'drag':
          return { ...model, position: data.dragToPos };
        default:
          break;
      }
      return model;
    }));
  };

  const toggleModelList = () => {
    const toValue = showModelList ? -200 : 0;
    setShowModelList(!showModelList);
    Animated.timing(slideAnim, {
      toValue,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleModelSelect = (product) => {
    const randomX = (Math.random() - 0.5) * 2;
    const randomZ = (Math.random() - 0.5) * 2 - 1;
    addModel(product, [randomX, 0, randomZ]);
    toggleModelList(); // Hide the list after selection
  };

  const removeModel = (modelId) => {
    setPlacedModels(prev => prev.filter(model => model.id !== modelId));
    if (selectedModelId === modelId) {
      setSelectedModelId(null);
    }
  };

  const renderModelItem = ({ item }) => (
    <TouchableOpacity
      style={styles.modelItem}
      onPress={() => handleModelSelect(item)}
    >
      <Image source={item.image} style={styles.modelImage} />
      <Text style={styles.modelName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* AR Scene */}
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: ProductARScene,
        }}
        viroAppProps={{
          placedModels,
          onPlaneSelected: handlePlaneSelected,
          onModelInteraction: handleModelInteraction,
        }}
        style={styles.arContainer}
      />

      {/* Top Bar: Back and Add */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <FontAwesomeIcon name="arrow-left" size={24} color="#000" />
        </TouchableOpacity>
        {/* {planeDetected && ( */}
          <TouchableOpacity
            onPress={toggleModelList}
            style={styles.addButton}
          >
            <FontAwesomeIcon name="plus" size={24} color="#fff" />
          </TouchableOpacity>
        {/*  )} */}
      </View>

      {/* Model Count Display */}
      {placedModels.length > 0 && (
        <View style={styles.modelCounter}>
          <Text style={styles.counterText}>
            {placedModels.length} model{placedModels.length !== 1 ? 's' : ''} placed
          </Text>
        </View>
      )}

      {/* Sliding Model List */}
      <Animated.View 
        style={[
          styles.modelListContainer,
          { transform: [{ translateY: slideAnim }] }
        ]}
      >
        <View style={styles.modelListHeader}>
          <Text style={styles.modelListTitle}>Add Furniture</Text>
          <TouchableOpacity onPress={toggleModelList}>
            <FontAwesomeIcon name="times" size={20} color="#666" />
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={products}
          renderItem={renderModelItem}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.modelList}
        />
      </Animated.View>

      {/* Clear All Button */}
      {placedModels.length > 1 && (
        <TouchableOpacity
          onPress={() => setPlacedModels([])}
          style={styles.clearButton}
        >
          <Text style={styles.clearButtonText}>Clear All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  arContainer: {
    flex: 1,
  },
  topBar: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  backButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 25,
    padding: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addButton: {
    backgroundColor: '#007AFF',
    borderRadius: 25,
    padding: 12,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modelCounter: {
    position: 'absolute',
    top: 110,
    left: 20,
    zIndex: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  counterText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  clearButton: {
    position: 'absolute',
    top: 110,
    right: 20,
    zIndex: 10,
    backgroundColor: 'rgba(255, 59, 48, 0.9)',
    borderRadius: 15,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  modelListContainer: {
    position: 'absolute',
    top: -30,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    zIndex: 20,
    paddingTop: 30,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  modelListHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modelListTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  modelList: {
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  modelItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 10,
    marginHorizontal: 5,
    alignItems: 'center',
    width: 100,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  modelImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  modelName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
});