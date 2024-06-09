import { AppStyle } from "@/constants/AppStyle";
import { Colors } from "@/constants/Colors";
import { Business } from "@/types";
import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";

type BusinessListItemProps = {
  item: Business;
};

export default function BusinessListItem({ item }: BusinessListItemProps) {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 10,
        backgroundColor: "#fff",
        marginVertical: 20,
        marginHorizontal: AppStyle.padding,
        borderRadius: 10,
        padding: AppStyle.padding,
      }}
    >
      <Image
        source={{
          uri: item.imageUrl,
        }}
        style={{
          width: 120,
          height: 120,
          borderRadius: 8,
          overflow: "hidden",
        }}
      />
      <View>
        <Text
          style={{
            fontSize: AppStyle.bodyText,
            fontWeight: "900",
          }}
        >
          {item.name}
        </Text>
        <Text
          numberOfLines={2}
          style={{
            width: "65%",
            fontSize: 14,
            marginTop: 7,
          }}
        >
          {item.address}
        </Text>
        <Text
          style={{
            width: "65%",
            fontSize: 14,
            marginTop: 4,
          }}
        >
          {item.phone}
        </Text>
        <TouchableOpacity
          style={{
            backgroundColor: Colors.primary,
            paddingHorizontal: 1,
            paddingVertical: 4,
            borderRadius: 99,
            marginTop: 10,
            width: "30%",
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: AppStyle.bodyText,
              color: "#fff",
            }}
          >
            View
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}