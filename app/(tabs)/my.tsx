import { WebView, WebViewMessageEvent } from "react-native-webview";
import { useRef } from "react";
import useLocationPermission from "@/hooks/useLocationPermission";
import { WEBVIEW_URL } from "@/constants/WebView";

export default function MyScreen() {
  const webViewRef = useRef<WebView>(null);

  const { checkLocationService, checkPermissions, requestPermissions } =
    useLocationPermission();

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
        break;
      }
      case "GPS_PERMISSION_STATE": {
        const isLocationService = await checkLocationService();
        const isPermissions = await checkPermissions();
        webViewRef.current?.postMessage(
          JSON.stringify({ isLocationService, isPermissions })
        );
      }
    }
  };

  return (
    <WebView
      ref={webViewRef}
      source={{ uri: `${WEBVIEW_URL}/mypage` }}
      onMessage={handleMessage}
    />
  );
}