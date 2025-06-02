import { icons } from "@/constants";
import { googleOAuth } from "@/lib/auth";
import { useOAuth } from "@clerk/clerk-expo";
import { router } from "expo-router";
import React, { useCallback } from "react";
import { Alert, Image, Text, View } from "react-native";
import CustomButton from "./CustomButton";

const OAuth = () => {
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleGoogleSignIn = useCallback(async () => {
    try {
      const result = await googleOAuth(startOAuthFlow);

      if (result.success) {
        Alert.alert("Success", "You have successfully signed in with Google");
        router.push("/(root)/(tabs)/home");
      }
      Alert.alert(result.success ? "Success" : "Error", result.message);
    } catch (err) {
      console.error(JSON.stringify(err, null, 2));
    }
  }, [startOAuthFlow]);

  return (
    <View>
      <View className="flex items-center justify-center flex-row mt-4 gx-3">
        <View className="flex-1 h-[1px] bg-general-100" />
        <Text className="text-lg font-JakartaSemiBold">OR</Text>
        <View className="flex-1 h-[1px] bg-general-100" />
      </View>
      <CustomButton
        title="Login with Google"
        onPress={handleGoogleSignIn}
        className="mt-5 w-full shadow-none"
        bgVariant="outline"
        textVariant="primary"
        IconLeft={() => (
          <Image
            source={icons.google}
            className="w-5 h-5 mx-3"
            resizeMode="contain"
          />
        )}
      />
    </View>
  );
};

export default OAuth;
