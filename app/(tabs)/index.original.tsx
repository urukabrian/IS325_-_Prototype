import {
  Image,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Text,
  View,
  Button,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import AuthComponent from "@/components/auth/AuthComponent";
import React from "react";
//import AuthComponent from "@/components/HouseholdDetails";
//import AuthComponent from "expo-router";

export default function HomeScreen() {
  const navigation = useNavigation();

  const navigateToDashboard = () => {
    // code to handle the browse action
    (navigation as any).navigate("dashboard");
  };

  const navigateToSignIn = () => {
    (navigation as any).navigate("auth");
  };

  const navigateToHouseholdDetails = () => {
    (navigation as any).navigate("housedetails");
  };

  const navigateToExplore = () => {
    (navigation as any).navigate("explore");
  };

  const testRoute = () => {
    (navigation as any).navigate("test");
  };

  return (
    <View style={styles.container}>
      {/* Two Text Messages */}
      <Text style={styles.headerText}>Civil Registry Portal</Text>
      <Text style={styles.subText}>
        Explore and manage your content with ease.
      </Text>

      <TouchableOpacity style={styles.button} onPress={() => navigateToDashboard()}>
        <Text style={styles.buttonText}>Data Entry</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigateToSignIn()}
      >
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigateToHouseholdDetails()}
      >
        <Text style={styles.buttonText}>House Hold Details</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonSecondary}
        onPress={() => navigateToExplore()}
      >
        <Text style={styles.buttonText}>Explore</Text>
      </TouchableOpacity>
    </View>
  );
}

// Styling for a modern, attractive layout
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5", // Light background for contrast against buttons
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40, // Space between text and buttons
  },
  button: {
    backgroundColor: "#4CAF50", // Modern green color
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android
  },
  buttonSecondary: {
    backgroundColor: "#2196F3", // Stylish blue for Sign In/Sign Up buttons
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5, // Elevation for Android
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});
