import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { width, height } = Dimensions.get('window');
const isLandscape = width > height;

export default function TutorialScreen() {
  const navigation = useNavigation();

  const tutorialSteps = [
    {
      icon: 'touch-app',
      title: 'Single Tap',
      description: 'Tap on a model to select it. Selected models will have a highlight.',
    },
    {
      icon: 'pan-tool',
      title: 'Move Objects',
      description: 'Drag with one finger to move the selected model around in the AR space.',
    },
    {
      icon: 'rotate-right',
      title: 'Rotate Objects',
      description: 'Use two fingers and twist to rotate the selected model.',
    },
    {
      icon: 'zoom-out-map',
      title: 'Scale Objects',
      description: 'Pinch with two fingers to make the model bigger or smaller.',
    },
    {
      icon: 'refresh',
      title: 'Reset Position',
      description: 'Use the reset button to return a model to its original position.',
    },
    {
      icon: 'add-circle',
      title: 'Add More Models',
      description: 'Scroll up in AR view to access the model list and add more furniture.',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Tutorial</Text>
        
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <Text style={styles.introText}>
            Learn how to interact with 3D models in AR space
          </Text>

          {tutorialSteps.map((step, index) => (
            <View key={index} style={styles.stepContainer}>
              <View style={styles.stepIcon}>
                <Icon name={step.icon} size={32} color="#6366f1" />
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDescription}>{step.description}</Text>
              </View>
            </View>
          ))}

          <View style={styles.tipContainer}>
            <Icon name="lightbulb-outline" size={24} color="#f59e0b" />
            <Text style={styles.tipText}>
              Tip: Make sure you have good lighting and a clear surface for the best AR experience!
            </Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={() => navigation.navigate('Content')}
        >
          <Text style={styles.getStartedText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  introText: {
    fontSize: isLandscape ? 14 : 18,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: isLandscape ? 20 : 24,
  },
  stepContainer: {
    flexDirection: 'row',
    marginBottom: 25,
    alignItems: 'flex-start',
  },
  stepIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#f8fafc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  stepContent: {
    flex: 1,
    paddingTop: 5,
  },
  stepTitle: {
    fontSize: isLandscape ? 16 : 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  stepDescription: {
    fontSize: isLandscape ? 13 : 15,
    color: '#666',
    lineHeight: isLandscape ? 18 : 20,
  },
  tipContainer: {
    flexDirection: 'row',
    backgroundColor: '#fef3c7',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'flex-start',
  },
  tipText: {
    flex: 1,
    marginLeft: 10,
    fontSize: isLandscape ? 13 : 15,
    color: '#92400e',
    lineHeight: isLandscape ? 18 : 20,
  },
  buttonContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  getStartedButton: {
    backgroundColor: '#6366f1',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  getStartedText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});