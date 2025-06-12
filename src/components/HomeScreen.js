import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const HomeScreen = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
          <FontAwesomeIcon
            name={isOpen ? "times" : "bars"}
            size={40}
            color="#fff"
          />
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.menu}>
            <Text style={styles.menuItem}>Home</Text>
            <Text style={styles.menuItem}>Profile</Text>
            <Text style={styles.menuItem}>Settings</Text>
          </View>
        )}
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Content")}
        >
          <FontAwesomeIcon name="plus" size={30} color="#000" />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.9)",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#ffffffcc",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 650,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
  container: {
    paddingTop: 40,
    paddingLeft: 20,
  },
  menuButton: {
    padding: 10,
  },
  menu: {
    marginTop: 10,
    backgroundColor: "#eee",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    elevation: 3, 
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  menuItem: {
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default HomeScreen;
