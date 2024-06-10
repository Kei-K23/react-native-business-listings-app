import { db } from "@/config/firebase";
import { AppStyle } from "@/constants/AppStyle";
import { Colors } from "@/constants/Colors";
import { Slider } from "@/types";
import { useRouter } from "expo-router";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

type CategoriesProps = {
  isInsideExploreScreen?: boolean;
  onCategoriesSelect?: (name: string) => void;
};
export default function Categories({
  isInsideExploreScreen,
  onCategoriesSelect,
}: CategoriesProps) {
  const [categories, setCategories] = useState<Slider[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
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
    if (!isInsideExploreScreen) {
      router.push(`/businessLists/${name}`);
    } else {
      setSelectedCategory(name);
      onCategoriesSelect?.(name);
    }
  };

  useEffect(() => {
    getCategories();
    return () => {
      setSelectedCategory("");
    };
  }, []);

  return (
    <View
      style={{
        padding: isInsideExploreScreen ? 0 : AppStyle.mainPadding,
      }}
    >
      {!isInsideExploreScreen && (
        <Text
          style={{
            fontSize: AppStyle.smallTitle,
            fontWeight: "700",
          }}
        >
          # Categories
        </Text>
      )}
      <FlatList
        data={categories}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={{
          marginTop: 7,
        }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleOnPress(item.name)}
            style={{
              marginRight: 10,
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
                borderWidth: 2,
                borderColor:
                  selectedCategory === item.name ? Colors.primary : "#ccc",
              }}
            />
            <Text
              style={{
                fontWeight: "500",
                textAlign: "center",
                marginTop: 4,
                color: selectedCategory === item.name ? Colors.primary : "#000",
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
