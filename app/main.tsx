import { WebView, WebViewMessageEvent } from "react-native-webview";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { useRef } from "react";
import useLocationPermission from "@/hooks/useLocationPermission";
import { useNavigation, useRouter } from "expo-router";
import { WEBVIEW_URL } from "@/constants/WebView";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);

  const { checkLocationService, checkPermissions, requestPermissions } =
    useLocationPermission();

  const router = useRouter();
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
      case "STACK_TRACKING": {
        router.replace("/tracking");
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

      case "STACK_NAVIGATION": {
        const path = message.path;
        router.push(path);
      }
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: `${WEBVIEW_URL}` }}
      onMessage={handleMessage}
    />
  );
}