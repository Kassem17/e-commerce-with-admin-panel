import SafeScreen from "@/components/SafeScreen";
import useSocialAuth from "@/hooks/useSocialAuth";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import Animated, {
  FadeInDown,
  FadeInUp,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import GradientText from "@/components/GradientText";

const AuthScreen = () => {
  const { loadingStrategy, handleSocialAuth } = useSocialAuth();

  const scale = useSharedValue(1);

  const animatedPressStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.96);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  return (
    <SafeScreen>
      <View className="flex-1 bg-black">
        {/* HERO */}
        <View className="flex-1 justify-center px-6">
          <Animated.Image
            entering={FadeInUp.delay(100).duration(800)}
            source={require("../../assets/images/auth-image.png")}
            className="w-full h-72 mb-12"
            resizeMode="contain"
          />

          {/* GRADIENT TITLE */}
          <Animated.View entering={FadeInUp.delay(300).duration(800)}>
            <GradientText
              text="Everything you need."
              className="text-4xl font-extrabold text-center tracking-tight"
            />
          </Animated.View>

          <Animated.Text
            entering={FadeInUp.delay(450).duration(800)}
            className="text-4xl font-extrabold text-white text-center tracking-tight mt-1"
          >
            One seamless place.
          </Animated.Text>

          <Animated.Text
            entering={FadeInUp.delay(600).duration(800)}
            className="text-base text-gray-400 text-center mt-6 leading-6 px-6"
          >
            Shop faster. Discover smarter. Experience better.
          </Animated.Text>
        </View>

        {/* BLURRED AUTH SHEET */}
        <BlurView intensity={80} tint="dark" className="px-6 pt-6 pb-8">
          {/* GOOGLE */}
          <Animated.View style={animatedPressStyle}>
            <TouchableOpacity
              activeOpacity={1}
              onPressIn={onPressIn}
              onPressOut={onPressOut}
              onPress={() => handleSocialAuth("oauth_google")}
              disabled={loadingStrategy !== null}
              className="h-14 flex-row items-center justify-center rounded-2xl bg-white/90 mb-3"
            >
              {loadingStrategy === "oauth_google" ? (
                <ActivityIndicator size="small" color="#000" />
              ) : (
                <>
                  <Image
                    source={require("../../assets/images/google.png")}
                    className="w-5 h-5 mr-3"
                  />
                  <Text className="text-base font-semibold text-black">
                    Continue with Google
                  </Text>
                </>
              )}
            </TouchableOpacity>
          </Animated.View>

          {/* APPLE */}
          {Platform.OS === "ios" && (
            <Animated.View style={animatedPressStyle}>
              <TouchableOpacity
                activeOpacity={1}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                onPress={() => handleSocialAuth("oauth_apple")}
                disabled={loadingStrategy !== null}
                className="h-14 flex-row items-center justify-center rounded-2xl bg-black mt-2"
              >
                {loadingStrategy === "oauth_apple" ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <>
                    <Image
                      source={require("../../assets/images/apple.png")}
                      className="w-5 h-5 mr-3 mb-2"
                      style={{ tintColor: "white" }}
                      resizeMode="contain"
                    />
                    <Text className="text-base font-semibold text-white">
                      Continue with Apple
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </Animated.View>
          )}

          {/* FOOTER */}
          <Animated.Text
            entering={FadeInDown.delay(200).duration(600)}
            className="text-[11px] text-gray-400 text-center mt-5 px-4 leading-4"
          >
            By continuing you agree to our{" "}
            <Text className="text-gray-200">Terms</Text>,{" "}
            <Text className="text-gray-200">Privacy Policy</Text> and{" "}
            <Text className="text-gray-200">Cookies</Text>.
          </Animated.Text>
        </BlurView>
      </View>
    </SafeScreen>
  );
};

export default AuthScreen;
