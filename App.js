import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image, Text } from "react-native";
import * as Shake from "expo-shake";
import { Camera, CameraType, FlashMode } from "expo-camera";

export default function App() {
  const [toggle, setToggle] = useState(false);
  const [hasPermission, setHasPermission] = useState(null);

  const handleChangeToggle = () => setToggle((oldToggle) => !oldToggle);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    Shake.addListener(() => {
      setToggle((oldToggle) => !oldToggle);
    });
    return () => {
      Shake.removeSubscription(() => {});
    };
  }, []);

  return (
    <>
      {(hasPermission && toggle) && (
        <Camera
          style={{ height:1 }}
          type={CameraType.back}
          flashMode={FlashMode.torch}
        />
      )}
      <View style={toggle ? style.containerLight : style.container}>
        <TouchableOpacity onPress={handleChangeToggle}>
          <Image
            style={toggle ? style.lightingOn : style.lightingOff}
            source={
              toggle
                ? require("./assets/eco-light.png")
                : require("./assets/eco-light-off.png")
            }
          />
          <Text style={style.text}>GitHub: @isadoraraujo</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  containerLight: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  lightingOn: {
    resizeMode: "contain",
    alignSelf: "center",
    width: 150,
    height: 150,
  },
  lightingOff: {
    resizeMode: "contain",
    alignSelf: "center",
    tintColor: "white",
    width: 150,
    height: 150,
  },
  text: {
    marginTop: 35,
    fontSize: 24,
    fontWeight: 'bold',
    color: 'orange'
  }
});
