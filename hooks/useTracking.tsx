import { useRef } from "react";
import WebView from "react-native-webview";
import * as Location from "expo-location";
import { Alert } from "react-native";

interface Props {
  webViewRef: React.RefObject<WebView>;
}

const useTracking = ({ webViewRef }: Props) => {
  const watchPositionRef = useRef<Location.LocationSubscription | null>(null);

  const startTracking = async () => {
    try {
      const watchPostion = await Location.watchPositionAsync(
        {
          distanceInterval: 1,
        },
        (location) => {
          const { latitude, longitude } = location.coords;
          webViewRef.current?.postMessage(
            JSON.stringify({ latitude, longitude })
          );
        }
      );
      watchPositionRef.current = watchPostion;
    } catch {
      Alert.alert("실시간 위치 정보를 불러오는데 실패하였습니다.");
    }
  };

  const stopTracking = () => {
    if (watchPositionRef.current) {
      Alert.alert("산책이 종료되었습니다.");
      watchPositionRef.current.remove();
    } else {
      Alert.alert("위치 추적이 활성화되지 않았습니다.");
    }
  };

  return { startTracking, stopTracking };
};

export default useTracking;
