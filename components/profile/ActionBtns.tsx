import { AppStyle } from "@/constants/AppStyle";
import {
  addImageUrl,
  logoutImageUrl,
  myBusinessUrl,
  shareImageUrl,
} from "@/constants/Image";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ActionBtnsProps = {
  userId?: string;
};
export default function ActionBtns({ userId }: ActionBtnsProps) {
  const router = useRouter();
  const { signOut } = useAuth();
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

  const handleOnPress = (path: string, name: string) => {
    if (name === "Logout") {
      signOut();
    } else if (name === "Share App") {
      Share.share({
        message: `Check out Open source Business Listings App at GitHub https://github.com/Kei-K23/react-native-business-listings-app`,
      }).catch((error) => console.log("Error sharing", error));
    } else if (path) {
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
            onPress={() => handleOnPress(item.path, item.name)}
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
