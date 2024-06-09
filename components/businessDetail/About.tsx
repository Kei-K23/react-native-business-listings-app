import { AppStyle } from "@/constants/AppStyle";
import React from "react";
import { Text, View } from "react-native";

export default function About({
  name,
  about,
}: {
  name: string;
  about: string;
}) {
  return (
    <View
      style={{
        paddingHorizontal: AppStyle.mainPadding,
        paddingVertical: 10,
        height: "100%",
        backgroundColor: "#fff",
      }}
    >
      <Text
        style={{
          fontSize: AppStyle.bodyText,
          fontWeight: "900",
        }}
      >
        About
      </Text>
      <Text
        style={{
          marginTop: 7,
          fontSize: AppStyle.bodyText,
          lineHeight: 25,
        }}
      >
        {about}
      </Text>
    </View>
  );
}
