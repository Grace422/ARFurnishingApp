import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { products, categories } from "../data/modelList";
import { useNavigation } from "@react-navigation/native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import HomeScreen from "./HomeScreen";

const Content = () => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((item) => item.category === selectedCategory);
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("DetailScreen", { product: item })}
    >
      <Image source={item.image} style={styles.image} />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.categoryButtonSelected,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.categoryTextSelected,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );
  return (
    <>
      <FlatList
        data={filteredProducts}
        numColumns={2}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
        ListHeaderComponent={() => (
          <>
          <TouchableOpacity
            onPress={() => navigation.navigate("HomeScreen")}
            style={{ padding: 20 }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <FontAwesomeIcon name="arrow-left" size={24} color="#000" />
              <Text
                style={{ fontWeight: "bold", fontSize: 20, marginLeft: 20 }}
              >
                Choose Furniture
              </Text>
            </View>
          </TouchableOpacity>

            <FlatList
              data={categories}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item) => item}
              renderItem={renderCategory}
              contentContainerStyle={styles.categoriesContainer}
              style={{ marginBottom: 10 }}
            />
          </>
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "#f5f5f5",
    flexGrow: 1,
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
    resizeMode: "contain",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    padding: 10,
    textAlign: "center",
    marginTop: 15,
  },
  categoriesContainer: {
    paddingHorizontal: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryButton: {
    backgroundColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 8,
    marginHorizontal: 5, 
    marginVertical: 4,
  },
  categoryButtonSelected: {
    backgroundColor: "#007AFF",
  },
  categoryText: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
  },
  categoryTextSelected: {
    color: "#fff",
  },
});

export default Content;
