import WebView from "react-native-webview";

const ReviewScreen = () => {
  return <WebView source={{ uri: "http://192.168.1.4:3000/review" }} />;
};

export default ReviewScreen;
