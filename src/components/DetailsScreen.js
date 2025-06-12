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
      >
        <FontAwesomeIcon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.name}>{product.name}</Text>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.price}>{product.price}</Text>
      <Button
        title="View in My Space"
        onPress={() =>
          navigation.navigate("ARScene", { product: product })
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
    marginVertical: 20,
    textAlign: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    color: "red",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
  },
});

export default DetailsScreen;
