import React from "react";
import {
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import axios from "axios";

function ScannerScreen(props) {
  const [permission, setPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Has not been scanned!");
  const [inputText, onChangeInputText] = React.useState("Test");

  const cameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setPermission(status === "granted");
    })();
  };

  // Camera Permission
  useEffect(() => {
    cameraPermission();
  }, []);

  // Process of scanning the bar code
  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
    alert(data);
    try {
      await axios
        // need to use IP followed by
        .post("http://10.0.0.140:3000/scanned", { data })
        .then((res) => {
          console.log(res.data);
        });
    } catch (e) {
      console.log(e);
    }
  };

  // Check permissions and return the screens
  if (permission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting Camera Permission</Text>
      </View>
    );
  }

  if (permission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button title={"Allow Camera"} onPress={() => cameraPermission()} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.barcodebox}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>
      <Text style={styles.maintext}>{text}</Text>

      {/* <SafeAreaView>
        <TextInput
        // style={styles.input}
        // onChangeText={onChangeInputText}
        // value={inputText}
        />
      </SafeAreaView> */}

      {scanned && (
        <Button
          title={"Scan again?"}
          onPress={() => setScanned(false)}
          color="tomato"
        />
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    width: 200,
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 300,
    width: 300,
    overflow: "hidden",
    borderRadius: 30,
    backgroundColor: "tomato",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
});

export default ScannerScreen;
