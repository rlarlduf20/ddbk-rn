import * as Location from "expo-location";
import { Alert, Linking } from "react-native";

const useLocationPermission = () => {
  const checkLocationService = async () => {
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
  const checkPermissions = async () => {
    const { status } = await Location.getForegroundPermissionsAsync();
    if (status !== "granted") {
      return false;
    }
    return true;
  };

  const requestPermissions = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "위치 정보 접근 거부",
        "위치 권한이 필요합니다.",
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

  return { checkLocationService, checkPermissions, requestPermissions };
};

export default useLocationPermission;
