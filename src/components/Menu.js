import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Menu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <View style={styles.container}>
      {/* Hamburger button */}
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Icon name={isOpen ? 'times' : 'bars'} size={24} color="#000" />
      </TouchableOpacity>

      {/* Menu content */}
      {isOpen && (
        <View style={styles.menu}>
          <Text style={styles.menuItem}>Home</Text>
          <Text style={styles.menuItem}>Profile</Text>
          <Text style={styles.menuItem}>Settings</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 40,
    paddingLeft: 20,
  },
  menuButton: {
    padding: 10,
  },
  menu: {
    marginTop: 10,
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 8,
    width: 150,
    elevation: 3, // shadow for Android
    shadowColor: '#000', // shadow for iOS
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  menuItem: {
    paddingVertical: 10,
    fontSize: 16,
  },
});

export default Menu;
