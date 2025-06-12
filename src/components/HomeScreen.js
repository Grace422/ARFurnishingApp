import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
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
               <Text style={styles.menuItem}>
              <FontAwesomeIcon
                name="user"
                size={20}
                color="#000"
              />
              My Profile
            </Text>
           
            <Text style={styles.menuItem}>
               <FontAwesomeIcon
                name="home"
                size={20}
                color="#000"
              />
              Saved Rooms</Text>

            <Text style={styles.menuItem}>
               <FontAwesomeIcon
                name="language"
                size={20}
                color="#000"
              />
              Language</Text>

            <Text style={styles.menuItem}>
               <MaterialIcons
                name="dark-mode"
                size={20}
                color="#000"
              />
              Mode</Text>

            <Text style={styles.menuItem}>
               <Ionicons
                name="settings"
                size={20}
                color="#000"
                style={styles.menuIcon}
              />
              Settings</Text>
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
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  menuButton: {
    padding: 10,
  },
  menu: {
    marginTop: 10,
    backgroundColor: "#eee",
    padding: 20,
    borderRadius: 8,
    width: "100%",
    height: "90%",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  menuItem: {
    paddingVertical: 10,
    fontSize: 18,
  },
  menuIcon: {
    marginLeft: 20,
    padding: 30
  },
});

export default HomeScreen;
