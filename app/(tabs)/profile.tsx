import ActionBtns from "@/components/profile/ActionBtns";
import ProfileIntro from "@/components/profile/ProfileIntro";
import { AppStyle } from "@/constants/AppStyle";
import { useUser } from "@clerk/clerk-expo";
import { Text, View } from "react-native";

export default function Profile() {
  const { user } = useUser();

  return (
    <View style={{ flex: 1, padding: AppStyle.mainPadding, paddingTop: 30 }}>
      <Text style={{ fontSize: AppStyle.subTitle, fontWeight: "900" }}>
        Profile
      </Text>

      {/* Profile intro */}
      <ProfileIntro
        imageUrl={user?.imageUrl}
        name={user?.fullName}
        email={user?.emailAddresses[0].emailAddress}
      />

      {/* Actions buttons */}
      <ActionBtns userId={user?.id} />

      <Text
        style={{
          marginTop: 20,
          fontSize: AppStyle.bodyText,
          textAlign: "center",
        }}
      >
        Developed with 💙 by Arkar Min (Kei-K)
      </Text>
    </View>
  );
}
