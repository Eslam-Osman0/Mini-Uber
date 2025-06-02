import { InputFieldProps } from "@/types/types";
import React from "react";
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const InputField = ({
  label,
  labelStyle,
  secureTextEntry = false,
  placeholder,
  containerStyle,
  inputStyle,
  icon,
  iconStyle,
  className,
  ...props
}: InputFieldProps) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "android" ? "height" : "padding"}
      className={className}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-3 w-full">
          <Text
            className={`text-lg font-JakartaSemiBold mb-3 mx-3 ${labelStyle}`}
          >
            {label}
          </Text>
          <View
            className={`flex flex-row justify-start items-center rounded-full relative bg-neutral-100 border-[1px] border-neutral-100 focus:border-primary-500 ${containerStyle}`}
          >
            {icon && (
              <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />
            )}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] ${inputStyle} flex-1 text-left`}
              placeholder={placeholder}
              secureTextEntry={secureTextEntry}
              {...props}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
