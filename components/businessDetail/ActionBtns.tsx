import { AppStyle } from "@/constants/AppStyle";
import { Business } from "@/types";
import React from "react";
import {
  FlatList,
  Image,
  Linking,
  Share,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ActionBtnsProps = {
  business: Business;
};

export default function ActionBtns({ business }: ActionBtnsProps) {
  const actionBtnMenu = [
    {
      id: 1,
      name: "Call",
      icon: require("./../../assets/images/call.png"),
      url: `tel:${business.phone}`,
    },
    {
      id: 2,
      name: "Email",
      icon: require("./../../assets/images/email.png"),
      url: `mailto:${business.email}`,
    },
    {
      id: 3,
      name: "Share",
      icon: require("./../../assets/images/share_1.png"),
      url: "", // This will be handled separately in the onPress function
    },
  ];

  const handleOnPress = (url: string, name: string) => {
    if (name === "Share") {
      Share.share({
        message: `Check out this business: Phone - ${business.phone}, Email - ${business.email}`,
      }).catch((error) => console.log("Error sharing", error));
    } else {
      Linking.openURL(url).catch((error) =>
        console.log("Error opening URL", error)
      );
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: AppStyle.mainPadding,
        paddingVertical: 10,
        backgroundColor: "#fff",
      }}
    >
      <FlatList
        data={actionBtnMenu}
        numColumns={3}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => handleOnPress(item.url, item.name)}
            key={index}
            style={{ alignItems: "center", margin: 10 }}
          >
            <Image source={item.icon} style={{ width: 40, height: 40 }} />
            <Text
              style={{
                marginTop: 2,
                color: "#454647",
                textAlign: "center",
              }}
            >
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}
