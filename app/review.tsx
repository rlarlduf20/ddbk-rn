import { WebView, WebViewMessageEvent } from "react-native-webview";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";
import { disableZoomJS, WEBVIEW_URL } from "@/constants/WebView";
import { SafeAreaView, View } from "react-native";

const ReviewScreen = () => {
  const navigation = useNavigation();
  const handleMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    if (data.type === "COMPLETE_REVIEW") {
      navigation.dispatch(
        CommonActions.reset({
          routes: [{ key: "main", name: "main" }],
        })
      );
    }
  };
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView style={{ backgroundColor: "#f0f0ee" }} />
      <WebView
        key="review"
        source={{ uri: `${WEBVIEW_URL}/review` }}
        onMessage={handleMessage}
        injectedJavaScript={disableZoomJS}
        style={{ backgroundColor: "#F0F0EE" }}
      />
    </View>
  );
};

export default ReviewScreen;
