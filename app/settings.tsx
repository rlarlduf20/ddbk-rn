import { WebView, WebViewMessageEvent } from "react-native-webview";
import { useRouter } from "expo-router";
import { disableZoomJS, WEBVIEW_URL } from "@/constants/WebView";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useRef, useState } from "react";
import useLocationPermission from "@/hooks/useLocationPermission";
import { Alert, SafeAreaView, View } from "react-native";
import * as Location from "expo-location";

const SettingScreen = () => {
  const router = useRouter();
  const [webviewKey, setWebviewKey] = useState<string>("");
  const webViewRef = useRef<WebView>(null);

  const { checkLocationService, checkPermissions, requestPermissions } =
    useLocationPermission();

  const getLocation = async () => {
    try {
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      webViewRef.current?.postMessage(JSON.stringify({ latitude, longitude }));
    } catch {
      Alert.alert("위치 정보를 받아오는데 오류가 발생했습니다.");
    }
  };

  const handleMessage = async (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);
    switch (message.type) {
      case "LOG_OUT": {
        router.replace("/");
        break;
      }
      case "REQUEST_GPS_PERMISSIONS": {
        const servicesEnabled = await checkLocationService();
        if (!servicesEnabled) {
          webViewRef.current?.postMessage(
            JSON.stringify({ text: "REJECT_PERMISSIONS" })
          );
          return;
        }

        const permissionsGranted = await requestPermissions();
        if (!permissionsGranted) {
          webViewRef.current?.postMessage(
            JSON.stringify({ text: "REJECT_PERMISSIONS" })
          );
          return;
        }

        getLocation();
        break;
      }

      case "GPS_PERMISSION_STATE": {
        const isLocationService = await checkLocationService();
        const isPermissions = await checkPermissions();

        webViewRef.current?.postMessage(
          JSON.stringify({ isLocationService, isPermissions })
        );
        break;
      }
    }
  };

  useEffect(() => {
    setWebviewKey((prevKey) => prevKey + "setting");
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: "#f0f0ee" }} />
      <WebView
        key={webviewKey}
        ref={webViewRef}
        source={{ uri: `${WEBVIEW_URL}/settings` }}
        onMessage={handleMessage}
        injectedJavaScript={disableZoomJS}
        style={{ backgroundColor: "#F0F0EE" }}
      />
    </View>
  );
};

export default SettingScreen;
