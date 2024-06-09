import { db } from "@/config/firebase";
import { AppStyle } from "@/constants/AppStyle";
import { Colors } from "@/constants/Colors";
import { Business } from "@/types";
import { useRouter } from "expo-router";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function BusinessLists() {
  const [businesses, seBusinesses] = useState<Business[]>([]);
  const router = useRouter();

  const handleOnPress = (id: string) => {
    router.push(`/businessDetail/${id}`);
  };

  const getBusinesses = async () => {
    seBusinesses([]);

    const q = query(collection(db, "businesses"));

    const querySnapshot = await getDocs(q);

    //? Check the type is matching
    querySnapshot.forEach((doc) => {
      seBusinesses((prev) => [
        ...prev,
        { id: doc.id, ...(doc.data() as Business) },
      ]);
    });
  };

  useEffect(() => {
    getBusinesses();
  }, []);

  return (
    <View
      style={{
        padding: 20,
      }}
    >
      <Text
        style={{
          fontSize: AppStyle.smallTitle,
          fontWeight: "700",
        }}
      >
        # Popular Business
      </Text>
      <FlatList
        data={businesses}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 7,
        }}
        renderItem={({ item }) => (
          <View
            style={{
              width: 280,
              marginRight: 15,
              padding: AppStyle.padding,
              backgroundColor: "#fff",
              borderRadius: 10,
            }}
          >
            <Image
              source={{
                uri: item?.imageUrl,
              }}
              style={{
                width: "100%",
                height: 140,
                borderRadius: 10,
                marginRight: 14,
                backgroundColor: Colors.primary,
              }}
            />
            <View>
              <Text
                style={{
                  fontSize: AppStyle.smallTitle,
                  fontWeight: "900",
                  marginTop: 10,
                }}
              >
                {item.name}
              </Text>
              <Text
                numberOfLines={2}
                style={{
                  fontSize: AppStyle.bodyText,
                  marginTop: 7,
                  color: "#444",
                }}
              >
                {item.about}
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginTop: 7,
                }}
              >
                <Text
                  style={{
                    fontSize: AppStyle.bodyText,
                    marginTop: 7,
                    color: "#444",
                  }}
                >
                  {item.phone}
                </Text>
                <Text
                  style={{
                    color: Colors.primary,
                    textTransform: "capitalize",
                    fontWeight: "900",
                  }}
                >
                  {item.category}
                </Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => handleOnPress(item.id!)}
              style={{
                backgroundColor: Colors.primary,
                paddingHorizontal: 20,
                paddingVertical: 10,
                borderRadius: 99,
                marginTop: 20,
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
        )}
      />
    </View>
  );
}
