import { WebView, WebViewMessageEvent } from "react-native-webview";
import { useRouter } from "expo-router";

const TrackingScreen = () => {
  const router = useRouter();

  const handleMessage = async (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);
    switch (message.type) {
      case "STACK_REVIEW": {
        router.push("/review");
      }
    }
  };

  return (
    <WebView
      source={{ uri: "http://192.168.0.6:3000/tracking" }}
      onMessage={handleMessage}
    />
  );
};

export default TrackingScreen;
