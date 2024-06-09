import { AppStyle } from "@/constants/AppStyle";
import { Business } from "@/types";
import { FontAwesome } from "@expo/vector-icons";
import React from "react";
import { Image, View, Text } from "react-native";

type IntroProps = {
  business: Business;
};
export default function Intro({ business }: IntroProps) {
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          padding: AppStyle.mainPadding,
          paddingTop: 35,
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
        }}
      >
        <FontAwesome name="arrow-circle-left" size={24} color="#454647" />
        <FontAwesome name="heart-o" size={24} color="#454647" />
      </View>
      <Image
        source={{
          uri: business?.imageUrl,
        }}
        style={{
          width: "100%",
          height: 250,
          resizeMode: "cover",
        }}
      />
      <View
        style={{
          paddingHorizontal: AppStyle.mainPadding,
          paddingVertical: 10,
          marginTop: -20,
          backgroundColor: "#fff",
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <Text
          style={{
            fontSize: AppStyle.smallTitle,
            fontWeight: "900",
          }}
        >
          {business.name}
        </Text>
        <Text
          style={{
            marginTop: 7,
            color: "#454647",
          }}
        >
          {business.about}
        </Text>
      </View>
    </View>
  );
}
