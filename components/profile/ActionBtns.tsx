import { AppStyle } from "@/constants/AppStyle";
import {
  addImageUrl,
  logoutImageUrl,
  myBusinessUrl,
  shareImageUrl,
} from "@/constants/Image";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

type ActionBtnsProps = {
  userId?: string;
};
export default function ActionBtns({ userId }: ActionBtnsProps) {
  const router = useRouter();
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      imageUrl: addImageUrl,
      path: "/addBusiness",
    },
    {
      id: 2,
      name: "My Business",
      imageUrl: myBusinessUrl,
      path: `/myBusiness/${userId}`,
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

  const handleOnPress = (path: string) => {
    if (path) {
      router.push(path);
    }
  };

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
          <TouchableOpacity
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
            onPress={() => handleOnPress(item.path)}
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
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
