import { WebView, WebViewMessageEvent } from "react-native-webview";
import * as Location from "expo-location";
import { Alert } from "react-native";
import { useRef } from "react";
import useLocationPermission from "@/hooks/useLocationPermission";
import useTracking from "@/hooks/useTracking";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const webViewRef = useRef<WebView>(null);

  const { checkLocation, requestPermissions } = useLocationPermission();
  const { startTracking, stopTracking } = useTracking({ webViewRef });

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
        const servicesEnabled = await checkLocation();
        if (!servicesEnabled) return;

        const permissionsGranted = await requestPermissions();
        if (!permissionsGranted) return;

        getLocation();
        break;
      }
      case "START_TRACKING": {
        startTracking();
        break;
      }
      case "STOP_TRACKING": {
        stopTracking();
        break;
      }
      case "STACK_TRACKING": {
        router.push("/tracking");
      }
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: "http://192.168.0.6:3000" }}
      onMessage={handleMessage}
    />
  );
}
