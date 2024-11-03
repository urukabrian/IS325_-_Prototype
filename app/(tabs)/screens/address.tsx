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
  addAddress,
  getAddresses,
  updateAddress,
  deleteAddress,
  Address,
  initializeDB,
} from "@/database"; // Adjust the import path as needed

const AddressComponent = () => {
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [province, setProvince] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [editingAddressId, setEditingAddressId] = useState<number | null>(null);

  const fetchAddresses = async () => {
    const allAddresses = await getAddresses();
    setAddresses(allAddresses);
  };

  useEffect(() => {
    const setupDatabase = async () => {
      await initializeDB();
      fetchAddresses();
    };

    setupDatabase();
  }, []);

  const handleSubmit = async () => {
    if (!street || !city || !province || !zipCode) {
      Alert.alert("Error", "Please fill in all fields correctly.");
      return;
    }

    try {
      if (editingAddressId) {
        await updateAddress(
          editingAddressId,
          street,
          city,
          province,
          parseInt(zipCode)
        );
        console.log("Address updated successfully");
      } else {
        const id = await addAddress(street, city, province, parseInt(zipCode));
        console.log("Address created successfully with ID:", id);
      }
      resetForm();
      fetchAddresses(); // Refresh the list
    } catch (error) {
      console.error("Error submitting address:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteAddress(id);
      console.log("Address deleted successfully");
      fetchAddresses(); // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleUpdateClick = (address: Address) => {
    // Populate the form with the selected address's data
    setStreet(address.street);
    setCity(address.city);
    setProvince(address.province);
    setZipCode(address.zipCode.toString());
    setEditingAddressId(address.id); // Set the ID for updating
  };

  const resetForm = () => {
    // Clear the form after submission or update
    setStreet("");
    setCity("");
    setProvince("");
    setZipCode("");
    setEditingAddressId(null); // Reset ID for creating new entries
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.header}>Address Data Entry Form</Text>

        <TextInput
          style={styles.input}
          placeholder="Street"
          value={street}
          onChangeText={setStreet}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Province"
          value={province}
          onChangeText={setProvince}
          placeholderTextColor="#888"
        />

        <TextInput
          style={styles.input}
          placeholder="Zip Code"
          value={zipCode}
          onChangeText={setZipCode}
          keyboardType="numeric"
          placeholderTextColor="#888"
        />

        <Button
          title={editingAddressId ? "Update" : "Submit"}
          onPress={handleSubmit}
        />

        {/* Table to display records */}
        <View style={styles.tableContainer}>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>Street</Text>
            <Text style={styles.tableHeaderText}>City</Text>
            <Text style={styles.tableHeaderText}>Province</Text>
            <Text style={styles.tableHeaderText}>Zip Code</Text>
            <Text style={styles.tableHeaderText}>Actions</Text>
          </View>
          {addresses.map((address) => (
            <View key={address.id} style={styles.tableRow}>
              <Text style={styles.tableRowText}>{address.street}</Text>
              <Text style={styles.tableRowText}>{address.city}</Text>
              <Text style={styles.tableRowText}>{address.province}</Text>
              <Text style={styles.tableRowText}>{address.zipCode}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.updateButton}
                  onPress={() => handleUpdateClick(address)}
                >
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => handleDelete(address.id)}
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

export default AddressComponent;