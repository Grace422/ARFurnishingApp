import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const DetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.navigate("Content")}
        style={{ padding: 20 }}
      >
        <FontAwesomeIcon name="arrow-left" size={30} color="#000" />
      </TouchableOpacity>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.price}>{product.price}</Text>
      <Button
        title="View in AR"
        onPress={() =>
          navigation.navigate("ARScene", { product: product.model })
        }
      />
      <Text style={styles.description}>{product.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  image: {
    width: "100%",
    height: 250,
    resizeMode: "contain",
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default DetailsScreen;
