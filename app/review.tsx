import WebView from "react-native-webview";

const ReviewScreen = () => {
  return <WebView source={{ uri: "http://192.168.0.6:3000/review" }} />;
};

export default ReviewScreen;
