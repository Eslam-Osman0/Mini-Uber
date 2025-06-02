import CustomButton from "@/components/CustomButton";
import { onboarding } from "@/constants";
import { router } from "expo-router";
import React, { useRef, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Swiper from "react-native-swiper";
import "../global.css";

const OnBoarding = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;
  return (
    <SafeAreaView className="flex h-full justify-between items-center bg-white mx-3">
      <TouchableOpacity
        className="w-full flex items-end justify-end p-5"
        onPress={() => {
          router.replace("/sign-up");
        }}
      >
        <Text className="text-lg font-JakartaBold text-black">Skip</Text>
      </TouchableOpacity>
      <Swiper
        ref={swiperRef}
        loop={false}
        dot={<View className="w-8 h-1 rounded-full mx-1 bg-[#e2e8f0]" />}
        activeDot={<View className="w-8 h-1 rounded-full mx-1 bg-blue-500" />}
        onIndexChanged={(index) => {
          setActiveIndex(index);
        }}
      >
        {onboarding.map((item) => (
          <View key={item.id} className="flex items-center justify-center p-5">
            <Image
              source={item.image}
              className="w-full h-[300px]"
              resizeMode="contain"
            />
            <View className="flex items-center justify-center mt-10 w-full">
              <Text className="text-3xl font-bold text-black text-center">
                {item.title}
              </Text>
            </View>
            <Text className="text-2xl font-JakartaSemiBold text-black mx-10 mt-5 text-center">
              {item.description}
            </Text>
          </View>
        ))}
      </Swiper>
      <CustomButton
        title={isLastSlide ? "Get Started" : "Next"}
        className={"w-11/12 mt-10"}
        onPress={() =>
          isLastSlide
            ? router.replace("/(auth)/sign-up")
            : swiperRef.current?.scrollBy(1)
        }
      />
    </SafeAreaView>
  );
};

export default OnBoarding;
