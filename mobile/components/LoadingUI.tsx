import { ActivityIndicator, Text, View } from "react-native";
import AddressesHeader from "./AddressesHeader";
import SafeScreen from "./SafeScreen";

export const LoadingUI = ({ text }: { text: string }) => {
  return (
    <SafeScreen>
      <AddressesHeader />
      <View className="flex-1 items-center justify-center px-6">
        <ActivityIndicator size="large" color="#00D9FF" />
        <Text className="text-text-secondary mt-4">{text}</Text>
      </View>
    </SafeScreen>
  );
};
