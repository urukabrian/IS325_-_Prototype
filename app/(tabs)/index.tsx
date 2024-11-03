import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

// Assuming `HouseholdDetails` and `Address` components are in the `screens` folder
export default function HomeScreen() {
  const navigation = useNavigation();

  const navigateToDashboard = () => {
    (navigation as any).navigate("dashboard");
  };

  const navigateToSignIn = () => {
    (navigation as any).navigate("auth");
  };

  const navigateToHouseholdDetails = () => {
    (navigation as any).navigate("screens/household");
  };

  const navigateToAddressDetails = () => {
    (navigation as any).navigate("screens/address");
  };

  const navigateToExplore = () => {
    (navigation as any).navigate("explore");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Census Registry Portal</Text>
      <Text style={styles.subText}>
        Enter and edit census data easily
      </Text>

      <TouchableOpacity style={styles.button} onPress={navigateToDashboard}>
        <Text style={styles.buttonText}>Data Entry</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.buttonSecondary} onPress={navigateToHouseholdDetails}>
        <Text style={styles.buttonText}>Household Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={navigateToAddressDetails}>
        <Text style={styles.buttonText}>Address Details</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSecondary} onPress={navigateToSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
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
    backgroundColor: "#000000",
  },
  headerText: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#00f8f8",
    textAlign: "center",
    marginBottom: 10,
  },
  subText: {
    fontSize: 16,
    color: "#e8e8e8",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#4CAF50",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonSecondary: {
    backgroundColor: "#2196F3",
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});