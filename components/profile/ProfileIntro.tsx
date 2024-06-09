import { AppStyle } from "@/constants/AppStyle";
import React from "react";
import { Image, Text, View } from "react-native";

type ProfileIntroProps = {
  imageUrl?: string;
  name?: string | null;
  email?: string;
};

export default function ProfileIntro({
  imageUrl,
  name,
  email,
}: ProfileIntroProps) {
  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <Image
        source={{
          uri: imageUrl,
        }}
        style={{
          width: 80,
          marginHorizontal: "auto",
          height: 80,
          borderRadius: 99,
          borderWidth: 1,
          borderColor: "#ccc",
        }}
      />
      <Text
        style={{
          textAlign: "center",
          fontSize: AppStyle.smallTitle,
          fontWeight: "800",
        }}
      >
        {name}
      </Text>
      <Text
        style={{
          textAlign: "center",
        }}
      >
        {email}
      </Text>
    </View>
  );
}
