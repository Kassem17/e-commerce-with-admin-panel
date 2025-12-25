import MaskedView from "@react-native-masked-view/masked-view";
import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const GradientText = ({
  text,
  className,
}: {
  text: string;
  className?: string;
}) => {
  return (
    <MaskedView maskElement={<Text className={className}>{text}</Text>}>
      <LinearGradient
        colors={["#ffffff", "#9ca3af"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text className={`${className} opacity-0`}>{text}</Text>
      </LinearGradient>
    </MaskedView>
  );
};

export default GradientText;
