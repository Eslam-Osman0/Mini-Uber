import { useClerk } from "@clerk/clerk-expo";
import { router } from "expo-router";
import { View } from "react-native";
import CustomButton from "./CustomButton";

export const SignOutButton = ({ className }: { className?: string }) => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk();

  const handleSignOut = async () => {
    try {
      await signOut();
      // Redirect to your desired page
      router.replace("/sign-in");
    } catch (err) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  return (
    <View className="flex items-center justify-center w-[100px]">
      <CustomButton
        onPress={handleSignOut}
        title="Sign Out"
        bgVariant="danger"
        className="mx-1 w-[100px] shadow-lg shadow-neutral-44/70"
      />
    </View>
  );
};
