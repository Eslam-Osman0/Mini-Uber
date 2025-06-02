/* eslint-disable no-unused-expressions */
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { fetchAPI } from "@/lib/fetch";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert, Image, ScrollView, Text, View } from "react-native";
import { ReactNativeModal } from "react-native-modal";

const SignUP = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;
    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress: form.email,
        password: form.password,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err: any) {
      Alert.alert("Error", err.errors[0].longMessage);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  //Handle verification Press
  const onVerifyPress = async () => {
    if (!isLoaded) return;

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });
      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === "complete") {
        //TODO: Create new user
        await fetchAPI("/(api)/user", {
          method: "POST",
          body: JSON.stringify({
            name: form.userName,
            email: form.email,
            clerkId: signUpAttempt.createdUserId,
          }),
        });

        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({
          ...verification,
          state: "success",
        });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed",
        });
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      setVerification({
        ...verification,
        state: "failed",
        error: err.errors[0].longMessage,
      });
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
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
            Create Your Account
          </Text>
          <View className="p-5">
            <InputField
              label={"Name"}
              placeholder={"Enter User Name"}
              icon={icons.person}
              value={form.userName}
              onChangeText={(value) => setForm({ ...form, userName: value })}
            />
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
              title="Sign Up"
              onPress={onSignUpPress}
              className="mt-5"
            />
            <OAuth />
            <Link href="/sign-in" className="mt-5 text-center">
              <Text className="text-md">Already Have an Account?</Text>
              <Text className="text-primary-500 ml-2">Log In</Text>
            </Link>
          </View>
          {/* Verification Modal */}
          <ReactNativeModal
            isVisible={verification.state === "pending"}
            onModalHide={() =>
              verification.state === "success" && setShowSuccessModal(true)
            }
          >
            <View className="bg-white px-7 py-9 rounded-xl min-h-[300px]">
              <Text className="text-3xl font-JakartaExtraBold mb-2">
                Verification
              </Text>
              <Text className="text-base text-gray-500 font-Jakarta">
                verification code Sent to
              </Text>
              <Text className="text-base text-gray-500 font-Jakarta text-center">
                {form.email}
              </Text>
              <InputField
                label={"Code"}
                placeholder={"Enter Code"}
                secureTextEntry={false}
                icon={icons.lock}
                value={verification.code}
                onChangeText={(value) =>
                  setVerification({ ...verification, code: value })
                }
              />
              {verification.error && (
                <Text className="text-sm text-red-500 font-Jakarta mt-2">
                  {verification.error}
                </Text>
              )}
              <CustomButton
                title="Verify"
                bgVariant="success"
                onPress={onVerifyPress}
                className="mt-5"
              />
            </View>
          </ReactNativeModal>
          <ReactNativeModal isVisible={showSuccessModal}>
            <View className="bg-white px-7 py-9 rounded-xl min-h-[300px]">
              <Image source={images.check} className="w-28 h-28 mx-auto my-5" />
              <Text className="text-3xl font-JakartaBold text-center">
                Verified
              </Text>
              <Text className="text-base text-gray-400 font-Jakarta text-center mt-2 ">
                You Have Successfully Verified Your Account
              </Text>
              <CustomButton
                title="Browse Home"
                onPress={() => {
                  setShowSuccessModal(false),
                    router.replace("/(root)/(tabs)/home");
                }}
                className="mt-5"
              />
            </View>
          </ReactNativeModal>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUP;
