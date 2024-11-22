import { WebView, WebViewMessageEvent } from "react-native-webview";
import { useRef } from "react";
import { WEBVIEW_URL } from "@/constants/WebView";

export default function RouteScreen() {
  const webViewRef = useRef<WebView>(null);

  const handleMessage = async (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);
  };

  return (
    <>
      <WebView
        ref={webViewRef}
        source={{ uri: `${WEBVIEW_URL}/route` }}
        onMessage={handleMessage}
      />
    </>
  );
}
