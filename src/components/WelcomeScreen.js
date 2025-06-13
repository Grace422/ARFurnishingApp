import {
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import Entypo from 'react-native-vector-icons/Entypo'
import Feather from 'react-native-vector-icons/Feather';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <SafeAreaView>
        <View style={styles.content}>
          <Text style={styles.title}>Welcome to HomeFurniture</Text>
          <Text style={styles.experience}>
            Experience furniture in your place before you buy. Let's get
            started!
          </Text>
          <Text style={styles.instruction1}>
            <Entypo name="camera" size={24} color="#FFF" />
            Point your camera at an open floor space
          </Text>
          <Text style={styles.instruction2}>
            <FontAwesomeIcon name="plus" size={24} color="#FFF" />
            Tap the + button to add furniture
          </Text>
          <Text style={styles.instruction3}>
            <Feather name="move" size={24} color="#FFF" />
            Move, rotate and resize with gestures
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("HomeScreen")}
          >
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 200,
  },
  button: {
    backgroundColor: "#ffffffcc",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 40,
  },
  buttonText: {
    color: "#000",
    fontSize: 18,
    fontWeight: "600",
  },
  experience: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 40,
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 30,
  },
  instruction1: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 30,
    fontSize: 16,
    lineHeight: 24,
    paddingLeft: 60,
  },
  instruction2: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 30,
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 30,
  },
  instruction3: {
    textAlign: "center",
    color: "#fff",
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
    paddingLeft: 40,
  },
});

export default WelcomeScreen;
