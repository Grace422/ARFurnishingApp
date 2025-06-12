import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import React from "react";
import { products } from "../data/modelList";
import { useNavigation } from "@react-navigation/native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import HomeScreen from "./HomeScreen";

const Content = () => {
  const navigation = useNavigation();
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("DetailScreen", { product: item })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );
  return (
    <>
      <TouchableOpacity
        onPress={() => navigation.navigate("HomeScreen")}
        style={{ padding: 20 }}
      >
        <FontAwesomeIcon name="arrow-left" size={24} color="#000" />
      </TouchableOpacity>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    flex: 1,
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    marginTop: 15,
  },
});

export default Content;
