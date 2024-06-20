import React from "react";
import { ImageBackground, StyleSheet, Text, View, Button } from "react-native";
import { useAuth0, Auth0Provider } from "react-native-auth0";
import LoginButton from "./Login";

const image = {
  uri: "https://preview.redd.it/any-guide-on-how-to-apply-this-background-on-react-native-v0-iou2xncyaetb1.png?width=471&format=png&auto=webp&s=ffdd8d15dd35796d9d061296787e6b4be9b843fe",
};

const WelcomeScreen = () => (
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
      <Text style={styles.text}>QRSupply</Text>
    </ImageBackground>
    <LoginButton />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default WelcomeScreen;
