import { WebView, WebViewMessageEvent } from "react-native-webview";
import { useRouter } from "expo-router";
import useTracking from "@/hooks/useTracking";
import { useRef } from "react";
import useLocationPermission from "@/hooks/useLocationPermission";
import * as Location from "expo-location";
import { Alert, SafeAreaView, View } from "react-native";
import { disableZoomJS, WEBVIEW_URL } from "@/constants/WebView";

const TrackingScreen = () => {
  const router = useRouter();
  const webViewRef = useRef<WebView>(null);

  const { checkLocationService, requestPermissions } = useLocationPermission();
  const { startTracking, stopTracking } = useTracking({ webViewRef });

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
      case "STACK_NAVIGATION": {
        const { path, method } = message;
        if (method === "back") {
          router.back();
        } else if (method === "reset") {
          router.replace(path);
        } else {
          router.push(path);
        }
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: "#f0f0ee" }} />
      <WebView
        ref={webViewRef}
        source={{ uri: `${WEBVIEW_URL}/tracking` }}
        onMessage={handleMessage}
        injectedJavaScript={disableZoomJS}
      />
    </View>
  );
};

export default TrackingScreen;
