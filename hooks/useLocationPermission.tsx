import * as Location from "expo-location";
import { useEffect, useRef, useState } from "react";
import { Alert, AppState, AppStateStatus, Linking } from "react-native";
import { useNavigation } from "expo-router";
import { CommonActions } from "@react-navigation/native";

const useLocationPermission = () => {
  const appState = useRef(AppState.currentState);
  const navigation = useNavigation();

  const [locationPermissionChanged, setLocationPermissionChanged] =
    useState<boolean>(false);

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
              setLocationPermissionChanged(true);
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
              setLocationPermissionChanged(true);
            },
          },
        ],
        { cancelable: false }
      );
      return false;
    }
    return true;
  };

  useEffect(() => {
    const handleAppStateChange = async (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active" &&
        locationPermissionChanged
      ) {
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ key: "(tabs)", name: "(tabs)" }],
          })
        );
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange
    );

    return () => {
      subscription.remove();
    };
  }, [locationPermissionChanged]);

  return { checkLocationService, checkPermissions, requestPermissions };
};

export default useLocationPermission;
