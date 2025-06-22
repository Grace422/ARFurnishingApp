import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Button,
  TouchableOpacity,
  ScrollView
} from "react-native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

const DetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate("Content")}>
        <FontAwesomeIcon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <Image source={product.image} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>

      <Button
        title="View in My Space"
        onPress={() => navigation.navigate("ARScene", { product: product })}
      />
      <View style={{ marginTop: 20 }}>
        <Text style={{fontWeight: "bold", fontSize: 18}}>Description:</Text>
        <Text style={styles.description}>{product.description}</Text>

        <Text style={{fontWeight: "bold", fontSize: 18, marginTop: 15}}>Material:</Text>
        <Text style={styles.description}>{product.material}</Text>

        <Text style={{fontWeight: "bold", fontSize: 18, marginTop: 15}}>Dimensions:</Text>
        <Text style={styles.description}>{product.dimensions}</Text>

        <Text style={{fontWeight: "bold", fontSize: 18, marginTop: 15}}>Colors:</Text>
        <Text style={styles.description}>{product.colors.join(",  ")}</Text>
      </View>
    </ScrollView>
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
    marginTop: 40,
  },
  description: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: "left",
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
