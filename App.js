import React from "react";
import { useAuth0, Auth0Provider } from "react-native-auth0";
import "expo-dev-client";

// import ScannerScreen from "./app/screens/ScannerScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

export default function App() {
  return (
    <Auth0Provider
      domain={"dev-s0asvbc6jgxomce8.us.auth0.com"}
      clientId={"rY7s7DW5a4NopwPsTHGQ90H4YTUS1Q73"}
    >
      <WelcomeScreen />
    </Auth0Provider>
  );
}
