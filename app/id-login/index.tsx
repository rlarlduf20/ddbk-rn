import { WEBVIEW_URL } from "@/constants/WebView";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";

const IdLoginScreen = () => {
  const [webviewKey, setWebviewKey] = useState("");
  const router = useRouter();

  const handleMessage = async (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);

    switch (message.type) {
      case "STACK_NAVIGATION": {
        const { path, method } = message;
        if (method === "back") {
          router.back();
        } else if (method === "reset") {
          router.replace(path);
        } else {
          router.push(path);
        }
      }
    }
  };

  useEffect(() => {
    setWebviewKey((prevKey) => prevKey + "id-login");
  }, []);

  return (
    <WebView
      key={webviewKey}
      source={{ uri: `${WEBVIEW_URL}/id-login` }}
      onMessage={handleMessage}
    />
  );
};

export default IdLoginScreen;
