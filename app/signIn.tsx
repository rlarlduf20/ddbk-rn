// import { WEBVIEW_URL } from "@/constants/WebView";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { useRouter } from "expo-router";
// import { useEffect } from "react";
// import { Button } from "react-native";
// import { WebView, WebViewMessageEvent } from "react-native-webview";

// const SignInScreen = () => {
//   const router = useRouter();

//   useEffect(() => {
//     const checkLogIn = async () => {
//       const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");

//       if (isLoggedIn) {
//         router.replace("/main");
//       }
//     };

//     checkLogIn();
//   }, []);

//   const handleMessage = async (event: WebViewMessageEvent) => {
//     const message = JSON.parse(event.nativeEvent.data);
//   };
//   return (
//     <>
//       <WebView
//         source={{ uri: `${WEBVIEW_URL}/signIn` }}
//         onMessage={handleMessage}
//         onNavigationStateChange={async (e) => {
//           if (e.url.includes("/signIn/redirect")) {
//             await AsyncStorage.setItem("isLoggedIn", "true");
//             router.replace("/main");
//           }
//         }}
//       />
//       <Button
//         onPress={async () => {
//           await AsyncStorage.setItem("isLoggedIn", "true");
//         }}
//         title="앱진입"
//         color="#841584"
//       />
//     </>
//   );
// };

// export default SignInScreen;
