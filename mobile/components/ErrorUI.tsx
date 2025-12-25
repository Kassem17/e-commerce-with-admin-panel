import { Text, View } from "react-native";
import AddressesHeader from "./AddressesHeader";
import SafeScreen from "./SafeScreen";
import { Ionicons } from "@expo/vector-icons";

export const ErrorUI = ({ text1, text2 }: { text1: string; text2: string }) => {
  return (
    <SafeScreen>
      <AddressesHeader />
      <View className="flex-1 items-center justify-center px-6">
        <Ionicons name="alert-circle-outline" size={64} color="#FF6B6B" />
        <Text className="text-text-primary font-semibold text-xl mt-4">
          {text1}
        </Text>
        <Text className="text-text-secondary text-center mt-2">{text2}</Text>
      </View>
    </SafeScreen>
  );
};
