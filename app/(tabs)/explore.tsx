import { WebView } from "react-native-webview";

export default function TabTwoScreen() {
  return (
    <WebView
      source={{ uri: "http://192.168.1.4:3000/map" }}
      onMessage={() => {}}
    />
  );
}
