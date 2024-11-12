import { WebView, WebViewMessageEvent } from "react-native-webview";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { WEBVIEW_URL } from "@/constants/WebView";

const ReviewScreen = () => {
  const navigation = useNavigation();
  const handleMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === "COMPLETE_REVIEW") {
      navigation.dispatch(
        CommonActions.reset({
          routes: [{ key: "(tabs)", name: "(tabs)" }],
        })
      );
    }
  };
  return (
    <WebView
      source={{ uri: `${WEBVIEW_URL}/review` }}
      onMessage={handleMessage}
    />
  );
};

export default ReviewScreen;
