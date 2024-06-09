import { db } from "@/config/firebase";
import { AppStyle } from "@/constants/AppStyle";
import { Slider } from "@/types";
import { useRouter } from "expo-router";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function Categories() {
  const [categories, setCategories] = useState<Slider[]>([]);
  const router = useRouter();

  const getCategories = async () => {
    setCategories([]);

    const q = query(collection(db, "categories"));

    const querySnapshot = await getDocs(q);

    //? Check the type is matching
    querySnapshot.forEach((doc) => {
      setCategories((prev) => [...prev, doc.data() as Slider]);
    });
  };

  const handleOnPress = (name: string) => {
    router.push(`/businessLists/${name}`);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View>
      <Text
        style={{
          fontSize: AppStyle.smallTitle,
          padding: 20,
          fontWeight: "700",
        }}
      >
        # Categories
      </Text>
      <FlatList
        data={categories}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          paddingLeft: AppStyle.mainPadding,
          paddingRight: 20,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleOnPress(item.name)}
            style={{
              marginRight: 15,
            }}
          >
            <Image
              source={{
                uri: item?.imageUrl,
              }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 10,
                backgroundColor: "#6693fa",
              }}
            />
            <Text
              style={{
                fontWeight: "500",
                textAlign: "center",
                marginTop: 4,
              }}
            >
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
