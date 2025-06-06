/* eslint-disable react/no-unescaped-entities */
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { useSignIn } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";

const SignIn = () => {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });

  const onSignInPress = async () => {
    if (!isLoaded) return;
    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: form.email,
        password: form.password,
      });
      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.replace("/(root)/(tabs)/home");
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image
            source={images.signUpCar}
            className="z-0 w-full h-[250px] "
            resizeMode="stretch"
          />
          <Text className="font-JakartaSemiBold text-2xl font-black absolute bottom-5 left-5">
            Welcome 🖐️
          </Text>
          <View className="p-5">
            <InputField
              label={"Email"}
              placeholder={"Enter Your Email"}
              keyboardType="email-address"
              icon={icons.email}
              value={form.email}
              onChangeText={(value) => setForm({ ...form, email: value })}
            />
            <InputField
              label={"Password"}
              placeholder={"Enter Your Password"}
              secureTextEntry={true}
              icon={icons.lock}
              value={form.password}
              onChangeText={(value) => setForm({ ...form, password: value })}
            />
            <CustomButton
              title="Sign In"
              onPress={() => {
                onSignInPress();
              }}
              className="mt-5"
            />
            <OAuth />
            <Link href="/sign-up" className="mt-5 text-center">
              <Text className="text-md">Don't have an account?</Text>
              <Text className="text-primary-500 ml-2">Sign Up</Text>
            </Link>
          </View>
          {/* Verification Modal */}
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
