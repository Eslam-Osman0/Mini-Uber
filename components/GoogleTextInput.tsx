import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/types";
import React from "react";
import { Image, View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const GoogleTextInput = ({
  icon,
  handlePress,
  containerStyle,
  initialLocation,
  textInputBackgroundColor,
}: GoogleInputProps) => {

  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50  ${containerStyle}`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Where to go?"
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        renderLeftButton={() => (
          <View className="justify-center items-center w-6 h-6">
            <Image
              source={icon ? icon : icons.search}
              className="w-6 h-6"
              resizeMode="contain"
            />
          </View>
        )}
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "Where do you want to go?",
        }}
        query={{ key: process.env.EXPO_PUBLIC_GOOGLE_API_KEY!, language: "en" }}
        styles={{
          textInputContainer: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            position: "relative",
          },
          textInput: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            fontSize: 16,
            fontWeight: "600",
            marginTop: 5,
            width: "100%",
            borderRadius: 200,
          },
          listView: {
            backgroundColor: textInputBackgroundColor
              ? textInputBackgroundColor
              : "white",
            position: "relative",
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
