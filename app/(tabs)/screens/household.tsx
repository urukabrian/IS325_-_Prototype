import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Text,
  Button,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  addHousehold,
  getHouseholds,
  updateHousehold,
  deleteHousehold,
  HouseholdDetails,
  initializeDB,
} from "@/database"; // Adjust the import path as needed

const Household = () => {
  const [numberOfPersons, setNumberOfPersons] = useState("");
  const [residenceType, setResidenceType] = useState("");
  const [householdIncome, setHouseholdIncome] = useState("");
  const [households, setHouseholds] = useState<HouseholdDetails[]>([]);
  const [editingHouseholdId, setEditingHouseholdId] = useState<number | null>(null);

  const fetchHouseholds = async () => {
    const allHouseholds = await getHouseholds();
    setHouseholds(allHouseholds);
  };

  useEffect(() => {
    const setupDatabase = async () => {
      await initializeDB();
      fetchHouseholds();
    };

    setupDatabase();
  }, []);

  const handleSubmit = async () => {
    if (!numberOfPersons || !residenceType || !householdIncome) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }

    try {
      if (editingHouseholdId) {
        await updateHousehold(
          editingHouseholdId,
          parseInt(numberOfPersons),
          residenceType,
          parseFloat(householdIncome)
        );
        console.log("Household updated successfully");
      } else {
        const id = await addHousehold(
          parseInt(numberOfPersons),
          residenceType,
          parseFloat(householdIncome)
        );
        console.log("Household created successfully with ID:", id);
      }
      resetForm();
      fetchHouseholds(); // Refresh the list
    } catch (error) {
      console.error("Error submitting household:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteHousehold(id);
      console.log("Household deleted successfully");
      fetchHouseholds(); // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting household:", error);
    }
  };

  const handleUpdateClick = (household: HouseholdDetails) => {
    // Populate the form with the selected household's data
    setNumberOfPersons(household.numberOfPersons.toString());
    setResidenceType(household.residenceType);
    setHouseholdIncome(household.houseHoldIncome.toString());
    setEditingHouseholdId(household.id); // Set the ID for updating
  };

  const resetForm = () => {
    // Clear the form after submission or update
    setNumberOfPersons("");
    setResidenceType("");
    setHouseholdIncome("");
    setEditingHouseholdId(null); // Reset ID for creating new entries
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Household Data Entry Form</Text>

        <TextInput
          style={styles.input}
          placeholder="Number of Persons"
          value={numberOfPersons}
          onChangeText={setNumberOfPersons}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Residence Type"
          value={residenceType}
          onChangeText={setResidenceType}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Household Income"
          value={householdIncome}
          onChangeText={setHouseholdIncome}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        <Button
          title={editingHouseholdId ? "Update" : "Submit"}
          onPress={handleSubmit}
        />

        {/* Table to display records */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Number of Persons</Text>
            <Text style={styles.tableHeaderText}>Residence Type</Text>
            <Text style={styles.tableHeaderText}>Income</Text>
            <Text style={styles.tableHeaderText}>Actions</Text>
          </View>
          {households.map((household) => (
            <View key={household.id} style={styles.tableRow}>
              <Text style={styles.tableRowText}>
                {household.numberOfPersons}
              </Text>
              <Text style={styles.tableRowText}>{household.residenceType}</Text>
              <Text style={styles.tableRowText}>{household.houseHoldIncome}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => handleUpdateClick(household)}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(household.id)}
                >
                  <Text style={styles.buttonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f2f2f2",
    justifyContent: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableContainer: {
    marginTop: 20,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#f1f1f1",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  tableRow: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  tableRowText: {
    flex: 1,
    textAlign: "center",
  },
  actionButtons: {
    flexDirection: "row",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  deleteButton: { backgroundColor: "#F44336", padding: 5, borderRadius: 5 },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default Household;