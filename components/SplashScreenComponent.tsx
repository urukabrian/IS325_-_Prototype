import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import Animated, {
  Easing,
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import { useNavigation } from "@react-navigation/native";

const SplashScreenComponent = () => {
  const navigation = useNavigation();

  // Shared values for animations
  const opacity = useSharedValue(0); // Opacity starts at 0 (invisible)
  const translateY = useSharedValue(50); // Y position starts slightly off-screen

  useEffect(() => {
    // Start animation
    opacity.value = withTiming(1, { duration: 2000, easing: Easing.ease });
    translateY.value = withTiming(0, {
      duration: 2000,
      easing: Easing.out(Easing.cubic),
    });

    // Navigate to the next screen after 3 seconds
    const timeout = setTimeout(() => {
      (navigation as any).navigation.navigate("index"); // Replace Splash screen with Home
    }, 1000000);

    return () => clearTimeout(timeout); // Cleanup timeout if component unmounts
  }, []);

  // Animated styles
  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Animated Text with Emojis */}
      <Animated.View style={animatedStyle}>
        <Text style={styles.emoji}></Text>
        <Text style={styles.text}>Authorized by the Government of Papua New Guinea</Text>
        <Text style={styles.emoji}></Text>
      </Animated.View>
    </View>
  );
};

// Styling for splash screen
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e1e", // Green background color for a modern splash
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff", // White text for contrast
    textAlign: "center",
    marginTop: 10,
  },
  emoji: {
    fontSize: 64, // Large emoji size
    textAlign: "center",
  },
});

export default SplashScreenComponent;
