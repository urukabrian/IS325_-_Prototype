import { StyleSheet, Text, View } from "react-native";
import React from "react";
import AuthComponent from "@/components/auth/AuthComponent";

const authentication = () => {
  return (
    <View style={styles.container}>
      <Text>Authention</Text>
      <AuthComponent />
    </View>
  );
};

export default authentication;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
