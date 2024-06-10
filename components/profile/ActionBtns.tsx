import { AppStyle } from "@/constants/AppStyle";
import {
  addImageUrl,
  logoutImageUrl,
  myBusinessUrl,
  shareImageUrl,
} from "@/constants/Image";
import React from "react";
import { FlatList, Image, Text, View } from "react-native";

export default function ActionBtns() {
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      imageUrl: addImageUrl,
      path: "",
    },
    {
      id: 2,
      name: "My Business",
      imageUrl: myBusinessUrl,
      path: "",
    },
    {
      id: 3,
      name: "Share App",
      imageUrl: shareImageUrl,
      path: "",
    },
    {
      id: 4,
      name: "Logout",
      imageUrl: logoutImageUrl,
      path: "",
    },
  ];
  return (
    <View
      style={{
        marginTop: 50,
      }}
    >
      <FlatList
        numColumns={2}
        data={menuList}
        renderItem={({ item, index }) => (
          <View
            key={index}
            style={{
              margin: 10,
              borderWidth: 2,
              borderColor: "#ccc",
              borderRadius: 10,
              padding: 3,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 8,
              flex: 1,
              backgroundColor: "#fff",
            }}
          >
            <Image
              source={item.imageUrl}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{
                fontSize: AppStyle.bodyText,
                flex: 1,
                fontWeight: "bold",
              }}
            >
              {item.name}
            </Text>
          </View>
        )}
      />
    </View>
  );
}
