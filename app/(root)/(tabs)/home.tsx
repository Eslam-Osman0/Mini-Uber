/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import RideCard from "@/components/RideCard";
import { SignOutButton } from "@/components/SIgnOutButton";
import { icons, images } from "@/constants";
import { useFetch } from "@/lib/fetch";
import { useLocationStore } from "@/store";
import { Ride } from "@/types/types";
import { useUser } from "@clerk/clerk-expo";
import * as Location from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const HomePage = () => {
  const { setUserLocation, setDestinationLocation } = useLocationStore();
  const [permission, setPermission] = useState(false);
  const { user } = useUser();
  const {
    data: recentRides,
    loading,
    error,
  } = useFetch<Ride[]>(`/(api)/ride/${user?.id}`);

  const handleDestinationPress = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    router.push("/(root)/find-ride");
  };
  useEffect(() => {
    const requestLocation = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setPermission(false);
        return;
      }

      const location = await Location.getCurrentPositionAsync();
      const adress = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
        // latitude: 37.78825,
        // longitude: -122.4324,
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${adress[0].name}, ${adress[0].region}`,
      });
      setDestinationLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        address: `${adress[0].name}, ${adress[0].region}`,
      });
      setPermission(true);
    };
    requestLocation();
  }, []);

  return (
    <SafeAreaView className="bg-primary-100 p-3">
      <FlatList
        showsVerticalScrollIndicator={false}
        data={recentRides}
        renderItem={({ item }) => <RideCard ride={item} />}
        className="px-2"
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingBottom: 100 }}
        ListEmptyComponent={() => (
          <View className="flex flex-col items-center justify-center mt-5">
            {!loading ? (
              <>
                <Image
                  source={images.noResult}
                  className="w-40 h-40"
                  resizeMode="contain"
                />
                <Text className="text-lg font-JakartaBold text-primary-500">
                  No Rides Available
                </Text>
              </>
            ) : (
              <>
                <ActivityIndicator size="large" color="blue" />
                <Text className="text-3xl font-JakartaSemiBold text-primary-500">
                  Loading
                </Text>
              </>
            )}
          </View>
        )}
        ListHeaderComponent={() => (
          <>
            <View className="flex w-full flex-row items-center justify-between">
              <Text className="text-lg font-bold">
                Hello: {user?.emailAddresses[0].emailAddress.split("@")[0]}
              </Text>
              <SignOutButton />
            </View>
            <GoogleTextInput
              icon={icons.search}
              containerStyle="bg-white shadow-2xl shadow-neutral-500 rounded-lg px-5"
              handlePress={handleDestinationPress}
            />
            <>
              <Text className="text-xl font-JakartaBold mt-5 mb-3">
                Your Current Location
              </Text>
              <View className="flex flex-row items-center justify-center h-[300px]">
                <Map />
              </View>
            </>
            <Text className="text-xl font-JakartaBold mt-5 mb-3">
              Recent Rides
            </Text>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default HomePage;
