/* eslint-disable @typescript-eslint/no-unused-vars */

import CustomButton from "@/components/CustomButton";
import { images } from "@/constants";
import React, { useState } from "react";
import { Image, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Message = {
  id: string;
  senderName: string;
  receiverName: string;
  text: string;
  timestamp: string;
};

const Chat = () => {
  const [text, setText] = useState("");

  const sendMessage = () => {
    // Handle sending the message
  };
  return (
    <SafeAreaView className="flex-1 bg-white p-5 mb-[110px]">
      <View className="flex-1 h-fit flex justify-center items-center">
        <Image
          source={images.message}
          alt="message"
          className="w-full h-40"
          resizeMode="contain"
        />
        <Text className="text-3xl font-JakartaBold mt-3">No Messages Yet</Text>
        <Text className="text-base mt-2 text-center px-7">
          Start a conversation with your driver
        </Text>
      </View>
      <View
        className="flex flex-row items-center justify-center border border-gray-300 rounded-lg p-2"
      >
        <TextInput
          className="flex-1 border border-gray-300 rounded-lg p-2 mr-2"
          value={text}
          onChangeText={setText}
          placeholder="Type a message..."
        />
        <CustomButton
          title="Send"
          onPress={sendMessage}
          className="w-24 mt-1 mb-0"
        />
      </View>
    </SafeAreaView>
  );
};

export default Chat;
