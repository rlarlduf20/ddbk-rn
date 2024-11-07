import { WebView, WebViewMessageEvent } from "react-native-webview";
import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

export default function TabTwoScreen() {
  const checkLocation = async () => {
    const isEnabled = await Location.hasServicesEnabledAsync();

    if (!isEnabled) {
      Alert.alert(
        "위치 서비스 사용",
        '위치 서비스를 사용할 수 없습니다. "설정 > 개인 정보 보호 및 보안" 에서 위치 서비스를 켜주세요.',
        [
          { text: "취소" },
          {
            text: "설정으로 이동",
            onPress: () => {
              Linking.openSettings();
            },
          },
        ],
        { cancelable: false }
      );
      return false;
    }
    return true;
  };

  const handleMessage = async (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);

    switch (message.type) {
      case "REQUEST_GPS_PERMISSIONS": {
        const servicesEnabled = await checkLocation();
        if (!servicesEnabled) return;
      }
    }
  };

  return (
    <WebView
      source={{ uri: "http://192.168.0.10:3000/map" }}
      onMessage={handleMessage}
    />
  );
}
