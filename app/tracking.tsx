import { WebView, WebViewMessageEvent } from "react-native-webview";
import { useRouter } from "expo-router";
import useTracking from "@/hooks/useTracking";
import { useRef } from "react";
import useLocationPermission from "@/hooks/useLocationPermission";
import { SafeAreaView, View } from "react-native";
import { disableZoomJS, WEBVIEW_URL } from "@/constants/WebView";

const TrackingScreen = () => {
  const router = useRouter();
  const webViewRef = useRef<WebView>(null);

  const { checkLocationService, checkPermissions } = useLocationPermission();
  const { startTracking, stopTracking } = useTracking({ webViewRef });

  const handleMessage = async (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);

    switch (message.type) {
      case "GPS_PERMISSION_STATE": {
        const isLocationService = await checkLocationService();
        const isPermissions = await checkPermissions();
        webViewRef.current?.postMessage(
          JSON.stringify({ isLocationService, isPermissions })
        );
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
        style={{ backgroundColor: "#F0F0EE" }}
      />
    </View>
  );
};

export default TrackingScreen;
