import { ActivityIndicator, Text, View } from "react-native";
import { useAuth } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import SafeScreen from "@/components/SafeScreen";

const SSOCallback = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return null;

  if (isSignedIn) {
    return <Redirect href="/(tabs)" />;
  }

  return (
    <SafeScreen>
      <View className="justify-center items-center h-screen text-center text-white">
        <ActivityIndicator size="large" color="#ffff" />
      </View>
    </SafeScreen>
  );
};

export default SSOCallback;
